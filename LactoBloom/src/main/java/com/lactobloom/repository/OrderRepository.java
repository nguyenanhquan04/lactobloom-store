package com.lactobloom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lactobloom.model.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserUserId(int userId);

    @Query("SELECT new map(od.product.productId as productId, SUM(od.totalPrice) as totalMoney) " +
            "FROM OrderDetail od " +
            "WHERE od.product.deleted = false " +
            "GROUP BY od.product.productId " +
            "ORDER BY SUM(od.totalPrice) DESC")
    List<Map<String, Object>> findTop5SellingProducts();

    @Query("SELECT o FROM Order o ORDER BY o.orderDate DESC")
    List<Order> find5RecentOrders();

    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double findTotalRevenue();

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE DATE(o.orderDate) = :today")
    Double findTodayRevenue(@Param("today") LocalDate today);

    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE YEAR(o.orderDate) = :year AND MONTH(o.orderDate) = :month")
    Double findThisMonthRevenue(@Param("year") int year, @Param("month") int month);

    @Query("SELECT new map(FUNCTION('DATE_FORMAT', o.orderDate, '%m') as month, " +
            "SUM(o.totalPrice) as totalMoney, COUNT(o.orderId) as orderCount) " +
            "FROM Order o " +
            "WHERE YEAR(o.orderDate) = :year " +
            "GROUP BY FUNCTION('DATE_FORMAT', o.orderDate, '%m') " +
            "ORDER BY FUNCTION('DATE_FORMAT', o.orderDate, '%m') ASC")
    List<Map<String, Object>> findSalesByMonthOfYear(@Param("year") int year);

    @Query("SELECT new map(FUNCTION('DATE_FORMAT', o.orderDate, '%d/%m') as date, " +
            "SUM(o.totalPrice) as totalMoney, COUNT(o.orderId) as orderCount) " +
            "FROM Order o " +
            "WHERE YEAR(o.orderDate) = :year AND MONTH(o.orderDate) = :month " +
            "GROUP BY FUNCTION('DATE_FORMAT', o.orderDate, '%d/%m') " +
            "ORDER BY FUNCTION('DATE_FORMAT', o.orderDate, '%d/%m') ASC")
    List<Map<String, Object>> findSalesByDayInThisMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT MIN(o.orderDate) FROM Order o")
    LocalDate findEarliestOrderDate();

    @Query("SELECT o FROM Order o WHERE DATE(o.orderDate) = CURRENT_DATE")
    List<Order> findTodayOrders();
}
