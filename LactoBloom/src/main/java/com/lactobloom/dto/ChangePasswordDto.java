package com.lactobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public abstract class ChangePasswordDto {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChangePasswordRequest {
        private String password;
        private String repeatPassword;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResetPasswordRequest {
        private String password;
        private String newPassword;
    }
}
