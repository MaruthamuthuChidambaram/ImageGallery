var form_name = "image";

$(document).ready(function () {
	form_validation_rules(form_name);
});

$("#image").change(function () {
    // Image Source id should be this.id_src "image_src"
    readURL(this);
});

//SAVE FUNCTION
function save_function(flag) {
	var url = "/image/";
	var method = "";
	if(flag == "CREATE" || flag == "UPDATE") {
		if(form_validation(form_name)) {
            var formData = new FormData($("#" + form_name + "_form")[0]);
            formData.set("is_delete", "false");
			if (!($('input[name="image"]').get(0).files.length)) {
				formData.delete("image");
			} 
			if(flag == "CREATE") {
				method = "POST";
			} else {
				url = url + formData.get("id") + "/";
				method = "PUT";
			} 
		}
	} 
	if(method) {
		$.ajax({
			url : url,
			type : method,
			data: formData,
			processData : false,
			contentType : false,
			async : false,
			error:(function(error){
				showErrorMessage(form_name, error);
			}),
			success:(function(data, textStatus, jqXHR){
				showSuccessMessage(jqXHR.status, "/");
			}),
			complete:(function(){
				//$('#loading').hide();
			})
		});
	}
}

// PAGINATION
function showDiv(page_id) {
    common_table_show("/", page_id, form_name);
}



