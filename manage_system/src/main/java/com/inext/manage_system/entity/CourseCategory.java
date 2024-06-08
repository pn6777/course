package com.inext.manage_system.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseCategory {

    private int id;

    private String language;

    private String frame;

    private String type;
}
