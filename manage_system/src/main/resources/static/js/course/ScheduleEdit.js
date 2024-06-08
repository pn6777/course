$(document).ready(function () {
    let options = ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'];

    let optionsHtml = '';
    options.forEach(option => {
        optionsHtml += `<option value='${option}'>${option}</option>`;
    });
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
                if (sessionStorage.getItem("courseId") == item.courseId) {
                    courseArr = item;
                }
            })

            let startDate = new Date(courseArr.startDate);
            let endDate = new Date(courseArr.endDate);

            console.log(courseArr);
            console.log((endDate.getMonth() + 1) - (startDate.getMonth() + 1));

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
                    p.addEventListener('click', function () {
                        $("#courseSchedule tbody").empty();
                        let click = document.querySelectorAll(".clickBox");

                        click.forEach(button => {
                            // 检查每个按钮是否已经具有 clickBox 类名
                            if (button.classList.contains("clickBox")) {
                                // 如果有，就移除该类名
                                button.classList.remove("clickBox");
                            }
                        });
                        p.classList.add("clickBox");
                        loadCourseSchedule(year, month);
                    });
                    selectMonthBtn.appendChild(p);
                }
            }
            defaultMonth(startYear, (endDate.getMonth() + 1) - (startDate.getMonth() + 1));

        }
    })

    function defaultMonth(Year, Month) {
        let defaultMonth = document.querySelector(`p[year="${Year}"][month="${Month}"]`);
        if (defaultMonth) {
            defaultMonth.click();
        }
    }

    function loadCourseSchedule(year, month) {
        $.ajax({
            url: "/course/serchCategory",
            method: "GET",
            dataType: "json",
            success: function (objRes) {
                let optionArr = objRes.courseCategory;
                let languageOption = '';
                let typeOption = '';
                optionArr.forEach(item => {
                    if (item.language != null) {
                        languageOption += `<option value='${item.language}'>${item.language}</option>`;
                    }
                    if (item.type != null) {
                        typeOption += `<option value='${item.type}'>${item.type}</option>`;
                    }
                });

                let contentOption = '';

                $.ajax({
                    url: "/course/serchContent",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "lectureLanguage": null,
                        "frame": null,
                        "type": null
                    }),
                    dataType: "json",
                    success: function (contentResponse) {
                        let contentArr = contentResponse.courseContent;

                        contentArr.forEach(item => {
                            contentOption += `<option value='${item.name}'>${item.name}</option>`;
                        });

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
                            success: function (scheduleResponse) {
                                let scheduleData = scheduleResponse.courseSchedule;
                                console.log(scheduleData);
                                let daysInMonth = new Date(year, month + 1, 0).getDate();

                                function createCourseRow(date, dayOfWeek, data = {}, includeButtons = true, isDisabled = true) {
                                    let formattedDate = date.toISOString().split('T')[0];
                                    let row = `<tr class='${formattedDate}'>`;
                                    if (includeButtons) {
                                        row += "<td>" + date.toLocaleDateString('ja-JP') + "</td>";
                                        row += "<td>" + dayOfWeek + "</td>";
                                    } else {
                                        row += "<td></td><td></td>";
                                    }
                                    row += `<td>
                                    <select name="hours-${formattedDate}" id='hours-${formattedDate}' ${isDisabled ? 'disabled' : ''}>
                                        <option value='0'>--</option>
                                        ${optionsHtml}
                                    </select>
                                </td>`;
                                    row += `<td>
                                    <select name='language-${formattedDate}' id='language-${formattedDate}' ${isDisabled ? 'disabled' : ''}>
                                        <option value=''>--</option>
                                        ${languageOption}
                                    </select>
                                </td>`;
                                    row += `<td>
                                    <select name='type-${formattedDate}' id='type-${formattedDate}' ${isDisabled ? 'disabled' : ''}>
                                        <option value=''>--</option>
                                        ${typeOption}
                                    </select>
                                </td>`;
                                    row += `<td>
                                    <select name='content-${formattedDate}' id='content-${formattedDate}' ${isDisabled ? 'disabled' : ''}>
                                        <option value=''>--</option>
                                        ${contentOption}
                                    </select>
                                </td>`;
                                    let deleteButtonDisabled = data.teachingHours ? 'disabled' : '';
                                    if (includeButtons) {
                                        row += `<td><button class='add-row-btn' disabled>追加</button></td>`;
                                        row += `<td><button class='edit-row-btn'>編集</button></td>`;
                                    } else {
                                        row += `<td><button class='delete-row-btn' ${deleteButtonDisabled}>刪除</button></td>`;
                                        row += "<td></td>";
                                    }
                                    row += "</tr>";

                                    // 填充已有数据
                                    if (data.teachingHours) row = row.replace(`value='${data.teachingHours}'`, `value='${data.teachingHours}' selected`);
                                    if (data.lectureLanguage) row = row.replace(`value='${data.lectureLanguage}'`, `value='${data.lectureLanguage}' selected`);
                                    if (data.level) row = row.replace(`value='${data.level}'`, `value='${data.level}' selected`);
                                    if (data.title) row = row.replace(`value='${data.title}'`, `value='${data.title}' selected`);

                                    return row;
                                }

                                function addNewRow(event) {
                                    let clickedRow = $(event.target).closest("tr");
                                    let date = clickedRow.find("td").eq(0).text();
                                    let dayOfWeek = clickedRow.find("td").eq(1).text();
                                    let newRow = createCourseRow(new Date(date), dayOfWeek, {}, false, false); // 新增行不禁用 select
                                    clickedRow.after(newRow);
                                }

                                let tableBody = $("#courseSchedule tbody");
                                for (let date = 1; date <= daysInMonth; date++) {
                                    let currentDate = new Date(year, month, date);
                                    let newDate = new Date(year, month, date + 1);
                                    let dayOfWeek = currentDate.toLocaleDateString('ja-JP', { weekday: 'short' });

                                    // 查找当天的课程数据
                                    let dayData = scheduleData.filter(item => {
                                        let itemDate = new Date(item.date);
                                        return itemDate.toISOString().split('T')[0] === newDate.toISOString().split('T')[0];
                                    });

                                    if (dayData.length > 0) {
                                        dayData.forEach(data => {
                                            if (Number.isInteger(data.teachingHours)) {
                                                data.teachingHours = data.teachingHours + ".0";
                                            }

                                            if (data.number === 1) {
                                                tableBody.append(createCourseRow(currentDate, dayOfWeek, data));
                                            } else {
                                                tableBody.append(createCourseRow(currentDate, dayOfWeek, data, false));
                                            }

                                        });
                                    } else {
                                        tableBody.append(createCourseRow(currentDate, dayOfWeek));
                                    }
                                }

                                $("#courseSchedule").off("click", ".edit-row-btn").on("click", ".edit-row-btn", function () {
                                    let row = $(this).closest("tr");
                                    let dateText = row.find("td").eq(0).text();
                                    let formattedDate = new Date(dateText).toISOString().split('T')[0];
                                    let selects = $(`.${formattedDate}`).find("select");
                                    let addButton = $(`.${formattedDate}`).find(".add-row-btn");
                                    let deleteButton = $(`.${formattedDate}`).find(".delete-row-btn");

                                    if ($(this).text() === "編集") {
                                        selects.prop("disabled", false); // 启用所有同日期的下拉菜单
                                        addButton.prop("disabled", false); // 启用追加按钮
                                        deleteButton.prop("disabled", false); // 启用刪除按钮
                                        $(this).text("保存"); // 将按钮文本更改为保存
                                    } else {
                                        let allValid = true;
                                        selects.each(function () {
                                            if ($(this).val() === "") {
                                                allValid = false;
                                                return false; // 如果发现任何一个下拉菜单为空，则退出循环
                                            }
                                        });
                                        if (!allValid) {
                                            // 显示错误消息或采取其他适当的操作
                                            alert("内容が記入されているかご確認ください!?");
                                            return; // 阻止保存操作
                                        }

                                        // 获取同日期的下拉菜单内容并存入数组
                                        let dataArr = [];
                                        $(`.${formattedDate}`).each(function () {
                                            let date = new Date(formattedDate);
                                            date.setDate(date.getDate() + 1);
                                            let incrementedDate = date.toISOString().split('T')[0];

                                            let rowHours = $(this).find(`select[name='hours-${formattedDate}']`).val();
                                            let rowLanguage = $(this).find(`select[name='language-${formattedDate}']`).val();
                                            let rowType = $(this).find(`select[name='type-${formattedDate}']`).val();
                                            let rowContent = $(this).find(`select[name='content-${formattedDate}']`).val();
                                            dataArr.push({
                                                date: incrementedDate,
                                                hours: rowHours,
                                                language: rowLanguage,
                                                type: rowType,
                                                content: rowContent
                                            });
                                        });

                                        let date = new Date(formattedDate);
                                        date.setDate(date.getDate() + 1);
                                        let incrementedDate = date.toISOString().split('T')[0];

                                        console.log(incrementedDate);
                                        let deleteDate = `date=${incrementedDate}`
                                        let hours = 0;
                                        dataArr.forEach((item, index) => {
                                            hours += parseInt(item.hours);
                                        })
                                        console.log(hours);
                                        if (hours > 24) {
                                            alert("講義時間が24時間を超えています。再確認してください。");
                                            return;
                                        }

                                        if (hours > 8) {
                                            let apply = confirm("講義時間が8時間を超えています。続行しますか？");
                                            if (apply) {
                                                $.ajax({
                                                    url: `/course/deleteSchedule?${deleteDate}`,
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    dataType: "json",
                                                    success: function (response) {

                                                        dataArr.forEach((item, index) => {
                                                            console.log(item);
                                                            $.ajax({
                                                                url: "/course/createOrUpdateSchedule",
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                data: JSON.stringify({
                                                                    "courseId": sessionStorage.getItem("courseId"),
                                                                    "number": index + 1,
                                                                    "date": item.date,
                                                                    "teachingHours": item.hours,
                                                                    "lectureLanguage": item.language,
                                                                    "level": item.type,
                                                                    "title": item.content
                                                                }),
                                                                dataType: "json",
                                                                success: function (response) {
                                                                    console.log(response);
                                                                }
                                                            });
                                                        });
                                                    }
                                                })
                                            }else{
                                                return;
                                            }
                                        } else {
                                            $.ajax({
                                                url: `/course/deleteSchedule?${deleteDate}`,
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                dataType: "json",
                                                success: function (response) {

                                                    dataArr.forEach((item, index) => {
                                                        console.log(item);
                                                        $.ajax({
                                                            url: "/course/createOrUpdateSchedule",
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            data: JSON.stringify({
                                                                "courseId": 5,
                                                                "number": index + 1,
                                                                "date": item.date,
                                                                "teachingHours": item.hours,
                                                                "lectureLanguage": item.language,
                                                                "level": item.type,
                                                                "title": item.content
                                                            }),
                                                            dataType: "json",
                                                            success: function (response) {
                                                                console.log(response);
                                                            }
                                                        });
                                                    });
                                                }
                                            })
                                        }

                                        selects.prop("disabled", true); // 禁用所有同日期的下拉菜单
                                        addButton.prop("disabled", true); // 禁用追加按钮
                                        deleteButton.prop("disabled", true); // 禁用刪除按钮
                                        $(this).text("編集"); // 将按钮文本更改回编辑

                                        console.log(dataArr); // 打印或处理同日期的下拉菜单内容
                                    }
                                });

                                $("#courseSchedule").on("click", ".delete-row-btn", function () {
                                    // 找到当前行并删除
                                    $(this).closest("tr").remove();
                                });

                                $("#courseSchedule").off("click", ".add-row-btn").on("click", ".add-row-btn", addNewRow);
                            },
                        });
                    },
                });
            },
        });
    }
});