//Michael Eaton
//ASD 1305
//project

$('#index').on('pageinit', function () {
    
});

$('#addItem').on('pageinit', function () {
});

$('#addItem').on('pageinit', function(){
	delete $.validator.methods.date;
	var myForm = $('#addForm');
	myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
			var data = myForm.serializeArray();
			saveData(data);
		}
	});

});


var autoFill = function (){
 	var type = $(this).attr('id');
 	
 	if (type === 'getXML') {
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
					string += '"Notes and Review":"' + item.find('note').text() + '",';
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
	}  else {		// JSON
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

		// Save data into local storage, use Stringify to convert object to string
		localStorage.setItem(id, JSON.stringify(newGame));
		$('saveGameButton').html('Save Game').removeData('key');
		alert("Game Saved");
		$.mobile.changePage('#index');

}; 
