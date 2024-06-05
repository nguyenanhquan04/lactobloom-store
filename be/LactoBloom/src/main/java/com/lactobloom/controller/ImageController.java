package com.lactobloom.controller;

import com.lactobloom.model.Image;
import com.lactobloom.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private IImageService imageService;

    @PostMapping("/save")
    public ResponseEntity<Image> saveImage(@RequestBody Image image) {
        return new ResponseEntity<>(imageService.saveImage(image), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Image> getAllImages() {
        return imageService.getAllImages();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Image> getImageById(@PathVariable int id) {
        return new ResponseEntity<>(imageService.getImageById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Image> updateImage(@PathVariable int id, @RequestBody Image image) {
        return new ResponseEntity<>(imageService.updateImage(image, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable int id) {
        imageService.deleteImage(id);
        return new ResponseEntity<>("Image deleted successfully!", HttpStatus.OK);
    }
}
