package com.inext.manage_system.service.ifs;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;

import org.springframework.transaction.annotation.Transactional;

import com.inext.manage_system.dto.MessageRes;
import com.inext.manage_system.dto.SerchCategoryRes;
import com.inext.manage_system.dto.SerchContentRes;
import com.inext.manage_system.dto.SerchCourseRes;
import com.inext.manage_system.dto.SerchScheduleRes;
import com.inext.manage_system.dto.SerchSingInRes;
import com.inext.manage_system.entity.CourseAlias;
import com.inext.manage_system.entity.CourseContent;
import com.inext.manage_system.entity.CourseSchedule;
import com.inext.manage_system.entity.VisitorDisplay;

@Transactional
public interface CourseService {

    // 創建課程或是更新課程內容
    public MessageRes createOrUpdateCourse(CourseAlias courseAlias);

    // 搜尋課程內容
    public SerchCourseRes serchCourse(String courseName,LocalDate startDate, LocalDate endDate);

    // 創建課程內容列表
    public MessageRes createOrUpdateContent(CourseContent courseContent);

    // 將category 內的內容全部拉出來
    public SerchCategoryRes serchCategory();

    // 搜尋課程
    public SerchContentRes serchContent(String lectureLanguage, String frame, String type);

    //創建行程表
    public MessageRes createOrUpdateSchedule(CourseSchedule courseSchedule);
    
    //刪除行程表
    public MessageRes deleteSchedule(LocalDate date);

    // 搜尋每個月的課程表
    public SerchScheduleRes serchSchedule(YearMonth month, int courseId);

    //以當前時間進行簽到
    public MessageRes checkIn(VisitorDisplay visitorDisplay);

    //以當前時間進行簽退
    public MessageRes checkOut(LocalTime localTime,int number,LocalDate date);

    //將學習時間更新進資料庫
    public MessageRes studytime(double studyHours, int number, LocalDate date);

    //將當月簽到表取出
    public SerchSingInRes takeOutSingInSheet(YearMonth month, int number);

    //將申請人數加一
    public MessageRes updateRegistr(int registr,int courseId);

}
