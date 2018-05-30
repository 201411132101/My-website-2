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
                alert("添加数据成功，返回的objectId是："+object.id);
            },
            error: function(object, error) {
                 // 添加失败
                 alert('添加数据失败，返回错误信息：' + error.description);
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
                    success: function(object) {
                        alert("修改成功.");
                    },
                    error: function(object, error) {
                        // 修改失败
                        alert('修改数据失败，返回错误信息：' + error.description);
                    }
                });
            },
            error: function() {
                alert("查询失败");
            }
        });
    }
}