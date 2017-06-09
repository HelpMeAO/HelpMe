// $(document).ready(function() {
	// Creates a Tags constructor for listing. parameter: array.
	var TagsUI = new TagsUI();

	TagsUI.loadTags();
	TagsUI.addEventListeners();

	function TagsUI () {
		// Create a way to generate the html for the form.
		this.generateFormHTML =  function(id, name, description) {
			name = name || "";
			description = description || "";

			if(typeof id !== 'undefined') {
				var formAction = "/api/tags/" + id;
				var formMethod = "put";
				var headerText = document.createTextNode("Bewerk een tag.");
				var captionText = document.createTextNode("Bewerk een tag, Verander de tagname en de beschrijving.");
			} else {
				var formAction = "/api/tags";
				var formMethod = "post";
				var headerText = document.createTextNode("Voeg een tag toe.");
				var captionText = document.createTextNode("Voeg een tag toe, Vul de tagname en de beschrijving in.");
			}

    		var editor = document.createElement('div');

	    		var header = document.createElement('h4');
	    		header.className = "header";
	    		header.appendChild(headerText);

	    		var caption = document.createElement('p');
	    		caption.className = "caption";
	    		caption.appendChild(captionText);

	    		var form = document.createElement('form');
	    		form.className = "col s12";
	    		form.action = formAction;
	    		form.method = formMethod;
					var row = document.createElement('div');
					row.className = "row";
						var inputField = document.createElement('div');
						inputField.className = "input-field col s12";
							var tagName = document.createElement('input');
							tagName.type = "text";
							tagName.name = "tagName";
							tagName.placeholder = "Voer hier de naam in van de Tag";
							tagName.value = name;
							var tagDescription = document.createElement('input');
							tagDescription.type = "text";
							tagDescription.name = "tagDescription";
							tagDescription.placeholder = "Vul hier de beschrijving in van de tag";
							tagDescription.value = description;
							var submit = document.createElement('button');
							submit.className = "btn waves-effect waves-light";
							submit.type = "submit";
							submit.name = "action";
								var submitText = document.createTextNode("Submit");
							submit.appendChild(submitText);
								var icon = document.createElement("i");
								icon.className = "material-icons right";
									var iconText = document.createTextNode("send");
								icon.appendChild(iconText);
							submit.appendChild(icon);
						inputField.appendChild(tagName);
						inputField.appendChild(tagDescription);
						inputField.appendChild(submit);
					row.appendChild(inputField);
				form.appendChild(row);
			editor.appendChild(header);
			editor.appendChild(caption);
			editor.appendChild(form);
			

			return editor;


		},
		// Create a way to generate the html for the tags.
		this.generateTagHTML =  function(selector, title, text, id) {
    		var col = document.createElement('div');
    		col.className = "col s12 m6";
    		var card = document.createElement('div');
    		card.className = "card blue-grey darken-1";						// Color change for the future?????

    		var cardContent = document.createElement('div');
    		cardContent.className = "card-content white-text";
    			var cardTitle = document.createElement('span');
    			cardTitle.className = "card-title";
    			var title = document.createTextNode(title); 				// Title goes here.
    			cardTitle.appendChild(title);
    			var cardText = document.createElement('p');
    			var text = document.createTextNode(text); 					// Text goes here.
    			cardText.appendChild(text);

    		cardContent.appendChild(cardTitle);
    		cardContent.appendChild(cardText);

    		var cardAction = document.createElement('div');
    		cardAction.className = "card-action";
    			var cardChange = document.createElement('a');
    			cardChange.id = "edit";
    			cardChange.href = "#";										// The Change link goes here.
    			var changeText = document.createTextNode("Wijzig");
    			cardChange.appendChild(changeText);
    			var cardRemove = document.createElement('a');
    			cardRemove.id = "remove";
    			cardRemove.href = "#";										// The Remove link goes here.
    			var removeText = document.createTextNode("Verwijder");
    			cardRemove.appendChild(removeText);

    		cardAction.appendChild(cardChange);
    		cardAction.appendChild(cardRemove);

    		card.appendChild(cardContent);
    		card.appendChild(cardAction);

    		col.appendChild(card);
    		col.dataset.id = id;

    		document.querySelector(selector).appendChild(col);					// The id for the querySelector goes here.

    		return col;
		},
		// Displays a single tag and adds it to the tagList object
		this.displayTag =  function(id, title, text) {
			// Generates the html and puts it in a reference.
			var ref = this.generateTagHTML(".tagsList", title, text, id);
		},
		// tagActions
		this.tagActions = function(action, callback) {
			var apiURL = "/api/tags/";

			if(typeof action.id !== 'undefined') {
				apiURL = apiURL + action.id;
			}
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
	  			if (this.readyState == 4 && this.status == 200) {
	  				if(typeof callback == 'function') {
	   					callback.call(xhr);
	  				}
			    }
			};
			xhr.open(action.method, apiURL, true);
  			xhr.send(action.data);
		},
		this.displayTags = function(tags) {
			for (var key in tags) {
 				if (tags.hasOwnProperty(key)) {
 					var id = key;
 					var name = tags[key].name;
 					var description = tags[key].description;
    				this.displayTag(id, name, description);
 				}
			}
		},
		this.displayForm =  function(tag) {
			if(typeof tag !== 'undefined'){
				var editor = this.generateFormHTML(tag.id, tag.name, tag.description);
			} else {
				var editor = this.generateFormHTML();
			}
			
			var container = document.querySelector(".editor");
			container.removeChild(container.firstChild);
			container.appendChild(editor);
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
			});
			// Get a reference to the tagslist.
			var list = $('.tagsList');
			// Add a event listener for clicks.
			list.on('click', function(event) {
				var target = $( event.target );
				// Check if the click is on a anchor.
				if(target.is('A')) {
					var id = target.parent().parent().parent().data("id");
					// Check if the click is on the edit.
					if(target.is('#edit')) {
						TagsUI.tagActions({
							"method":"GET",
							"id": id
						},
						function() {
							var tag = JSON.parse(this.response);
							TagsUI.displayForm(tag);
						});
					}
					// check if the click is on the remove.
					if(target.is('#remove')) {
						console.log(event);
					}
				}
			});
			var editor = $('.editor');
			editor.on('click', function(event) {
				var target = $(event.target);
				if(target.is('BUTTON')) {
					event.preventDefault();
					var tagName = editor.find('input[name="tagName"]').val();
					var tagDescription = editor.find('input[name="tagDescription"]').val();
				}
			});
		}
		// Create a way to remove a tag from the html.

		// Create a way to edit a tag in the html.
	}

	// TagsUI.generateFormHTML();
// });
