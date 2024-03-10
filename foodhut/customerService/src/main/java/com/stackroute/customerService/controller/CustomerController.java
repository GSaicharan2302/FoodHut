package com.stackroute.customerService.controller;


import com.stackroute.customerService.domain.Item;
import com.stackroute.customerService.domain.Order;

import com.stackroute.customerService.domain.Customer;

import com.stackroute.customerService.domain.SignUpData;
import com.stackroute.customerService.exception.FavoritesAlreadyExistsException;
import com.stackroute.customerService.exception.UserAlreadyExistsException;
import com.stackroute.customerService.exception.UserNotFoundException;
import com.stackroute.customerService.service.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/customer")
//@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/saveCustomer")
    public ResponseEntity<?> saveCustomer(@RequestBody SignUpData signUpData) {
        System.out.println(signUpData);
        try {
            Customer savedCustomer = customerService.saveCustomer(signUpData);
            return new ResponseEntity<>(savedCustomer, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

    }
    @PostMapping("/uploadImage/{name}")
    public String uploadImage(@RequestPart("image") MultipartFile file,@PathVariable("name") String name){
        try {
            // Define the path where you want to store the uploaded images
            String uploadDir = "F:\\images\\user\\";

            // Create the upload directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the file to the specified directory
            String filePath = uploadDir + name;
            file.transferTo(new File(filePath));

            return "Image uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload image.";
        }

    }
    @GetMapping(value = "/userImage/{emailId}",produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getUserImage(@PathVariable String emailId) throws IOException {
        String localPath=System.getProperty("user.dir");
        Path path= Paths.get(localPath+"\\images\\user"+emailId+".jpg");
        byte[] media= Files.readAllBytes(path);
        ResponseEntity<byte[]> responseEntity=new ResponseEntity<>(media,HttpStatus.OK);
        return responseEntity;
    }
    @GetMapping("/getUserDetails")
    public ResponseEntity<?> getCustomerDetails(HttpServletRequest request) throws UserNotFoundException {

        String userID=(String) request.getAttribute("UserID");
        System.out.println("User ID is "+userID);
        return new ResponseEntity<>(customerService.getCustomerDetails(userID),HttpStatus.OK);
    }

    @PostMapping("/addOrder")
    public ResponseEntity<?> addOrder(@RequestBody Order order,HttpServletRequest request) throws UserNotFoundException {
        String customerID=(String) request.getAttribute("UserID");
        order.setOrderDate(new Date());
        order.setStatus("nodelivered");
        int qty=0;
        for (int i=0;i<order.getItemList().size();i++){
            qty+=order.getItemList().get(i).getQuantity();
        }
        order.setNoOfItems(qty);
        return new ResponseEntity<>(customerService.addOrderToList(customerID,order),HttpStatus.OK);
    }
    @PutMapping("/updateOrder")
    public ResponseEntity<?> updateOrder(@RequestBody String orderID,HttpServletRequest request) throws UserNotFoundException{
        String customerID=(String) request.getAttribute("UserID");
        System.out.println(customerID);
        return new ResponseEntity<>(customerService.updateOrderToList(customerID,orderID),HttpStatus.OK);
    }
    @GetMapping("/getOrders")
    public ResponseEntity<?> getOrders(HttpServletRequest request) throws UserNotFoundException {
        String customerID=(String) request.getAttribute("UserID");
        return new ResponseEntity<>(customerService.getOrders(customerID),HttpStatus.OK);
    }
    @PutMapping("/updatecustomer")
    public ResponseEntity<?> updatecustomer(@RequestBody Customer signUpData) throws UserNotFoundException {
//        String customerID=(String) request.getAttribute("UserID");
        return new ResponseEntity<>(customerService.updateCustomerDetails(signUpData),HttpStatus.OK);
    }



}
