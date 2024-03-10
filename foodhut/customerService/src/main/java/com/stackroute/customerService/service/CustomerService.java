package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.Customer;
import com.stackroute.customerService.domain.Item;
import com.stackroute.customerService.domain.Order;
import com.stackroute.customerService.domain.SignUpData;
import com.stackroute.customerService.exception.FavoritesAlreadyExistsException;
import com.stackroute.customerService.exception.ItemAlreadyExistsException;
import com.stackroute.customerService.exception.UserAlreadyExistsException;
import com.stackroute.customerService.exception.UserNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;


@Service

public interface CustomerService {
    Customer saveCustomer(SignUpData signUpData) throws UserAlreadyExistsException;
    Customer getCustomerDetails(String customerID) throws UserNotFoundException;
    Customer addOrderToList(String customerID, Order order) throws UserNotFoundException;
    Customer updateOrderToList(String customerID,String orderID) throws UserNotFoundException;
    List<Order> getOrders(String customerID) throws UserNotFoundException;
    Customer updateCustomerDetails(Customer updatedCustomer) throws UserNotFoundException;


}
