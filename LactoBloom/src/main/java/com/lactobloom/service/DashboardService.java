package com.lactobloom.service;

import com.lactobloom.dto.DashboardDto;
import com.lactobloom.dto.OrderDto;
import com.lactobloom.repository.OrderRepository;
import com.lactobloom.service.interfaces.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService implements IDashboardService{

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<DashboardDto.ProductResponse> getTop5SellingProducts() {
        List<Map<String, Object>> results = orderRepository.findTop5SellingProducts();
        return results.stream()
                .limit(5)
                .map(result -> DashboardDto.ProductResponse.builder()
                        .productId((Integer) result.get("productId"))
                        .totalMoney((Double) result.get("totalMoney"))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> get5RecentOrders() {
        return orderRepository.find5RecentOrders().subList(0, 5).stream().map(orderService::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getTodayOrders() {
        return orderRepository.findTodayOrders().stream().map(orderService::mapToDto).collect(Collectors.toList());
    }

    @Override
    public Double getTotalRevenue() {
        return orderRepository.findTotalRevenue() == null ? 0 : orderRepository.findTotalRevenue();
    }

    public Double getTodayRevenue() {
        LocalDate today = LocalDate.now();
        return orderRepository.findTodayRevenue(today) == null ? 0 : orderRepository.findTodayRevenue(today);
    }

    @Override
    public Double getMonthRevenue(int month, int year) {
        Double revenue = orderRepository.findThisMonthRevenue(year, month);
        return revenue == null ? 0 : revenue;
    }

    public List<String> getAvailableMonths() {
        LocalDate earliestOrderDate = orderRepository.findEarliestOrderDate();
        YearMonth start = YearMonth.of(earliestOrderDate.getYear(), earliestOrderDate.getMonthValue());
        YearMonth end = YearMonth.now();
        List<String> months = new ArrayList<>();
        for (YearMonth date = start; !date.isAfter(end); date = date.plusMonths(1)) {
            months.add(date.format(DateTimeFormatter.ofPattern("MM/yyyy")));
        }
        return months;
    }

    @Override
    public List<DashboardDto.MonthRevenue> getSalesByMonthOfYear(int year) {
        List<Map<String, Object>> results = orderRepository.findSalesByMonthOfYear(year);
        List<DashboardDto.MonthRevenue> monthRevenues = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            String formattedMonth = String.format("%02d", month);
            Map<String, Object> result = results.stream()
                    .filter(r -> formattedMonth.equals(r.get("month")))
                    .findFirst()
                    .orElse(null);
            if (result != null) {
                monthRevenues.add(DashboardDto.MonthRevenue.builder()
                        .month(formattedMonth)
                        .revenue((Double) result.get("totalMoney"))
                        .orderCounts(((Number) result.get("orderCount")).intValue())
                        .build());
            } else {
                monthRevenues.add(DashboardDto.MonthRevenue.builder()
                        .month(formattedMonth)
                        .revenue(0.0)
                        .orderCounts(0)
                        .build());
            }
        }
        return monthRevenues;
    }

    @Override
    public List<DashboardDto.DayRevenue> getSalesByDayOfMonth(int month, int year) {
        List<Map<String, Object>> results = orderRepository.findSalesByDayInThisMonth(year, month);
        YearMonth yearMonth = YearMonth.of(year, month);
        List<DashboardDto.DayRevenue> dayRevenues = new ArrayList<>();
        for (int day = 1; day <= yearMonth.lengthOfMonth(); day++) {
            String formattedDay = String.format("%02d/%02d", day, month);
            Map<String, Object> result = results.stream()
                    .filter(r -> formattedDay.equals(r.get("date")))
                    .findFirst()
                    .orElse(null);
            if (result != null) {
                dayRevenues.add(DashboardDto.DayRevenue.builder()
                        .date((String) result.get("date"))
                        .orderCounts(((Number) result.get("orderCount")).intValue())
                        .revenue((Double) result.get("totalMoney"))
                        .build());
            } else {
                dayRevenues.add(DashboardDto.DayRevenue.builder()
                        .date(formattedDay)
                        .orderCounts(0)
                        .revenue(0.0)
                        .build());
            }
        }
        return dayRevenues;
    }
}
