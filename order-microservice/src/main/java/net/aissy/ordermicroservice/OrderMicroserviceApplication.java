package net.aissy.ordermicroservice;

import net.aissy.ordermicroservice.entities.Order;
import net.aissy.ordermicroservice.entities.OrderStatus;
import net.aissy.ordermicroservice.entities.ProductItem;
import net.aissy.ordermicroservice.model.Product;
import net.aissy.ordermicroservice.repository.OrderRepository;
import net.aissy.ordermicroservice.repository.ProductItemRepository;
import net.aissy.ordermicroservice.restclients.InventoryRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class OrderMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderMicroserviceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(OrderRepository orderRepository, ProductItemRepository productItemRepository, InventoryRestClient inventoryRestClient) {
		return args -> {
			List<String> productIds = List.of("P01", "P02", "P03");
			for (int i = 0; i < 5; i++) {
				Order order = Order.builder()
						.date(LocalDate.now())
						.status(OrderStatus.PENDING)
						.build();

				Order savedOrder = orderRepository.save(order);

				productIds.forEach(productId -> {
					ProductItem productItem = ProductItem.builder()
							.productId(productId)
							.quantity(new Random().nextInt(20))
							.price(Math.random() * 7800 + 99)
							.order(savedOrder)
							.build();
					productItemRepository.save(productItem);
				});
			}
		};
	}
}
