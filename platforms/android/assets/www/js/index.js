function ResumeList($resumeArray) {
    this.resumeList = $resumeArray;
}
function createResumeTemplate(resume) {
    return "<h1>" + resume.name + "</h1>";
}

function Resume($id, $name, $surname, $goal, $cursus, $languages,
        $skills, $itskills) {
    this.ownId = $id;
    this.name = $name;
    this.surname = $surname;
    this.goal = $goal;
    this.cursus = $cursus;
    this.languages = $languages;
    this.skills = $skills;
    this.itSkills = $itskills;
    this.toXmlString = function () { return JQuery.xmlEncoding(this) };
    this.toHtml = createResumeTemplate(this);
};

// Resume
function initResumeFromForm() {
    var resume = Resume(0, $("#textinput-name").val(),
                        $("#textinput-surname").val(),
                        $("#textinput-goal").val(),
                        $("#textinput-cursus").val(),
                        $("#textinput-languages").val(),
                        $("#textinput-skills").val(),
                        $("#textinput-itskills").val());
    return resume;
};

function putResume() {
    var resume = initResumeFromForm();
    jQuery.ajax({
         type: "PUT",
         url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/",
         contentType: "application/xml; charset=utf-8",
         dataType: "xml",
         
         success: function (resume, status, jqXHR) {
             if (status === 200) {
                 // TODO envoyer notif à utilisateur ou modal.
             }
         },

         error: function (jqXHR, status) {
             // error handler
         }
    });
}

function getResumeById($id) {
    jQuery.ajax({
         type: "GET",
         url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/" + $id,
         contentType: "application/xml; charset=utf-8",
         dataType: "xml",
         success: function (data, status, jqXHR) {
             // do something
         },

         error: function (jqXHR, status) {
             // error handler
         }
    });
}

function getResumes () {
     jQuery.ajax({
         type: "GET",
         url: "http://resumemanagerrestserver.juanwolf.cloudbees.net/",
         contentType: "application/xml; charset=utf-8",
         dataType: "xml",
         success: function (data, status, jqXHR) {
              $xml = $( data );
              $xmlResume = $xml.find("resume");
              var resume = Resume($xmlResume.find("ownId"),
                            $xmlResume.find("name"),
                            $xmlResume.find("surname"),
                            $xmlResume.find("goal"),
                            $xmlResume.find("cursus"),
                            $xmlResume.find("languages"),
                            $xmlResume.find("skills"),
                            $xmlResume.find("itSkills")
                           );
             return resume.toHtml;
         },

         error: function (jqXHR, status) {
             // error handler
         }
    });
}

$(document).ready(function() {
   var resumes = getResumes();
   console.log(resumes);
   if (resumes !== null) {
       $("#resumes").append(resumes);
   }
});

