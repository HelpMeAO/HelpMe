$(document).ready(function() {

	var dynamicTags = new dynamicTags();
	dynamicTags.getTags();

	function dynamicTags() {
		this.getTags = function() {
      // Get the tags from the API
			$.ajax({
        url: "api/tags",
        method: "GET"
      }).done(function(data) {
        dynamicTags.createSelect(data);
      });
		}

		this.createSelect = function(data) {
      // Create a dropdown

			var dropDown = $("<select>",{
				multiple: "multiple",
				required: "required",
				id: "tags",
				name: "tags"
			});

      // Create a disabled option for explanation

			var disabledOption = $("<option/>", {
				value: "0",
				disabled: "disabled",
			}).text("Selecteer je onderwerp").appendTo(dropDown);

			// loop trough all of the tags
			for(key in data) {
				// Get current tag
				var obj = data[key];

				// check if the current tag is active
				if (obj.active) {
          // Create a option with correct value and text
					var disabledOption = $("<option/>", {
						value: key,
					}).text(obj.name).appendTo(dropDown);
				}
			}
      // Append the dropdown to the page
      $(dropDown).appendTo("div.questions");
      
      // Force Materialize to re-initialize the select
    	$('select').material_select();
		}
	}
});
