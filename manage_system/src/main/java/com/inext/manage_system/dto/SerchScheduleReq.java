package com.inext.manage_system.dto;

import java.time.YearMonth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchScheduleReq {

    private YearMonth month;

    private int courseId;
}
