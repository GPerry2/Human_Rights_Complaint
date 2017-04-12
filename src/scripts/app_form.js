/**
 * Created by gperry2 on 03/14/2017.
 */
(function (oldCheckboxFieldRender) {
  cot_form.prototype.checkboxFieldRender = function (field) {
    var o = oldCheckboxFieldRender.call(this, field);
    var container = $('<div style="column-count: 3"></div>');
    $(o).find('[type="checkbox"]').first().closest("label").before(container);
    $(o).find('[type="checkbox"]').each(function (index) {
      if ($(this).attr('name').indexOf('[]') == -1) {
        $(this).attr('name', $(this).attr('name') + '[]');
        container.append($(this).closest("label"));
      }
    });
    return o;
  }
})(cot_form.prototype.checkboxFieldRender);
let myDropzone;
let form;
let upload_selector = 'admin_dropzone';

function getFormJSON(form_id) {
  //console.log('getFormJason');
  return $("#"+form_id).serializeJSON({ useIntKeysAsArrayIndex: true });
}
function saveReport(action, payload, msg, form_id, repo) {
  console.log('save report');
  $(".btn").prop('disabled', true);

  $.ajax({
    url: config.httpHost.app[httpHost] + config.api.post +repo+ '?sid=' + getCookie('human_rights.sid'),
    type: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'Cache-Control': 'no-cache'
    },
    dataType: 'json'
  }).done(function(data) {
    switch (action) {
      case 'save':
        if (data && data.EventMessageResponse && data.EventMessageResponse.Event && data.EventMessageResponse.Event.EventID) {
          // Route to /{id} draft page if new report is successfully saved
          hasher.setHash(data.EventMessageResponse.Event.EventID + '?alert=success&msg=' + msg.done + '&ts=' + new Date().getTime());
        } else {
          hasher.setHash('new?alert=danger&msg=' + msg.fail + '&ts=' + new Date().getTime());
        }
        break;

      case 'notify':
        if (data && data.EventMessageResponse && data.EventMessageResponse.Event && data.EventMessageResponse.Event.EventID) {
          // Email report notice to emergency management captain and incident manager/reporters
          emailNotice(data.EventMessageResponse.Event.EventID, action, ['captain']);
        } else {
          hasher.setHash('new?alert=danger&msg=' + msg.fail + '&ts=' + new Date().getTime());
        }
        break;

      case 'submit':
        if (data && data.EventMessageResponse && data.EventMessageResponse.Event && data.EventMessageResponse.Event.EventID) {
          let updatePayload = JSON.stringify({
            'payload': JSON.stringify(getFormJSON(form_id)),
            'status': config.status.Submitted
          });
          updateReport(data.EventMessageResponse.Event.EventID, action, updatePayload, msg);
        } else {
          hasher.setHash('new?alert=danger&msg=' + msg.fail + '&ts=' + new Date().getTime());
        }
        break;

      default:
        break;
    }
  }).fail(function( textStatus, error) {
    alert("POST Request Failed: " + textStatus + ", " + error);
    hasher.setHash('new?alert=danger&msg=' + msg.fail + '&ts=' + new Date().getTime());
  }).always(function() {
    $(".btn").removeAttr('disabled').removeClass('disabled');
  });
}
function updateReport(fid, action, payload, msg, repo) {
  console.log('update report');
  $(".btn").prop('disabled', true);
  $.ajax({
    url: config.httpHost.app[httpHost] + config.api.put +repo + '/'+ fid + '?sid=' + getCookie('human_rights.sid'),
    type: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'Cache-Control': 'no-cache'
    },
    dataType: 'json'
  }).done(function(data) {
    switch (action) {
      case 'save':
        hasher.setHash(fid + '?alert=success&msg=' + msg.done + '&ts=' + new Date().getTime());
        break;
      case 'updateAttachments':
      break;
      case 'notify':
        // Email report notice to emergency management captain and incident manager/reporters
        //emailNotice(fid, action, ['captain']);
        break;

      case 'submit':
      case 'approve':
      case 'reject':
        // Email report notice to administrator, emergency management captain and incident manager/reporters
        //emailNotice(fid, action, ['administrator', 'captain']);
        hasher.setHash(fid + '?alert=success&msg=' + msg.done + '&ts=' + new Date().getTime());
        break;

      default:
        break;
    }
  }).fail(function( textStatus, error) {
    alert("POST Request Failed: " + textStatus + ", " + error);
    hasher.setHash(fid + '?alert=danger&msg=' + msg.fail + '&ts=' + new Date().getTime());
  }).always(function() {
    $(".btn").removeAttr('disabled').removeClass('disabled');
  });
}
function emailNotice(fid, action, recipients) {
  console.log('email report');
  let emailTo;
  if ($("#modifiedEmail").val()) {
    emailTo = JSON.parse($("#modifiedEmail").val());
  } else {
    emailTo = {};
  }
  let emailAdmin = config.administrator['G'];
  let emailCaptain = config.captain['G'];

  if (recipients && recipients.indexOf('administrator') !== -1) {
    $.extend(emailTo, emailAdmin);
  }
  if (recipients && recipients.indexOf('captain') !== -1) {
    $.extend(emailTo, emailCaptain);
  }

  let emailRecipients = $.map(emailTo, function(email) {
    return email;
  }).filter(function(itm, i, a) {
    return i === a.indexOf(itm);
  }).join(',');

  let payload = JSON.stringify({
    'email': emailRecipients,
    'id': fid,
    'status': action,
    'home': 'G'
  });

  $.ajax({
    url: config.httpHost.app[httpHost] + config.api.email,
    type: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'Cache-Control': 'no-cache'
    },
    dataType: 'json'
  }).done(function() {

    if (action === 'notify') {
      hasher.setHash(fid + '?alert=success&msg=notify.done&ts=' + new Date().getTime());
    }
  }).fail(function( textStatus, error) {
    alert("POST Request Failed: " + textStatus + ", " + error);

    if (action === 'notify') {
      hasher.setHash(fid + '?alert=danger&msg=notify.fail&ts=' + new Date().getTime());
    }
  });
}
function processForm(action, form_id, repo) {
  console.log('process form');
  let fid = $("#fid").val();
  let msg, payload;
  let f_data = getFormJSON(form_id);
  f_data.uploads = processUploads(myDropzone, repo, true);
  console.log('process form',fid, action , form_id, repo);
  switch (action) {
    case 'save':
    case 'notify':
    case 'updateAttachments':
      msg = {
        'done': 'save.done',
        'fail': 'save.fail'
      };
      // Update report and notify emergency management captain for status 'notify'
      if (fid) {
        payload = JSON.stringify({
          'payload': JSON.stringify(f_data)
        });
        updateReport(fid, action, payload, msg, repo);
      }
      // Create new report and notify emergency management captain for status 'notify'
      else {
        payload = JSON.stringify(f_data);
        saveReport(action, payload, msg,form_id, repo);
      }
      break;

    case 'submit':
      msg = {
        'done': 'submit.done',
        'fail': 'submit.fail'
      };

      // Update report and move to Submitted state
      if (fid) {

        var complainStatusVal = $("#complaintStatus").val();
        var jsonStatusVal = "";

/*
 'DraftHRC': 'New',
 'SubmittedHRC': 'Ongoing',
 'ApprovedHRC': 'Closed',
 'DeletedHRC': 'Deleted'
 */
        switch($("#complaintStatus").val()){
          case config.status.DraftHRC:
            jsonStatusVal = config.status.Draft;
            break;
          case config.status.ApprovedHRC:
            jsonStatusVal = config.status.Submitted;
            break;
          case config.status.SubmittedHRC:
            jsonStatusVal = config.status.Approved;
            break;
          default:
            jsonStatusVal = config.status.Draft;
        }

        payload = JSON.stringify({
          'payload': JSON.stringify(f_data),
          'status': jsonStatusVal
        });

        updateReport(fid, action, payload, msg, repo);
      }
      // Create new report and move to Submitted state
      else {
        payload = JSON.stringify(f_data);
        saveReport(action, payload, msg,form_id, repo);
      }
      break;
    case 'approve':
      msg = {
        'done': 'approve.done',
        'fail': 'approve.fail'
      };
      // Update report and move to Approved state
      if (fid) {
        payload = JSON.stringify({
          'payload': JSON.stringify(f_data),
          'status': config.status.Approved
        });
        updateReport(fid, action, payload, msg, repo);
      }
      break;
    case 'reject':
      msg = {
        'done': 'reject.done',
        'fail': 'reject.fail'
      };
      // Update report and move back to Draft (Yes) state
      if (fid) {
        payload = JSON.stringify({
          'payload': JSON.stringify(f_data),
          'status': config.status.Draft
        });
        updateReport(fid, action, payload, msg, repo);
      }
      break;
    default:
      break;
  }
}
function loadForm(destinationSelector, data, fid, status, form_id, repo) {
console.log(status)
  let adminForm = true;
  let showAdminHeader = true;
  let showContactSections = false;
  let showAttachmentSection = false;
  let debugMode = false;

  //$(destinationSelector).empty();

  let sections = $.merge($.merge(getAdminSectionsTop(),getSubmissionSections()),getAdminSectionsBottom());

  form = new CotForm({
    id: form_id,
    title: '',
    useBinding: false,
    sections:sections,
    success:function(e) {
      //console.log('form.success');
      // Pass callback function based on submit button clicked
      let action = $("#action").val();
      console.log('form.success  ', action, form_id, repo);
      if (['save', 'notify', 'submit', 'approve', 'reject'].indexOf(action) !== -1) {
        processForm(action, form_id, repo);
      } else {
        console.log('Error: Form action is not set');
      }
      e.preventDefault();
    }
  });


  app.addForm(form,'bottom');
  initForm(data);
  myDropzone = new Dropzone("div#" + upload_selector, setupDropzone({ fid:fid, form_id:form_id ,url: config.api.upload +config.default_repo + '/' + repo}));

  // Set datetime picker for Date of Action field
  $(".datetimepicker.wir\\[0\\]\\[dateAction\\]").datetimepicker({ "format": "DD/MM/YYYY" });

  let modifiedUsername = decodeURIComponent(getCookie('human_rights.cot_uname'));
  let modifiedName = decodeURIComponent(getCookie('human_rights.firstName')) + ' ' + decodeURIComponent(getCookie('human_rights.lastName'));
  let modifiedEmail = decodeURIComponent(getCookie('human_rights.email'));


  if(modifiedEmail==""){
    modifiedEmail = "graham.perry@toronto.ca";
  }

  // New report
  if (!data) {
    // Set created by and modified by to current user
    $("#createdBy, #modifiedBy").val(modifiedUsername);
    $("#modifiedEmail").val('{"' + modifiedName + '":"' + modifiedEmail + '"}');

    // Autofill name of Incident Manager field
    $("#incidentManager").val(modifiedName);
  }
  // View/Edit existing report
  else {
    if (data.wir && data.wir.length > 1) {
      $.each(data.wir.slice(1), function() {
        let cloneIndex = $(".wir-item").length;
        cloneWirItem();
        $("#wir" + cloneIndex).find("input[type=text], textarea, select").val('');
      });
    }
    showUploads(myDropzone,'form_uploads', data, repo, true);

    // Populate existing form with JSON object from GET request
    $("#"+form_id).populate(data, {
      phpIndices: true,
      resetForm: true
    });

    if (fid) {
      $("#fid").val(fid);
    }

    $("#modifiedBy").val(modifiedUsername);
    if(!$("#modifiedEmail").val()){
      $("#modifiedBy").val(modifiedUsername);
      $("#modifiedEmail").val('{"' + modifiedName + '":"' + modifiedEmail + '"}');
    }
    else if ($("#modifiedEmail").val().indexOf(modifiedEmail) == -1) {
      if ($("#modifiedEmail").val()) {
        let emailObj = JSON.parse($("#modifiedEmail").val());
        emailObj[modifiedName] = modifiedEmail;
        $("#modifiedEmail").val(JSON.stringify(emailObj));
      } else {
        $("#modifiedEmail").val('{"' + modifiedName + '":"' + modifiedEmail + '"}');
      }
    }
  }
  // New or existing Draft report
  if (status === config.status.Draft || !status) {
    // Remove Approve and Reject buttons
    $("#approveReportElement, #rejectReportElement").remove();
  }
  // Submitted or Approved report
  else if (status === config.status.Submitted || status === config.status.Approved) {
    console.log(groupMemberships);
    // Disable all fields and remove submission buttons if not administator
    if ($.inArray(config.groups.movie_app_admin, groupMemberships) === -1) {
      $("#"+form_id).find("input, textarea, select, button").attr('disabled', 'disabled');
      $("#saveSubmit").remove();
    } else {
      $(".btn-save").html($(".btn-save").html().replace(config.button.saveReport, config.button.save));
      $("#notifyReportElement, #submitReportElement").remove();
    }
  }
}
function getGroundFields(typeCompaintVal) {
  let groundChoice;

  // SET THE SELECTION FOR THE SELECTED COMPLAINT TYPE
  switch (typeCompaintVal) {
    case "Access to or use of City of Toronto facilities":
      groundChoice = config.groundAccessFacilities.choices;
      break;
    case "Administration or delivery of City of Toronto services":
      groundChoice = config.groundAdministration.choices;
      break;
    case "Employment with the City of Toronto":
      groundChoice = config.groundEmployment.choices;
      break;
    case "Job application with the City of Toronto":
      groundChoice = config.groundJobApplication.choices;
      break;
    case "Legal contracts with the City of Toronto":
      groundChoice = config.groundLegalContracts.choices;
      break;
    case "Occupancy of City of Toronto-owned accommodations":
      groundChoice = config.groundOccupancy.choices;
      break;
    case "Other":
      groundChoice = "";

      $("#groundElement").hide();
      $("#groundOtherElement").show();
      break;
    default:
      $("#groundElement").hide();
      $("#groundOtherElement").hide();
  }

$("#groundElement fieldset label").remove();
  if (typeCompaintVal!="") {

    $("#groundElement").show();
    $("#groundOtherElement").hide();
    $.each(groundChoice, function(i, item){
      let newVal ='<label class="vertical entryField checkboxLabel col-xs-12 col-sm-6 col-md-4 col-lg-3"><input name="ground[]" id="ground_' + (i) + '" title="Ground" type="checkbox" ';
      if(i==0){
        newVal += 'class="required"  data-fv-field="ground[]" data-fv-notempty data-fv-message="Ground is required" data-fv-notempty-message="Ground can not be empty" ';
        newVal += 'value="'+ item.text + '">' ;
        newVal+= '<i class="form-control-feedback" data-fv-icon-for="ground[]" style="display: none;"></i>'
        newVal += '<span>' + item.text + '</span></label>';
      }else {
        newVal += 'value="'+ item.text + '"><span>' + item.text + '</span></label>';
      }
      $("#groundElement fieldset").append(newVal);
      $('#'+ form_id).data('formValidation').addField($('#ground_'+i))
    });
  }
}
function employeeToggle(val){

  let et_val = $('#cotEmployeeType').val();
  let et =$('#cotEmployeeTypeElement');
  let div = $('#cotDivisionElement');
  let jt = $('#cotJobTypeElement');
  if(val=="Yes"){
    et.show();
    div.show();
    et_val==("Non-union"|"")?jt.hide():jt.show();
  }else{
    $('#cotDivision').val('');
    $('#cotEmployeeType').val('');
    $('#cotJobType').val('');
    et.hide();
    div.hide();
    jt.hide();
  }
}
function unionToggle(val){
  let jt = $('#cotJobTypeElement');
  if(val=="Non-union"){
    jt.hide();
  }else{
    jt.show();
  }
}
function divisionComplaintToggle(val) {
  let dco = $('#divisionComplaintOtherElement');
  if (val === "Other") {
    dco.show();
  } else {
    dco.hide();
  }
}
function otherToggle(val, listName) {
  let jt = $('#' + listName + 'Element');
  if (val === "Other") {
    jt.show();
  } else {
    $('#' + listName).val('');
    jt.hide();
  }
}
function solutionToggle() {
  if ($("#resolveCompQ").val() === "y" || $("#hrtoQ").val() === "y" || ($("#grievanceQ").val() === "y")) {
    $("#solutionSec").show();
  } else {
    $("#solutionSec").hide();
  }
}

