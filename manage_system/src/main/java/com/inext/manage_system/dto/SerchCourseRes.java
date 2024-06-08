package com.inext.manage_system.dto;

import java.util.List;

import com.inext.manage_system.entity.CourseAlias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchCourseRes extends MessageRes{

    private List<CourseAlias> courseAlias;
    
    public SerchCourseRes(int code, String message, List<CourseAlias> courseAlias) {
        super(code, message);
        this.courseAlias = courseAlias;
    }

}
