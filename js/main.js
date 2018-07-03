//formulario
var errors_alert = "Atención";
var errors_found = "Se han producido los siguientes errores:";
var noerrors_alert = "Bien hecho!";
var noerrors_found = "No se han encontrado errores. Click en Enviar para continuar.";
var letter = " Requiere letras.";
var mail = "Requiere una dirección de correo válida.";
var empty = " no puede estar vacío.";
var phone = " debe tener un número de teléfono válido.";
var doc = " debe tener un tipo de documento válido.";
var number = "Requiere un número válido.";
var checkbox = " tienes que marcar obligatoriamente este campo.";
var errors = '';
var hasErrors = false;
var form_name = '';

$(document).ready(function()
{
    setTooltips();
});

function getValidationText(validation)
{
    if(validation == 'letter')
        return letter;
    else if(validation == 'doc')
        return doc;
    else if(validation == 'email')
        return mail;
    else if(validation == 'phone')
        return phone;
    else if(validation == 'empty')
        return empty;
    else if(validation == 'doc')
        return doc;
    else if(validation == 'number')
        return number;
}

function setTooltips()
{
    $(".required").each(function(i)
    {
        var parent = $(this).parent();
        var input = $(this);
        if($(this).attr('class') != 'required') var type = input.attr("class").substring(9);
        else var type = 'empty';        
        if($(this).attr("type") != "checkbox")
        {
            input.focus(function(e)
            {
                $(parent).append('<div class="tooltip">' + getValidationText(type) + '</div>');
                $(".tooltip").fadeIn(400);
            });    
            input.blur(function(e)
            {
                $(".tooltip").remove();
            });  
        }
        else
        {
            input.click(function(e)
            {
                if(hasErrors)
                {
                    validate(form_name, false);
                }
            });
        }
    });
}
function validate(form, clicked)
{
    errors = "";
    if(clicked == null)
        clicked = true;
    $("#" + form.id + " .required").each(function(i)
    {
        var parent = $(this).parent();
        var input = $(this);
        if($(this).attr('class') != 'required') var type = input.attr("class").substring(9);
        else var type = 'empty';
        process(input, parent, type);
    });    
    if(errors == '' && clicked)
    {
        form.submit();
    }
    else if(errors == '')
    {
        $("#" + form.id + " .response").html('<p>' + noerrors_found + '</p>');
        $("#" + form.id + " .response").attr('class','noerrors');
    }
    else
    {
        $("#" + form.id + " .response").html('<p>' + errors_found + '</p>');
        $("#" + form.id + " .response").append('<ul>');
        $("#" + form.id + " .response").append(errors);
        $("#" + form.id + " .response").append('</ul>');        
        $("#" + form.id + " .response").slideDown(1000);        
        errors = '';
        hasErrors = true;
        form_name = form;
        return false;
    }
}
function process(input, parent, type)
{
    errors += validateEmpty(input, parent, 'empty');
    if(type == 'letter')
        errors += validateLetter(input, parent, type);
    else if(type == 'email')
        errors += validateEmail(input, parent, type);
    else if(type == 'phone')
        errors += validatePhone(input, parent, type);
    else if(type == 'doc')
        errors += validateNIF(input, parent, type);
    else if(type == 'number')
        errors += validateNumber(input, parent, type);       
    return errors;
}
function validateEmpty(field, parent, type)
{
error = '';
    if(field.val() == '' && field.attr("type") != "checkbox" && field.attr("type") != "radio")
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + getValidationText(type) + "</li>";
    }
    else if(field.attr("type") == "checkbox" && !field.is(":checked"))
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + checkbox + "</li>";
    }
    else if(field.attr("type") == "radio" && $('input:radio:checked').val() == undefined)
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + radio + "</li>";
    }
    return error;
}
function validatePhone(field, parent, type)
{   
    var regExp = /(^([0-9]{9,9})|^)$/;
    var error = "";
    if(!field.val().match(regExp) && field.val() != '')
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + getValidationText(type) + "</li>";
    }
    return error;
}
function validateNumber(field, parent, type)
{   
    var regExp = /^[0-9]/;
    var error = "";
    if(!field.val().match(regExp) && field.val() != '')
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + getValidationText(type) + "</li>";
    }
    return error;
}
function validateLetter(field, parent, type)
{
    var regExp = /^(?:\+|-)?[A-Za-záéíóúàèìòù ]+$/;
    var error = "";    
    if(!field.val().match(regExp) && field.val() != '')
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + getValidationText(type) + "</li>";
    }
    return error;
}
function validateEmail(field, parent, type)
{
    var regExp = /^[A-Za-z0-9._%-]+@+[A-Za-z0-9.-]+\.+([A-Za-z]{2,4})$/;
    var error = "";    
    if(!field.val().match(regExp) && field.val() != '')
    {
        var label = '';
        $("label").each(function(e)
        {
            if($(this).attr("for") == $(field).attr("name"))
                label = $(this).html();
        });
        error = "<li>" + "<strong>" + label + "</strong>" + getValidationText(type) + "</li>";
    }
    return error;
}

function parallax3d(){
	var n = window.pageYOffset;
	var titulo = document.getElementById("logo-lttr");
	titulo.style.top = (-100+(n/3.5))+"px";
}