$(document).ready(function() {
  // Create a new Queue
  var queue = new queue();
  // Get the tickets
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
        var tagChip = []
        if(typeof(obj.tags) == "object") {
          for(var i = 0; i < obj.tags.length; i ++) {
            tagChip[i] = document.createElement("div");
            tagChip[i].className = "chip";
            tdTag.appendChild(tagChip[i]);
            $(tagChip[i]).attr("data-id", obj.tags[i]);
            $.ajax({
              url: "api/tags/" + obj.tags[i],
              method: "GET"
            }).done(function(data) {
              $('[data-id="' + data.key + '"]').text(data.data.name);
            });
          }
        } else {
          var tagChip = document.createElement("div");
          tagChip.className = "chip";
          // Get the tag value from the array
          tagChip.innerHTML = obj.tags;
          // Add the just generated chip to tdTag
          tdTag.appendChild(tagChip);
        }
        tr.appendChild(tdTag);

        var tdDescription = document.createElement("td");
        tdDescription.className = "description";
          if (obj.description != "" && obj.description != null) {
            // Get the description value from the array
            tdDescription.innerHTML = obj.description;
          }
        tr.appendChild(tdDescription);

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
