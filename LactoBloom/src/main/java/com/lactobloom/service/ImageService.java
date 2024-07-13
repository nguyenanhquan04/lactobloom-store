package com.lactobloom.service;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.lactobloom.dto.ImageDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Image;
import com.lactobloom.model.Product;
import com.lactobloom.repository.ImageRepository;
import com.lactobloom.repository.ProductRepository;
import com.lactobloom.service.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService implements IImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<?> saveImage(List<MultipartFile> files, int productId) {
        List<ImageDto> imageUrls = new ArrayList<>();
        try {
            Product product = productRepository.findById((long) productId).orElseThrow(() ->
                    new ResourceNotFoundException("Product", "Id", productId));
            for (MultipartFile multipartFile : files) {
                String fileName = multipartFile.getOriginalFilename();
                File file = this.convertToFile(multipartFile, fileName);
                String URL = this.uploadFile(file, fileName, multipartFile.getContentType());
                file.delete();
                Image image = new Image();
                image.setProduct(product);
                image.setImageUrl(URL);
                imageUrls.add(mapToDto(imageRepository.save(image)));
            }
            return imageUrls;
        } catch (Exception e) {
            return Collections.singletonList("Image couldn't upload, Something went wrong");
        }
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
        Product product = productRepository.findById((long) productId).orElseThrow(() ->
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

    private String uploadFile(File file, String fileName, String contentType) throws IOException {
        BlobId blobId = BlobId.of("lactobloom-68aa5.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();
        InputStream inputStream = ImageService.class.getClassLoader().getResourceAsStream("lactobloom-firebase-adminsdk.json");
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/lactobloom-68aa5.appspot.com/o/%s?alt=media";
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private ImageDto mapToDto (Image image){
        ImageDto imageResponse = new ImageDto();
        imageResponse.setImageId(image.getImageId());
        imageResponse.setImageUrl(image.getImageUrl());
        return imageResponse;
    }
}
