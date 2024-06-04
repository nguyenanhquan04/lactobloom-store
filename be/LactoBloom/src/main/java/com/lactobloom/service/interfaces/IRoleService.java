package com.lactobloom.service.interfaces;

import com.lactobloom.model.Role;

import java.util.List;

public interface IRoleService {
    Role saveRole(Role role);
    List<Role> getAllRoles();
    Role getRoleById(int id);
    Role updateRole(Role role, int id);
    void deleteRole(int id);
}
