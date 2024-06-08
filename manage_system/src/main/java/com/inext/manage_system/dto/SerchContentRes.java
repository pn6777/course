package com.inext.manage_system.dto;

import java.util.List;

import com.inext.manage_system.entity.CourseContent;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchContentRes extends MessageRes{

    private List<CourseContent> courseContent;

    public SerchContentRes(int code, String message, List<CourseContent> courseContent) {
        super(code, message);
        this.courseContent = courseContent;
    }
}
