//BASIC FORM VALIDATION	
function form_validation(form_name) {
	return $("#" + form_name + "_form").valid();
}

//VALIDATE IMAGE TYPE
function validate_image_type(image_type) {
    // allow jpg, png, jpeg, bmp, gif, ico
    var type_reg = /^image\/(jpg|png|jpeg|bmp|gif|ico)$/;
    if (type_reg.test(image_type)) {
        return true;
    } else {
        swal(form_message.unsupport_image, "", "warning");
        return false;
    }
}

//IMAGE ONCHANGE FUNCTION, TO SET THE IMAGE IN DIV SECTION
function readURL(input) {
	if (input.files && input.files[0]) {
		// image/jpg, image/png, image/jpeg...
		var type = input.files[0].type; 

		if (validate_image_type(type)) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#' + input.id + '_src').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		} else {
			input.value = "";
		}
	}
}

$('#search_action').change(function () {
	showDiv(1);
	return false;  
});

//COMMON TABLE SHOW ACTION
function common_table_show(url, page_id, form_name) {
	if($('#table_div>tbody tr').length == 1 && delete_flag) {
		page_id = page_id - 1;
		page_id = page_id == 0 ? 1 : page_id;
	}
	var search_action = $("#search_action").val();
	var form_data = {"page": page_id, "search_action": search_action};
	
	$.ajax({
		url : url,
		type : "GET",
		data : form_data,
		timeout : 10000
	}).done(function(json_data) {
		var formData = JSON.parse(json_data);
		if(formData){
			$("#" + form_name + "_table_div").html(formData.html);
			$("#layoutSidenav_content").attr("data-page-no", page_id);
		}
	})
}



