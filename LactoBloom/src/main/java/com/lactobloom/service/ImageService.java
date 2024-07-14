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
import java.util.UUID;
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
            Product product = productRepository.findById(productId).orElseThrow(() ->
                    new ResourceNotFoundException("Product", "Id", productId));
            for (MultipartFile multipartFile : files) {
                String fileName = multipartFile.getOriginalFilename();
                fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));
                File file = this.convertToFile(multipartFile, fileName);
                String url = this.uploadFile(file, fileName, multipartFile.getContentType());
                file.delete();
                Image image = new Image();
                image.setProduct(product);
                image.setImageUrl(url);
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
        Product product = productRepository.findById(productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "Id", productId));
        existingImage.setProduct(product);
        existingImage.setImageUrl(imageDto.getImageUrl());
        return mapToDto(imageRepository.save(existingImage));
    }

    @Override
    public void deleteImage(int id) {
        Image image = imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Image", "Id", id));
        imageRepository.deleteById(id);
        if (isFirebaseUrl(image.getImageUrl())) {
            try {
                String fileName = image.getImageUrl().substring(image.getImageUrl().lastIndexOf("/") + 1, image.getImageUrl().indexOf("?"));
                deleteFile(fileName);
            } catch (IOException e) {
                throw new RuntimeException("Failed to delete file from Firebase", e);
            }
        }
    }

    @Override
    public List<ImageDto> getImagesByProductId(int productId){
        return imageRepository.findByProductProductId(productId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public String uploadFile(File file, String fileName, String contentType) throws IOException {
        BlobId blobId = BlobId.of("lactobloom1.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build();
        InputStream inputStream = ImageService.class.getClassLoader().getResourceAsStream("lactobloom-firebase-adminsdk.json");
        assert inputStream != null;
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        String downloadUrl = "https://firebasestorage.googleapis.com/v0/b/lactobloom1.appspot.com/o/%s?alt=media";
        return String.format(downloadUrl, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    public void deleteFile(String fileName) throws IOException {
        BlobId blobId = BlobId.of("lactobloom1.appspot.com", fileName);
        InputStream inputStream = ImageService.class.getClassLoader().getResourceAsStream("lactobloom-firebase-adminsdk.json");
        assert inputStream != null;
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        boolean deleted = storage.delete(blobId);
        if (!deleted) {
            throw new ResourceNotFoundException("File", "FileName", fileName);
        }
    }

    public File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    public String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public boolean isFirebaseUrl(String url) {
        return url != null && url.contains("firebasestorage.googleapis.com");
    }

    private ImageDto mapToDto (Image image){
        ImageDto imageResponse = new ImageDto();
        imageResponse.setImageId(image.getImageId());
        imageResponse.setImageUrl(image.getImageUrl());
        return imageResponse;
    }
}
