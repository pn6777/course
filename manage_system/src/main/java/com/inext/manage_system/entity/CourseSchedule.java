package com.inext.manage_system.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseSchedule {

    private int courseId;

    private int number;

    private LocalDate date;

    private double teachingHours;

    private String lectureLanguage;

    private String level;

    private String title;
}
