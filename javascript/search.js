function search() {
    var keyword = $("#search-input").val();

    // 载入数据
    var data_article = Bmob.Object.extend("article");

    // 加载表 article 中数据
    var query_article = new Bmob.Query(data_article);

    // 先按 置顶程度 降序排列
    query_article.descending("z-index");
    // 再按 添加时间 降序排列
    query_article.descending("createdAt");

    // 查询所有数据
    query_article.find({
        success: function(results) {
            var str = "";

            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var temp_str = object.get("title") + object.get("content");
                if (temp_str.match(keyword)){
                    str += "<div class=\"article-list\">" +
                        "<a href=\"?id=" + object.id + "\">" + object.get("title") + "</a>" +
                        "<p>" + object.createdAt.substr(0, 10) + "</p>" +
                        "<p>" + translate(object.get("content")) + "</p>" +
                        "</div>";
                }
            }

            if (str == "")
                str = "<p>查询 " + keyword + " 未得到到相关结果.</p>";

            // 加载数据到 文章列表
            $("#article").html(str);
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}