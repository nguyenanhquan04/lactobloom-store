package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Image;
import com.lactobloom.repository.ImageRepository;
import com.lactobloom.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    @Override
    public Image getImageById(int id) {
        return imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
    }

    @Override
    public Image updateImage(Image image, int id) {
        Image existingImage = imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));

        existingImage.setImageUrl(image.getImageUrl());
        // Update other fields as needed
        return imageRepository.save(existingImage);
    }

    @Override
    public void deleteImage(int id) {
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
        imageRepository.deleteById(id);
    }
}
