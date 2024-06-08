$(document).ready(function () {
    let nameInput = $("#textInput");
    let contentInput = $("#contentArea");

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
        success: function (response) {
            let contentArr = response.courseContent;

            let defaultName = '';
            let defaultLanguage = '';
            let defaultLevel = '';
            let defaultFrame = '';
            let defaultContent = '';
            console.log(contentArr);
            console.log(sessionStorage.getItem("contentNumber"));
            contentArr.forEach(item => {
                if(sessionStorage.getItem("contentNumber") == item.courseNumber){
                    defaultName = item.name;
                    defaultLanguage = item.lectureLanguage;
                    defaultLevel = item.type;
                    defaultFrame = item.frame;
                    defaultContent = item.content;
                }
            });

            nameInput.val(defaultName);
            contentInput.val(defaultContent);

            $.ajax({
                url: "/course/serchCategory",
                method: "GET",
                dataType: "json",
                success: function (objRes) {
                    let pullDown = objRes;
                    let levelSelect = $("#level");
                    let frameSelect = $("#frame");
                    let languageSelect = $("#language");
                    console.log(pullDown);
                    $.each(pullDown.courseCategory, function (index, value) {
                        if (pullDown.courseCategory[index].type != null) {
                            let option = $('<option></option>');
                            console.log(pullDown.courseCategory[index].type);
                            option.val(pullDown.courseCategory[index].type).text(pullDown.courseCategory[index].type);
                            if (pullDown.courseCategory[index].type === defaultLevel) {
                                option.prop('selected', true);
                            }
                            levelSelect.append(option);
                        };
                        if (pullDown.courseCategory[index].language != null) {
                            let option = $('<option></option>');
                            console.log(pullDown.courseCategory[index].language);
                            option.val(pullDown.courseCategory[index].language).text(pullDown.courseCategory[index].language);
                            if (pullDown.courseCategory[index].language === defaultLanguage) {
                                option.prop('selected', true);
                            }
                            languageSelect.append(option);
                        };
                        if (pullDown.courseCategory[index].type != null) {
                            let option = $('<option></option>');
                            console.log(pullDown.courseCategory[index].frame);
                            option.val(pullDown.courseCategory[index].frame).text(pullDown.courseCategory[index].frame);
                            if (pullDown.courseCategory[index].frame === defaultFrame) {
                                option.prop('selected', true);
                            }
                            frameSelect.append(option);
                        };
                    })
                },
            });

            let textInput = $("#textInput");
            let language = $("#language");
            let frame = $("#frame");
            let level = $("#level");
            let contentArea = $("#contentArea");


            $("#btnSave").click(function () {
                if(textInput.val() == "" || language.val() == "" || level.val() == ""){
                    alert("内容が記入されているかご確認ください!?");
                    return;
                }
                $.ajax({
                    url: "/course/createOrUpdateContent",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "courseNumber": sessionStorage.getItem("contentNumber"),
                        "name": textInput.val(),
                        "lectureLanguage": language.val(),
                        "frame": frame.val(),
                        "type": level.val(),
                        "content": contentArea.val()
                    }),
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                    }
                });
                sessionStorage.removeItem("contentNumber");
                window.location.href = "/course/managerCourseDetailList";
            })

            $("#btnCancel").click(function () {
                sessionStorage.removeItem("contentNumber");
                window.location.href = "/course/managerCourseDetailList";
            })
        }
    })
})