// JS For the index page. 

/**
 *  Constructor for the resume object
 * @param {int} id
 * @param {string} name
 * @param {string} surname
 * @param {string} goal
 * @param {string[]} attented
 * @param {string[]} languages
 * @param {string[]} skills
 * @param {string[]} itSkills
 * @returns {Resume}
 */


function Resume(id, name, surname, goal, attented, languages, skills, itSkills) {                  
    this.ownId = id;
    this.name = name;
    this.surname = surname;
    this.goal = goal;
    this.attented = attented;
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
            +    "<attented>" + this.attented + "</attented>"
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
    attented = $("#textinput-attented").val(),
    languages = $("#textinput-languages").val(),
    skills = $("#textinput-skills").val(),
    itSkills = $("#textinput-itskills").val();
    var res = new Resume(ownId, name, surname, goal, attented, languages, skills,
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
        attented = $(this).find("attented").text(); 
        languages = $(this).find("languages").text(); 
        skills = $(this).find("skills").text(); 
        itSkills = $(this).find("itSkills").text();
        var resume = new Resume(ownId, name, surname, goal, attented, languages,
            skills, itSkills);
        res += resume.toHtml();
    }); 
    return res; 
}

function getResumes() {
    var resumes;
    jQuery.ajax({
        type: "GET",
        url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/?callback=?",
        contentType: "text/plain; charset=utf-8 ",
        dataType: "xml",
        success: function (data, status, jqXHR) {
            console.log("[getResumes] xml received : " + data);
            resumes = data;
        },
        error: function (jqXHR, status) {
            // error handler
        }
    });
    return resumes;
}

function getResumeById(id) {
    var resume;
    jQuery.ajax({
        type: "GET",
        url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/" + id,
        contentType: "application/xml",
        dataType: "xml",
        success: function (data, status, jqXHR) {
            resume = data;
        },
        error: function (jqXHR, status) {
            // error handler
        }
    });
    return resume; 
}

function putResume() {
    var resume = getResumeFromForm();
    var xml = resume.toXml();
    jQuery.ajax({
        type: "PUT",
        url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/?callback=?",
        contentType: "application/xml",
        data: xml,
        dataType: "xml",
        success: function (data, status, jqXHR) {
            if (status === 200) {
                // Send a notif to the user
            }
        },
        error: function (jqXHR, status) {
           // Send notif not possible.
    
        }    
    });    
}


$(document).ready(function() {

    var xmlResumes = getResumes();
    var htmlResumes = parseXMLtoHTML(xmlResumes);
    $("#resumes").append(htmlResumes);
    
    var xmlResume = getResumeById(1);
    var htmlResume = parseXMLtoHTML(xmlResume);
    $("#resumes").append(htmlResume);
    
    $("#add-button").click(function() {
        putResume();
    });
});

