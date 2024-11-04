package net.aissy.ordermicroservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import net.aissy.ordermicroservice.model.Product;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductItem {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String productId;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    // TODO : Change to DTO
    private Order order;
    private double price;
    private int quantity;

    @Transient
    private Product product;
}
