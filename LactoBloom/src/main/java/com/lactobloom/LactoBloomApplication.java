package com.lactobloom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({ "com.lactobloom.controller","com.lactobloom.service","com.lactobloom.config"})
@EnableJpaRepositories(basePackages = "com.lactobloom.repository")
@EntityScan(basePackages = "com.lactobloom.model")
public class LactoBloomApplication {
    public static void main(String[] args) {
        SpringApplication.run(LactoBloomApplication.class, args);
    }
}