package com.foodhut.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator getRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(p->p.path("/api/auth/**").uri("http://localhost:8067/api/auth/*"))
                .route(p->p.path("/api/v1/customer/**").uri("http://localhost:8068/api/v1/customer/*"))
                .route(p->p.path("/restaurants/**").uri("http://localhost:8069/restaurants/*"))
                .route(p->p.path("/image/**").uri("http://localhost:6000/image/*"))
                .build();
    }
}
