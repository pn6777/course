package com.inext.manage_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseContent {
    
    private int courseNumber;

    private String name;

    private String lectureLanguage;

    private String frame;

    private String type;

    private String content;
}
