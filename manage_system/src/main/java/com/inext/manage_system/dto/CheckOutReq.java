package com.inext.manage_system.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckOutReq {

    private LocalTime endTime;

    private int number;

    private LocalDate date;
}
