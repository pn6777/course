package com.inext.manage_system.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseAlias {
    
    private int courseId;

    private String courseName;

    private int registr;

    private LocalDate startDate;

    private LocalDate endDate;

    private String site;
    
}
