// $(document).ready(function() {
	// Creates a Tags constructor for listing. parameter: array.
	var TagsUI = new TagsUI();
	var tagsList = new Tags();

	TagsUI.loadTags();
	TagsUI.addEventListeners();
	
	function Tags(tags) {
		this.list = tags || [];
	}
	Tags.prototype.add = function(tag) {
		this.list.push(tag);
	}
	// Creates a single Tag constructor for the Tags list. parameters: string.
	function Tag(id, name, description, ref) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.ref = ref;
	}

	function TagsUI () {
		// Create a way to generate the html for the form.
		this.generateFormHTML =  function(id, name, description) {
			name = name || "";
			description = description || "";

    		var editor = document.createElement('div');

	    		var header = document.createElement('h4');
	    		header.className = "header";
	    			var headerText = document.createTextNode("Voeg een tag toe.");
	    		header.appendChild(headerText);

	    		var caption = document.createElement('p');
	    		caption.className = "caption";
	    			var captionText = document.createTextNode("Voeg een tag toe, Vul de tagname en de beschrijving in.");
	    		caption.appendChild(captionText);

	    		var form = document.createElement('form');
	    		form.className = "col s12";
	    		form.action = "/api/tags";
	    		form.method = "post";
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
							if(typeof id !== 'undefined') {
								var tagId = document.createElement('input');
								tagId.type = "hidden";
								tagId.name = "id";
								tagId.value = id;
								inputField.appendChild(tagId);
							}

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
		this.generateTagHTML =  function(selector, title, text) {
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

    		document.querySelector(selector).appendChild(col);					// The id for the querySelector goes here.

    		return col;
		},
		// Create a way to add a tag to the html.
		this.displayTag =  function(id, title, text) {
			var ref = this.generateTagHTML(".tagsList", title, text);
			tagsList.add(new Tag(id, title, text, ref));
			console.log(tagsList.list);
		},
		this.getTagsJSON =  function(callback) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
  			if (this.readyState == 4 && this.status == 200) {
  				if(typeof callback == 'function') {
   					callback.call(xhr);
  				}

		    }
			};
			xhr.open("GET", "/api/tags", true);
  		xhr.send();
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
		this.loadTags =  function() {
			this.getTagsJSON(function() {
				var tags = JSON.parse(this.response);
				TagsUI.displayTags(tags);
			});
		},
		this.postTagsJSON =  function(data) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "/api/tags", true);

			xhr.send(data);
		},
		this.displayForm =  function(id, name, description) {
			if (typeof id !== 'undefined'){
				var editor = TagsUI.generateFormHTML(id, name, description);
			} else {
				var editor = TagsUI.generateFormHTML();
			}
			var container = document.querySelector(".editor");
			container.removeChild(container.firstChild);
			container.appendChild(editor);
		},
		this.addEventListeners =  function() {
			var addButton = document.querySelector(".addButton");
			addButton.addEventListener('click', function() {
				TagsUI.displayForm();
			});
			var list = document.querySelector('.tagsList');
			list.addEventListener('click', function(event) {
				if(event.target.tagName === 'A') {
					for(var i = 0; i < tagsList.list.length; i++) {
						if(event.path[3] === tagsList.list[i].ref) {
							if(event.target.id === 'edit') {
								TagsUI.displayForm(tagsList.list[i].id, tagsList.list[i].name, tagsList.list[i].description);
							}
							if(event.target.id === 'remove') {

							}
						}
					}
				}
			});
		}
		// Create a way to remove a tag from the html.

		// Create a way to edit a tag in the html.
	}

	// TagsUI.generateFormHTML();
// });
