package com.inext.manage_system.dto;

import java.util.List;

import com.inext.manage_system.entity.VisitorDisplay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerchSingInRes extends MessageRes{

    private List<VisitorDisplay> visitorDisplay;
    

    public SerchSingInRes(int code, String message, List<VisitorDisplay> visitorDisplay) {
        super(code, message);
        this.visitorDisplay = visitorDisplay;
    }
}
