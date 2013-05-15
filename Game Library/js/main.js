//Michael Eaton
//ASD 1305
//project

$('#index').on('pageinit', function () {
    //code needed for home page goes here
});

$('#addItem').on('pageinit', function () {

    var myForm = $('#addForm');
    myForm.validate({
        invalidHandler: function (form, validator) {},
        submitHandler: function () {
            var data = myForm.serializeArray();
            saveData(data);
        }


    });
});
	var autoFill = function(){
	var type = $(this).attr('id');
	
	if(type === 'XMLDummie'){
		$.ajax({
			url: 'js/data.xml',
			type: 'Get',
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
					string += '"Notes and/or Review":"' + item.find('note').text() + '"}';
					console.log(string);
					
					var id = Math.floor(Math.random()*99999999);
					localStorage.setItem(id,string);
				});
				alert('XML Dummie Data Loaded')
			},
			error: function(result){
				alert("There was an error loading the XML dummie data.");
				console.log(result);
			}
		});
}else if(type === 'JSONDummie'){
		$.ajax({
			url: 'js/data.js',
			type: 'GET',
			dataType: 'json'
			success: function(result){
				console.log('JSON Dummie Data Loaded');
				console.log(result);
				for(var x in result) {
					var id = Math.floor(Math.random()*99999999);
						localStorage.setItem(id,JSON.stringify(result[x]));
				}
				alert("JSON Dummie Data Loaded");
			},
			error: function(result){
				alert("There was an error loading the JSON Dummie data!!");
				console.log(result);
			}
		});
	};
