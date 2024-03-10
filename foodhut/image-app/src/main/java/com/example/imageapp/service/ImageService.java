package com.example.imageapp.service;

import com.example.imageapp.domain.Image;
import com.example.imageapp.domain.Metadata;
import com.example.imageapp.exception.InvalidDependencyException;
import com.example.imageapp.exception.NotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageService {

    public boolean uploadImage(MultipartFile file, String metadata) throws IOException;
    public boolean uploadOneImage(MultipartFile file, String metadata) throws IOException, InvalidDependencyException;

    public Optional<Image> downloadImage(String name) throws NotFoundException;

    public List<Image> findByImageOf(String imageOf);
}
