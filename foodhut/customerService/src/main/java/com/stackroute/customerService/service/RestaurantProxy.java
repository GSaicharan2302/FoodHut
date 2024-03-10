package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.OrderDTO;
import com.stackroute.customerService.domain.UpdateOrderDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="restrauent-service",url = "localhost:8069/restaurants")
public interface RestaurantProxy {
@PostMapping("/addOrder")
    ResponseEntity<?> sendOrderToRestaurant(@RequestBody OrderDTO orderDTO);
    @PutMapping("/updateOrder")
    ResponseEntity<?> updateOrderToRestaurant(@RequestBody UpdateOrderDTO updateOrderDTO);
}


