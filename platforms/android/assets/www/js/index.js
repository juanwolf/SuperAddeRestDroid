// JS For the index page. 
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);


function showConfirm(buttonIndex) {
    
}
// device APIs are available
//
function onDeviceReady() {
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.connection.type;
    if (Connection.NONE === networkState 
            || Connection.UNKNOWN == navigator.connection.type) {
        
        if (navigator.notification) { // Override default HTML alert with native dialog
            navigator.notification
                 .confirm("You need to be in 3G or WIFI to use this application",function(){} ,
         "Network error", 'Ok');
        } else {
            $('#networkErrorPopupLink').get(0).click();
        }
    }
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

 //show loader
var showLoader = function () {   
        var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
        $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
};

 //hide loader
var hideLoader = function () {
            $.mobile.loading("hide");
};

function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
} 


/**
 *  Constructor for the resume object
 * @param {int} id
 * @param {string} name
 * @param {string} surname
 * @param {string} goal
 * @param {string[]} attended
 * @param {string[]} languages
 * @param {string[]} skills
 * @param {string[]} itSkills
 * @returns {Resume}
 */


function Resume(id, name, surname, goal, attended, languages, skills, itSkills) {                  
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.goal = goal;
    this.attended = attended;
    this.languages = languages;
    this.skills = skills;
    this.itSkills = itSkills;
    this.toXml = function() {
        var resumeString = 
            "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
            +"<resume>"
            +    "<id>" + this.ownId + "</id>"
            +    "<name>" + this.name + "</name>"
            +    "<surname>" + this.surname + "</surname>"
            +    "<goal>" + this.goal + "</goal>"
            +    "<attended>";
            for ($i = 0; $i < this.attended.length; $i++) {
                resumeString += "<institution>" 
                        + this.attended[$i] 
                            + "</institution>";
            }
        resumeString +="</attended>"
            +    "<languages>";
            for ($i = 0; $i < this.languages.length; $i++) {
                resumeString += "<language>" 
                        + this.languages[$i] 
                            + "</language>";
            }
        resumeString += "</languages>"
            + "<skills>";
            for ($i = 0; $i < this.skills.length; $i++) {
                resumeString += "<skill>" 
                        + this.skills[$i] 
                            + "</skill>";
            }
        resumeString += "</skills>"
            +    "<ITSkills>";
            for ($i = 0; $i < this.itSkills.length; $i++) {
                resumeString += "<ITSkill>" 
                        + this.itSkills[$i] 
                            + "</ITSkill>";
            }
        resumeString += "</ITSkills>"
            + "</resume>";
        return $.parseXML(resumeString);
    };
    
    this.toHtml = function() {
        var template = "";
        template += "<div id='resume-"+ this.id + "' class='resume ui-body ui-body-a ui-corner-all'>"
                + "<h3> Resume #" + this.id + "</h3>"
                +"<div class='name'>"+
                    "<span class='label'>Name: </span>"
                   + "<span class='attribute'>" + this.name +"</span>"
                + "</div>"
                +"<div class='surname'>" 
                    +"<span class='label'> Surname: </span>"
                    +"<span class='attribute'>" +  this.surname + "</span>"
                +"</div>"
                +"<div class=goal>"
                    + "<span class='label'>Goal: </span>"
                    + "<span class='attribute'> " 
                        + this.goal 
                    +"</span></div>"
                +"<div class='attented'>"
                +"<span class='label'>Attended: </span>";              
        if (this.attended.length !== 0) {
            template += "<ul class='attended'>";
            for (var i = 0; i < this.attended.length; i++) {
                template += "<li class='institution'>"
                            + this.attended[i]   
                            + "</li>";
            }
            template += "</ul>";
        } else {
            template += "<span>None</span>";
        }
        template += "</div>";
        template += "<div class='languages'>"
                + "<span class='label'>Languages: </span>"
        if (this.languages.length !== 0) {
            template += "<ul class='languages'>";
            for (var i = 0; i < this.languages.length; i++) {
                template += "<li class='language'>"
                            + this.languages[i]   
                            + "</li>";
            }
            template += "</ul>";
        } else {
            template += "<span>None</span>";
        }
        template += "</ul></div>";
        template += "<div class='skills'>"
                + "<span class='label'>Skills: </span>";
        
        if (this.skills.length !== 0) {
            template += "<ul class='skills'>";
            for (var i = 0; i < this.skills.length; i++) {
                template += "<li class='skill'>"
                            + this.skills[i]   
                            + "</li>";
            }
            template += "</ul>";
        } else {
            template += "None";
        }
        template += "</ul></div>";
        template += "<div class='it-skills'>"
                 + "<span class='label'>IT Skills: </span>";
        if (this.itSkills.length !== 0) {
            template += "<ul class='it-skills'>";
            for (var i = 0; i < this.itSkills.length; i++) {
                template += "<li class='language'>"
                            + this.itSkills[i]   
                            + "</li>";
            }
            template += "</ul>";
        } else {
            template += "None";
        }
        template += "</div>"
                 + "</div>";
        return template;
    };
    
}

