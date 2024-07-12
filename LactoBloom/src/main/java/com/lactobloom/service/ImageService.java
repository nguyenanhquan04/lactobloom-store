package com.lactobloom.service;

import com.lactobloom.dto.ImageDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Image;
import com.lactobloom.model.Product;
import com.lactobloom.repository.ImageRepository;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService implements IImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ImageDto saveImage(ImageDto imageDto, int productId) {
        Image image = mapToEntity(imageDto);
        Product product = productRepository.findById((int) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        image.setProduct(product);
        Image newImage = imageRepository.save(image);
        return mapToDto(newImage);
    }

    @Override
    public List<ImageDto> getAllImages() {
        List<Image> imageList = imageRepository.findAll();
        return imageList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ImageDto getImageById(int id) {
        Image image = imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
        return mapToDto(image);
    }

    @Override
    public ImageDto updateImage(ImageDto imageDto, int id, int productId) {
        Image existingImage = imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
        Product product = productRepository.findById((int) productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        existingImage.setProduct(product);
        existingImage.setImageUrl(imageDto.getImageUrl());
        return mapToDto(imageRepository.save(existingImage));
    }

    @Override
    public void deleteImage(int id) {
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
        imageRepository.deleteById(id);
    }

    @Override
    public List<ImageDto> getImagesByProductId(int productId){
        return imageRepository.findByProductProductId(productId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ImageDto mapToDto (Image image){
        ImageDto imageResponse = new ImageDto();
        imageResponse.setImageId(image.getImageId());
        imageResponse.setImageUrl(image.getImageUrl());
        return imageResponse;
    }

    private Image mapToEntity (ImageDto imageDto){
        Image image = new Image();
        image.setImageUrl(imageDto.getImageUrl());
        return image;
    }
}
