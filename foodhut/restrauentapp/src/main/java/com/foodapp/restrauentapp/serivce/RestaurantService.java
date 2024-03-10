package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.exceptions.ProductNotFoundException;
import com.foodapp.restrauentapp.exceptions.UserAlreadyExistsException;
import com.foodapp.restrauentapp.exceptions.UserNotFoundException;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.Restaurant;
import com.foodapp.restrauentapp.model.RestaurantProduct;
import org.apache.catalina.User;

import java.util.List;

public interface RestaurantService {
    Restaurant registerRestuarant(Restaurant restaurant) throws UserAlreadyExistsException;
    Restaurant updateRestaurant(Restaurant restaurant) throws UserNotFoundException;
    Restaurant getUserDetails(String emailId) throws UserNotFoundException;
    Restaurant addProduct(String emailId, RestaurantProduct product) throws UserNotFoundException;
    void  deleteProduct(String emailId,String productId) throws  UserNotFoundException;
    RestaurantProduct updatePoduct(String emailId, RestaurantProduct updateproduct) throws UserNotFoundException, ProductNotFoundException;
    Restaurant addOrder(Order order,String emailID) throws UserNotFoundException;
    List<Order> getOrders(String emailID) throws UserNotFoundException;
    List<Restaurant> getRestaurants(String city) throws UserNotFoundException;
    Restaurant getRestaurantsById(String id) throws UserNotFoundException;
    Restaurant updateOrder(String orderID,String emailID) throws UserNotFoundException;
}
