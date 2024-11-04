package net.aissy.inventorymicroservice;

import net.aissy.inventorymicroservice.entity.Product;
import net.aissy.inventorymicroservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryMicroserviceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder().id("P01").name("Computer").price(22999).quantity(5).build());
            productRepository.save(Product.builder().id("P02").name("Printer").price(499).quantity(3).build());
            productRepository.save(Product.builder().id("P03").name("Smart Phone").price(12399).quantity(10).build());
        };
    }

}
