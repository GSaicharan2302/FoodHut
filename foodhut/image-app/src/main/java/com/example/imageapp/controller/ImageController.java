package com.example.imageapp.controller;

import com.example.imageapp.domain.Image;
import com.example.imageapp.domain.Metadata;
import com.example.imageapp.exception.InvalidDependencyException;
import com.example.imageapp.exception.NotFoundException;
import com.example.imageapp.service.ImageService;
import com.example.imageapp.util.ImageCompressorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService  imageService;
    @GetMapping("/serve")
    public ResponseEntity<?> serve(){
        System.out.println("serve");
        Map<String,String> map = new HashMap<>();
        map.put("msg","a-ok");
        return new ResponseEntity<>( map ,HttpStatus.OK);
    }

    //do not use
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file, @RequestParam("metadata")String metadata) throws IOException {
        System.out.println("upload");
        return new ResponseEntity<>( imageService.uploadImage( file,metadata )  , HttpStatus.CREATED );
    }

    //use this one instead
    @PostMapping("/upload/one")
    public ResponseEntity<?> uploadOneImage(@RequestParam("image")MultipartFile file, @RequestParam("metadata")String metadata) throws IOException, InvalidDependencyException {
        System.out.println("upload");
        return new ResponseEntity<>( imageService.uploadOneImage( file,metadata )  , HttpStatus.CREATED );
    }

    //do not use
    @GetMapping("/download/{filename}")
    public ResponseEntity<?> downloadImage(@PathVariable("filename") String filename) throws NotFoundException {
        System.out.println("download");
        Image image = imageService.downloadImage(filename).get();

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf( image.getMetadata().getFileType() ))
                .body(ImageCompressorUtil.decompressImage( image.getImageData()   ));
    }


    //use this one
    @GetMapping("/download/imageof/{objectId}")
    public ResponseEntity<?> downloadImageOf(@PathVariable("objectId") String objectId )throws  Exception{
        Image image;
        try{
            image = imageService.findByImageOf(objectId).get(0);
        }catch (Exception e){
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf( image.getMetadata().getFileType() ))
                .body(ImageCompressorUtil.decompressImage( image.getImageData()   ));
    }

}
