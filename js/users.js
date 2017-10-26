$(document).ready(function() {
  // Create a new Queue
  var users = new user();
  // Get the tickets
  users.getTickets();

  function user () {
    this.getTickets = function() {
      // Start a XHR request to the API
      $.ajax({
        url: "api/users",
        method: "GET"
      }).done(function(data) {
        users.createTable(data);
      });
    }
    this.createTable = function(data) {
      for (key in data) {
        // Get the current ticket (obj)
        var obj = data[key];

        // Create table row for ticket
        var tr = document.createElement("tr");
        tr.className = key;

        // Create Name td
        var tdName = document.createElement("td");
        tdName.className = "name";
        $(tdName).text(obj.firstName + "" + obj.lastName);
        tr.appendChild(tdName);

        var email = document.createElement("td");
        email.className = "email";
        $(email).text(obj.email);
        tr.appendChild(email);

        // Create Teacher td
        var teacher = document.createElement("td");
        teacher.className = "teacher";
        $(teacher).text(obj.teacher);
        tr.appendChild(teacher);

        // Create Teacher td
        var status = document.createElement("td");
        status.className = "status";
        $(status).text(obj.status);
        tr.appendChild(status);

          // Finally append everything to the table
          $(".tbody-wrapper").append(tr);
          $(tr).hide();
          $(tr).fadeIn("slow");
        }
      }

  }
});
