
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
        if(obj.teacher == "true" || obj.teacher == true) {
          $(icon).text("arrow_drop_down");
          $(icon).attr("id", "downgrade");
          $(teacher).text("Leraar");
          button.appendChild(icon);
        } else if (obj.teacher == "false" || obj.teacher == false) {
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
        var button = document.createElement("a");
        button.href = "#";
        var icon = document.createElement("i");
        icon.className="material-icons activation";
        if(obj.active == "true" || obj.active == true) {
          $(icon).text("arrow_drop_down");
          $(icon).attr("id", "downgrade");
          $(active).text("Actief");
          button.appendChild(icon);
        } else if(obj.active == "false" || obj.active == false) {
          $(icon).text("arrow_drop_up");
          $(icon).attr("id", "upgrade");
          $(active).text("Inactief");
          button.appendChild(icon);
        }
        active.appendChild(button);
        tr.appendChild(active);

          // Finally append everything to the table
          $(".tbody-wrapper").append(tr);
          $(tr).hide();
          $(tr).fadeIn("slow");
        }

        /******************/
        /* Click Handlers */
        /******************/

        $("i.promotion").click(function() {
          const user = $(this).parents("tr").attr("class");
          $.ajax({
            url: "api/users/" + user,
            method: "GET"
          }).done(function(data) {
            var action = data.teacher;
            var string = "Wil je: '" + data.firstName + " " + data.lastName + "'";
            var userData = data;
            if(action == true || action == "true") {
              string += " downgraden naar student?";
              var succes = confirm(string);
              data.teacher = false;
            } else if (action == false || action == "false") {
              string += " upgraden naar leraar?";
              var succes = confirm(string);
              data.teacher = true;
            }
            if(succes) {
              $.ajax({
    					    url: "/api/users/" + user,
                  dataType: "json",
    					    method: "POST",
    					    data: data
    					}).done(function() {
                window.location.reload();
              });
            }
          });
        });
        $("i.activation").click(function() {
          const user = $(this).parents("tr").attr("class");
          $.ajax({
            url: "api/users/" + user,
            method: "GET"
          }).done(function(data) {
            var action = data.active;
            var string = "Wil je: '" + data.firstName + " " + data.lastName + "'";
            var userData = data;
            if(action == true || action == "true") {
              string += " op Inactief zetten?";
              var succes = confirm(string);
              data.active = false;
            } else if (action == false || action == "false") {
              string += " op Actief zetten?";
              var succes = confirm(string);
              data.active = true;
            }
            if(succes) {
              $.ajax({
    					    url: "/api/users/" + user,
                  dataType: "json",
    					    method: "POST",
    					    data: data
    					}).done(function() {
                window.location.reload();
              });
            }
          });
        });
      }
  }
});
