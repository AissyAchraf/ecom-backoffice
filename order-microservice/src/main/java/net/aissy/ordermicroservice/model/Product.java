package net.aissy.ordermicroservice.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Product {

    private String id;
    private String name;
    private double price;
    private int quantity;
}
