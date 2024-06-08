$(document).ready(function () {
    let courseArr = '';

    $.ajax({
        url: "/course/serchCourse",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "courseName": "",
            "startDate": null,
            "endDate": null
        }),
        dataType: "json",
        success: function (response) {
            let defaultArr = response.courseAlias;

            defaultArr.forEach(item => {
                if (sessionStorage.getItem('courseNumber') == item.courseId) {
                    courseArr = item;
                }
            });
            console.log(courseArr);

            // 生成年份选项，从今年开始到后两年
            let currentYear = new Date().getFullYear();
            let endYear = currentYear + 2;
            for (let year = currentYear; year <= endYear; year++) {
                $("#startYear").append("<option value='" + year + "'>" + year + "</option>");
                $("#endYear").append("<option value='" + year + "'>" + year + "</option>");
            }

            // 生成月份选项，1-12月
            for (let month = 1; month <= 12; month++) {
                $("#startMonth").append("<option value='" + month.toString().padStart(2, '0') + "'>" + month + "</option>");
                $("#endMonth").append("<option value='" + month.toString().padStart(2, '0') + "'>" + month + "</option>");
            }

            // 更新日期选项的函数
            function updateDateOptions(yearSelector, monthSelector, dateSelector) {
                let selectedYear = yearSelector.val();
                let selectedMonth = monthSelector.val();
                let daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

                dateSelector.empty();
                for (let date = 1; date <= daysInMonth; date++) {
                    dateSelector.append("<option value='" + date.toString().padStart(2, '0') + "'>" + date + "</option>");
                }
            }

            // 根据选择的年份和月份更新日期选项
            $("#startYear, #startMonth").change(function () {
                updateDateOptions($("#startYear"), $("#startMonth"), $("#startDate"));
            });

            $("#endYear, #endMonth").change(function () {
                updateDateOptions($("#endYear"), $("#endMonth"), $("#endDate"));
            });

            // 初始化日期选项
            updateDateOptions($("#startYear"), $("#startMonth"), $("#startDate"));
            updateDateOptions($("#endYear"), $("#endMonth"), $("#endDate"));

            let courseName = $("#courseName");
            let startYear = $("#startYear");
            let startMonth = $("#startMonth");
            let startDate = $("#startDate");
            let endYears = $("#endYear");
            let endMonth = $("#endMonth");
            let endDate = $("#endDate");

            if (courseArr) {
                $("#courseName").val(courseArr.courseName);
                $("#startYear").val(new Date(courseArr.startDate).getFullYear());
                $("#startMonth").val((new Date(courseArr.startDate).getMonth() + 1).toString().padStart(2, '0'));
                $("#startDate").val(new Date(courseArr.startDate).getDate().toString().padStart(2, '0'));
                $("#endYear").val(new Date(courseArr.endDate).getFullYear());
                $("#endMonth").val((new Date(courseArr.endDate).getMonth() + 1).toString().padStart(2, '0'));
                $("#endDate").val(new Date(courseArr.endDate).getDate().toString().padStart(2, '0'));

                updateDateOptions($("#startYear"), $("#startMonth"), $("#startDate"));
                updateDateOptions($("#endYear"), $("#endMonth"), $("#endDate"));
            }

            function validateDates() {
                let startDate = new Date($("#startYear").val(), $("#startMonth").val() - 1, $("#startDate").val());
                let endDate = new Date($("#endYear").val(), $("#endMonth").val() - 1, $("#endDate").val());
                let maxEndDate = new Date(startDate);
                maxEndDate.setMonth(maxEndDate.getMonth() + 3);

                if (endDate < startDate) {
                    alert("終了時間は開始時間より早くすることはできません!?");
                    return false;
                }

                if (endDate > maxEndDate) {
                    let apply = confirm("終了時間が開始時間を3か月以上超えています。続行しますか？");
                    console.log(apply);
                    return apply;
                }

                return true;
            }

            $("#btnSave").click(function () {
                if (!validateDates()) {
                    return;
                }

                $.ajax({
                    url: "/course/createOrUpdateCourse",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "courseId": sessionStorage.getItem('courseNumber'),
                        "courseName": courseName.val(),
                        "registr": 0,
                        "startDate": startYear.val() + "-" + startMonth.val() + "-" + startDate.val(),
                        "endDate": endYears.val() + "-" + endMonth.val() + "-" + endDate.val(),
                        "site": ""
                    }),
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                        if (response.code != 200) {
                            alert("請確認數值正確!?");
                        }
                    },
                });
                sessionStorage.removeItem('courseNumber');
                window.location.href = "/course/managerCourseList";
            });

            $("#btnCancel").click(function () {
                sessionStorage.removeItem('courseNumber');
                window.location.href = "/course/managerCourseList";
            });
        }
    });
});