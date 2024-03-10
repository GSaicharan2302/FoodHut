package com.foodapp.restrauentapp.controller;

import com.foodapp.restrauentapp.exceptions.ProductNotFoundException;
import com.foodapp.restrauentapp.exceptions.UserAlreadyExistsException;
import com.foodapp.restrauentapp.exceptions.UserNotFoundException;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.Restaurant;
import com.foodapp.restrauentapp.model.RestaurantProduct;
import com.foodapp.restrauentapp.model.UpdateOrder;
import com.foodapp.restrauentapp.serivce.RestaurantService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/restaurants")
//@CrossOrigin
public class RestaurantController {

    // http://localhost:8069/restaurants/ [base url]
    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/register")
    public ResponseEntity<?> registerRestaurant(@RequestBody Restaurant restaurant) {
        try {
            restaurant.setOrderList(new ArrayList<>());
            restaurant.setStatus("active");
            Restaurant savedCustomer = restaurantService.registerRestuarant(restaurant);
            return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>("Restaurant already exists", HttpStatus.CONFLICT);
        }
    }
    @PostMapping("/updateRestaurant")
    public ResponseEntity<?> updateRestaurant(@RequestBody Restaurant restaurant) throws UserNotFoundException{
            try{
                return new ResponseEntity<>(restaurantService.updateRestaurant(restaurant),HttpStatus.OK);
            }
            catch(UserNotFoundException userNotFoundException){
                throw new UserNotFoundException();
            }
    }
    @GetMapping("/getUser")
    public ResponseEntity<?> getUserDetails(HttpServletRequest request) {
        try {
            String userID = (String) request.getAttribute("UserID");
            Restaurant user = restaurantService.getUserDetails(userID);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getOrders")
    public ResponseEntity<?> getOrders(HttpServletRequest request) throws UserNotFoundException {
        String emailID=(String) request.getAttribute("UserID");
        return new ResponseEntity<>(restaurantService.getOrders(emailID),HttpStatus.OK);
    }
    @PostMapping("/products")
    public ResponseEntity<Restaurant> addProduct(HttpServletRequest request, @RequestBody RestaurantProduct product) {
        try {
            String userID=(String)request.getAttribute("UserID");
            Restaurant updatedRestaurant = restaurantService.addProduct(userID, product);
            return new ResponseEntity<>(updatedRestaurant, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<String> deleteProduct(HttpServletRequest request, @PathVariable String productId) {
        try {
            String emailId = request.getAttribute("UserID").toString();
            restaurantService.deleteProduct(emailId, productId);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (UserNotFoundException | NullPointerException e) {
            return new ResponseEntity<>("User not found or Product ID not provided", HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/updateproduct")
    public ResponseEntity<RestaurantProduct> updateProduct(
            HttpServletRequest request,
            @RequestBody RestaurantProduct updatedProduct
    ) throws UserNotFoundException, ProductNotFoundException {
        String userID=(String)request.getAttribute("UserID");
//        RestaurantProduct product = restaurantService.updatePoduct(userID, updatedProduct);
//        if (product != null) {
//            return new ResponseEntity<>(product, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
        return new ResponseEntity<>(restaurantService.updatePoduct(userID,updatedProduct),HttpStatus.OK);
    }
    @PostMapping ("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody Order order) throws UserNotFoundException {
            String emailID=order.getRestaurantID();
            return new ResponseEntity<>(restaurantService.addOrder(order,emailID),HttpStatus.OK);
    }
    @GetMapping("/getRestaurantByCity/{city}")
    public ResponseEntity<?> getRestaurantByCity(@PathVariable String city) throws UserNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurants(city),HttpStatus.OK);
    }
    @GetMapping("/getRestaurantById/{id}")
    public ResponseEntity<?> getRestaurantById(@PathVariable String id) throws UserNotFoundException {
        return new ResponseEntity<>(restaurantService.getRestaurantsById(id),HttpStatus.OK);
    }
    @PutMapping("/updateOrder")
    public ResponseEntity<?> updateOrder(@RequestBody UpdateOrder order) throws UserNotFoundException{
//        String emailID=(String) request.getAttribute("UserID");
        return new ResponseEntity<>(restaurantService.updateOrder(order.getOrderID(), order.getRestaurantID())
                ,HttpStatus.OK);
    }
}
