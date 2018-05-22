function load(id) {
    var query = new Bmob.Query(data_article);

    //查询单条数据，第一个参数是这条数据的objectId值
    query.get(id, {
        success: function(object) {
            // 查询成功，调用get方法获取对应属性的值

            var str = "# " + object.get("title") + "\n" +
                      "<p align='center'>" + object.createdAt + "</p>\n\n" +
                      "------\n" +
                      object.get("content");

            // 加载数据到 文章
            $("#article").html(marked(str));
            $("#article").addClass("markdown-body");
        },
        error: function(object, error) {
            // 查询失败
        }
    });
}