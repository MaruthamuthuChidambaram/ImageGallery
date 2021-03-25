/*!
    * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        $(this).removeClass("active");
        if (path.includes(this.href)) {
            $(this).parents(".collapse").addClass("show");
            $(this).addClass("active");
            var data_target = $(this).parents(".collapse").attr("id");
            $("a[data-target='#" + data_target + "']").removeClass("collapsed").addClass("active");
        } 
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

// Checkbox All Selection
$(document).on("click", ".check-all", function(){
    $(".check-item").prop('checked', $(this).prop('checked'));
})


