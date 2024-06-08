document.addEventListener('DOMContentLoaded', (event) => {

    $.ajax({
        url: "/course/serchCourse",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "coruseName": "",
            "startDate": null,
            "endDate": null
        }),
        dataType: "json",
        success: function (response) {
            let courseArr = '';
            let resArr = response.courseAlias;
            console.log(resArr);
            resArr.forEach(item => {
                if(sessionStorage.getItem("courseId") == item.courseId){
                    courseArr = item;
                }
            })
            
            let startDate = new Date(courseArr.startDate);
            let endDate = new Date(courseArr.endDate);

            console.log(courseArr);
            console.log((endDate.getMonth() + 1) - (startDate.getMonth()+1));

            // 获取开始和结束的月份
            let startMonth = startDate.getMonth();
            let endMonth = endDate.getMonth();
            let startYear = startDate.getFullYear();
            let endYear = endDate.getFullYear();

            // 生成月份按钮
            let selectMonthBtn = document.querySelector('.selectMonthBtn');
            selectMonthBtn.innerHTML = ''; // 清空之前的按钮

            for (let year = startYear; year <= endYear; year++) {
                let monthStart = (year === startYear) ? startMonth : 0;
                let monthEnd = (year === endYear) ? endMonth : 11;
                for (let month = monthStart; month <= monthEnd; month++) {
                    let monthDisplay = month + 1; // 月份从0开始，需要加1
                    let monthText = `${monthDisplay}月`;
                    let p = document.createElement('p');
                    p.className = 'text1';
                    p.setAttribute('month', month);
                    p.setAttribute('year', year);
                    p.textContent = monthText;
                    selectMonthBtn.appendChild(p);
                }
            }

            console.log(sessionStorage.getItem("courseId"));
            $.ajax({
                url: "/course/serchSchedule",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "month": "",
                    "courseId": sessionStorage.getItem("courseId")
                }),
                dataType: "json",
                success: function (response) {
                    console.log(response.courseSchedule);
                    let calendarEl = document.getElementById('calendar');
                    let selectMonthBtn = document.querySelectorAll('.selectMonthBtn p');

                    let dayContent = {}

                    response.courseSchedule.forEach(item => {
                        if (dayContent[item.date]) {
                            dayContent[item.date].push(item.title);
                        } else {
                            dayContent[item.date] = [item.title];
                        }
                    });

                    console.log(dayContent);

                    // 生成日历的函数
                    function generateCalendar(year, month) {
                        let calendarHTML = '<table>';
                        // 生成表头（星期）
                        calendarHTML += '<tr>';
                        for (let i = 0; i < 7; i++) {
                            calendarHTML += '<th>' + ['日', '月', '火', '水', '木', '金', '土'][i] + '</th>';
                        }
                        calendarHTML += '</tr>';

                        // 获取该月的第一天和最后一天
                        let firstDay = new Date(year, month, 1);
                        let lastDay = new Date(year, month + 1, 0);

                        // 计算第一天是星期几
                        let startingDay = firstDay.getDay();

                        // 计算日历行数
                        let rowCount = Math.ceil((lastDay.getDate() + startingDay) / 7);

                        // 填充日历
                        let date = 1;
                        for (let i = 0; i < rowCount; i++) {
                            calendarHTML += '<tr>';
                            for (let j = 0; j < 7; j++) {
                                if (i === 0 && j < startingDay) {
                                    calendarHTML += '<td style="background: #c4c8dd;"></td>'; // 空白填充
                                } else if (date > lastDay.getDate()) {
                                    calendarHTML += '<td style="background: #c4c8dd;"></td>';　// 空白填充
                                } else {
                                    let dateString = year + '-' + (month + 1).toString().padStart(2, '0') + '-' + date.toString().padStart(2, '0');
                                    let content = dayContent[dateString] || ''; // 取得当日内容，如果不存在则为空字符串
                                    calendarHTML += '<td>' + date + '<br>' + content + '</td>'; // 填充日期和内容
                                    date++;
                                }
                            }
                            calendarHTML += '</tr>';
                        }

                        calendarHTML += '</table>';
                        calendarEl.innerHTML = calendarHTML;
                    }

                    // 初始化日历
                    let currentDate = new Date();
                    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

                    // 为每个月份按钮添加点击事件监听器
                    selectMonthBtn.forEach(button => {
                        button.addEventListener('click', (event) => {
                            let selectedMonth = parseInt(button.getAttribute('month'));
                            let selectedYear = parseInt(button.getAttribute('year'));
                            console.log('Selected Month:', selectedMonth + 1, 'Selected Year:', selectedYear);
                            generateCalendar(selectedYear, selectedMonth);

                            // 重置所有按钮颜色
                            selectMonthBtn.forEach(btn => {
                                btn.style.backgroundColor = ''; // 你可以设置为默认颜色
                            });

                            // 改变当前点击按钮的颜色
                            button.style.backgroundColor = '#CCCCFF'; // 你可以设置为你想要的颜色
                        });
                    });

                    $(".compilationBtn").click(function() {
                        sessionStorage.getItem("courseId");
                        window.location.href = "/course/managerScheduleEdit";
                    })
                }
            })
        }
    })
});