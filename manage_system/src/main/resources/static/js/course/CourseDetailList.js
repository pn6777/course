$(document).ready(function(){

    let pageArr = []

    $.ajax({
        url: "/course/serchCategory",
        method: "GET",
        dataType: "json",
        success: function(objRes) {
            let pullDown = objRes;
            let levelSelect = $(".level");
            let frameSelect = $(".frame");
            let languageSelect = $(".language");
            $.each(pullDown.courseCategory, function(index, value){
                if(pullDown.courseCategory[index].type != null){
                    let option = $('<option></option>');
                    option.val(pullDown.courseCategory[index].type).text(pullDown.courseCategory[index].type);
                    levelSelect.append(option);
                };
                if(pullDown.courseCategory[index].language != null){
                    let option = $('<option></option>');
                    option.val(pullDown.courseCategory[index].language).text(pullDown.courseCategory[index].language);
                    languageSelect.append(option);
                };
                if(pullDown.courseCategory[index].type != null){
                    let option = $('<option></option>');
                    option.val(pullDown.courseCategory[index].frame).text(pullDown.courseCategory[index].frame);
                    frameSelect.append(option);
                };
            })
        },
    });

    $.ajax({
        url: "/course/serchContent",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "lectureLanguage" : null,
            "frame" : null,
            "type" : null
        }),
        dataType: "json",
        success: function(response) {
            pageArr = response.courseContent

            let itemsPerPage = 4;

            // 当前页码
            let currentPage = 1;

            // 根据当前页码显示数据
            function renderData() {
                let startIndex = (currentPage - 1) * itemsPerPage;
                let endIndex = startIndex + itemsPerPage;
                let dataToShow = pageArr.slice(startIndex, endIndex);

                $("#content").empty(); // 清空容器
                $.each(dataToShow, function(index, item) {
                    let div = $("<div>").append(
                        $("<div>").text(item.name),
                        $("<button>").text("編修").click(function(){
                            sessionStorage.setItem('contentNumber', item.courseNumber);
                            console.log(item.courseNumber);
                            window.location.href = "/course/managerCourseDetailEdit";
                        }),
                        $("<p>").text(item.content)
                    );
                    $("#content").append(div);
                });
            }

            // 初始化页面
            renderData();

            // 点击下一页按钮
            $("#nextPage").click(function() {
                if (currentPage < Math.ceil(pageArr.length / itemsPerPage)) {
                    currentPage++;
                    renderData();
                }
            });

            // 点击上一页按钮
            $("#prevPage").click(function() {
                if (currentPage > 1) {
                    currentPage--;
                    renderData();
                }
            });

    let levelSelect = $(".level");
    let frameSelect = $(".frame");
    let languageSelect = $(".language");

    $("#selectMaterial").click(function(){
        $.ajax({
            url: "/course/serchContent",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "lectureLanguage" : languageSelect.val(),
                "frame" : frameSelect.val(),
                "type" : levelSelect.val()
            }),
            dataType: "json",
            success: function(response) {
                pageArr = "";
                pageArr = response.courseContent
        
                let itemsPerPage = 4;
    
                // 当前页码
                let currentPage = 1;
    
                // 根据当前页码显示数据
                function renderData() {
                    let startIndex = (currentPage - 1) * itemsPerPage;
                    let endIndex = startIndex + itemsPerPage;
                    let dataToShow = pageArr.slice(startIndex, endIndex);
    
                    $("#content").empty(); // 清空容器
                    $.each(dataToShow, function(index, item) {
                        console.log(item);
                        let div = $("<div>").append(
                            $("<div>").text(item.name),
                            $("<button>").text("編修").click(function(){
                                sessionStorage.setItem('contentNumber', item.courseNumber);
                                console.log(item.courseNumber);
                                window.location.href = "/course/managerCourseDetailEdit";
                            }),
                            $("<p>").text(item.content)
                        );
                        $("#content").append(div);
                    });
                }
    
                // 初始化页面
                renderData();
            }
        });
    })
    
        }
        
    });
})