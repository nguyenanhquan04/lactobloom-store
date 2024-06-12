package com.lactobloom.service;

import com.lactobloom.dto.RoleDto;
import com.lactobloom.exception.ResourceNotFoundException;
import com.lactobloom.model.Role;
import com.lactobloom.repository.RoleRepository;
import com.lactobloom.service.interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService implements IRoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public RoleDto saveRole(RoleDto roleDto) {
        Role role = mapToEntity(roleDto);
        return mapToDto(roleRepository.save(role));
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List<Role> roleList = roleRepository.findAll();
        return roleList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public RoleDto getRoleById(int id) {
        Role role = roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
        return mapToDto(role);
    }

    @Override
    public RoleDto updateRole(RoleDto roleDto, int id) {
        Role existingRole = roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
        existingRole.setRoleName(roleDto.getRoleName());
        return mapToDto(roleRepository.save(existingRole));
    }

    @Override
    public void deleteRole(int id) {
        roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
        roleRepository.deleteById(id);
    }

    private RoleDto mapToDto (Role role){
        RoleDto roleResponse = new RoleDto();
        roleResponse.setRoleId(role.getRoleId());
        roleResponse.setRoleName(role.getRoleName());
        return roleResponse;
    }

    private Role mapToEntity(RoleDto roleDto){
        Role role = new Role();
        role.setRoleName(roleDto.getRoleName());
        return role;
    }
}