function initForm(data) {
  getGroundFields("");
  $("#typeComplaint").on('change', function () {
    getGroundFields(this.value);
  });
  $('[name=cityEmployee]').on('change', function () {
    employeeToggle(this.value);
  });
  $('#cotEmployeeType').on('change', function () {
    unionToggle(this.value);
  });
  $("#divisionComplaint").on('change', function () {
    divisionComplaintToggle(this.value);
  });
  $('#role').on('change', function () {
    otherToggle(this.value, 'roleOther');
  });
  $("#resolveCompQ").on('change', function () {
    solutionToggle();
  })
  $("#hrtoQ").on('change', function () {
    solutionToggle();
  })
  $("#grievanceQ").on('change', function () {
    solutionToggle();
  })
  $('#enquiryList').on('change', function () {
    otherToggle(this.value, 'enquiryListOther');
  });
  $('#consultationList').on('change', function () {
    otherToggle(this.value, 'consultationListOther');
  });
  $('#interventionList').on('change', function () {
    otherToggle(this.value, 'interventionListOther');
  });
  $(".save-action").click(function(){
    console.log($("#action").val($(this).attr('id')));
    $("#action").val($(this).attr('id'));
    let hrc_fv = $('#'+ form.cotForm.id).data('formValidation');
    hrc_fv.validate();
    if(hrc_fv.isValid()){submitForm()}
  });
  $("#savebtn").click(function () {

    var hrc_fv = $('#hrc').data('formValidation');
    hrc_fv.validate();
    if (hrc_fv.isValid()) {
      submitForm();
    }
  });
  if (data) {
    // HIDE/SHOW FIELDS BASED ON OTHER FIELD VALUES
    getGroundFields(data.typeComplaint);
    employeeToggle(data.cityEmployee);
    unionToggle(data.cotEmployeeType);
    divisionComplaintToggle(data.divisionComplaint);
    otherToggle(data.role, 'roleOther');
    otherToggle(data.enquiryList, 'enquiryListOther');
    otherToggle(data.consultationList, 'consultationListOther');
    otherToggle(data.interventionList, 'interventionListOther');
    if (data.resolveCompQ === "y" || data.hrtoQ === "y" || data.grievanceQ === "y") {
      $("#solutionSec").show();
    } else {
      $("#solutionSec").hide();
    }
  } else {
    $("#solutionSec").hide();
    divisionComplaintToggle("");
    employeeToggle("No");
    //  unionToggle('Non-union');
  }
}
function submitForm(){
  console.log(form.cotForm.id);
  processForm('save', form.cotForm.id, config.default_repo);
}
function getSubmissionSections(){
  let section =    [
    {
      id: "eligibilitySec",
      title: app.data["Eligibility"] ,
      className: "panel-info",
      rows: [
        {
          fields: [
            { "id": "divisionComplaint", "required":true, "title": app.data["Division"], "type": "dropdown", "choices": config.division.choices, "className": "col-xs-12 col-md-6" },
            { "id": "divisionComplaintOther", "title": "", "type": "html", "html": app.data["Complaint Other Details"], "className": "col-xs-12 col-md-12" },
            {
              "id": "typeComplaint",
              "title": app.data["Type of Complaint"],
              "type": "dropdown",
              "className": "col-xs-10 col-md-6",
              "required":true,
              "choices": config.complaintType.choices,
              "posthelptext":app.data["typeComplaintHelpButton"]
            },
            //{"id": "ground", "title": app.data["Ground"] , "prehelptext":app.data["groundHelpButton"], "type": "checkbox", "choices": [{text:"Select one", value:''}], "className": "col-xs-12 col-md-12" },
            {"id": "ground","required": true ,
              "title": app.data["Ground"] ,
              "prehelptext":app.data["groundHelpButton"],
              "type": "checkbox",
              "choices": [], "className": "col-xs-12 col-md-12" },
            { "id": "groundOther", "title": "", "prehelptext":app.data["groundOtherHelpButton"],  "type": "html", "html": app.data["Ground Other Details"] ,"className": "col-xs-12 col-md-12" }
          ]
        }
      ]
    },
    {
      id: "contactInfoSec",
      title: app.data["Contact information Section"],
      className: "panel-info",
      rows: [
        {
          fields:	[
            { "id": "ciText1", "title": "", "type": "html", "html": app.data["ContactInfoText1"] }
          ]
        },
        {
          fields:	[
            { "id": "firstName", "title": app.data["First Name"], "required": true },
            { "id": "lastName", "title": app.data["Last Name"], "required": true },
            { "id": "title", "title": app.data["Title"]}
          ]
        },
        {fields: [{ "id": "role", "title": app.data["Role"], "type": "dropdown", "choices": config.role.choices}, {"id": "roleOther", "title": app.data["Role Other"]}]},
        {
          fields:	[
            { "id": "ciText2", "title": "", "type": "html", "html": app.data["ContactInfoText2"] }
          ]
        },
        {
          fields:	[
            { "id": "phone", "required":true, "title": app.data["Phone"], "validationtype":"Phone", "className": "col-xs-12 col-md-6" },
            { "id": "altPhone", "title": app.data["Alternative Phone"], "validationtype":"Phone", "className": "col-xs-12 col-md-6" }
          ]
        },
        {
          fields:	[
            { "id": "address", "title": app.data["Address"] },
            { "id": "email", "title": app.data["Email"], "validationtype": "Email", "validators": { regexp: { regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'This field must be a valid email. (###@###.####)' } } }
          ]
        },
        {
          fields:[{
            "id": "cityEmployee",
            "orientation":"horizotal",
            "title": app.data["Cot Employee"],
            "type": "radio",
            "value":"No",
            "choices": [{"text":"Yes","value":"Yes"},{"text":"No","value":"No"}],
            "className": "col-xs-12 col-md-6",
          }]
        },
        {
          fields:[
            { "id": "cotDivision", "title": app.data["cotDivision"], "type": "dropdown", "choices": config.division.choices, "className": "col-xs-12 col-md-4" },
            { "id": "cotEmployeeType",  "title": app.data["cotEmployeeType"], "type": "dropdown", "choices": config.cotEmployeeTypeList.choices, "className": "col-xs-12 col-md-4" },
            { "id": "cotJobType",  "title": app.data["union"], "type": "dropdown", "choices": config.cotJobTypeUnionList.choices, "className": "col-xs-12 col-md-4" }
          ]
        }

      ]
    },
    {
      id:"complaintDetailsSec",
      title:app.data["Complaint Details Section"],
      className: "panel-info",
      rows: [
        {
          fields:[
            { "id": "cdText1", "title": "", "type": "html", "html": app.data["ComplaintDetailText1"], "className": "col-xs-12 col-md-12" }
          ]
        },
        {
          fields:[
            { "id": "incidentDate", "required":true, "title": app.data["Date of the Incident"], "type": "datetimepicker", "options": { format: config.dateFormat, maxDate: new Date() },"className": "col-xs-12 col-md-4" }
          ]
        },
        {
          fields:[
            { "id": "cdText2", "title": "", "type": "html", "html": app.data["ComplaintDetailText2"]}
          ]
        },
        {
          fields:[
            { "id": "explanation", "title": app.data["Explanation"], "type": "textarea" }
          ]
        },
        {
          fields:[
            { "id": "issue", "required":true, "prehelptext":app.data["issueHelpButton"], "title": app.data["Issue"], "type": "dropdown", "choices": config.issue.choices , "className": "col-xs-12 col-md-6"}
            // { "id": "issueHelp", "title": "", "type": "html", "html": "<button type=\"button\" aria-label=\"Issue help button\" class=\"btn btn-primary btn-xs\" id=\"Issue-help\" onclick=\"javascript:void window.open('html//issueHelp.html','1423842457839','width=500,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');return false;\" >Help</button>" },
          ]
        },
        {
          fields:[
            { "id": "cdText3", "title": "", "type": "html", "html": app.data["ComplaintDetailText3"] }
          ]
        },
        {
          fields:[
            {"id":"docsIntro","title":"File Attachments","type":"html","html":'<section id="attachment"> <div class="dropzone" id="admin_dropzone"></div></section><section id="form_uploads"></section>'}
          ]
        },
        {
          fields:[
            { "id": "complaintDetails", "title": app.data["Complaint Details"], "type": "textarea" }
          ]
        },
        {
          fields:[
            { "id": "resolveCompQ",  "title": app.data["Resolve complaint"], "type": "dropdown", "orientation": "horizontal", "choices": config.choices.yesNoSelect}
          ]
        },
        {
          fields:[
            { "id": "hrtoQ",  "title": app.data["Filed HRTO application"], "type": "dropdown", "orientation": "horizontal", "choices": config.choices.yesNoSelect}
          ]
        },
        {
          fields:[
            { "id": "grievanceQ", "title": app.data["Filed grievance"], "type": "dropdown", "orientation": "horizontal", "choices": config.choices.yesNoSelect }
          ]
        }
      ]
    },
    {
      id:"solutionSec",
      title:"",
      className: "panel-info",
      rows: [
        {
          fields:[
            { "id": "cdText5", "title": "", "type": "html", "html": app.data["ComplaintDetailText7"] }
          ]
        },
        {
          fields:[
            { "id": "moreDetails", "title": app.data["More details"], "type": "textarea" }
          ]
        }
      ]
    },
    {
      id:"resSec",
      className: "panel-info",
      rows:[
        {
          fields:[
            { "id": "resDesired", "title": app.data["Resolution desired"], "prehelptext": "Describe what resolution you would like happen", "type": "textarea"}
          ]
        },
        {
          fields:[
            { "id": "compAgainst", "title": app.data["Complaint against"], "prehelptext": "Please list all names, separated by semi-colons(;)" }
          ]
        },
        {
          fields:[
            { "id": "footer1", "title": "", "type": "html", "html": app.data["ComplaintDetailText6"] }
          ]
        }
      ]
    },
    {
      id:"secActions",
      rows:[
        {
          fields:[
            {
              id:"help_dialog_grounds",
              type:"html",
              html:`  <div class="modal fade" id="groundsHelp" role="dialog"><div class="modal-dialog"><div class="modal-content"> <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">`+app.data["groundsHelpHeader"]+`</h4></div>
                                <div class="modal-body"><p>`+app.data["groundsHelpBody"]+`</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>
                  `
            },
            {
              id:"help_dialog_grounds_other",
              type:"html",
              html:`  <div class="modal fade" id="groundsHelpOther" role="dialog"><div class="modal-dialog"><div class="modal-content"> <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">`+app.data["groundsHelpOtherHeader"]+`</h4></div>
                                <div class="modal-body"><p>`+app.data["groundsHelpOtherBody"]+`</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>
                  `
            },
            {
              id:"help_dialog_Issue",
              type:"html",
              html:`  <div class="modal fade" id="issueComplaintHelp" role="dialog"><div class="modal-dialog"><div class="modal-content"> <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">`+app.data["issueHelpHeader"]+`</h4></div>
                                <div class="modal-body"><p>`+app.data["issueHelpBody"]+`</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>
                  `
            }
            ,
            {
              id:"help_dialog_Type",
              type:"html",
              html:`  <div class="modal fade" id="typeComplaintHelp" role="dialog"><div class="modal-dialog"><div class="modal-content"> <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">`+app.data["typeOfComplaintHelpHeader"]+`</h4></div>
                                <div class="modal-body"><p>`+app.data["typeOfComplaintHelpBody"]+`</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>
                  `
            }
          ]
        }
      ]
    }
  ]
  return section;
}
function getAdminSectionsTop() {
  var sections = [{
    rows: [{
      fields: [{ "id": "contactHow", "title": app.data["Contacted By"], "type": "checkbox", "choices": config.contactHow.choices }]
    }
    ]
  }];
  return sections;
}
function getAdminSectionsBottom(data) {
  var sections = [{
    "title": app.data["Staff Area Footer"],
    "id": "adminSectionsBottom",
    rows: [{
      fields: [{
        "id": "actionList",
        "title": app.data["Action List"],
        "type": "radio",
        "orientation": "horizontal",
        "choices": config.actionList.choices,
        "class": "col-xs-12 col-md-6"
      }]
    }, {
      fields: [{
        "id": "enquiryList",
        "title": app.data["Enquiry List"],
        "type": "dropdown",
        "choices": config.enquiryList.choices
      }, {
        "id": "enquiryListOther",
        "title": app.data["Enquiry List Other"]
      }]
    }, {
      fields: [{
        "id": "consultationList",
        "title": app.data["Consultation List"],
        "type": "dropdown",
        "choices": config.consultationList.choices
      }, {
        "id": "consultationListOther",
        "title": app.data["Consultation List Other"]
      }]
    }, {
      fields: [{
        "id": "interventionList",
        "title": app.data["Intervention List"],
        "type": "dropdown",
        "choices": config.interventionList.choices
      }, {
        "id": "interventionListOther",
        "title": app.data["Intervention List Other"]
      }]
    }, {
      fields: [{
        "id": "complaintStatus",
        "title": app.data["Complaint Status"],
        "type": "dropdown",
        "choices": config.complaintStatus.choices,
        "class": "col-xs-12 col-md-6"
      }, {
        "id": "actionReferral",
        "title": app.data["Action Referral"],
        "type": "dropdown",
        "choices": config.actionReferral.choices,
        "class": "col-xs-12 col-md-6"
      }]
    }, {
      fields: [{
        "id": "openDate",
        "title": app.data["Date Open"],
        "type": "datetimepicker",
        "options": { format: config.dateTimeFormat, minDate: new Date() },
        "class": "col-xs-12 col-md-6"
      }, {
        "id": "closeDate",
        "title": app.data["Date Closed"],
        "type": "datetimepicker",
        "options": { format: config.dateTimeFormat, minDate: new Date() },
        "class": "col-xs-12 col-md-6"
      }]
    }, {
      fields: [{
        "id": "caseManager",
        "title": app.data["Case Manager"],
        "type": "dropdown",
        "choices": config.caseManager.choices,
        "class": "col-xs-12 col-md-4"
      }, {
        "id": "fileNumber",
        "title": app.data["File Number"],
        "class": "col-xs-12 col-md-4"
      }, {
        "id": "paperFile",
        "title": app.data["Paper File"],
        "type": "checkbox",
        "choices": config.paperFile.choices,
        "class": "col-xs-12 col-md-4"
      }]
    }, {
      fields: [{
        "id": "staffNotes",
        "title": app.data["Staff Notes"],
        "type": "textarea",
        "class": "col-xs-12 col-md-12"
      }]
    }, {
      fields: [{
        "id": "outCome",
        "title": app.data["Intervention Outcome"],
        "type": "textarea",
        "class": "col-xs-12 col-md-12"
      }, {
        "id": "contactHow", "title": app.data["Contacted By"], "type": "checkbox", "choices": config.contactHow.choices
      }]

    }, {
      fields: [{
        "id": "fid",
        "type": "html",
        "html": "<input type=\"hidden\" id=\"fid\" name=\"fid\">",
        "class": "hidden"
      }, {
        "id": "action",
        "type": "html",
        "html": "<input type=\"text\" id=\"action\" name=\"action\">",
        "class": "hidden"
      }, {
        "id": "createdBy",
        "type": "html",
        "html": "<input type=\"hidden\" id=\"createdBy\" name=\"createdBy\">",
        "class": "hidden"
      }, {
        "id": "modifiedBy",
        "type": "html",
        "html": "<input type=\"hidden\" id=\"modifiedBy\" name=\"modifiedBy\">",
        "class": "hidden"
      }, {
        "id": "modifiedEmail",
        "type": "html",
        "html": "<input type=\"hidden\" id=\"modifiedEmail\" name=\"modifiedEmail\">",
        "class": "hidden"
      }, {
        "id": "yearCreated",
        "type": "html",
        "html": "<input type=\"hidden\" id=\"yearCreated\" name=\"yearCreated\">",
        "class": "hidden"
      }]
    }, {
      grid2: {
        id: 'grid', // don't modify this value
        add: true, //appears to not be in use
        title: 'Additional Contacts', //a title for the grid
        headers: [ //an array of objects with title values, for the grid column headings, not used for grid2
          { title: 'Heading 1' }, { title: 'Heading 2' }],
        addButtonLabel: 'Add',
        removeButtonLabel: 'Remove',
        initQty: data == null ? 1 : parseInt(data.grid),// sets the initial number of grid objects
        fields: [{ "id": "addfirstName", "title": "First Name", "className": "col-xs-12 col-md-4 col-lg-4" },
          { "id": "addlastName", "title": "Last Name", "className": "col-xs-12 col-md-4 col-lg-4" },
          { "id": "addtitle", "title": "Title", "className": "col-xs-12 col-md-4" },
          { "id": "addrole", "title": "Role", "type": "dropdown", "choices": config.role.choices, "className": "col-xs-12 col-md-4  col-lg-6" },
          { "id": "addroleOther", "title": "Role Other", "className": "col-xs-12 col-md-4 col-md-clear col-lg-6 col-lg-unclear" },
          { "id": "addemail", "title": "Email", "validationtype": "Email", "validators": { regexp: { regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'This field must be a valid email. (###@###.####)' } }, "className": "col-xs-12 col-md-4" },
          { "id": "addphone", "title": "Phone", "validationtype": "phone", "validationtype": "Phone", "className": "col-xs-12 col-md-4" },
          { "id": "addaltPhone", "title": "Alternative Phone", "validationtype": "phone", "validationtype": "Phone", "className": "col-xs-12 col-md-4" },
          { "id": "addaddress", "title": "Address", "className": "col-xs-12 col-md-4" }
        ]
      }
    }]// rows
  }];// sections
  return sections;
}
