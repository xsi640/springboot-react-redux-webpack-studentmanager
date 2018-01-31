package com.suyang.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.suyang.domain.User;
import com.suyang.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/api/user/{id}", method = RequestMethod.GET)
	public User findOne(@PathVariable("id") final int id) {
		return userRepository.findOne(id);
	}

	@RequestMapping(value = "/api/user", method = RequestMethod.GET)
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@RequestMapping(value = "/api/user", method = RequestMethod.POST)
	public User create(String name, int age, Date birthday) {
		User student = new User();
		student.setName(name);
		student.setAge(age);
		student.setBirthday(birthday);
		return userRepository.save(student);
	}

	@RequestMapping(value = "/api/user", method = RequestMethod.PUT)
	public User modify(int id, String name, int age, Date birthday) {
		User student = userRepository.findOne(id); 
		student.setName(name);
		student.setAge(age);
		student.setBirthday(birthday);
		return userRepository.save(student);
	}

	@RequestMapping(value = "/api/user/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		userRepository.delete(id);
	}
}
