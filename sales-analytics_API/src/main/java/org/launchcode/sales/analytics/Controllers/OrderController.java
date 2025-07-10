package org.launchcode.sales.analytics.Controllers;

import org.launchcode.sales.analytics.Models.Order;
import org.launchcode.sales.analytics.Repositories.OrderRepository;
import org.launchcode.sales.analytics.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private final OrderRepository orderRepository;
    @Autowired
    private OrderService orderService;
    @Autowired
    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file) {
        try {
            orderService.parseAndSave(file);
            return ResponseEntity.ok("CSV uploaded and processed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing CSV file.");
        }
    }

}
