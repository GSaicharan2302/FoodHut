package com.foodapp.restrauentapp.serivce;

import com.foodapp.restrauentapp.exceptions.ProductNotFoundException;
import com.foodapp.restrauentapp.exceptions.UserAlreadyExistsException;
import com.foodapp.restrauentapp.exceptions.UserNotFoundException;
import com.foodapp.restrauentapp.model.LoginDTO;
import com.foodapp.restrauentapp.model.Order;
import com.foodapp.restrauentapp.model.Restaurant;
import com.foodapp.restrauentapp.model.RestaurantProduct;
import com.foodapp.restrauentapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private  LoginProxy loginProxy;
    @Override
    public Restaurant registerRestuarant(Restaurant restaurant) throws UserAlreadyExistsException {
        Optional<Restaurant> existingRestaurant = restaurantRepository.findById(restaurant.getEmailId());
        if (existingRestaurant.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        else {
            LoginDTO loginDTO=new LoginDTO(restaurant.getEmailId(),restaurant.getPassword(),"Restaurant");
            ResponseEntity temp=loginProxy.sendLoginDto(loginDTO);
            return restaurantRepository.insert(restaurant);

        }
    }

    @Override
    public Restaurant updateRestaurant(Restaurant restaurant) throws UserNotFoundException {
        if(restaurantRepository.findById(restaurant.getEmailId()).isPresent()){
            return restaurantRepository.save(restaurant);
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Restaurant getUserDetails(String emailId) throws UserNotFoundException {
        Optional<Restaurant> optional = restaurantRepository.findById(emailId);
        if (optional.isEmpty()) {
            throw new UserNotFoundException();
        } else {
            return optional.get();
        }
    }


    @Override
    public Restaurant addProduct(String emailId, RestaurantProduct product) throws UserNotFoundException{
        Restaurant restaurant = restaurantRepository.findById(emailId).orElse(null);
        if(restaurant !=null){
            List<RestaurantProduct> productList = restaurant.getListofItems();
            productList.add(product);
            restaurant.setListofItems(productList);
            return restaurantRepository.save(restaurant);
        }
        else {
            return null;
        }

    }

    @Override
    public void deleteProduct(String emailId, String productId) throws UserNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(emailId).orElse(null);
        if (restaurant == null) throw new UserNotFoundException();
        else {
            restaurant.getListofItems().remove( productId);
            restaurantRepository.insert(restaurant);
        }
    }

    @Override
    public RestaurantProduct updatePoduct(String emailId, RestaurantProduct updateProduct) throws UserNotFoundException, ProductNotFoundException {
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(emailId);
        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();
            RestaurantProduct productToUpdate = restaurant.getListofItems().stream()
                    .filter(product -> product.getProductId().equals(updateProduct.getProductId()))
                    .findFirst()
                    .orElse(null);
            if (productToUpdate != null) {

                productToUpdate.setDescription(updateProduct.getDescription());
                productToUpdate.setCuisineType(updateProduct.getCuisineType());
                productToUpdate.setProductname(updateProduct.getProductname());
                productToUpdate.setPrice(updateProduct.getPrice());

                restaurantRepository.save(restaurant);
                return updateProduct;
            }
            else {
                throw new ProductNotFoundException();
            }
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Restaurant addOrder(Order order, String emailID) throws UserNotFoundException {
        if(restaurantRepository.findById(emailID).isPresent()){
            Restaurant temp=restaurantRepository.findById(emailID).get();
            List<Order> orderList=temp.getOrderList();
            orderList.add(order);
            temp.setOrderList(orderList);
            System.out.println(temp);
            return restaurantRepository.save(temp);
        }
        else{
            throw new UserNotFoundException();
        }
    }

    @Override
    public List<Order> getOrders(String emailID) throws UserNotFoundException {
        if(restaurantRepository.findById(emailID).isPresent()){
            return restaurantRepository.findById(emailID).get().getOrderList();
        }
        else {
            throw new UserNotFoundException();
        }
    }

    public List<Restaurant> getRestaurants(String city) throws UserNotFoundException{
        if(restaurantRepository.getRestaurantByCity(city).isPresent()){
            return restaurantRepository.getRestaurantByCity(city).get();
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Restaurant getRestaurantsById(String id) throws UserNotFoundException {
        if(restaurantRepository.findById(id).isPresent()){
            return restaurantRepository.findById(id).get();
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Restaurant updateOrder(String orderID, String emailID) throws UserNotFoundException {
        if (restaurantRepository.findById(emailID).isPresent()){
           Restaurant restaurant=restaurantRepository.findById(emailID).get();
            System.out.println(orderID);
           Order order=restaurant.getOrderList().stream().filter(p->p.getOrderID().equals(orderID))
                        .findFirst().get();
           List<Order> orderList=restaurant.getOrderList();
           orderList.remove(order);
           order.setStatus("delivered");
           orderList.add(order);
           restaurant.setOrderList(orderList);
           return restaurantRepository.save(restaurant);
        }
        else {
            throw new UserNotFoundException();
        }
    }


}
