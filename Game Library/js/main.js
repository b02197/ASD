$('#index').on('pageinit', function(){
	//code needed for home page goes here
	$('#gameList').on('click', getData);
	$('#listjson').on('click', autoFillData);
	$('#listxml').on('click', autoFillData);
	$('#clearData').on('click', clearLocalData);
	
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#addForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			saveData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});
$('#gameList').on('pageinit', function(){
	getData(false);
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillData = function (){
 	var type = $(this).attr('id');
 	
 	if (type === 'listxml') {
		$.ajax({
			url: 'js/data.xml',
			type: 'GET',
			dataType: 'xml',
			success: function(result){
				console.log('XML Loaded');
				console.log(result);
				$(result).find('game').each(function(){
					var item = $(this);
					var string = "";
					string += '{"Console":"' + item.find('console').text() + '",';
					string += '"Title":"' + item.find('title').text() + '",';
					string += '"Rating":"' + item.find('rate').text() + '",';
					string += '"Notes and Review":"' + item.find('note').text() + '"}';
					console.log(string);

					var id = Math.floor(Math.random()*99999999);
					localStorage.setItem(id, string);
				});
				alert('XML Dummie Data was loaded');
			},
			error: function(result){
				alert('There was an error in the xml dummie file');
				console.log(result);
			}
		});
	}  else {
  		$.ajax({
			url: 'js/data.json',
			type: 'GET',
			dataType: 'json',
			success: function(result){
				console.log('JSON dummie data loaded');
				console.log(result);
				for (var n in result) {
					var id = Math.floor(Math.random()*99999999);
					localStorage.setItem(id, JSON.stringify(result[n]));
				}
				alert('JSON dummie data loaded');
			},
			error: function(result){
				alert('There was an error loading the JSON dummie file.');
				console.log(result);
			}
		});
	}
};
var getData = function(load){
	var labels = ["Console: ", "Game Title: ", "Rating: ", "Notes and Review: "];
	if (localStorage.length === 0) {
		autoFillData();
	}

		var appendLocation = $('#gameSelect').html("");
		load = false;
	


	for (var i = 0, j = localStorage.length; i < j; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);

			var makeEntry = $('<div></div>')
				.attr('data-role', 'listview')
				.attr('id', key)
				.appendTo(appendLocation)
			;

			var makeList = $('<ul></ul>').appendTo(makeEntry);
			var counter = 0;
			for (var z in obj) {
				var makeLi = $('<li></li>')
					.html(labels[counter] + obj[z])
					.appendTo(makeList)
				;
				counter++;
			}

			var buttonHolder = $('<div></div>').attr('class', 'ui-grid-a').appendTo(makeEntry);
			var editButtonDiv = $('<div></div>').attr('class', 'ui-block-a').appendTo(buttonHolder);
			var removeButtonDiv = $('<div></div>').attr('class', 'ui-block-b').appendTo(buttonHolder);
			var editButton = $('<a></a>')
				.attr('data-role', 'button')
				.attr('href', '#addItem')
				.html('Edit')
				.data('key', key)
				.appendTo(editButtonDiv)
				.on('click', editGame)
			;
			var removeButton = $('<a></a>')
				.attr('data-role', 'button')
				.attr('href', '#')
				.html('Remove')
				.data('key', key)
				.appendTo(removeButtonDiv)
				.on('click', removeGame)
			;
			$(makeEntry).trigger('create');
		}
		$(appendLocation).trigger('create');
}


var saveData = function(data){
	key = $('#saveGameButton').data('key');
	if (!key) {
		var id = Math.floor(Math.random()*99999999);
	} else {
		var id = key;
	}
	var newGame = {};
		newGame.console = data[0].value;
		newGame.title = data[1].value;
		newGame.rate = data[2].value;
		newGame.note = data[3].value;

		localStorage.setItem(id, JSON.stringify(newGame));
		$('saveGameButton').html('Save Game').removeData('key');
		alert("Game Saved");
		$.mobile.changePage('#index');
}; 
	
var editGame = function (){
	var key = $(this).data('key');
	var stuff = localStorage.getItem(key);
	var game = JSON.parse(stuff);

	
	$('#console').val(game.console);
	$('#title').val(game.title);
	$('#rate').val(game.rate);
	$('#note').val(game.note);
};

var	removeGame = function (){
	var ask = confirm("Are you sure you want to delete this game?");
	if (ask) {
		localStorage.removeItem($(this).data('key'));
		window.location.reload();
	} else {
		alert("Game wasn't deleted.");
	}		
};
		
var clearLocalData = function(){
	console.log("fire");
	if(localStorage === 0){
		alert("There is nothing in local storage.")
	}else{
		localStorage.clear();
		alert("Local storage has been deleted.")
		window.location.reload();
		return false;
	}
};

