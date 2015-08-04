var qt = (function($) {

    var m = {};

    /* create scrollstop handler function */
    function checkScroll() {
	/* You always need this in order to target
	   elements within active page */
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),

            /* Viewport's height */
            screenHeight = $.mobile.getScreenHeight(),

            /* Content div - include padding too! */
            contentHeight = $(".ui-content", activePage).outerHeight(),

            /* Height of scrolled content (invisible) */
            scrolled = $(window).scrollTop(),

            /* Height of both Header & Footer and whether they are fixed
               If any of them is fixed, we will remove (1px)
               If not, outer height is what we need */
            header = $(".ui-header", activePage).outerHeight() - 1,
            footer = $(".ui-footer", activePage).outerHeight() - 1,

            /* Math 101 - Window's scrollTop should
               match content minus viewport plus toolbars */
            scrollEnd = contentHeight - screenHeight + header + footer;

	/* if (pageX) is active and page's bottom is reached
	   load more elements  */
	if (activePage[0].id == "home" && scrolled >= scrollEnd) {
            /* run loadMore function */
            addMore(activePage);
	}
    }

    function addMore(page) {
	/* remove scrollstop event listener */
	$(document).off("scrollstop");

	/* show loader (optional) */
	$.mobile.loading("show", {
	    text: "loading more..",
	    textVisible: true
	});

	/* delay loading elements 500ms
	   and then re-attach scrollstop */
	setTimeout(function() {
	    var items = '',
		last = $("li", page).length,
		cont = last + 100;
	    for (var i = last; i < cont; i++) {
		items += genRow(i);
	    }
	    $("#tips", page).append(items).listview("refresh");
	    $.mobile.loading("hide");

	    /* re-attach scrollstop */
	    $(document).on("scrollstop", checkScroll);
	}, 500);
    }

    function genRow(val) {
	var ten = val * 0.10;
	var fifteen = val * 0.15;
	var twenty = val * 0.20;
	var twentyfive = val * 0.25;
	var row = "<li>";
	row += "<span class=\"charge\">" + val.toFixed(2) + "</span><span class=\"ten\">" + ten.toFixed(2) + "</span><span class=\"fifteen\">" + fifteen.toFixed(2) + "</span><span class=\"twenty\">" + twenty.toFixed(2) + "</span><span class=\"twentyfive\">" + twentyfive.toFixed(2);
	row += "</span></li>";
	return row;
    }

    m.setup = function() {

	var items = "";
	for (var i = 1; i < 100; i++) {
	    items += genRow(i);
	}
	$("#tips").append(items).listview("refresh");

	/* attach if scrollstop for first time */
	$(document).on("scrollstop", checkScroll);

	$(document).scrollTop($("ul#tips li:eq(20)").position().top);

    };

    return m;
    
})(jQuery);
