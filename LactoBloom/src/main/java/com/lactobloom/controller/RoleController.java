package com.lactobloom.controller;

import com.lactobloom.dto.RoleDto;
import com.lactobloom.model.Role;
import com.lactobloom.service.interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private IRoleService roleService;

    @PostMapping("/save")
    public ResponseEntity<RoleDto> saveRole(@RequestBody RoleDto roleDto) {
        return new ResponseEntity<>(roleService.saveRole(roleDto), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<RoleDto> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable int id) {
        return new ResponseEntity<>(roleService.getRoleById(id), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<RoleDto> updateRole(@PathVariable int id, @RequestBody RoleDto roleDto) {
        return new ResponseEntity<>(roleService.updateRole(roleDto, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable int id) {
        roleService.deleteRole(id);
        return new ResponseEntity<>("Role deleted successfully!", HttpStatus.OK);
    }
}
