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
<<<<<<< HEAD
				var headerText = document.createTextNode("Voeg een tag toe.");
				var captionText = document.createTextNode("Voeg een tag toe, Vul de tagname en de beschrijving in.");
=======
				var headerText = "Voeg een tag toe.";
				var captionText = "Voeg een tag toe, Vul de tagname en de beschrijving in.";	
>>>>>>> b275d39a22c5d80a57fd887920856c11792a7d8f
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

<<<<<<< HEAD
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
							var testCheckboxP = document.createElement('p');
								var tagTest = document.createElement('input');
								tagTest.type = "checkbox";
								tagTest.id = "testCheckbox";
								tagTest.name = "tagTest";
								if(checked){
									tagTest.checked = true;
								}
								var tagTestLabel = document.createElement('label');
								tagTestLabel.htmlFor = "testCheckbox";
							tagTestLabel.appendChild(document.createTextNode('Test tag'));
							var submitP = document.createElement('p');
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
						inputField.appendChild(testCheckboxP);
							testCheckboxP.appendChild(tagTest);
							testCheckboxP.appendChild(tagTestLabel);
						inputField.appendChild(submitP);
							submitP.appendChild(submit);
					row.appendChild(inputField);
				form.appendChild(row);
			editor.appendChild(header);
			editor.appendChild(caption);
			editor.appendChild(form);

=======
    		var row = $('<div/>',{
    			"class": "row"
    		}).appendTo(form);
>>>>>>> b275d39a22c5d80a57fd887920856c11792a7d8f

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
    			var html = '<div data-id="'+id+'" class="card blue-grey darken-1">';
    		}
    		else{
    			var html = '<div data-id="'+id+'" class="card blue-grey darken-4">';
    		}
				html +=		'<div class="card-content white-text">'+
								'<span class="card-title">'+title+'</span><p>'+text+'</p>'+
							'</div>'+
							'<div class="card-action">';
			if(active == true){
	    		html +=			'<a href="javascript:void(0)" class="changeTag">Wijzig</a>'+
								'<a href="javascript:void(0)" class="archieveTag">Archieveer</a>'+
								'<div class="confirmArchieveDiv">'+
									'<span class="confirmArchieve">Weet u zeker dat u deze tag wilt archieveren?'+
										'<a class="archieveTagConfirm btn waves-effect waves-light">Ja</a>'+
										'<a class="archieveTagCancel btn waves-effect waves-light">Nee</a>'+
									'</span>'+
								'</div>';
			}
			else{
				html +=			'<a href="javascript:void(0)" class="activeTag">Activeer</a>'+
    							'<div class="confirmActiveDiv">'+
									'<span class="confirmActive">Weet u zeker dat u deze tag wilt activeren?'+
										'<a class="activeTagConfirm btn waves-effect waves-light">Ja</a>'+
										'<a class="activeTagCancel btn waves-effect waves-light">Nee</a>'+
									'</span>'+
								'</div>';
			}
				if(test){
					html +=		'<a href="javascript:void(0)" class="deleteTag">Verwijder</a>'+
								'<div class="confirmDeleteDiv">'+
									'<span class="confirmDelete">Weet u zeker dat u deze tag wilt verwijderen?'+
										'<a class="deleteTagConfirm btn waves-effect waves-light">Ja</a>'+
										'<a class="deleteTagCancel btn waves-effect waves-light">Nee</a>'+
									'</span>'+
								'</div>';
				}
				html +=		'</div>'+
						'</div>';
    		var col 		= document.createElement('div');
    		col.className = "col s12 m6";
     		col.innerHTML = html;

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
<<<<<<< HEAD

=======
			// Opens the xhr request and put the method, url and make it asynchronous.
>>>>>>> b275d39a22c5d80a57fd887920856c11792a7d8f
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
			console.log(editor);
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
							TagsUI.displayForm(id, tag);
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
