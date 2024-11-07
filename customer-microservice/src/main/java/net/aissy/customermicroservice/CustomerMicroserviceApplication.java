package net.aissy.customermicroservice;

import net.aissy.customermicroservice.entity.Customer;
import net.aissy.customermicroservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerMicroserviceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {
            customerRepository.save(Customer.builder().firstName("Ahmed").lastName("Madoune").email("ahmed.md@gmail.com").build());
            customerRepository.save(Customer.builder().firstName("Achraf").lastName("Aissy").email("a.aissy@gmail.com").build());
            customerRepository.save(Customer.builder().firstName("Kamal").lastName("Marouane").email("kamal.mr@gmail.com").build());
            customerRepository.save(Customer.builder().firstName("Aymane").lastName("El Alami").email("ayamne.elalami@gmail.com").build());
        };
    }

}
