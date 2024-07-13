package com.lactobloom.service.interfaces;

import com.lactobloom.dto.ImageDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImageService {
    List<?> saveImage(List<MultipartFile> files, int productId);
    List<ImageDto> getAllImages();
    ImageDto getImageById(int id);
    ImageDto updateImage(ImageDto imageDto, int id, int productId);
    void deleteImage(int id);
    List<ImageDto> getImagesByProductId(int productId);
}
