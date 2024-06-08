package com.inext.manage_system.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.inext.manage_system.constants.RtnCode;
import com.inext.manage_system.dao.CourseDao;
import com.inext.manage_system.entity.CourseAlias;
import com.inext.manage_system.entity.CourseContent;
import com.inext.manage_system.entity.CourseSchedule;
import com.inext.manage_system.entity.VisitorDisplay;
import com.inext.manage_system.service.ifs.CourseService;
import com.inext.manage_system.dto.MessageRes;
import com.inext.manage_system.dto.SerchCategoryRes;
import com.inext.manage_system.dto.SerchContentRes;
import com.inext.manage_system.dto.SerchCourseRes;
import com.inext.manage_system.dto.SerchScheduleRes;
import com.inext.manage_system.dto.SerchSingInRes;


@Mapper
@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    private CourseDao courseDao;
    /**
      * 創建課程或是更新課程內容
      * @param courseAlias 課程情報
      * @return MessageRes 回傳訊息
      */
    @Override 
    public MessageRes createOrUpdateCourse(CourseAlias courseAlias) {
        //對輸入的值進行防呆
        if(courseAlias.getCourseId() < 0 
        || !StringUtils.hasText(courseAlias.getCourseName()) 
        || courseAlias.getStartDate() == null 
        || courseAlias.getEndDate() == null 
        || courseAlias.getRegistr() < 0){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(),RtnCode.PARAM_ERROR.getMessage());
        }

        //如果校舍資訊為空，則帶入初始值
        if(!StringUtils.hasText(courseAlias.getSite())){
            courseAlias.setSite("台南○○センター");
        }

        //將時間進行比較
        //如果開始時間大於結束時間 ，則回傳錯誤訊息
        if(courseAlias.getStartDate().isAfter(courseAlias.getEndDate())){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(),RtnCode.PARAM_ERROR.getMessage());
        }

        //搜尋course資料庫確認使否有相同的數據，
        List<CourseAlias> courseArr = courseDao.existCourseId(courseAlias.getCourseId());
        
        //確認是否存在資料
        //如果沒有就創建資料，如果有就進行更新資料
        if(courseArr.size() != 1){
            courseDao.createByCourse(courseAlias);
            return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }else{
            courseDao.updateCourse(courseAlias);
            return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }
    }

    /**
     * 
     */
    @Override //以月份搜尋範圍內的值
    public SerchCourseRes serchCourse(String courseName,LocalDate startDate, LocalDate endDate) {

        return new SerchCourseRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage(),courseDao.selectCourse(startDate, endDate, courseName));
    }

    @Override // 創建課程資訊或是更新課程資訊
    public MessageRes createOrUpdateContent(CourseContent courseContent) {
        // 對輸入的值進行防呆
        if(courseContent.getCourseNumber() < 0 
        || !StringUtils.hasText(courseContent.getName()) 
        || !StringUtils.hasText(courseContent.getLectureLanguage())  
        || !StringUtils.hasText(courseContent.getType())){
            // 數值有誤回傳錯誤訊息
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(),RtnCode.PARAM_ERROR.getMessage());
        }
        //搜尋資料庫內是否有相同數據
        List<CourseContent> contentArr = courseDao.existContentNumber(courseContent.getCourseNumber());

        //確認資料存在與否
        //如果有沒有就進行創建，如果有就進行更新
        //成功後回傳成功訊息
        if(contentArr.size() == 0){
            courseDao.createByContent(courseContent);
            return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }else{
            courseDao.updateContent(courseContent);
            return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }
        
    }

    @Override //將 category 內的資料全取出來
    public SerchCategoryRes serchCategory() {

        //取出資料
        return new SerchCategoryRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage(),courseDao.findAllCourseCategory());
    }

    @Override //將符合搜尋條件的 content 資料取出
    public SerchContentRes serchContent(String lectureLanguage, String frame, String type) {
        
        //將成功訊息與資料回傳
        return new SerchContentRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage(),courseDao.selectContent(lectureLanguage, frame, type));

    }

    @Override //創建或更新課程
    public MessageRes createOrUpdateSchedule(CourseSchedule courseSchedule) {
        //防呆 確認帶入的值是否正確，如果不正確回傳錯誤訊息
        if(courseSchedule.getCourseId() < 0 || courseSchedule.getNumber() < 0 || courseSchedule.getDate() == null || !StringUtils.hasText(courseSchedule.getLectureLanguage()) || courseSchedule.getTeachingHours() < 0 || !StringUtils.hasText(courseSchedule.getLevel()) || !StringUtils.hasText(courseSchedule.getTitle())){
            return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }

        //判斷資料是否存在
        List<CourseSchedule> scheduleArr = courseDao.existSchedule(courseSchedule.getCourseId(), courseSchedule.getNumber(), courseSchedule.getDate());

        if(scheduleArr.size() != 1){
            courseDao.createBySchedule(courseSchedule);
            //回傳成功訊息
        return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }else{
            courseDao.updateSchedule(courseSchedule);
            //回傳成功訊息
        return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
        }

    }

    public MessageRes deleteSchedule(LocalDate date){
        //防呆
        if(date == null){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage());
        }

        courseDao.deleteSchedule(date);

        return new MessageRes(RtnCode.SUCCESS.getCode(),RtnCode.SUCCESS.getMessage());
    }

    @Override //搜尋課程的行程表
    public SerchScheduleRes serchSchedule(YearMonth month, int courseId) {
        // 防呆
        if(courseId < 0){
            return new SerchScheduleRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage(), null);
        }
        //將搜尋到的值回傳
        return new SerchScheduleRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage(), courseDao.findByMonth(month, courseId));
    }

    @Override //創建當日簽到表單，並寫入簽到時間
    public MessageRes checkIn(VisitorDisplay visitorDisplay) {
        //防呆
        if(visitorDisplay.getDate() == null || visitorDisplay.getStartTime() == null || visitorDisplay.getNumber() < 0){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage());
        }

        //確認表單是否存在
        List<VisitorDisplay> visitorDisplayArr = courseDao.findByNumber(visitorDisplay.getNumber(), visitorDisplay.getDate());

        //如果表單已存在便回傳錯誤訊息，如果表單不存在，便創建
        if(visitorDisplayArr.size() != 1){
            courseDao.checkIn(visitorDisplay);
            return new MessageRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage());
        }else{
            return new MessageRes(RtnCode.DATA_DOES_NOT_EXIST.getCode(), RtnCode.DATA_DOES_NOT_EXIST.getMessage());
        }
    }

    @Override //將簽退時間寫入表單內
    public MessageRes checkOut(LocalTime endTime, int number, LocalDate date) {
        //防呆
        if(endTime == null || number < 0 || date == null){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage());
        }

        //確認表單是否存在
        List<VisitorDisplay> visitorDisplayArr = courseDao.findByNumber(number, date);

        //確如果存在便進行更新，如果不存在便回傳錯誤
        if(visitorDisplayArr.size() != 1){
            return new MessageRes(RtnCode.DATA_DOES_NOT_EXIST.getCode(), RtnCode.DATA_DOES_NOT_EXIST.getMessage());
        }else{
            courseDao.checkOut(endTime, number, date);
            return new MessageRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage());
        }

    }

    @Override //更新學習時間
    public MessageRes studytime(double studyHours, int number, LocalDate date) {
        //防呆
        if(studyHours < 0 || number < 0 || date == null){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage());
        }

        //確認表單是否存在
        List<VisitorDisplay> visitorDisplayArr = courseDao.findByNumber(number, date);

        //如果不存在，便回傳錯誤訊息
        if(visitorDisplayArr.size() != 1){
            return new MessageRes(RtnCode.DATA_DOES_NOT_EXIST.getCode(), RtnCode.DATA_DOES_NOT_EXIST.getMessage());
        }
        
        //進行更新，並回傳成功訊息
        courseDao.updateHours(studyHours, number, date);
        return new MessageRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage());
    }

    @Override //以編號取出當月簽到表
    public SerchSingInRes takeOutSingInSheet(YearMonth month, int number) {
        //防呆
        if(month == null || number < 0){
            return new SerchSingInRes(RtnCode.DATA_DOES_NOT_EXIST.getCode(), RtnCode.DATA_DOES_NOT_EXIST.getMessage(),null);
        }

        //回傳成功訊息，與搜尋到的資料
        return new SerchSingInRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage(), courseDao.findByMonthCheckIn(month, number));
    }

    @Override //將申請人數加一
    public MessageRes updateRegistr(int registr,int courseId) {
        //防呆
        if(registr < 0|| registr > 30 ||courseId < 0){
            return new MessageRes(RtnCode.PARAM_ERROR.getCode(), RtnCode.PARAM_ERROR.getMessage());
        }

        courseDao.updateRegistr(registr ,courseId);

        return new MessageRes(RtnCode.SUCCESS.getCode(), RtnCode.SUCCESS.getMessage());
    }

    
}
