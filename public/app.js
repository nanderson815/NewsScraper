

$("#scrape").click(() => {
    $.ajax("/api/scrape", {
        type: "GET",
    }).then(() => {
        location.reload();
    })
});

$(".comments").click(function(){
    let id = $(this).data("id");
    window.location.href = '/articles/' + id
});

$("#submit").click(function(e){
    e.preventDefault();
    let id = $(this).data("id");
    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            user: $("#user").val(),
            comment: $("#comment").val()
        }
    }). then(function(data){
        location.reload();
    })
});

$("#home").click(function(){
    window.location.href = '/'
});



