package com.suyang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.suyang.domain.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>  {
}
