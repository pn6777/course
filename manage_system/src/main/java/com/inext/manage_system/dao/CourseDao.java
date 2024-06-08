package com.inext.manage_system.dao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.inext.manage_system.entity.CourseAlias;
import com.inext.manage_system.entity.CourseContent;
import com.inext.manage_system.entity.CourseSchedule;
import com.inext.manage_system.entity.CourseCategory;
import com.inext.manage_system.entity.VisitorDisplay;

@Mapper
public interface CourseDao {
    
    // 創建 課程資料
    public int createByCourse(@Param("courseAlias")CourseAlias courseAlias);

    // 創建 課程內容資料
    public int createByContent(@Param("courseContent")CourseContent courseContent);

    // 創建 行程表資料
    public int createBySchedule(@Param("courseSchedule")CourseSchedule courseSchedule);

    // 把 CourseCategory 資料表內的所有資料取出
    public List<CourseCategory> findAllCourseCategory();

    // 簽到後將資料寫入資料庫內
    public int checkIn(@Param("visitorDisplay")VisitorDisplay visitorDisplay);

    // 簽退後將資料更新進資料庫
    public int checkOut(@Param("endTime")LocalTime endTime,@Param("number")int number,@Param("date")LocalDate date);
    
    // 以學生編號將當天的簽到表取出來
    public List<VisitorDisplay> findByNumber(@Param("number")int number, @Param("date")LocalDate date);

    // 將計算出的時數輸入進資料庫內
    public int updateHours(@Param("studyHours")double studyHours,@Param("number")int number,@Param("date")LocalDate date);

    // 將當月的簽到表取出
    public List<VisitorDisplay> findByMonthCheckIn(@Param("month")YearMonth month ,@Param("number")int number);

    // 選出每月的行程表
    public List<CourseSchedule> findByMonth(@Param("month")YearMonth month, @Param("courseId")int courseId);

    // registr 修改
    public int updateRegistr(@Param("registr")int registr,@Param("courseId")int courseId);

    // 將行程表內容寫進資料庫
    public List<CourseSchedule> createSchedule(@Param("courseSchedule")CourseSchedule courseSchedule);
    
    // 將行程表刪除
    public int deleteSchedule(@Param("date")LocalDate date);

    // 將資料庫行程表內容更新
    public int updateSchedule( @Param("courseSchedule") CourseSchedule courseSchedule);

    // 檢查存入的資料是否存在
    public List<CourseSchedule> existSchedule( @Param("courseId") int courseId, @Param("number") int number, @Param("date") LocalDate date);

    // 搜索講座內容
    public List<CourseContent> selectContent(@Param("lectureLanguage")String lectureLanguage, @Param("frame")String frame, @Param("type")String type);

    // 更新講座內容
    public int updateContent(@Param("courseContent")CourseContent courseContent);

    // 檢查內容是否以存在
    public List<CourseContent> existContentNumber(@Param("courseNumber")int courseNumber);
    
    // 篩選符合的課程
    public List<CourseAlias> selectCourse(@Param("startDate")LocalDate startDate, @Param("endDate")LocalDate endDate, @Param("courseName")String courseName);

    // 保存課程內容
    public int updateCourse(@Param("courseAlias")CourseAlias courseAlias);

    // 確認課程是否存在
    public List<CourseAlias> existCourseId(@Param("courseId")int courseId);
} 
