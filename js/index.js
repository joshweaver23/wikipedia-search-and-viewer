$(document).ready(function() {
  var isOpen = false;
  
  $("#search-btn").click(function() {
    if (!isOpen) {
      $("#search-input").css("display", "inline");
      $("#search-input").focus();
      isOpen = true;
    }
    else {
      $("#search-input").css("display", "none");
      isOpen = false;
    }    
    
  });
  
  $("#search-input").keyup(function(e){
    var q = $("#search-input").val();
    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
    {
      srsearch: q,
      action: "query",
      list: "search",
      format: "json"
    },
    function(data) {
      console.log(data);
      $("#results").empty();
      $("#results").append("<h3>Results for <b>'" + q + "'</b></h3>");
      $.each(data.query.search, function(i,item){
        $("#results").append("<div class='result-output'><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "' target='blank'><b>" + item.title + "</b>:  </a>" + item.snippet + "</div>");
      });

    });
  });
    
});