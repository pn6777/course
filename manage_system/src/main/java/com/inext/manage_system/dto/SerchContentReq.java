package com.inext.manage_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchContentReq {

    private String lectureLanguage;

    private String frame;

    private String type;
}
