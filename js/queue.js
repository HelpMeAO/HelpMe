$(document).ready(function() {
  var queue = new queue();
  queue.getTickets();
  function queue () {
    this.getTickets = function() {
      // Start a XHR request to the API
      $.ajax({
        url: "api/tickets",
        method: "GET"
      }).done(function(data) {
        queue.createTable(data);
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
        tdName.innerHTML = obj.student;
        tr.appendChild(tdName);

        // Create Tag td
        var tdTag = document.createElement("td");
          for(var i = 0; i < obj.tags.length; i ++) {
            var tagChip = document.createElement("div");
            tagChip.className = "chip";
            // Get the tag value from the array
            tagChip.innerHTML = obj.tags[i];
            // Add the just generated chip to tdTag
            tdTag.appendChild(tagChip);
          }
        tr.appendChild(tdTag);

        // Create Teacher td
        var tdTeacher = document.createElement("td");
          if ( obj.teacher != "") {
            var teacherChip = document.createElement("div");
            teacherChip.className = "chip";
            // Get the tacher value from the array
            teacherChip.innerHTML = obj.teacher;
            tdTeacher.appendChild(teacherChip);
          }
        tr.appendChild(tdTeacher);
        // Create Status td
        var tdStatus = document.createElement("td");
        tdStatus.class = "status";
          // Create status icon
          var iStatus = document.createElement("i");
          iStatus.className = "material-icons";
          iStatus.innerHTML = "hourglass_empty";
          tdStatus.appendChild(iStatus);
        // Append status to TableRow
        tr.appendChild(tdStatus);

        // Finally append everything to the table
        $(".tbody-wrapper").append(tr);
        $(tr).hide();
        $(tr).fadeIn("slow");
      }
    }

  }
});
