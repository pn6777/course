$(document).ready(function () {

    let displayArr = [];
    let yearClick = [];
    let selectYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

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
            console.log(response);
            displayArr = response.courseAlias;
            createCourse(displayArr);
            createYear();
            setDefaultSelection();
        }
    })

    function createYear() {
        let yearBtn = $("#yearBtn");
        let getYear = new Date().getFullYear();

        for (let i = 0; i < 3; i++) {
            let year = getYear + i;
            let yearButton = document.createElement("p");
            yearButton.textContent = year;
            yearButton.classList.add("text1");
            yearBtn.append(yearButton);
            $(yearButton).on("click", function () {
                selectYear = year;
                console.log(selectYear);
                let yearButtons = document.querySelectorAll(".clickYearBox");

                yearButtons.forEach(button => {
                    // 检查每个按钮是否已经具有 clickBox 类名
                    if (button.classList.contains("clickYearBox")) {
                        // 如果有，就移除该类名
                        button.classList.remove("clickYearBox");
                    }
                });

                yearButton.classList.add("clickYearBox");

                let buttons = document.querySelectorAll(".clickBox");

                buttons.forEach(button => {
                    // 检查每个按钮是否已经具有 clickBox 类名
                    if (button.classList.contains("clickBox")) {
                        // 如果有，就移除该类名
                        button.classList.remove("clickBox");
                    }
                });

                yearClick = displayArr.filter(item => {
                    // 假设每个 item 对象中都有一个 startDate 属性，表示课程开始日期
                    // 假设 startDate 是一个字符串，格式为 "YYYY-MM-DD"
                    return item.startDate.startsWith(year); // 返回 true 表示保留该课程，false 表示过滤掉该课程
                });
                console.log(yearClick);
                $("#courseDisplay").empty();
                createCourse(yearClick);
            })
        }
        $("#jan").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("jan");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(01)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            console.log(monthClick);
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#feb").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("feb");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(02)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#mar").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("mar");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(03)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#apr").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("apr");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(04)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#may").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("may");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(05)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#jun").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("jun");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(06)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#jul").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("jul");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(07)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#aug").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("aug");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(08)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#sep").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("sep");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(09)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#oct").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("oct");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(10)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#nov").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("nov");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(11)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
        $("#dec").on("click", function () {
            let monthClick = []

            let buttons = document.querySelectorAll(".clickBox");

            buttons.forEach(button => {
                // 检查每个按钮是否已经具有 clickBox 类名
                if (button.classList.contains("clickBox")) {
                    // 如果有，就移除该类名
                    button.classList.remove("clickBox");
                }
            });

            let button = document.getElementById("dec");

            button.classList.add("clickBox");

            let regex = new RegExp("^" + selectYear + "-(12)");
            if (yearClick.length == 0) {
                monthClick = displayArr.filter(item => {
                    return regex.test(item.startDate);
                });
            } else {
                monthClick = yearClick.filter(item => {
                    return regex.test(item.startDate);
                });
            }
            $("#courseDisplay").empty();
            createCourse(monthClick);
        })
    }

    function setDefaultSelection() {
        // 触发当前年份的点击事件
        $(`#yearBtn p:contains(${selectYear})`).trigger("click");
        // 根据当前月份触发相应的月份按钮的点击事件
        let monthMap = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        $(`#${monthMap[currentMonth - 1]}`).trigger("click");
    }

    function createCourse(course) {

        let fontDiv = document.querySelector(".showText");
        let courseDisplay = $("#courseDisplay");

        console.log(course);
        fontDiv.textContent = "";
        if(course.length == 0){
            fontDiv.textContent = "當月沒有課程";
            return;
        }

        course.forEach((item, index) => {
            let newDiv = document.createElement("div");
            newDiv.classList.add("courseDiv");

            let noCell = document.createElement("span");
            noCell.textContent = (index + 1) + ".　";
            newDiv.appendChild(noCell);

            let nameCell = document.createElement("span");
            nameCell.textContent = item.courseName;
            newDiv.appendChild(nameCell);

            let timeCell = document.createElement("span");
            timeCell.textContent = formatDate(item.startDate) + "～" + formatDate(item.endDate);
            newDiv.appendChild(timeCell);

            let btnCell1 = document.createElement("button");
            btnCell1.textContent = "詳細";
            newDiv.appendChild(btnCell1);
            btnCell1.addEventListener("click", function () {
                sessionStorage.setItem("courseId", item.courseId);
                window.location.href = "/course/visitorSchedule";
            });

            let btnCell2 = document.createElement("button");
            btnCell2.textContent = "申込";
            newDiv.appendChild(btnCell2);
            btnCell2.addEventListener("click", function () {
                let apply = confirm("申請しますか？");
                if (apply) {
                    let peopleNumber = item.registr + 1
                    if (peopleNumber > 30) {
                        alert("申請人数が上限に達しました!?");
                        location.reload();
                    } else {
                        $.ajax({
                            url: "/course/updateRegistr",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify({
                                "registr": peopleNumber,
                                "courseId": item.courseId
                            }),
                            dataType: "json",
                            success: function (response) {
                                alert("申請が成功しました!?");
                                location.reload();
                            }
                        })
                    }
                }
            });

            courseDisplay.append(newDiv);

            let newDiv2 = document.createElement("div");
            newDiv.classList.add("courseDiv");

            let textCell = document.createElement("p");
            textCell.textContent = "人数上限　" + item.registr + "/30";
            newDiv.appendChild(textCell);

            let siteCell = document.createElement("p");
            siteCell.textContent = "校　　舎　" + item.site;
            newDiv.appendChild(siteCell);
        })
    }

    function formatDate(inputDate) {
        // 将输入日期字符串转换为 Date 对象
        let date = new Date(inputDate);

        // 获取年、月、日
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从 0 开始，因此要加 1，并确保输出两位数
        let day = ("0" + date.getDate()).slice(-2); // 确保输出两位数的日期

        // 拼接成新的日期格式
        let format = year + "/" + month + "/" + day;

        return format;
    }
})