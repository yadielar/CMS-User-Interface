/* Author:

*/


/*--- Accordion Menu ---*/
function initMenu() {
  $('#main_nav ul').hide();
  $('#main_nav li.active').parent().show().parent().addClass("expanded"); //add ".expanded" class when expanded on page load
  $('#main_nav li a').click(
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        checkElement.slideUp('normal'); //makes ULs collapsible
        $(".expanded").removeClass("expanded"); //remove ".expanded" class when collapsed
        return false;
        }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#main_nav ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
        $(".expanded").removeClass("expanded"); //remove ".expanded" class from previous
	    checkElement.parent().addClass("expanded"); //add ".expanded" class when expanded
        return false;
        }
      }
    );
  }
$(function() {initMenu();});





/*--- Form Factory ---*/
function formFactory() {
	var formTemplate = $('ul#form_template li');
	$('.formfac').data('template', formTemplate);
	$('ul#form_template').remove();
	formTemplate = $('.formfac').data('template');
	
	// Show No-Forms Template on empty form lists
	$('.formfac:not(:has(ul.form_list))').children('.noforms_template').removeClass('hidden');
	
	// Actions when adding to the list
	$(".formfac").delegate(".add_form", "click", function(){
		var currentFormFac = $(this).parents('.formfac'),
			currentArea = currentFormFac.attr('data-area'), //get current area id
			currentNoFormsTemplate = $(this).parents('.formfac').children('.noforms_template');
		// Check to see if the UL exists and if not create it and make it sortable
		if ( currentFormFac.children('ul.form_list').length < 1 ) {
			currentFormFac.prepend('<ul class="form_list has-sortable new_sortable"></ul>');
			makeSortable(); //website specific action
		}
		// Add a new form clone to the list
		var templateCopy = formTemplate.clone();
		templateCopy.find('select').attr('name', function(i, val) {
		  // append current area id to select's 'name' attribute
		  return val + '-' + currentArea + '[]'
		});
		currentFormFac.children('ul.form_list').append(templateCopy);
		// Hide the no-forms template
		currentNoFormsTemplate.addClass('hidden');
	});
	
	// Create and initialize dialog (jQuery UI required)
	var $confirmDelete = $('<div id="confirm_delete"></div>').html('<p>El bloque y su contenido serán removidos. ¿Estás seguro?</p>').dialog({
		autoOpen: false,
		modal: true,
		title: '',
		resizable: false,
		draggable: false
	});
	
	// Actions when removing from the list
	$(".formfac").delegate(".remove_current", "click", function(){
		var currentForm = $(this).parents('li'),
			currentFormList = $(this).parents('ul.form_list'),
			currentNoFormsTemplate = $(this).parents('.formfac').children('.noforms_template');
		// Set buttons on dialog
		$confirmDelete.dialog('option', 'buttons', { 
		    "Cancel": function() {
		    	$(this).dialog("close");
		    },
		    "OK": function() {
		    	// Remove current item from the list
		    	currentForm.remove();
		    	// Check to see if the UL has items and if not remove it and show the No-Forms Template
		    	if ( currentFormList.children().length < 1 ) {
		    		currentFormList.remove();
		    		currentNoFormsTemplate.removeClass('hidden');
		    	}
		    	$(this).dialog("close");
		    }
		});
		// Open dialog
		$confirmDelete.dialog('open');
	});
};
$(function() {formFactory();});





/*--- jQuery UI Elements ---*/

// Function for making SELECTS-with-icons
function makeSelectIcns() {
	$('select.new_select').selectmenu({ 
		width: '78%',
		menuWidth: 450,
		icons: [
			{find: '.icn_content'},
			{find: '.icn_gallery'},
			{find: '.icn_menu'}
		]
	});
	$('.new_select').removeClass('new_select'); //class is removed so we don't run this on it again
};

// Function for making SORTABLES
function makeSortable() {
	$( ".new_sortable" ).sortable({
		items: "li.sortable",
		handle: ".drag_handle",
		axis: "y"
	});
	$('.new_sortable').removeClass('new_sortable'); //class is removed so we don't run this on it again
};

// Initialize jQuery UI 
$(function() {
	//IMPORTANT: Selectmenus must go before tabs
	//Make existing SELECTS at page load
	$(".select").selectmenu({menuWidth: 273});
	//Make existing SELECTS-with-icons at page load
	makeSelectIcns();
	//Make SELECTS-with-icons every time a new form is added
	$(".formfac").delegate(".add_form", "click", function(){
		makeSelectIcns();
	});
	
	$(".tabs").tabs();
	$(".radio").buttonset();
	$(".checkbox").buttonset();
	$("input:submit, a.button, button", "#main").button();
	//Make existing SORTABLES at page load
	makeSortable();
});





/*--- Fancybox ---*/
$(function() {
	$(".fancybox").fancybox({
		'width'				: 700,
		'height'			: 500,
		'type'				: 'iframe'
	});
});