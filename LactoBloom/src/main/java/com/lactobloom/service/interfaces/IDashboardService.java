package com.lactobloom.service.interfaces;

import com.lactobloom.dto.DashboardDto;
import com.lactobloom.dto.OrderDto;
import java.util.List;

public interface IDashboardService {
    List<DashboardDto.ProductResponse> getTop5SellingProducts();
    List<OrderDto> get5RecentOrders();
    List<OrderDto> getTodayOrders();
    Double getTotalRevenue();
    Double getTodayRevenue();
    Double getMonthRevenue(int month, int year);
    List<String> getAvailableMonths();
    List<DashboardDto.MonthRevenue> getSalesByMonthOfYear(int year);
    List<DashboardDto.DayRevenue> getSalesByDayOfMonth(int month, int year);
}
