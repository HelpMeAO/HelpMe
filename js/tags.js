// $(document).ready(function() {
	// Creates a Tags constructor for listing. parameter: array.
	var TagsUI = new TagsUI();
	// Loads the tags on arival on the page.
	TagsUI.loadTags();
	// Adds the event listners to the elements.
	TagsUI.addEventListeners();

	function TagsUI () {
		// Create a way to generate the html for the form.
		this.generateFormHTML =  function(id, name, description, checked) {
			// Sets standard values for inputs if left empty.
			name = name || "";
			description = description || "";
			// Tests if there is an id given with the request.
			if(typeof id === "undefined") {
				// If the id is undefined then it is a create.
				var formAction = "/api/tags";
				var formMethod = "post";
				var headerText = "Voeg een tag toe.";
				var captionText = "Voeg een tag toe, Vul de tagname en de beschrijving in.";
			} else {
				// Else if the id is defined then it is a edit.
				var formAction = "/api/tags/" + id;
				var formMethod = "post";
				var headerText = "Bewerk een tag.";
				var captionText = "Bewerk een tag, Verander de tagname en de beschrijving.";
			}
			var editor = $('<div/>');

    		var header = $('<h4/>',{
    			"class": "header",
    			"text": headerText
    		}).appendTo(editor);

    		var caption = $('<p/>', {
    			"class": "caption",
    			"text": captionText
    		}).appendTo(editor);

    		var form = $('<form/>', {
    			"class": "col s12",
    			"action": formAction,
    			"method": formMethod
    		}).appendTo(editor);

    		var row = $('<div/>',{
    			"class": "row"
    		}).appendTo(form);

    		var inputField = $('<div/>',{
    			"class": "input-field col s12"
    		}).appendTo(row);

    		var tagName = $('<input/>',{
				"type": "text",
				"name": "tagName",
				"placeholder": "Voer hier de naam in van de Tag",
    			"value": name
    		}).appendTo(inputField);

   			var tagDescription = $('<input/>',{
    			"type": "text",
    			"name": "tagDescription",
    			"placeholder": "Vul hier de beschrijving in van de tag",
    			"value": description
    		}).appendTo(inputField);

   			var testCheckboxP = $('<p/>').appendTo(inputField);

   			var tagTest = $('<input/>',{
    			"type": "checkbox",
    			"id": "testCheckbox",
    			"name": "tagTest",
    			"checked": checked
    		}).appendTo(testCheckboxP);

   			var tagTestLabel = $('<label/>',{
    			"for": "testCheckbox",
    			"text": "Test tag"
    		}).appendTo(testCheckboxP);

   			var submitP = $('<p/>').appendTo(inputField);

   			var submit = $('<button/>',{
    			"class": "btn waves-effect waves-light",
    			"type": "submit",
    			"name": "action",
    			"text": "Submit"
    		}).appendTo(submitP);

   			var icon = $('<i/>',{
    			"class": "material-icons right",
    			"text": "send"
    		}).appendTo(submit);

			return editor;
		},
		// Create a way to generate the html for the tags.
		this.generateTagHTML =  function(title, text, id, active, test) {
			if (active == true){
					var html = document.createElement("div");
					html.className = "card blue-grey darken-1";
					$(html).attr("data-id", id);
    	} else {
					var html = document.createElement("div");
					html.className = "card blue-grey darken-4";
					$(html).attr("data-id", id);
    	}
			var cardContent = document.createElement("div");
			cardContent.className = "card-content white-text";
			$(html).append(cardContent);

			var cardContentSpan = document.createElement("span");
			cardContentSpan.className="card-title";
			$(cardContentSpan).text(title);
			$(cardContent).append(cardContentSpan);

			var cardContentSpanP = document.createElement("p");
			$(cardContentSpanP).text(text);
			$(cardContentSpan).append(cardContentSpanP);

			var cardAction = document.createElement("div");
			cardAction.className = "card-action";
			$(html).append(cardAction);

			if(active == true){

				var aButton = document.createElement("a");
				aButton.href = "javascript:void(0)";
				aButton.className = "changetTag";
				$(aButton).text("Wijzig");
				$(cardAction).append(aButton);

				var aButton2 = document.createElement("a");
				aButton2.href = "javascript:void(0)";
				aButton2.className = "archieveTag";
				$(aButton2).text("Archieveer");
				$(cardAction).append(aButton2);

				var confirmArchievediv = document.createElement("div");
				confirmArchievediv.className="confirmArchieveDiv";
				$(cardAction).append(confirmArchievediv);

				var spanConfirmArchive = document.createElement("span");
				spanConfirmArchive.className="confirmArchieve";
				$(spanConfirmArchive).text("Weet u zeker dat u deze tag wilt archiveren?");
				$(confirmArchievediv).append(spanConfirmArchive);

				var archiveTagConfirm = document.createElement("a");
				archiveTagConfirm.className = "archieveTagConfirm btn waves-effect waves-light";
				$(archiveTagConfirm).text("Ja");
				$(spanConfirmArchive).append(archiveTagConfirm);

				var archieveTagCancel = document.createElement("a");
				archiveTagConfirm.className = "archieveTagCancel btn waves-effect waves-light";
				$(archiveTagConfirm).text("Nee");
				$(spanConfirmArchive).append(archieveTagCancel);

			}
			else{
				var aButton = document.createElement("a");
				aButton.href = "javascript:void(0)";
				aButton.className = "activeTag";
				$(aButton).text("Activeer");
				$(cardAction).append(aButton);

				var confirmActiveDiv = document.createElement("div");
				confirmActiveDiv.className="confirmActiveDiv";
				$(confirmActiveDiv).append(cardAction);

				var spanConfirmActive = document.createElement("span");
				spanConfirmActive.className="spanConfirmActive";
				$(spanConfirmActive).text("Weet u zeker dat u deze tag wilt activeren?");
				$(confirmActiveDiv).append(spanConfirmActive);

				var activeTagConfirm = document.createElement("a");
				activeTagConfirm.className = "activeTagConfirm btn waves-effect waves-light";
				$(activeTagConfirm).text("Ja");
				$(spanConfirmActive).append(activeTagConfirm);

				var activeTagCancel = document.createElement("a");
				activeTagCancel.className = "activeTagCancel btn waves-effect waves-ligh";
				$(activeTagCancel).text("Nee");
				$(spanConfirmActive).append(activeTagCancel);
			}
				if(test){
					var aButton = document.createElement("a");
					aButton.href = "javascript:void(0)";
					aButton.className = "deleteTag";
					$(aButton).text("Verwijder");
					$(cardAction).append(aButton);

					var confirmDeleteDiv = document.createElement("div");
					confirmDeleteDiv.className="confirmDeleteDiv";
					$(cardAction).append(confirmDeleteDiv);

					var confirmDelete = document.createElement("span");
					confirmDelete.className="confirmDelete";
					$(confirmDelete).text("Weet u zeker dat u deze tag wilt verwijderen?");
					$(confirmDeleteDiv).append(confirmDelete);

					var deleteTagConfirm = document.createElement("a");
					deleteTagConfirm.className = "deleteTagConfirm btn waves-effect waves-light";
					$(deleteTagConfirm).text("Ja");
					$(confirmDelete).append(deleteTagConfirm);

					var deleteTagCancel = document.createElement("a");
					deleteTagCancel.className = "deleteTagCancel btn waves-effect waves-light";
					$(deleteTagCancel).text("Nee");
					$(confirmDelete).append(deleteTagCancel);
				}

    		var col = document.createElement('div');
    		col.className = "col s12 m6";
     		$(col).append(html);
    		return col;
		},
		// Displays a single tag and adds it to the tagList object.
		this.displayTag =  function(id, title, text, active, test) {
			// Generates the html and puts it in a reference.
			var ref = this.generateTagHTML(title, text, id, active, test);
			// Tests if the tag is active.
			if (active == true){
				// If the tag is active than add it to the tagsList.
				var selector = ".tagsList";
    		}
    		else{
    			// If the tag is not active than add it to the AtagsList.
    			var selector = ".AtagsList";
    		}
    		// Executes the action.
    		document.querySelector(selector).appendChild(ref);
		},
		// Handels all xhr request.
		this.tagActions = function(action, callback) {
			// Puts the standard url for the tags: "/api/tags/" in a variable.
			var apiURL = "/api/tags/";
			// Tests if the id is set.
			if(typeof action.id !== 'undefined') {
				// If the id is set add the id to the end of the url.
				apiURL = apiURL + action.id;
			}

			var xhr = new XMLHttpRequest();
			// Makes the callback.
			xhr.onreadystatechange = function() {
	  			if (this.readyState == 4 && this.status == 200) {
	  				if(typeof callback == 'function') {
	   					callback.call(xhr);
	  				}
			    }
			};

			// Opens the xhr request and put the method, url and make it asynchronous.
			xhr.open(action.method, apiURL, true);
			// Sends the request with potential data.
  			xhr.send(action.data);
		},
		this.displayTags = function(tags) {
			for (var key in tags) {
 				if (tags.hasOwnProperty(key)) {
 					var id = key;
 					var name = tags[key].name;
 					var description = tags[key].description;
 					var active = tags[key].active;
 					var test = tags[key].test;

    				this.displayTag(id, name, description, active, test);
 				}
			}
		},
		this.displayForm =  function(id, tag) {
			if(typeof tag !== 'undefined'){
				var editor = this.generateFormHTML(id, tag.name, tag.description , tag.test);
			} else {
				var editor = this.generateFormHTML();
			}

			var container = document.querySelector(".editor");
			container.removeChild(container.firstChild);
			editor.appendTo(container);
		},
		this.loadTags =  function() {
			this.tagActions({"method": "GET" },
				function() {
				var tags = JSON.parse(this.response);
				TagsUI.displayTags(tags);
			});
		},
		this.addEventListeners =  function() {
			var addButton = document.querySelector(".addButton");
			addButton.addEventListener('click', function() {
				TagsUI.displayForm();
				el = $('.editor');
				var pos = el.offset().top - 170;
				$("html, body").animate({ scrollTop: pos }, 1400);
			});
			// Gets a reference to the tagslist.
			var list = $('.tagsList, .AtagsList');
			// Adds a event listener for clicks.
			list.on('click', function(event) {
				var target = $( event.target );
				// Checks if the click is on a anchor.
				if(target.is('A')) {
					var id = target.parent().parent().data("id");
					// Checks if the click is on the edit.
					if(target.is('.changeTag')) {
						TagsUI.tagActions({
							"method":"GET",
							"id": id
						},
						function() {
							var tag = JSON.parse(this.response);
							TagsUI.displayForm(tag.key, tag.data);
						});
						el = $('.editor');
						var pos = el.offset().top - 170;
						$("html, body").animate({ scrollTop: pos }, 1400);
					}
					if(target.is('.archieveTag')){
						$('.confirmDiv').removeClass('active');
						$(target).siblings('.confirmArchieveDiv').addClass('active');
					}
					if(target.is('.activeTag')){
						$('.confirmDiv').removeClass('active');
						$(target).siblings('.confirmActiveDiv').addClass('active');
					}
					if(target.is('.deleteTag')){
						$('.confirmDiv').removeClass('active');
						$(target).siblings('.confirmDeleteDiv').addClass('active');
					}
					if(target.is('.archieveTagConfirm, .activeTagConfirm')){
						card = $(target).parent().parent().parent().parent();
						TagsUI.tagActions({'method':'MOVE', 'id':card.data('id')});
						card.parent().css("opacity", "0");
  						setTimeout(function(){ card.parent().remove(); }, 400);
					}
					if(target.is('.deleteTagConfirm')){
						card = $(target).parent().parent().parent().parent();
						TagsUI.tagActions({'method':'DELETE', 'id':card.data('id')});
						card.parent().css("opacity", "0");
  						setTimeout(function(){ card.parent().remove(); }, 400);
					}
					if(target.is('.archieveTagCancel, .activeTagCancel, .deleteTagCancel')){
						$(target).parent().parent().removeClass('active');
					}
				}
			});
			var editor = $('.editor');
			editor.on('click', function(event) {

			});
		}
		// Create a way to remove a tag from the html.

		// Create a way to edit a tag in the html.
	}

	// TagsUI.generateFormHTML();
// });
