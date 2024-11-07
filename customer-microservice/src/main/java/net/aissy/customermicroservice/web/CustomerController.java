package net.aissy.customermicroservice.web;

import net.aissy.customermicroservice.entity.Customer;
import net.aissy.customermicroservice.repository.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable String id) {
        return  customerRepository.findById(id).get();
    }

    @PostMapping("/create")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateProduct(@PathVariable String id, @RequestBody Customer customer) {
        Customer existingCustomer = customerRepository.getById(id);
        existingCustomer.setFirstName(customer.getFirstName());
        existingCustomer.setLastName(customer.getLastName());
        existingCustomer.setEmail(customer.getEmail());
        return ResponseEntity.ok(customerRepository.save(existingCustomer));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        customerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
