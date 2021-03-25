var delete_flag = false;
//Form value get Function
function getFormValues(formId) {
	var formData = $(formId).serializeArray();
	var form_result_data = {}; 
	formData.map(data => {form_result_data[data['name']] = data['value'] });
	return form_result_data;
}

//CSRF TOKEN SETTING IN HEADER
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        $('.wrapper').removeClass('loaded');
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
    },
});


function form_validation_rules(form_name){
    dynamic_form_validator = $("#" + form_name + "_form").validate({
            invalidHandler: function(form, validator) {
                if (!validator.numberOfInvalids())
                    return;
                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top-100
                }, 500);
            },errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            },
        }
    );
    $("#" + form_name + "_form").find(".validate").each(function(){
        var dynamic_validation = $(this).data();
        var dynamic_keys = Object.keys(dynamic_validation);
        var keys_length = dynamic_keys.length;
        for(var i=0; i<keys_length; i++){
            var dynamic_values = dynamic_validation[dynamic_keys[i]];
            if(dynamic_keys[i] == 'select'){
                $.validator.addMethod("valueNotEquals", function(value, element, arg){
                    return arg !== value;
                }, "This field is required.");
                $(this).rules('add', { valueNotEquals: "0" });
            }
        }
    });
}

$.fn.getForm2obj = function() {
    var _ = {};
    $.map(this.serializeArray(), function(n) {
      const keys = n.name.match(/[a-zA-Z0-9_]+|(?=\[\])/g);
      if (keys.length > 1) {
        let tmp = _;
        pop = keys.pop();
        for (let i = 0; i < keys.length, j = keys[i]; i++) {
          tmp[j] = (!tmp[j] ? (pop == '') ? [] : {} : tmp[j]), tmp = tmp[j];
        }
        if (pop == '') tmp = (!Array.isArray(tmp) ? [] : tmp), tmp.push(n.value);
        else tmp[pop] = n.value;
      } else _[keys.pop()] = n.value;
    });
    return _;
  }


//Form Response Messages
form_message = {
    create : 'Created Successfully',
    update : 'Updated Successfully',
    remove : 'Removed Successfully',
    failed : 'Failed',
    unavailable : 'Service unavailable',
};

//Show the Error Message to be Display
function showErrorMessage(form_name, error) {
    if(error.status == 400) {
        Object.keys(error.responseJSON).forEach(function(key) {
            var formData = new FormData($("#" + form_name + "_form")[0]);
            if(formData.has(key)) {
                var validate_dict = {};
                validate_dict[key] = error.responseJSON[key];
                dynamic_form_validator.showErrors(validate_dict);
                $('html, body').animate({
                    scrollTop: $(dynamic_form_validator.errorList[0].element).offset().top-100
                }, 500); 
            }
        });
    } else {
        swal(form_message.unavailable, "", "warning")
    }  
}

//Show the Success Message to be Display
function showSuccessMessage(status, form_url) {
    if (status == "201"){
        swal_alert_function(status, form_message.create, form_url);
    } else if (status == "200") {
        swal_alert_function(status, form_message.update, form_url);
    } else if (status == "202") {
        swal_alert_function(status, form_message.remove, form_url);
    } else {
        swal(form_message.failed, "", "error");
    }
}

//Sweet Alert Notification to be Display
function swal_alert_function(status, alert_msg, form_url) {
    swal({
        title: alert_msg,
        type: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ok'
        },
        function(isConfirm) {
            if(isConfirm){
                var href = window.location.href;
                var pathname = window.location.pathname;
                var load_href = href.split(pathname);
                var current_page_id = $("#layoutSidenav_content").attr("data-page-no");
                if (status == "201"){
                    window.location.href = load_href[0] + form_url;
                } else if (status == "200") {
                    window.location.href = load_href[0] + form_url + "?page=" + current_page_id;
                } else if (status == "202") {
                    delete_flag = true;
                    showDiv(current_page_id);
                } else {
                    window.location.href = form_url;
                }
            }
        }
    )
}


