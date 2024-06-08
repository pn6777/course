package com.inext.manage_system.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum RtnCode {

    SUCCESS(200, "Sueccess!?"),
    PARAM_ERROR(400,"Param error!?"),
    MAXIMUM_REACHED(400,"Maximum reached!?"),
    DATA_DOES_NOT_EXIST(400, "Data does not exist"),
    ;

    private int code;

    private String message;
}
