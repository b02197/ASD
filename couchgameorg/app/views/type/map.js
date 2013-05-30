function(doc){
	if(doc._id !== '_design/gameliborg'){
		emit([doc._id, doc._rev],{
			"Console": doc.console,
			"Title": doc.title,
			"Rating": doc.rating,
			"Notes or Review": doc.notes
		});
	}
};