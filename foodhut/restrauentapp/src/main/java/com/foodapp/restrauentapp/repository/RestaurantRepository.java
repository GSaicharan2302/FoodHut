package com.foodapp.restrauentapp.repository;

import com.foodapp.restrauentapp.model.Restaurant;
import com.foodapp.restrauentapp.model.RestaurantProduct;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
//    Optional<RestaurantProduct> findByEmailIdAndProductId(String emailId, String productId);
    @Query(value = "{$and:[{\"location.city\":{$eq:?0}},{\"status\":{$eq:\"active\"}}]}")
      Optional<List<Restaurant>> getRestaurantByCity(String city);

}
