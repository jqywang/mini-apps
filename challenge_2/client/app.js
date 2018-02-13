

var input = document.getElementById('inputForm');
var submit = document.getElementById('submit');

$('#submit').on('click', function (e){
	e.preventDefault();
	var inputText = $('#inputForm').val();
	$('#inputForm').val('');
	// inputText = JSON.parse(inputText);
	$.ajax({
        url: "http://localhost:3000",
        type: "POST",
        data: inputText,
        dataType: "text",
        contentType: "application/json",
        success: function(data, string){
        	var lineArray = data.split('\n');
        	for(var i = 0; i < lineArray.length; i++) {
        		$('#append').append(`<h5>${lineArray[i]}</h5>`);
        	}
        }
	});
});