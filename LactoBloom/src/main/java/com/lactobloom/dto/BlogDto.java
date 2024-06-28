package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private int blogId;
    private String imageUrl;
    private String blogCategoryName;
    private String title;
    private String shortDescription;
    private String content;
    private LocalDateTime publishDate;
}
