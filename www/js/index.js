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
    this.ownId = id;
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
            +    "<ownId>" + this.ownId + "</ownId>"
            +    "<name>" + this.name + "</name>"
            +    "<surname>" + this.surname + "</surname>"
            +    "<goal>" + this.goal + "</goal>"
            +    "<attended>" + this.attended + "</attended>"
            +    "<languages>" + this.languages + "</languages>"
            +    "<skills>" + this.skills + "</skills>"
            +    "<itSkills>" + this.itSkills + "</itSkills>"
            + "</resume>";
        console.log($.parseXML(resumeString));
        return $.parseXML(resumeString);
    };
    this.toHtml = function() {
        var template = "";
        template += "<div><p>"+ this.name +"</p></div>";
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
        ownId = $(this).find("ownId").text(); 
        name = $(this).find("name").text(); 
        surname = $(this).find("surname").text(); 
        goal = $(this).find("goal").text(); 
        attended = $(this).find("attended").text(); 
        languages = $(this).find("languages").text(); 
        skills = $(this).find("skills").text(); 
        itSkills = $(this).find("itSkills").text();
        var resume = new Resume(ownId, name, surname, goal, attended, languages,
            skills, itSkills);
        res += resume.toHtml();
    }); 
    return res; 
}

function getResumes() {
    // All HTML5 Rocks properties support CORS.
    var resumes;
    var url = 'http://resumemanagerrestserver.juanwolf.cloudbees.net/?callback=?';

    var xhr = createCORSRequest('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // Do something
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
      alert('Response from CORS request to ' + url + ': ' + resumes);
    };

    xhr.onerror = function() {
      $('#errorPopupLink').get(0).click();
    };

    xhr.send();
    return resumes;
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
    var xmlResumes = getResumes();
    var htmlResumes = parseXMLtoHTML(xmlResumes);
    $("#resumes").append(htmlResumes);
    
    
    $("#add-button").click(function() {
        putResume();
    });
});

