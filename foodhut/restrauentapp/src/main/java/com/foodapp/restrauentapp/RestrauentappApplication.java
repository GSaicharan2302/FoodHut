package com.foodapp.restrauentapp;

import com.foodapp.restrauentapp.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
@EnableFeignClients
@SpringBootApplication
public class RestrauentappApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestrauentappApplication.class, args);
	}
	@Bean
	public FilterRegistrationBean getFilterRegistrationBean(){
		FilterRegistrationBean filterRegistrationBean=new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/restaurants/getUser",
				"/restaurants/products","/restaurants/updateproduct","/restaurants/products/{productId}","/restaurants/getOrders");
		return filterRegistrationBean;
	}
}
