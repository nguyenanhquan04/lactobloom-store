package com.lactobloom.service;

import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Role;
import com.lactobloom.repository.RoleRepository;
import com.lactobloom.service.interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements IRoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(int id) {
        return roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
    }

    @Override
    public Role updateRole(Role role, int id) {
        Role existingRole = roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));

        existingRole.setRoleName(role.getRoleName());

        return roleRepository.save(existingRole);
    }

    @Override
    public void deleteRole(int id) {
        roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
        roleRepository.deleteById(id);
    }
}
