package com.inext.manage_system.dto;

import java.util.List;

import com.inext.manage_system.entity.CourseCategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SerchCategoryRes extends MessageRes{
    
    private List<CourseCategory> courseCategory;

    public SerchCategoryRes(int code, String message, List<CourseCategory> courseCategory) {
        super(code, message);
        this.courseCategory = courseCategory;
    }

}
