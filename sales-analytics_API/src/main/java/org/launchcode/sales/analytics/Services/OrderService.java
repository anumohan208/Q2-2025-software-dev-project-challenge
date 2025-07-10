package org.launchcode.sales.analytics.Services;

import org.launchcode.sales.analytics.Models.Order;
import org.launchcode.sales.analytics.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public void parseAndSave(MultipartFile file) throws Exception {
        List<Order> orders = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] fields = line.split(",");

                if (fields.length >= 8) {
                    Order order = new Order();

                    order.setOrderDate(LocalDate.parse(fields[1].trim()));
                    order.setUserId(Long.parseLong(fields[2].trim()));
                    order.setProductId(Long.parseLong(fields[3].trim()));
                    order.setQuantity(Integer.parseInt(fields[4].trim()));
                    order.setPrice(new BigDecimal(fields[5].trim()));
                    order.setTotalAmount(new BigDecimal(fields[6].trim()));
                    order.setCountry(fields[7].trim());
                    order.setCity(fields[8].trim());

                    orders.add(order);
                }
            }
        }

        orderRepository.saveAll(orders);
    }
}
