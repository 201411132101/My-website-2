function upload_article(id, title, z_index, tags, time, content) {
    if (id == "NULL") {
        var data_article = Bmob.Object.extend("article");
        var object = new data_article();

        object.set("title", title);
        object.set("z-index", z_index);
        object.set("tags", tags);
        object.set("time", time);
        object.set("content", content);

        object.save(null, {
            success: function(object) {
                alert("create object success, object id:"+object.id);
            },
            error: function() {
                alert("create object fail");
            }
        });
    }
    else {
        // 载入数据
        var data_article = Bmob.Object.extend("article");

        // 加载表 article 中数据
        var query = new Bmob.Query(data_article);

        //查询单条数据，第一个参数是这条数据的objectId值
        query.get(id, {
            success: function(object) {
                // 查询成功，修改数据
                object.set("title", title);
                object.set("z-index", z_index);
                object.set("tags", tags);
                object.set("time", time);
                object.set("content", content);

                object.save(null, {
                    success: function() {
                        alert("修改成功.");
                    },
                    error: function() {
                        alert("修改失败");
                    }
                });
            },
            error: function() {
                alert("查询失败");
            }
        });
    }
}