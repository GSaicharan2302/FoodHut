package com.stackroute.customerService.service;

import com.stackroute.customerService.domain.*;
import com.stackroute.customerService.exception.FavoritesAlreadyExistsException;
import com.stackroute.customerService.exception.ItemAlreadyExistsException;
import com.stackroute.customerService.exception.UserAlreadyExistsException;
import com.stackroute.customerService.exception.UserNotFoundException;
import com.stackroute.customerService.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    private LoginProxy loginProxy;
    private RestaurantProxy restaurantProxy;
    @Autowired
    CustomerServiceImpl(CustomerRepository customerRepository,LoginProxy loginProxy,RestaurantProxy restaurantProxy){
        this.customerRepository=customerRepository;
        this.loginProxy=loginProxy;
        this.restaurantProxy=restaurantProxy;
    }
    @Override
    public Customer saveCustomer(SignUpData signUpData) throws UserAlreadyExistsException {

        Customer customer=new Customer(signUpData.getEmailId(), signUpData.getUsername(), signUpData.getAddress(),new ArrayList<>(),signUpData.getContactNo(),new ArrayList<>(),new ArrayList<>(),new ArrayList<>(),signUpData.getAddress());
        LoginDTO loginDTO=new LoginDTO(signUpData.getEmailId(), signUpData.getPassword(), "ROLE_CUSTOMER","ACTIVE");
        System.out.println(loginDTO);
        ResponseEntity temp=loginProxy.sendLoginDto(loginDTO);


        try{
            return customerRepository.insert(customer);
        }
        catch(DuplicateKeyException duplicateKeyException){
            throw new UserAlreadyExistsException();
        }
    }

    @Override
    public Customer getCustomerDetails(String customerID) throws UserNotFoundException {
        if(customerRepository.findById(customerID).isPresent()){
            return customerRepository.findById(customerID).get();
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Customer addOrderToList(String customerID, Order order) throws UserNotFoundException {
        double total=0;
        if (customerRepository.findById(customerID).isPresent()){
            Customer customer=customerRepository.findById(customerID).get();
            CustomerDTO customerDTO=new CustomerDTO();
            customerDTO.setCustomerName(customer.getUsername());
            customerDTO.setEmailId(customer.getEmailId());
            customerDTO.setAddress(customer.getAddress());
            customerDTO.setDeliveryAddress(customer.getDeliveryAddress());
            customerDTO.setPhoneNo(customer.getContactno());
            List<ItemDTO> itemDTOList=new ArrayList<>();
            for(int i=0;i<order.getItemList().size();i++){
                itemDTOList.add(new ItemDTO(order.getItemList().get(i).getItemName(),order.getItemList().get(i).getQuantity()));
                total+=order.getItemList().get(i).getPrice()*order.getItemList().get(i).getQuantity();
            }
            System.out.println(total);
            order.setTotal(total);
            OrderDTO orderDTO=new OrderDTO();
            orderDTO.setOrderID(order.getOrderID());
            orderDTO.setOrderDate(order.getOrderDate());
            orderDTO.setCustomer(customerDTO);
            orderDTO.setRestaurantID(order.getRestaurant());
            orderDTO.setItemList(itemDTOList);
            orderDTO.setNoOfItems(order.getNoOfItems());
            orderDTO.setTotal(order.getTotal());
            orderDTO.setStatus("nodelivered");
            System.out.println(orderDTO);
            ResponseEntity<?> resp=restaurantProxy.sendOrderToRestaurant(orderDTO);
            List<Order> orderList=customer.getOrderList();
            orderList.add(order);
            customer.setOrderList(orderList);
            customer.setCart(new ArrayList<>());
            return customerRepository.save(customer);
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Customer updateOrderToList(String customerID, String orderID) throws UserNotFoundException {
        double total=0;
        if(customerRepository.findById(customerID).isPresent()){
            Customer tempCustomer=customerRepository.findById(customerID).get();
            List<Order> orderList=tempCustomer.getOrderList();
            Order tempOrder=orderList.stream().filter(p->p.getOrderID().equals(orderID))
                            .findFirst().get();
            orderList.remove(tempOrder);
            tempOrder.setStatus("delivered");
            orderList.add(tempOrder);
            tempCustomer.setOrderList(orderList);
            UpdateOrderDTO updateOrderDTO=new UpdateOrderDTO(orderID, tempOrder.getRestaurant());
            ResponseEntity resp=restaurantProxy.updateOrderToRestaurant(updateOrderDTO);
//            tempCustomer.setOrderList(orderList);
//            List<ItemDTO> itemDTOList=new ArrayList<>();
//            for (int i=0;i< tempOrder.getItemList().size();i++){
//                itemDTOList.add(new ItemDTO(tempOrder.getItemList().get(i).getItemName(),
//                        tempOrder.getItemList().get(i).getQuantity()));
//                total+=tempOrder.getItemList().get(i).getQuantity()*tempOrder.getItemList().get(i).getPrice();
//            }
//            CustomerDTO customerDTO=new CustomerDTO(tempCustomer.getUsername(),tempCustomer.getAddress(),tempCustomer.getContactno()
//                                                        ,tempCustomer.getEmailId(),tempCustomer.getDeliveryAddress());
//            OrderDTO orderDTO=new OrderDTO(tempOrder.getOrderID(), tempOrder.getRestaurant(), tempOrder.getOrderDate()
//                    ,customerDTO, tempOrder.getNoOfItems(), itemDTOList, tempOrder.getTotal());

            return customerRepository.save(tempCustomer);
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Customer updateCustomerDetails(Customer updatedCustomer) throws UserNotFoundException {
        if (customerRepository.findById(updatedCustomer.getEmailId()).isPresent()) {
            Customer existingCustomer = customerRepository.findById(updatedCustomer.getEmailId()).get();

            if (updatedCustomer.getUsername() != null) {
                existingCustomer.setUsername(updatedCustomer.getUsername());
            }
            if (updatedCustomer.getAddress() != null) {
                existingCustomer.setAddress(updatedCustomer.getAddress());
            }
            if (updatedCustomer.getContactno() != null) {
                existingCustomer.setContactno(updatedCustomer.getContactno());
            }
            if (updatedCustomer.getEmailId() != null) {
                existingCustomer.setEmailId(updatedCustomer.getEmailId());
            }
            existingCustomer.setFavourites(updatedCustomer.getFavourites());
            existingCustomer.setFavouriteProducts(updatedCustomer.getFavouriteProducts());
            existingCustomer.setCart(updatedCustomer.getCart());
            existingCustomer.setDeliveryAddress(updatedCustomer.getDeliveryAddress());
            // Save the updated customer details
            return customerRepository.save(existingCustomer);
        } else {
            throw new UserNotFoundException();
        }
    }





    @Override
    public List<Order> getOrders(String customerID) throws UserNotFoundException {
        if (customerRepository.findById(customerID).isPresent()){
            return customerRepository.findById(customerID).get().getOrderList();
        }
        else {
            throw new UserNotFoundException();
        }
    }
}
