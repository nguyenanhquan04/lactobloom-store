package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private int userId;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private int point;
}
