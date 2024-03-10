package com.example.imageapp.service;


import com.example.imageapp.domain.Image;
import com.example.imageapp.domain.Metadata;
import com.example.imageapp.exception.InvalidDependencyException;
import com.example.imageapp.exception.NotFoundException;
import com.example.imageapp.repository.ImageRepository;
import com.example.imageapp.util.ImageCompressorUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONFilter;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService{

    @Autowired
    private ImageRepository repository;

    @Override
    public boolean uploadImage(MultipartFile file, String metadata) throws IOException {
        final Image newImage = new Image();
        Metadata metadataObj = new ObjectMapper().readValue( metadata, Metadata.class );
        if(metadataObj.getFileType().isEmpty()){
            metadataObj.setFileType( file.getContentType() );
        }
        newImage.setName( file.getOriginalFilename() );
        newImage.setMetadata( metadataObj );
        newImage.setImageData( ImageCompressorUtil.compressImage( file.getBytes() )  );

        Optional<Image> imageOptional = Optional.of(repository.save(newImage));
        return imageOptional.isPresent();
    }

    @Override
    public boolean uploadOneImage(MultipartFile file, String metadata) throws IOException, InvalidDependencyException {
        final Image newImage = new Image();
        Metadata metadataObj = new ObjectMapper().readValue( metadata, Metadata.class );
        if(metadataObj.getFileType().isEmpty()){
            metadataObj.setFileType( file.getContentType() );
        }
        List<Image> images = repository.findByMetadata_imageOf( metadataObj.getImageOf() );
        if(!images.isEmpty()){
            newImage.setId( images.get(0).getId() );
        }

        newImage.setName( file.getOriginalFilename() );
        newImage.setMetadata( metadataObj );
        newImage.setImageData( ImageCompressorUtil.compressImage( file.getBytes() )  );

        Optional<Image> imageOptional = Optional.of(repository.save(newImage));
        return imageOptional.isPresent();

    }

    @Override
    public Optional<Image> downloadImage(String name) throws NotFoundException {
        Optional<Image> imageOptional = repository.findByName( name );

        if(imageOptional.isEmpty()){
            throw new NotFoundException();
        }
        return imageOptional;
    }

    @Override
    public List<Image> findByImageOf(String imageOf) {
        return repository.findByMetadata_imageOf(imageOf);
    }
}
