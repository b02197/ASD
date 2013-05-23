function(doc){
	if(doc.type.substr(0, 3) === "fun"){
		emit(doc.type,{
			"Console": doc.console,
			"Title": doc.title,
			"Rating": doc.rating,
			"Notes or Review": doc.notes
		});
	}
};