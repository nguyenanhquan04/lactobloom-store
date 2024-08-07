package com.lactobloom.service;

import com.lactobloom.config.PaymentConfig;
import com.lactobloom.dto.PaymentDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    private Map<String, Boolean> transactionStates = new HashMap<>();

    public PaymentDto createPayment(HttpServletRequest request){
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", PaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", PaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", PaymentConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", PaymentConfig.orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", PaymentConfig.getIpAddress(request));
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setStatus("OK");
        paymentDto.setMessage("Successfully");
        paymentDto.setUrl(paymentUrl);
        return paymentDto;
    }

    public ResponseEntity<?> vnpayCallBack(HttpServletRequest request){
        String status = request.getParameter("vnp_ResponseCode");
        String transactionId = request.getParameter("vnp_TxnRef");
        boolean isSuccess = "00".equals(status);
        updateTransactionState(transactionId, isSuccess);
        String redirectUrl = "http://localhost:5173/checkout-result?transactionId=" + transactionId;
//        String redirectUrl = "https://lactobloom-store.vercel.app/checkout-result?transactionId=" + transactionId;
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", redirectUrl)
                .build();
    }

    public void updateTransactionState(String transactionId, boolean isValid) {
        transactionStates.put(transactionId, isValid);
    }

    public ResponseEntity<?> getTransactionStatus(String transactionId){
        try {
            Boolean status = getTransactionState(transactionId);
            if (status == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("status", "not found"));
            return ResponseEntity.ok().body(Collections.singletonMap("status", status));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("status", "error"));
        }
    }

    public Boolean getTransactionState(String transactionId) {
        Boolean transactionState = transactionStates.get(transactionId);
        transactionStates.remove(transactionId);
        return transactionState;
    }
}