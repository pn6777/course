package com.inext.manage_system.dto;

import java.util.List;

import com.inext.manage_system.entity.CourseSchedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchScheduleRes extends MessageRes{

    private List<CourseSchedule> courseSchedule;

    public SerchScheduleRes(int code, String message, List<CourseSchedule> courseSchedule) {
        super(code, message);
        this.courseSchedule = courseSchedule;
    }
}
