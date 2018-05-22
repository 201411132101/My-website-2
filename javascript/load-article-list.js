// 加载表 article 中数据
var query = new Bmob.Query(data_article);

// 先按添加时间降序排列
query.ascending("name");
// 再按添加时间降序排列
query.ascending("createdAt");

// 查询所有数据
var str = "";
query.find({
    success: function(results) {
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
            var object = results[i];

            str += "<div class=\"article-list\">" +
                "<a href=\"javascript:load('" + object.id + "')\">" + object.get("title") + "</a>" +
                "<p>" + object.createdAt.substr(0, 10) + "</p>" +
                "<p>" + translate(object.get("content")) + "</p>" +
                "</div>";
        }

        // 加载数据到 文章列表
        $("#article").html(str);
    },
    error: function(error) {
        alert("查询失败: " + error.code + " " + error.message);
    }
});

// markdown 转换为 txt
function translate(str) {
    str = marked(str);
    str = str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'')
        .replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
    if (str.length <= 170)
        return str;
    else
        return str.substr(0, 170) + "...";
}