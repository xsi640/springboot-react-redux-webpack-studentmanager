package com.suyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.suyang.domain.User;

public interface UserRepository extends JpaRepository<User, Integer>  {
}
