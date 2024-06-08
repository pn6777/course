$(document).ready(function () {

    let currentYear = new Date().getFullYear();
    let courseArr = []
    let month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

    let tbody = document.getElementById("courseContent");

    let startMonth = $("#startMonthSelect");
    let endMonth = $("#endMonthSelect");

    const itemsPerPage = 3;

    let currentPage = 1;

    function renderData(courseList) {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
    
        let newCourseArr = courseList.slice(startIndex, endIndex);
    
        let fontDiv = document.querySelector(".textDiv");
        fontDiv.textContent = "";
    
        let tbody = document.getElementById("courseContent");
        tbody.innerHTML = "";
    
        if (newCourseArr.length == 0) {
            fontDiv.textContent = "當月沒有課程";
        }
    
        newCourseArr.forEach((item, index) => {
            let row = document.createElement("tr");
    
            let noCell = document.createElement("td");
            noCell.textContent = startIndex + 1 + index;
            row.appendChild(noCell);
    
            let startDateCell = document.createElement("td");
            startDateCell.textContent = item.startDate;
            row.appendChild(startDateCell);
    
            let endDateCell = document.createElement("td");
            endDateCell.textContent = item.endDate;
            row.appendChild(endDateCell);
    
            let nameCell = document.createElement("td");
            nameCell.textContent = item.courseName;
            row.appendChild(nameCell);
    
            let registrCell = document.createElement("td");
            registrCell.textContent = item.registr + '/30';
            row.appendChild(registrCell);
    
            let btnCell = document.createElement("button");
            btnCell.textContent = "編輯";
            row.appendChild(btnCell);
            $(btnCell).on("click", function () {
                sessionStorage.setItem('courseNumber', item.courseId);
                window.location.href = "/course/managerCourseEdit";
            });
    
            tbody.appendChild(row);
        });
    
        // 绑定下一页按钮的点击事件
        $("#nextPage").off("click").on("click", function () {
            if (currentPage < Math.ceil(courseList.length / itemsPerPage)) {
                currentPage++;
                renderData(courseList);
            } else {
                alert("次のページはありません。");
            }
        });
    
        // 绑定上一页按钮的点击事件
        $("#prevPage").off("click").on("click", function () {
            if (currentPage > 1) {
                currentPage--;
                renderData(courseList);
            } else {
                alert("すでに最初のページにいます。");
            }
        });
    }

    $.ajax({
        url: "/course/serchCourse",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "coruseName": "",
            "startDate": currentYear + "-01-01",
            "endDate": currentYear + "-12-31"
        }),
        dataType: "json",
        success: function (response) {
            courseArr = response.courseAlias

            month.forEach(monthNumber => {
                let option = $('<option></option>');
                option.val(monthNumber).text(monthNumber);
                startMonth.append(option.clone());
                endMonth.append(option.clone());
            });

            renderData(courseArr);

            $("#jan").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-01");
                let janCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                console.log(janCourse);
                renderData(janCourse);
            })
            $("#feb").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-02");
                let febCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(febCourse);
            })
            $("#mar").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-03");
                let marCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(marCourse);
            })
            $("#apr").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-04");
                let aprCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(aprCourse);
            })
            $("#may").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-05");
                let mayCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(mayCourse);
            })
            $("#jun").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-06");
                let junCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(junCourse);
            })
            $("#jul").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-07");
                let julCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(julCourse);
            })
            $("#aug").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-08");
                let augCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(augCourse);
            })
            $("#sep").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-09");
                let sepCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(sepCourse);
            })
            $("#oct").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-10");
                let octCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(octCourse);
            })
            $("#nov").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-11");
                let novCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(novCourse);
            })
            $("#dec").on("click", function () {
                currentPage = 1;
                // 清除所有按钮的 clickBox 类名
                $(".clickBox").removeClass("clickBox");

                // 添加 clickBox 类名到当前按钮
                $(this).addClass("clickBox");

                // 使用正则表达式匹配二月份的课程内容
                let regex = new RegExp("^" + currentYear + "-12");
                let decCourse = courseArr.filter(item => regex.test(item.startDate));

                // 清空内容容器并创建新的课程内容
                $("#content").empty();
                $("#startMonthSelect").val('');
                $("#endMonthSelect").val('');
                $("#inputBox").val('');
                renderData(decCourse);
            });

        }
    })

    $("#selectBtn").click(function () {

        let nowYear = new Date().getFullYear();
        let startMonthSelect = $("#startMonthSelect");
        let endMonthSelect = $("#endMonthSelect");
        let inputBox = $("#inputBox");
        let startTime = "";
        let endTime = "";
        if (startMonthSelect.val() == "") {
            startTime = nowYear + "-" + "01" + "-01"
            if(startMonthSelect.val() != ""){
                startTime += nowYear + "-" + startMonthSelect.val() + "-01"
            }
        }

        $(".clickBox").removeClass("clickBox");

        function getLastDayOfMonth(year, month) {
            // 使用 Date 构造函数创建一个新的 Date 对象，设置日期为下个月的第一天
            let nextMonthFirstDay = new Date(year, month, 1);

            // 使用 Date 对象的 setDate() 方法将日期设置为本月的最后一天
            nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() - 1);

            // 返回本月的最后一天
            return nextMonthFirstDay.getDate();
        }

        if (endMonthSelect.val() == "") {
            endTime = nowYear + "-" + "12" + "-" + getLastDayOfMonth(nowYear, 12)
            if(endMonthSelect.val() != ""){
                endTime += nowYear + "-" + endMonthSelect.val() + "-" + getLastDayOfMonth(nowYear, endMonthSelect.val())
            }
        }
        let startDate = new Date(startTime);
        let endDate = new Date(endTime);

        if (startMonthSelect.val() != "" && endMonthSelect.val() != "") {
            if (endDate.getTime() < startDate.getTime()) {
                alert("時間設定が間違っています。再度確認してください。");
                return;
            }
        }

        $.ajax({
            url: "/course/serchCourse",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "coruseName": inputBox.val(),
                "startDate": startTime,
                "endDate": endTime
            }),
            dataType: "json",
            success: function (response) {
                let serchCourseArr = response.courseAlias
                renderData(serchCourseArr);
            }
        })

    })
})