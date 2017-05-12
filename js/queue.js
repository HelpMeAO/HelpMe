$(document).ready(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/tickets", false);
  xhr.send();
  var tickets = JSON.parse(xhr.response);
  var table = New Table();
});
