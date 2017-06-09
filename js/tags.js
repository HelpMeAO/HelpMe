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
    		var html = '<div data-id="'+id+'" class="card blue-grey darken-1">'
				html += 	'<div class="card-content white-text">'
				html +=			'<span class="casrd-title">'+title+'</span><p>'+text+'</p>'
				html +=		'</div>'
				html +=		'<div class="card-action">'
				html +=			'<a href="javascript:void(0)" class="changeTag">Wijzig</a>'
				html +=			'<a href="javascript:void(0)" class="deleteTag">Verwijder</a>'
				html +=			'<div class="confirmDiv">'
				html +=				'<span class="confirmDelete">Weet u zeker dat u deze tag wilt verwijderen?'
				html +=					'<a class="deleteTagConfirm btn waves-effect waves-light">Ja</a>'
				html +=					'<a class="deleteTagCancel btn waves-effect waves-light">Nee</a>'
				html +=				'</span>'
				html +=			'</div>'
				html +=		'</div>'
				html += '</div>'
    		var col 		= document.createElement('div');
    		col.className = "col s12 m6";
     		col.innerHTML = html;
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
				el = $('.editor');
				var pos = el.offset().top - 170;
				$("html, body").animate({ scrollTop: pos }, 1400);
			});
			// Get a reference to the tagslist.
			var list = $('.tagsList');
			// Add a event listener for clicks.
			list.on('click', function(event) {
				var target = $( event.target );
				// Check if the click is on a anchor.
				if(target.is('A')) {
					var id = target.parent().parent().parent().data("id");
					Check if the click is on the edit.
					if(target.is('.changeTag')) {
						TagsUI.tagActions({
							"method":"GET",
							"id": id
						},
						function() {
							var tag = JSON.parse(this.response);
							TagsUI.displayForm(tag);
						});
					}
					if(target.is('.deleteTag')){
						$('.confirmDiv').removeClass('active');
						$(target).siblings('.confirmDiv').addClass('active');
					}
					if(target.is('.deleteTagConfirm')){
						card = $(target).parent().parent().parent().parent();
						TagsUI.tagActions({'method':'DELETE', 'id' : card.data('id')});
						card.parent().css("opacity", "0");
						console.log(card.data('id'));
  						setTimeout(function(){ card.parent().remove(); }, 400);
					}
					if(target.is('.deleteTagCancel')){
						$(target).parent().parent().removeClass('active');
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
