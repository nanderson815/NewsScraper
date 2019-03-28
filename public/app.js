

$("#scrape").click(() => {
    $.ajax("/api/scrape", {
        type: "GET",
    }).then(() => {
        location.reload();
    })
});

$("#comments").click(function(){
    let id = $(this).data("id");
    window.location.href = '/articles/' + id
});

$("#submit").click(function(e){
    e.preventDefault();
    console.log("hey");
})

