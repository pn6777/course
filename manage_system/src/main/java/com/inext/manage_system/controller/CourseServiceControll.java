package com.inext.manage_system.controller;


import java.time.LocalDate;
import java.time.YearMonth;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.inext.manage_system.dto.CheckOutReq;
import com.inext.manage_system.dto.MessageRes;
import com.inext.manage_system.dto.SerchCategoryRes;
import com.inext.manage_system.dto.SerchContentReq;
import com.inext.manage_system.dto.SerchContentRes;
import com.inext.manage_system.dto.SerchCourseReq;
import com.inext.manage_system.dto.SerchCourseRes;
import com.inext.manage_system.dto.SerchScheduleReq;
import com.inext.manage_system.dto.SerchScheduleRes;
import com.inext.manage_system.dto.SerchSingInRes;
import com.inext.manage_system.dto.StudytimeReq;
import com.inext.manage_system.dto.TakeOutReq;
import com.inext.manage_system.dto.UpdateRegistr;
import com.inext.manage_system.entity.CourseAlias;
import com.inext.manage_system.entity.CourseContent;
import com.inext.manage_system.entity.CourseSchedule;
import com.inext.manage_system.entity.VisitorDisplay;
import com.inext.manage_system.service.ifs.CourseService;

@Controller
public class CourseServiceControll {

    @Autowired
    private CourseService courseService;

    // page1
    @GetMapping(value = "/course/visitorSchedule")
    public String visitorSchedule(){
        return "/client/ClassSchedule";
    }

    //page2
    @GetMapping(value="/course/visitorCourse")
    public String visitorCourse(){
        return "/client/CourseApplication";
    }

    //page3
    @GetMapping(value="/course/checkInPage")
    public String checkInPage(){
        return "/client/CourseAttendanceRecord";
    }

    //page4
    @GetMapping(value = "/course/managerSchedule")
    public String managerSchedule(){
        return "/manager/courseSchedule";
    }、

    //page5
    @GetMapping(value = "/course/managerScheduleEdit")
    public String managerScheduleEdit(){
        return "/manager/CourseScheduleEdit";
    }

    //page6
    @GetMapping(value = "/course/managerCourseDetailList")
    public String managerCourseDetailList(){
        return "/manager/CourseDetailList";
    }

    //page7
    @GetMapping(value = "/course/managerCourseDetailEdit")
    public String managerCourseDetailEdit(){
        return "/manager/CourseDetailEdit";
    }

    //page8
    @GetMapping(value = "/course/managerCourseList")
    public String managerCourseList(){
        return "/manager/CourseList";
    }

    //page9
    @GetMapping(value = "/course/managerCourseEdit")
    public String managerCourseEdit(){
        return "/manager/CourseEdit";
    }

    // 創建課程或是更新課程內容
    @PostMapping(value = "/course/createOrUpdateCourse")
    @ResponseBody
    public MessageRes createOrUpdateCourse(@RequestBody CourseAlias courseAlias){
        return courseService.createOrUpdateCourse(courseAlias);
    }
    
    // 以月份搜尋範圍內的值
    @PostMapping(value = "/course/serchCourse")
    @ResponseBody
    public SerchCourseRes serchCourse(@RequestBody SerchCourseReq courseReq) {
        SerchCourseRes res = courseService.serchCourse(courseReq.getCoruseName(), courseReq.getStartDate(), courseReq.getEndDate());
        return res;
    }

    // 創建課程資訊或是更新課程資訊
    @PostMapping(value = "/course/createOrUpdateContent")
    @ResponseBody
    public MessageRes createOrUpdateContent(@RequestBody CourseContent courseContent) {
        return courseService.createOrUpdateContent(courseContent);
    }
    

    //將 category 內的資料全取出來
    @GetMapping(value = "/course/serchCategory")
    @ResponseBody
    public SerchCategoryRes serchCategory() {
        return courseService.serchCategory();
    }
    
    //將符合搜尋條件的 content 資料取出
    @PostMapping(value = "/course/serchContent")
    @ResponseBody
    public SerchContentRes serchContent(@RequestBody SerchContentReq contentReq) {
        return courseService.serchContent(contentReq.getLectureLanguage(), contentReq.getFrame(), contentReq.getType());
    }

    //創建或更新課程
    @PostMapping(value = "/course/createOrUpdateSchedule")
    @ResponseBody
    public MessageRes createOrUpdateSchedule(@RequestBody CourseSchedule courseSchedule) {
        return courseService.createOrUpdateSchedule(courseSchedule);
    }

    //搜尋課程的行程表
    @PostMapping(value = "/course/serchSchedule")
    @ResponseBody
    public SerchScheduleRes serchSchedule(@RequestBody SerchScheduleReq scheduleReq) {
        return courseService.serchSchedule(scheduleReq.getMonth(), scheduleReq.getCourseId());
    }

    //創建當日簽到表單，並寫入簽到時間
    @PostMapping(value = "/course/checkIn")
    @ResponseBody
    public MessageRes checkIn(@RequestBody VisitorDisplay visitorDisplay) {
        return courseService.checkIn(visitorDisplay);
    }

    //將簽退時間寫入表單內
    @PostMapping(value = "/course/checkOut")
    @ResponseBody
    public MessageRes checkOut(@RequestBody CheckOutReq checkOutReq) {
        return courseService.checkOut(checkOutReq.getEndTime(), checkOutReq.getNumber(), checkOutReq.getDate());
    }

    //更新學習時間
    @PostMapping(value = "/course/studytime")
    @ResponseBody
    public MessageRes studytime(@RequestBody StudytimeReq studytimeReq) {
        return courseService.studytime(studytimeReq.getStudyHours(), studytimeReq.getNumber(), studytimeReq.getDate());
    }
    
    //以編號取出當月簽到表
    @PostMapping(value = "/course/takeOutSingInSheet")
    @ResponseBody
    public SerchSingInRes takeOutSingInSheet(@RequestBody TakeOutReq takeOutReq){
        return courseService.takeOutSingInSheet(takeOutReq.getMonth(), takeOutReq.getNumber());
    }
    
    //將日期相同的資料刪除
    @PostMapping(value = "/course/deleteSchedule")
    @ResponseBody
    public MessageRes deleteSchedule(@Param("date") LocalDate date){
        return courseService.deleteSchedule(date);
    }
    
    //將申請人數加一
    @PostMapping(value = "/course/updateRegistr")
    @ResponseBody
    public MessageRes updateRegistr(@RequestBody UpdateRegistr updateRegistr){
        return courseService.updateRegistr(updateRegistr.getRegistr(), updateRegistr.getCourseId());
    }
}
