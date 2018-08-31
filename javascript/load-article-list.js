function load_list(tags, time, page) {
    // 载入数据
    var data_article = Bmob.Object.extend("article");

    // 加载表 article 中数据
    var query_article = new Bmob.Query(data_article);

    // 先按 置顶程度 降序排列
    query_article.descending("z-index");
    // 再按 修改时间 降序排列
    query_article.descending("updatedAt");
    
    // 按 tags 筛选
    if (tags != "NULL")
        query_article.equalTo("tags", tags);

    // 查询所有数据
    var str = "";
    var cnt = 0;
    query_article.find({
        success: function(results) {
            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var object = results[i];

                // 按 time 筛选
                if (time != "NULL" && time != object.createdAt.substr(0, 7))
                    continue;
                
                cnt += 1;
                if (cnt <= 10*page-10)
                    continue;
                if (cnt > 10*page)
                    continue;
                
                // 加载文章链接
                str += "<div class=\"article-list\">" +
                    "<a href=\"?id=" + object.id + "\">" + object.get("title") + "</a>" +
                    "<p>" + "最后更新: " + object.updatedAt + 
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "发布时间: " + object.createdAt + "</p>" +
                    "<p>" + translate(object.get("content")) + "</p>" +
                    "</div>";
            }
            
            // 加载文章超链接? (不知道怎么称呼)
            str += "<div align=\"right\">";
            
            if (cnt <= 100) {
                for (var i = 1; 10*i-10 < cnt; i++)
                    str += "<div class=\"header-link\">" +
                        "<a href=\"javascript:load_list('" + tags + "', '" + time + "', " + i + ")\">" + i + "</a>" +
                        "</div>";
            }
            else {
                for (var i = Math.max(page-4,1); i <= Math.max(page+5,10); i++)
                    str += "<div class=\"header-link\">" +
                        "<a href=\"javascript:load_list('" + tags + "', '" + time + "', " + i + ")\">" + i + "</a>" +
                        "</div>";
            }
            
            str += "</div>";

            // 加载数据到 文章列表
            $("#article").html(str);
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}

// markdown 转换为 txt
function translate(str) {
    str = marked(str);
    str = str.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'')
        .replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ').replace(/\$/g,' ');
    if (str.length <= 170)
        return str;
    else
        return str.substr(0, 170) + "...";
}
