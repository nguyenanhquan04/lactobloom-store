package com.lactobloom.service.interfaces;

import com.lactobloom.model.Image;

import java.util.List;

public interface IImageService {
    Image saveImage(Image image);
    List<Image> getAllImages();
    Image getImageById(int id);
    Image updateImage(Image image, int id);
    void deleteImage(int id);
}
