package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ImageDto;
import com.lactobloom.model.Image;

import java.util.List;

public interface IImageService {
    ImageDto saveImage(ImageDto imageDto, int productId);
    List<ImageDto> getAllImages();
    ImageDto getImageById(int id);
    ImageDto updateImage(ImageDto imageDto, int id, int productId);
    void deleteImage(int id);
    List<ImageDto> getImagesByProductId(int productId);
}
