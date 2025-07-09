package org.launchcode.sales.analytics.Controllers;

import org.launchcode.sales.analytics.Models.Order;
import org.launchcode.sales.analytics.Repositories.OrderRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
