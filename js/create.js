$(document).ready(function() {

	var lastValidSelection = null;
	var isSelectionValid = null;
	var lastInputValue = null;
	var dynamicTags = new dynamicTags();
	dynamicTags.getTags();

	/**********************/
	/*** GET TAGS LOGIC ***/
	/**********************/
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

			// Logic for dropdown
			$('select').change(function(event) {
				// Check if error excists otherwise remove it
				if($(".error-tomanytags").length) {
					$(".error-tomanytags").remove();
				}
				// Check if user selected more then 3 tags
				if ($(this).val().length > 3) {
					// Disable form
			    $("button[type='submit']").prop("disabled", true);
					// Display error to user
					var error = $('<p/>', {
	    			"class": "error error-tomanytags",
	    			"text": "Je mag maar maximaal 3 tags selecteren."
	    		}).appendTo(".error-validation");

				} else {
					// Enable form
			    $("button[type='submit']").prop("disabled", false);
				}
			});
		}
	}
});
