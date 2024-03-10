package com.example.imageapp.repository;

import com.example.imageapp.domain.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends MongoRepository<Image,String> {
    Optional<Image> findByName(String name);
    List<Image> findByMetadata_imageOf(String imageOf);

}
