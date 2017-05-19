// $(document).ready(function() {
	// Creates a Tags constructor for listing. parameter: array.
	function Tags(tags) {
		this.list = tags || [];
	}
	Tags.prototype.add = function(tag) {
		this.list.push(tag);
	}
	// Creates a single Tag constructor for the Tags list. parameters: string.
	function Tag(name, description) {
		this.name = name;
		this.description = description;
	}
	var tag = new Tag("Test", "This a test");
	var tagsList = new Tags([tag]);
	console.log(tagsList);

	var TagsUI = {
		// Create a way to generate the html for the tags.
		generateHTML: function(id, title, text) {
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
    			cardChange.href = "#";										// The Change link goes here.
    			var changeText = document.createTextNode("Wijzig");
    			cardChange.appendChild(changeText);
    			var cardRemove = document.createElement('a');
    			cardRemove.href = "#";										// The Remove link goes here.
    			var removeText = document.createTextNode("Verwijder");
    			cardRemove.appendChild(removeText);

    		cardAction.appendChild(cardChange);
    		cardAction.appendChild(cardRemove);

    		card.appendChild(cardContent);
    		card.appendChild(cardAction);

    		col.appendChild(card);

    		document.querySelector(id).appendChild(col);					// The id for the querySelector goes here.

    		return col;
		},
		// Create a way to add a tag to the html.
		displayTag: function(title, text) {
			this.generateHTML(".tagsList", title, text);
		},
		getTagsJSON: function() {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "/api/tags", false);
  			xhr.send();
  			var tags = JSON.parse(xhr.response);
  			return tags;
		},
		displayTags: function() {
			var tagsJSON = this.getTagsJSON();
			for (var key in tagsJSON) {
 				if (tagsJSON.hasOwnProperty(key)) {
 					var name = tagsJSON[key].name;
 					var description = tagsJSON[key].description;
    				this.displayTag(name, description);
 				}
			}
		}
		// Create a way to remove a tag from the html.

		// Create a way to edit a tag in the html.
	}
	TagsUI.displayTags();
// });