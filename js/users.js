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
        $(tdName).text(obj.firstName + " " + obj.lastName);
        tr.appendChild(tdName);

        var email = document.createElement("td");
        email.className = "email";
        $(email).text(obj.email);
        tr.appendChild(email);

        // Create Teacher td
        var teacher = document.createElement("td");
        teacher.className = "teacher";
        var button = document.createElement("a");
        button.href = "#";
        var icon = document.createElement("i");
        icon.className="material-icons promotion";
        if(obj.teacher) {
          $(icon).text("arrow_drop_down");
          $(icon).attr("id", "downgrade");
          $(teacher).text("Leraar");
          button.appendChild(icon);
        } else if (!obj.teacher) {
          $(icon).text("arrow_drop_up");
          $(icon).attr("id", "upgrade");
          $(teacher).text("Student");
          button.appendChild(icon);
        }
        teacher.appendChild(button);
        tr.appendChild(teacher);

        // Create Teacher td
        var active = document.createElement("td");
        active.className = "active";
        if(obj.active) {
          $(active).text("Actief");
        } else if(!obj.active) {
          $(active).text("Inactief");
        }
        tr.appendChild(active);

          // Finally append everything to the table
          $(".tbody-wrapper").append(tr);
          $(tr).hide();
          $(tr).fadeIn("slow");
        }
        $("i.promotion").click(function() {
          var user = $(this).parents("tr").children(".name").text();
          var succes = confirm("Wil je: '" + user + "' .... naar student?");
          console.log(succes);
        });
      }
  }
});