function getResumeFromForm() {
    var ownId = 0,
    name = $("#textinput-name").val(),
    surname = $("#textinput-surname").val(),
    goal = $("#textinput-goal").val();
    
    
    var attended = [];
    $divs = $('label[for="textinput-attended"]').nextAll("div");
    $inputs = $divs.children("input");
    $inputsTab = $inputs.toArray();
    for (var i = 0; i < $inputsTab.length; i++) {
        if ($inputsTab[i].value !== "") {
            attended.push($inputsTab[i].value);
        }
    }
    var languages = [];
    $divs = $('label[for="textinput-languages"]').nextAll("div");
    $inputs = $divs.children("input");
    $inputsTab = $inputs.toArray();
    for (var i = 0; i < $inputsTab.length; i++) {
        if ($inputsTab[i].value !== "") {
            languages.push($inputsTab[i].value);
        }
    }
    
    var skills = [];
    $divs = $('label[for="textinput-skills"]').nextAll("div");
    $inputs = $divs.children("input");
    $inputsTab = $inputs.toArray();
    for (var i = 0; i < $inputsTab.length; i++) {
        if ($inputsTab[i].value !== "") {
            skills.push($inputsTab[i].value);
        }
    }
    var itSkills = [];
    $divs = $('label[for="textinput-itskills"]').nextAll("div");
    $inputs = $divs.children("input");
    $inputsTab = $inputs.toArray();
    for (var i = 0; i < $inputsTab.length; i++) {
        if ($inputsTab[i].value !== "") {
            itSkills.push($inputsTab[i].value);
        }
    }
    
    var res = new Resume(ownId, name, surname, goal, attended, languages, skills,
        itSkills);
    return res;
}

function parseXMLtoHTML(XMLFile) {
    var res = "";
    $(XMLFile).find("resume").each(function() { 
        var id = $(this).find("id").text(); 
        var name = $(this).find("name").text(); 
        var surname = $(this).find("surname").text(); 
        var goal = $(this).find("goal").text();
        var i = 0;
        attended = [];
        $(this).find("institution").each(function() {
            attended[i] = $(this).text();
            i++;
        });
        i = 0;
        languages = [];
        $(this).find("language").each(function() {
            languages[i] = $(this).text();
            i++;
        });
        i = 0;
        skills = []; 
        $(this).find("skill").each(function() {
            skills[i] = $(this).text();
            i++;
        });
        i = 0;
        itSkills = [];
        $(this).find("ITSkill").each(function() {
            itSkills[i] = $(this).text();
            i++;
        });
        var resume = new Resume(id, name, surname, goal, attended,
        languages, skills, itSkills);
        res += resume.toHtml();
    });
    if(res === "") {
        var id = $(XMLFile).find("id").text(); 
        var name = $(XMLFile).find("name").text(); 
        var surname = $(XMLFile).find("surname").text(); 
        var goal = $(XMLFile).find("goal").text();
        var i = 0;
        attended = [];
        $(XMLFile).find("institution").each(function() {
            attended[i] = $(this).text();
            i++;
        });
        i = 0;
        languages = [];
        $(XMLFile).find("language").each(function() {
            languages[i] = $(this).text();
            i++;
        });
        i = 0;
        skills = []; 
        $(XMLFile).find("skill").each(function() {
            skills[i] = $(this).text();
            i++;
        });
        i = 0;
        itSkills = [];
        $(XMLFile).find("ITSkill").each(function() {
            itSkills[i] = $(this).text();
            i++;
        });
        var resume = new Resume(id, name, surname, goal, attended,
        languages, skills, itSkills);
        res += resume.toHtml();
        
    }
    return res; 
}

