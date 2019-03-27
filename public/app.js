

$("#scrape").click(() => {
    $.ajax("/api/scrape", {
        type: "GET",
    }).then(() => {
        location.reload();
    })
});

