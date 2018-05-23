// 载入数据
var data_tags = Bmob.Object.extend("tags");

// 加载表 article 中数据
var query_tags = new Bmob.Query(data_tags);

// 按 名字 升序排列
query_tags.ascending("name");

// 查询所有数据
var str_tag = "";
query_tags.find({
    success: function(results) {
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
            var object = results[i];

            str_tag += "<div class=\"clearfix\"><div style=\"float:left;\">" +
                "<a href=\"javascript:load_list('" + object.get("name") + "', 'NULL')\">" + object.get("name") + "</a>" +
                "</div>";
            str_tag += "<div style=\"float:right;\">" +
                object.get("num") + "篇" +
                "</div></div>";
        }

        // 加载数据到 文章列表
        $("#tags").html(str_tag);
    },
    error: function(error) {
        alert("查询失败: " + error.code + " " + error.message);
    }
});



// 载入数据
var data_time= Bmob.Object.extend("time");

// 加载表 time 中数据
var query_time = new Bmob.Query(data_time);

// 按 时间 降序排列
query_time.descending("time");

// 查询所有数据
var str_time = "";
query_time.find({
    success: function(results) {
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
            var object = results[i];

            str_time += "<div class=\"clearfix\"><div style=\"float:left;\">" +
                "<a href=\"javascript:load_list('NULL', '" + object.get("time") + "')\">" + object.get("time") + "</a>" +
                "</div>";
            str_time += "<div style=\"float:right;\">" +
                object.get("num") + "篇" +
                "</div></div>";
        }

        // 加载数据到 文章列表
        $("#time").html(str_time);
    },
    error: function(error) {
        alert("查询失败: " + error.code + " " + error.message);
    }
});