function getResumes() {
    // All HTML5 Rocks properties support CORS.
    var resumes = "";
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net';

    showLoader();
    jQuery.ajax({
       
        type: "GET",
        url: url,
        contentType: "text/xml; charset=utf-8",
        success: function (data, status, jqXHR) {
            hideLoader();
            resumes = xmlToString(data);
            var res = parseXMLtoHTML(resumes);
            if (res !== "") {
                $("#search-result").html(res);
            }
        },

        error: function (jqXHR, status) {
            // error handler
        }
    });
}

function getResumeById(id) {
    var resume;
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net/'+ id;

    var xhr = createCORSRequest('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {
            
        }
    };
    xhr.setRequestHeader("Content-type", "text/xml");
    xhr.setRequestHeader("Connection", "close");
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    // Response handlers.
    xhr.onload = function() {
        resumes = xmlToString(xhr.responseXML);
        if (resumes.search("Parsing Error:") === -1) {
            var res = parseXMLtoHTML(resumes);
            console.log(res);
            if (res !== "") {
                $("#search-result").html(res);
            }
        } else {
            $("#search-result").html("<p>No resume with the id: "
                    + $("#search").val() + "</p>");
        }
    };

    xhr.onerror = function() {
      $('#errorPopupLink').get(0).click();
    };

    xhr.send();
    return resume; 
}

function putResume() {
    var resume = getResumeFromForm();
    var xml = resume.toXml();
    
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net';

    var xhr = createCORSRequest('PUT', url);
    xhr.onreadystatechange = function() {
        $('#sendPopupLink').get(0).click();
        if (xhr.readyState==4) {        
            resetForm();
            $('#sendPopupLink').get(0).click();
            alert("Resume sent");
        }
    };
    xhr.setRequestHeader("Content-type", "application/xml");
    xhr.setRequestHeader("Connection", "close");
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    // Response handlers.
    xhr.onload = function() {
        
    };

    xhr.onerror = function() {
      $('#errorPopupLink').get(0).click();
    };
    xhr.send(xml);
}

function resetForm() {
    $("input").each(function() {
        $(this).val("");
    });
}

function addInputBefore($element) {
    $name = $element.prevAll("label").attr("name");
    $element.before("<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'>"
            +"<input type='text'></input> "
            + "<a href='#' class='remove-input-btn ui-btn ui-corner-all ui-icon-delete ui-btn-icon-right'>"
            + "Delete this field</a></div>");
    $(".remove-input-btn").unbind("click");
    $(".remove-input-btn").click(function() {
        $(this).parent("div").remove();
    });
}

$(document).ready(function() {
    getResumes();
    
    $("#refresh-button").click(function() {
        getResumes();
    });
    
    $("#add-button").click(function() {
        putResume();
    });
    
    $("#reset-button").click(function() {
        resetForm() ;
    });
    
    $(".add-input").click(function() {
        addInputBefore($(this));
    });
    
    $(".remove-input-btn").click(function() {
        console.log("Supression de : " + $(this).prev("input").value );
        $(this).prev("input").remove();
        $(this).remove();
    });
    $(document).on('input paste', '#search',function() {
        if ($("#search").val() == "") {
            getResumes();
        } else if(isNaN(parseInt($("#search").val()))) {
            $("#search-result").html ="<p>The id must be an number</p>";
        } else {
          getResumeById($("#search").val());
        }
    }); 
});


