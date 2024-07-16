package com.lactobloom.controller;

import com.lactobloom.dto.DashboardDto;
import com.lactobloom.dto.OrderDto;
import com.lactobloom.service.interfaces.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private IDashboardService dashboardService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/top5SellingProducts")
    public List<DashboardDto.ProductResponse> getTop5SellingProducts() {
        return dashboardService.getTop5SellingProducts();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/top5RecentOrders")
    public List<OrderDto> get5RecentOrders() {
        return dashboardService.get5RecentOrders();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/todayOrders")
    public List<OrderDto> getTodayOrders() {
        return dashboardService.getTodayOrders();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/totalRevenue")
    public double getTotalRevenue() {
        return dashboardService.getTotalRevenue();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/todayRevenue")
    public double getTodayRevenue() {
        return dashboardService.getTodayRevenue();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/monthRevenue")
    public double getMonthRevenue(@RequestParam int month, @RequestParam int year) {
        return dashboardService.getMonthRevenue(month, year);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/availableMonths")
    public List<String> getAvailableMonths() {
        return dashboardService.getAvailableMonths();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/salesByMonthOfYear")
    public List<DashboardDto.MonthRevenue> getSalesByMonthOfYear(@RequestParam int year) {
        return dashboardService.getSalesByMonthOfYear(year);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/salesByDayOfMonth")
    public List<DashboardDto.DayRevenue> getSalesByDayOfMonth(@RequestParam int month, @RequestParam int year) {
        return dashboardService.getSalesByDayOfMonth(month, year);
    }
}
