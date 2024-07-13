package com.lactobloom.controller;

import com.lactobloom.dto.ImageDto;
import com.lactobloom.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private IImageService imageService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PostMapping("/save/product/{productId}")
    public List<?> saveImage(@RequestParam("files") List<MultipartFile> files, @PathVariable int productId) {
        return imageService.saveImage(files, productId);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/all")
    public List<ImageDto> getAllImages() {
        return imageService.getAllImages();
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @GetMapping("/get/{id}")
    public ResponseEntity<ImageDto> getImageById(@PathVariable int id) {
        return new ResponseEntity<>(imageService.getImageById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @PutMapping("/update/{id}/product/{productId}")
    public ResponseEntity<ImageDto> updateImage(@PathVariable int id, @PathVariable int productId, @RequestBody ImageDto imageDto) {
        return new ResponseEntity<>(imageService.updateImage(imageDto, id, productId), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable int id) {
        imageService.deleteImage(id);
        return new ResponseEntity<>("Image deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/get/product/{productId}")
    public List<ImageDto> getImagesByProductId(@PathVariable int productId) {
        return imageService.getImagesByProductId(productId);
    }
}
