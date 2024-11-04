package net.aissy.ordermicroservice.web;

import net.aissy.ordermicroservice.entities.Order;
import net.aissy.ordermicroservice.entities.OrderStatus;
import net.aissy.ordermicroservice.repository.OrderRepository;
import net.aissy.ordermicroservice.repository.ProductItemRepository;
import net.aissy.ordermicroservice.restclients.InventoryRestClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderRepository orderRepository;
    private final InventoryRestClient inventoryRestClient;
    private final ProductItemRepository productItemRepository;

    public OrderController(OrderRepository orderRepository, InventoryRestClient inventoryRestClient, ProductItemRepository productItemRepository) {
        this.orderRepository = orderRepository;
        this.inventoryRestClient = inventoryRestClient;
        this.productItemRepository = productItemRepository;
    }

    @GetMapping("/orders")
    public List<Order> findAllOrders() {
        List<Order> allOrders = orderRepository.findAll();
        allOrders.forEach(order -> {
            order.getProductItems().forEach(productItem -> {
                productItem.setProduct(inventoryRestClient.getProductById(productItem.getProductId()));
            });
        });
        return allOrders;
    }

    @GetMapping("/orders/{id}")
    public Order findByID(@PathVariable String id) {
        Order order = orderRepository.findById(id).get();
        order.getProductItems().forEach(productItem -> {
            productItem.setProduct(inventoryRestClient.getProductById(productItem.getProductId()));
        });
        return order;
    }

    @PostMapping("/orders/create")
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @PutMapping("/orders/update/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order order) {
        Order existingOrder = orderRepository.findById(id).get();
        existingOrder.setDate(order.getDate());
        existingOrder.setStatus(order.getStatus());
        return orderRepository.save(existingOrder);
    }

    @DeleteMapping("/orders/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        Order existingOrder = orderRepository.findById(id).get();
        productItemRepository.deleteAll(existingOrder.getProductItems());
        orderRepository.delete(existingOrder);
        return ResponseEntity.noContent().build();
    }
}
