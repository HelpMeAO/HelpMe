$(document).ready(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/tickets", false);
  xhr.send();

  console.log(xhr.status);
  console.log(xhr.statusText);
});
