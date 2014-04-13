// JS For the index page. 

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
        console.log($.parseXML(resumeString));
        return $.parseXML(resumeString);
    };
    
    this.toHtml = function() {
        var template = "";
        template += "<div id='resume-'"+ this.id + " class='resume'>"
                +"<p class='name'>" + this.name +"</p>"
                +"<p class='surname'>" + this.surname +"</p>"
                +"<p class='goal'>" + this.goal +"</p>"
                +"<ul class='attended'>";
        if (typeof this.attended !== "undefined") {
            for (var i = 0; i < this.attended.length; i++) {
                template += "<li class='institution'>"
                            + this.attended[i]   
                            + "</li>";
            }
        } else {
            template += "No attended.";
        }
        template += "</ul>";
        template += "<ul class='languages'>";
        if (typeof this.languages !== "undefined") {
            for (var i = 0; i < this.languages.length; i++) {
                template += "<li class='language'>"
                            + this.languages[i]   
                            + "</li>";
            }
        } else {
            template += "No language";
        }
        template += "</ul>";
        template += "<ul class='skills'>";
        if (typeof this.skills !== "undefined") {
            for (var i = 0; i < this.skills.length; i++) {
                template += "<li class='skill'>"
                            + this.skills[i]   
                            + "</li>";
            }
        } else {
            template += "No skill";
        }
        template += "</ul>";
        template += "<ul class='it-skills'>";
        if (typeof this.itSkills !== "undefined") {
            for (var i = 0; i < this.itSkills.length; i++) {
                template += "<li class='language'>"
                            + this.itSkills[i]   
                            + "</li>";
            }
        } else {
            template += "No IT skill";
        }
        template += "</ul>"
                 + "</div>";
        console.log("Resume toHTML template =" + template);
        return template;
    };
    
}

function getResumeFromForm() {
    var ownId = 0,
    name = $("#textinput-name").val(),
    surname = $("#textinput-surname").val(),
    goal = $("#textinput-goal").val(),
    attended = $("#textinput-attended").val(),
    languages = $("#textinput-languages").val(),
    skills = $("#textinput-skills").val(),
    itSkills = $("#textinput-itskills").val();
    var res = new Resume(ownId, name, surname, goal, attended, languages, skills,
        skills, itSkills);
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
        var attended;
        $(this).find("institution").each(function() {
            attended[i] = $(this).text();
            i++;
        });
        i = 0;
        var languages;
        $(this).find("language").each(function($languages) {
            languages[i] = $(this).text();
            i++;
        });
        i = 0;
        var skills; 
        $(this).find("skill").each(function() {
            skills[i] = $(this).text();
            i++;
        });
        i = 0;
        var itSkills;
        $(this).find("ITSkill").each(function() {
            itSkills[i] = $(this).text();
            i++;
        });
        var resume = new Resume(id, name, surname, goal, attended,
        languages, skills, itSkills);
        res += resume.toHtml();
    }); 
    return res; 
}

function getResumes() {
    // All HTML5 Rocks properties support CORS.
    var resumes = "";
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net/?callback=?';

    jQuery.ajax({
        type: "GET",
        url: url,
        contentType: "text/xml; charset=utf-8",
        success: function (data, status, jqXHR) {
            console.log("[GET RESUMES] Element data=" + data + " status=" + status
                    + " jqXHR=" + jqXHR);
            resumes = xmlToString(data);
            var res = parseXMLtoHTML(resumes);
            if (res !== "") {
                $("#resumes").html(res);
            }
        },

        error: function (jqXHR, status) {
            // error handler
        }
    });
}

function getResumeById(id) {
    var resume;
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net/'+ id 
            + '?callback=?';

    var xhr = createCORSRequest('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {
            //alert("It worked!");
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
      var resumes = xhr.responseXML;
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
    
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net/?callback=?';

    var xhr = createCORSRequest('PUT', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {
            // Sending stuff..
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
      alert("Resume send");
    };

    xhr.onerror = function() {
      $('#errorPopupLink').get(0).click();
    };
    xhr.send(xml);
}


$(document).ready(function() {
    getResumes();
    
    $("#refresh-button").click(function() {
        getResumes();
    });
    
    $("#add-button").click(function() {
        putResume();
    });
});

