package com.inext.manage_system.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchCourseReq {

    private String coruseName;

    private LocalDate startDate;

    private LocalDate endDate;
}
