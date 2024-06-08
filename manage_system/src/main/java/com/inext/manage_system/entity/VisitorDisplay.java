package com.inext.manage_system.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitorDisplay {

    private LocalDate date;

    private int number;

    private LocalTime startTime;

    private LocalTime endTime;

    private double studyHours;
}

