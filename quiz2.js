$(function(){
   loaddata();
   $("#shoes").on("click", ".btn-danger", handleDelete);
   $("#shoes").on("click", ".btn-warning", handleUpdate);
   $("#addBtn").click(addShoes);
   $("#updateSave").click(function(){
    var id = $("#updateId").val();
    var title2 = $("#updateTitle").val();
    var description2 = $("#updateBody").val();
    const newobj1={
      title:title2,
      description:description2
   }
    $.ajax({
      url: "https://apiassign.herokuapp.com/posts/" + id,
      data:newobj1,
      method: "PATCH",
      success: function(response) {
        console.log(response);
        loaddata();
        $("#updateModal").modal("hide");
       
      }
    });
}); 

});

function loaddata() {
    $.ajax({
      url: "https://apiassign.herokuapp.com/posts",
      method: "GET",
      error: function(response) {
        var recipes = $("#recipes");
        recipes.html("An Error has occured");
      },
      success: function(response) {
        console.log(response);
        var recipes = $("#shoes");
        recipes.empty();
        for (var i = 0; i < response.length; i++) {
          var rec = response[i];
          recipes.append(
            `<div class="shoesofmen" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.description}</p></div>`
          );
        }
      }
    });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".shoesofmen");
  let id = parentDiv.attr("data-id");

  $.ajax({
    url: "https://apiassign.herokuapp.com/posts/" + id,
    method: "DELETE",
    success: function() {
      loaddata();
    }
  });
}


function addShoes() {
  var title1 = $("#title").val();
  var description1= $("#description").val();
  const newobj={
    title:title1,
    description:description1
 }
  $.ajax({
    url: "https://apiassign.herokuapp.com/posts/",
    method: "POST",
    data: newobj,
    success: function(response) {
      console.log(response);
      loaddata();     
    }
  });
}

function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".shoesofmen");
  let id = parentDiv.attr("data-id");
  $.get("https://apiassign.herokuapp.com/posts/" + id, function(
    response
  ) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.description);
    $("#updateModal").modal("show");
    console.log(id);
  });
}