load_tags();
load_time();

function load_tags() {
    // 载入数据
    var data_article = Bmob.Object.extend("article");

    // 加载表 article 中数据
    var query_article = new Bmob.Query(data_article);
    query_article.limit(1000);

    // 再按 tags 升序排列
    query_article.ascending("tags");

    // 查询所有数据
    query_article.find({
        success: function(results) {
            var m_tags = new Map();

            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var name = object.get("tags");

                if (m_tags.has(name))
                    m_tags.set(name, m_tags.get(name) + 1);
                else
                    m_tags.set(name, 1);
            }

            var str_tags = "";
            m_tags.forEach(function (value, key, map) {
                str_tags += "<div class=\"clearfix\"><div style=\"float:left;\">" +
                    "<a href=\"javascript:load_list('" + key + "', 'NULL', 1)\">" + key + "</a>" +
                    "</div>";
                str_tags += "<div style=\"float:right;\">" +
                    value + " 篇" +
                    "</div></div>";
            });


            // 加载数据到 文章列表
            $("#tags").html(str_tags);
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}

function load_time() {
    // 载入数据
    var data_article = Bmob.Object.extend("article");

    // 加载表 article 中数据
    var query_article = new Bmob.Query(data_article);
    query_article.limit(1000);

    // 再按 time 降序排列
    query_article.descending("createdAt");

    // 查询所有数据
    query_article.find({
        success: function(results) {
            var m_time = new Map();

            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                var name = object.createdAt.substr(0, 7);

                if (m_time.has(name))
                    m_time.set(name, m_time.get(name) + 1);
                else
                    m_time.set(name, 1);
            }

            var str_time = "";
            m_time.forEach(function (value, key, map) {
                str_time += "<div class=\"clearfix\"><div style=\"float:left;\">" +
                    "<a href=\"javascript:load_list('NULL', '" + key + "', 1)\">" + key + "</a>" +
                    "</div>";
                str_time += "<div style=\"float:right;\">" +
                    value + " 篇" +
                    "</div></div>";
            });

            // 加载数据到 文章列表
            $("#time").html(str_time);
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
}
