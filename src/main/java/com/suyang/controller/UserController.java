package com.suyang.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	public Page<User> findAll(@RequestParam(name = "pageIndex", required = false, defaultValue = "1") int pageIndex,
			@RequestParam(name = "pageSize", required = false, defaultValue = "10") int pageSize) {
		Pageable pageable = new PageRequest(pageIndex - 1, pageSize);
		return userRepository.findAll(pageable);
	}

	@RequestMapping(value = "/api/user", method = RequestMethod.POST)
	public User create(String name, int sex, Date birthday, String address) {
		User user = new User();
		user.setName(name);
		user.setSex(sex);
		user.setBirthday(birthday);
		user.setAddress(address);
		return userRepository.save(user);
	}

	@RequestMapping(value = "/api/user", method = RequestMethod.PUT)
	public User modify(int id, String name, int sex, Date birthday, String address) {
		User user = userRepository.findOne(id);
		user.setName(name);
		user.setSex(sex);
		user.setBirthday(birthday);
		user.setAddress(address);
		return userRepository.save(user);
	}

	@RequestMapping(value = "/api/user/{id}", method = RequestMethod.DELETE)
	public int delete(@PathVariable("id") int id) {
		userRepository.delete(id);
		return id;
	}
}
