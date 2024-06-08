package com.inext.manage_system.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudytimeReq {

    private double studyHours;

    private  int number;

    private LocalDate date;
}
