$(document).ready(function () {
    // 取得當前年份和月份
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = ('0' + (currentDate.getMonth())).slice(-2);
    let currentHours = ('0' + currentDate.getHours()).slice(-2);
    let currentMinutes = ('0' + currentDate.getMinutes()).slice(-2);

    let serchMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    // 建立表格內容
    let tableBody = document.getElementById("calendar").getElementsByTagName('tbody')[0];
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    console.log(serchMonth);
    $.ajax({
        url: "/course/takeOutSingInSheet",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "month": currentYear + "-" + serchMonth,
            "number": 23
        }),
        dataType: "json",
        success: function (response) {
            console.log(response);
            let checkInArr = response.visitorDisplay
            let currentTime = new Date();

            for (let date = 1; date <= daysInMonth; date++) {
                let currentDate = new Date(currentYear, currentMonth, date);
                let updateDate = new Date(currentYear, currentMonth, date + 1);

                let row = tableBody.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                let cell7 = row.insertCell(6);
                cell1.innerHTML = currentDate.toLocaleDateString('ja-JP');
                cell2.innerHTML = currentDate.toLocaleDateString('ja-JP', { weekday: 'long' });
                let attendButton = document.createElement('button');
                attendButton.textContent = '受講';
                attendButton.addEventListener('click', function () {
                    $.ajax({
                        url: "/course/checkIn",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            "date": updateDate,
                            "number": 23,
                            "startTime": currentHours + ":" + currentMinutes,
                            "endTime": null,
                            "studyHours": null
                        }),
                        dataType: "json",
                        success: function (response) {
                            console.log(response);
                        }
                    })
                    window.location.reload();
                });
                if(currentTime.getDate() == date){
                    cell3.appendChild(attendButton);
                }
                let checkInRecord = checkInArr.find(record => new Date(record.date).getDate() === date);
                let leaveButton = document.createElement('button');
                leaveButton.textContent = '退席';
                leaveButton.addEventListener('click', function () {

                    $.ajax({
                        url: "/course/checkOut",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            "date": updateDate,
                            "number": 23,
                            "endTime": currentHours + ":" + currentMinutes,
                        }),
                        dataType: "json",
                        success: function (response) {
                            console.log(response);
                        }
                    })

                    if (checkInRecord) {
                        let checkInTime = new Date(checkInRecord.date + "T" + checkInRecord.startTime);
                        let currentTime = new Date();
                        let timeDiffMinutes = Math.floor((currentTime - checkInTime) / 60000);  

                        let timeDiffHours = Math.floor(timeDiffMinutes / 60);
                        if (timeDiffMinutes % 60 >= 30) {
                            timeDiffHours += 0.5;  
                        }
                        if(timeDiffHours > 8){
                            timeDiffHours = 8;
                        }
                        console.log(timeDiffHours);
                        $.ajax({
                            url: "/course/studytime",
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            data: JSON.stringify({
                                "date": updateDate,
                                "number": 23,
                                "studyHours": timeDiffHours
                            }),
                            dataType: "json",
                            success: function (response) {
                                console.log(response);
                            }
                        })
                    }
                    window.location.reload();
                });
                if(currentTime.getDate() == date){
                    cell5.appendChild(leaveButton);
                }
                if (checkInRecord) {
                    let timeToShow = checkInRecord.startTime.substring(0, 5);
                    cell4.innerHTML = `<span>${timeToShow}</span>`;

                    if (checkInRecord.endTime) {
                        let endTimeToShow = checkInRecord.endTime.substring(0, 5);
                        cell6.innerHTML = `<span>${endTimeToShow}</span>`;
                        cell7.innerHTML = `<span>${checkInRecord.studyHours}</span>`;
                    }
                }
                
            }
        }
    })
})
