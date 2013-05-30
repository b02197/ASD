/*$(document).on('pageinit', "#displayItem", function(){
	$.couch.db("gameorganizer").view("gameliborg/type",{
		success: function(data){
		console.log(data);
			$.each(data.rows, function(index, type){
				var console = type.value.Console;
				var title = type.value.Title;
				var rating = type.value.Rating
				var notes = type.value.Notes; 
				
				$('#itemView').append(
					$('<li>').append(
						$('<a>').attr("href","game.html?game=" + title)
							.text(title)
							
					)
				);
			});
			$('#itemView').listview('refresh');
		}
	});
});*/

/*var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;	
	}
	console.log(urlData);
	console.log(urlPairs);
	console.log(urlParts);
	console.log(urlValues);
	return urlValues;
};

$(document).on('pageinit', '#game', function(){
	var games = urlVars()["game"];
	$.couch.db("gameorganizer").view("gameliborg/type", {
		key: "console:" + console
		
	});
	
	
});
*/


$('#index').on('pageinit', function(){
	//code needed for home page goes here
	$('#gameList').on('click', getData);
	//$('#listjson').on('click', autoFillData);
	//$('#listxml').on('click', autoFillData);
	//$('#clearData').on('click', clearLocalData);

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
$('#about').on('pageinit', function(){
	console.log("working");
	$.ajax({
		url: '_view/type',
		dataType:'json',
		success: function(data){
		//console.log(data);
			$.each(data.rows, function(index, type){
				var console = type.value.Console;
				var title = type.value.Title;
				var rating = type.value.Rating
				var notes = type.value.Notes;
				
				$('#typeList').append(
					$('<li>').append(
						$('<a>').attr("href","#")
							.text(title)
							
					)
				);
			});
			$('#typeList').listview('refresh');
		}
	});
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

/*var autoFillData = function (){
 	var type = $(this).attr('id');
 	
 	if (type === 'listxml') {
		$.ajax({
			url: 'data.xml',
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
			url: 'data.json',
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
};*/
var getData = function(){
	var labels = ["Console: ", "Game Title: ", "Rating: ", "Notes and Review: "];	
	var appendLoc = $('#gameSelect').html("");
	
	$.couch.db('gameorganizer').view('gameliborg/type', {
		success: function(data){
			//console.log(data);
			$.each(data.rows, function(index,type){
				var makeDiv = $('<div>')
					.attr('data-role', 'collapsible')
					.attr('id', type.key)
					.appendTo(appendLoc);
					
				var makeTitle = $('<h3>')
					.html(type.value.Title)
					.appendTo(makeDiv);
					
				var makeUl = $('<ul>').appendTo(makeDiv)
				var counter = 0;
				for(var z in type.value){
					var makeLi = $('<li>')
						.html(labels[counter] + type.value[z])
						.appendTo(makeUl);
						
						counter++
				}
				
				var buttonPlace = $('<div>').attr('class','ui-grid-a').appendTo(makeDiv);
				var editButDiv = $('<div>').attr('class', 'ui-block-a').appendTo(buttonPlace);
				var revButDiv = $('<div>').attr('class', 'ui-block-b').appendTo(buttonPlace);
				var editBut = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#addItem')
					.html('Edit')
					.data('key', type.key[0])
					.data('rev', type.key[1])
					.appendTo(editButDiv)
					.on('click', editGame);
					
				var revBut = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#')
					.html('Delete')
					.data('key', type.key[0])
					.data('rev', type.key[1])
					.appendTo(revButDiv)
					.on('click', removeGame);
					
					//console.log(type.key[0]);
					//console.log(type.key[1]);
					$(makeDiv).trigger('create');	
			})
			$(appendLoc).trigger('create');
		}	
	});
};

var saveData = function(data){
	var key = $('#saveGameButton').data('key');
	var rev = $('#saveGameButton').data('rev');
	//console.log('key');
	//console.log('rev');
	var type = {};
	
	if(rev){
		type._id = key;
		type._rev = rev;
	}
		type.console = data[0].value;
		type.title = data[1].value;
		type.rating = data[2].value;
		type.notes = data[3].value;
		
		//console.log(type);
		
		$.couch.db('gameorganizer').saveDoc(type,{
			success: function(type){
			alert("Game Saved");
			$('#saveGameButton').html('Save Game').removeData('key').removeData('rev');
			$.mobile.changePage('#index');
			}
		})
};

var editGame = function(){
	var key = $(this).data('key');
	var rev = $(this).data('rev');
	
	$.couch.db('gameorganizer').openDoc(key,{
		success: function(type){
			$('#console').val(type.console);
			$('#title').val(type.title);
			$('#rate').val(type.rating);
			$('#note').val(type.notes);
			$('saveGameButton').attr('value', "Edit Game").data('key', key).data('rev', rev);

		}
		
	});
};

var removeGame = function(){
	var ask = confirm("Are you sure you want to delete this game?");
		if(ask){
			var doc = {
				'_id': $(this).data('key'),
				'_rev': $(this).data('rev')
			};
			$.couch.db('gameorganizer').removeDoc(doc, {
				success: function(data){
					alert("Game Was Removed");
					window.location.reload();
				}
			});
		}else{
			alert("Game wasn't Deleted.");
		}
};		
/*var clearLocalData = function(){
	console.log("fire");
	if(localStorage === 0){
		alert("There is nothing in local storage.")
	}else{
		localStorage.clear();
		alert("Local storage has been deleted.")
		window.location.reload();
		return false;
	}
};*/

