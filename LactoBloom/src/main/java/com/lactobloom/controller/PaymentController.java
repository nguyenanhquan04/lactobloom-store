package com.lactobloom.controller;
import com.lactobloom.service.PaymentService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController extends HttpServlet {

    @Autowired
    private PaymentService paymentService;

    // Api: localhost:8080/payment/create-payment?amount=(insert total price)
    // or: localhost:8080/payment/create-payment?amount=(insert total price)&bankCode=NCB(can replace another bank code)
    @GetMapping("/create-payment")
    public ResponseEntity<?> createPayment(HttpServletRequest request) {
        return new ResponseEntity<>(paymentService.createPayment(request), HttpStatus.OK);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request) {
        return paymentService.vnpayCallBack(request);
    }

    @GetMapping("/transaction-status")
    public ResponseEntity<?> getTransactionStatus(@RequestParam String transactionId) {
        return paymentService.getTransactionStatus(transactionId);
    }
}