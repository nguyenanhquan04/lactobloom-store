package com.lactobloom.service.interfaces;

import com.lactobloom.dto.RoleDto;

import java.util.List;

public interface IRoleService {
    RoleDto saveRole(RoleDto roleDto);
    List<RoleDto> getAllRoles();
    RoleDto getRoleById(int id);
    RoleDto updateRole(RoleDto roleDto, int id);
    void deleteRole(int id);
}
