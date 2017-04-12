
const app = new cot_app("Human Rights Complaint" , {
  hasFooter: false,
  hasContentBottom: true,
  hasContentRight: true,
  hasContentLeft: true,
  hasContentTop: true,
  hasLeftNav: false,
  searchcontext: 'INTRA'
});
let httpHost;
let oLogin;
let groupMemberships = ['testweb1','G','R','M', 'Administrator'];
let tab = "Yes";
let form_id = "human_rights_form";
let config;
$(document).ready(function() {
  loadVariables();
//console.log(123);
});

function loadVariables(){
  $.ajax({
    url: "//www1.toronto.ca/static_files/WebApps/CommonComponents/Human_Rights/JSONFeed.js",
    type: "GET",
    cache: "true",
    dataType:"jsonp",
    jsonpCallback: "callback",
    success: function(data) {
      $.each(data.items, function(i, item) {app.data[item.title] = item.summary;});
      config = app.data.config;
      renderCFrame();
    },
    error: function() {
      alert("Error: The application was unable to load data.")
    }
  });
}

function renderCFrame() {
  //ADD ALL THE LINKS YOU WANT TO THE APPLICATION BREADCRUMB
  httpHost = detectHost();
  app.setBreadcrumb(app.data["breadcrumbtrail"]);
  //INCLUDE ANY NECCESSARY JS/CSS LIBRARIES
  //FORMS TYPICALLY USE AT LEAST THE FOLLOWING 3 LIBRARIES
  app.includeLogin = app.includeDatePicker = app.includeRangePicker = app.includeFormValidation = app.includePlaceholders = app.includeMultiSelect = true;
  app.searchContext = "INTRA";
  //RENDER THE FINISHED PAGE AND THEN CALL A CALLBACK FUNCTION WHEN COMPLETE
  app.render(init);
}

function detectHost() {
  //console.log(window.location.hostname);
  switch (window.location.hostname) {
    case config.httpHost.app.dev:
      return 'dev';
    case config.httpHost.app.qa:
      return 'qa';
    case config.httpHost.app.prod:
      return 'prod';
    default:
      return 'dev';
  }
}

// Page authorization based on user cookie and group permissions
function auth() {
  if (!oLogin.isLoggedIn()) {
    $("#app-content-top").empty().html(config.auth.login);
    //oLogin.setUserName();
    return false;
  } else if (groupMemberships.length < 1) {
    $("#app-content-top").empty().html(config.auth.group);
    return false;
  } else {
    $("#app-content-right").hide();
    return true;
  }
}

// Render mustache.js template
function tpl(id, mst, callback) {
  $.get(mst, function(template) {
    let rendered = Mustache.render(template, $.extend(config,cot_login_app));
    $(id).empty().html(rendered);
    callback();
  }).fail(function() {
    $(id).empty();
    console.log('Failed to load template:  ' + mst);
  });
}

function listSubmissions(status, filter, repo, target) {

  //veirify user still has a session
  if (auth()) {
    app.setContent({bottom: '<div class="row"><div class="col-xs-12"><div id="view_pane" class="">viewPane</div></div></div>'});

    //Update View Title
    $("#viewtitle").html(config.status[status + 'HRC'] + " submissions");
    // build retrieve parameters
    let json = {};
    json.repo = repo;
    json.status = status=="Search"?"":status;
    json.filter = filter;
    // build cc_retrieve_view constructor
    let args = {
      url:config.httpHost.app[httpHost]+ config.api.get + repo + '/?json=' + JSON.stringify(json) + '&sid=' + getCookie('human_rights.sid'),
      target:$("#"+target),
      columnDefs:[
        {"targets": 0, data:'created',     title:'Submission Date', type:'date'},
        {"targets": 1, data:'firstName',   title:'First Name'},
        {"targets": 2, data:'lastName',    title:'Last Name'},
        {"targets": -1, data: null, title:'',"defaultContent": `<a class="btn-default btn-view-edit-report"><span title="View/Edit" class="glyphicon glyphicon-pencil"></span></a>`}
      ],
      addFooter:false,
      dateFormat: 'YYYY/MM/DD h:mm:ss a'
    };
    //initialize new cc_retrieve_view (pass in constructor)
    const myDataTable = new cc_retrieve_view(args);
    //render cc_retrieve_view
    myDataTable.render();
    $('.dataTables_filter').hide();
    $("#admin_search").on("keyup search input paste cut", function () {
      myDataTable.dt.search(this.value).draw();
    });
    $('ul.dropdown-menu > li').removeClass('active');
    $('#tabExportCSV').click(function(){$(".dt-button.buttons-csv.buttons-html5").click();});
    $('#tabExportEXCEL').click(function(){$(".dt-button.buttons-excel.buttons-html5").click();});
    $('#tabExportPDF').click(function(){$(".dt-button.buttons-pdf.buttons-html5").click();});
    $('#tabExportCOPY').click(function(){$(".dt-button.buttons-copy.buttons-html5").click();});
  }
}

function deleteReport(fid, payload, modal, repo) {
  $(".btn").prop('disabled', true);

  $.ajax({
    url: config.httpHost.app[httpHost] + config.api.delete + repo +'/'+ fid,
    type: 'GET',
    data: {
      'json': payload,
      'sid': getCookie('human_rights.sid')
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'Cache-Control': 'no-cache'
    },
    dataType: 'json'
  }).done(function() {
    hasher.setHash('?alert=success&msg=delete.done&status=' + tab + '&ts=' + new Date().getTime());
  }).fail(function() {
    hasher.setHash('?alert=danger&msg=delete.fail&status=' + tab + '&ts=' + new Date().getTime());
  }).always(function() {
    modal.modal('hide');
    $(".btn").removeAttr('disabled').removeClass('disabled');
  });
}

function frontPage(query, repo) {
  if (auth()) {
    if (query && query.alert && query.msg) {
      config.messages.current = eval('config.messages.' + query.msg);
    } else {
      config.messages.current = '';
    }

    // Initial application load
    tpl('#app-content-top', 'html/submissions.html', function() {
      // Place name of home(s) in the header for which user has access to
      $("h3.homes").html("Home(s): " + $.grep(groupMemberships, function(group) {
          return group != config.groups.ltc_home_admin;
        }).join(', ')).show();

      if (query && query.alert && query.msg) {
        if (query.alert === 'success') {
          $("#submissions > .alert-success").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        } else if (query.alert === 'danger') {
          $("#submissions > .alert-danger").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        }
      }



      /* List submissions */
      let tab = (query && query.status) ? query.status : config.status.Draft;
      let _repo = repo? repo:config.default_repo;
      var search = query && query.search ? query.search : '';

      $('ul.dropdown-menu > li').removeClass('active');
      $('[data-id="'+tab+'"]').parent().addClass('active');

      listSubmissions(tab, search, _repo, 'view_pane');
    });
  }
}

function newPage(query) {
  if (auth()) {
    if (query && query.alert && query.msg) {
      config.messages.current = eval('config.messages.' + query.msg);
    } else {
      config.messages.current = '';
    }

    tpl('#app-content-top', 'html/viewedit.html', function() {
      if (query && query.alert && query.msg) {
        if (query.alert === 'success') {
          $("#new-content > .alert-success").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        } else if (query.alert === 'danger') {
          $("#new-content > .alert-danger").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        }
      }

      loadForm("#new-form", null, null, null, form_id, 'human_rights');
    });
  }
}

function viewEditPage(id, query) {
  let repo = query.repo?query.repo:config.default_repo;
  if (auth()) {
    if (query && query.alert && query.msg) {
      config.messages.current = eval('config.messages.' + query.msg);
    } else {
      config.messages.current = '';
    }

    tpl('#app-content-top', 'html/viewedit.html', function() {
      if (query && query.alert && query.msg) {
        if (query.alert === 'success') {
          $("#viewedit-content > .alert-success").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        } else if (query.alert === 'danger') {
          $("#viewedit-content > .alert-danger").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        }
      }

      // API call to get report

      $.getJSON( config.httpHost.app[httpHost]+ config.api.get + repo + '/'+  id + '?sid=' + getCookie('human_rights.sid'))
        .done(function(data) {
          let payload = JSON.parse(data.payload);
          $("#viewtitle").html((data.status === 'Yes' ? 'Draft' : config.status[data.status + 'HRC']) + ' Report: ' + payload.firstName + " "+ payload.lastName);
          loadForm("#viewedit-form", payload, id, data.status, form_id , 'human_rights');
        })
        .fail(function( textStatus, error) {
          $("#viewedit-content > .alert-danger").append(textStatus+' ' +  error+' ' + config.messages.load.fail).removeClass('hidden').fadeOut(config.messages.fadeOutTime, function() {
            $(this).addClass('hidden');
          });
        });
    });
  }
}

// Setup hasher
function parseHash(newHash) {
  crossroads.parse(newHash);
}

function initFrontPage(data) {
  // Save group names based on user's group permissions
  if (data && data.groups) {
    for (let name in config.groups) {
      if (data.groups.indexOf(name) !== -1) {
        groupMemberships.push(config.groups[name]);
      }
    }

    hasher.initialized.add(parseHash); // Parse initial hash
    hasher.changed.add(parseHash); // Parse hash changes
    hasher.init(); // Start listening for history change
  }
}

function init() {
  crossroads.ignoreState = true;
  crossroads.addRoute('/:?query:', frontPage);
  crossroads.addRoute('/new:?query:', newPage);
  crossroads.addRoute('/{id}:?query:', viewEditPage);

  oLogin = new cot_login({ccRoot:config.httpHost.app[httpHost],welcomeSelector:"#app-content-right", onLogin:initFrontPage, appName:"human_rights"});

  // Render modal template
  tpl('#app-utility-modal', 'html/modal.html', function() {

      $(".btn-create-report").on('click', function () {
        var modal = $(this);
        createReport(modal);
      });
    $(this).on('hide.bs.modal', function () {
      $(".btn-create-report").off('click');
    });
  });

  // Create New Entry button
  $("#maincontent").on('click', '#btn-createReport', function() {
    hasher.setHash('new?ts=' + new Date().getTime());
  });

  // View Submissions button
  $("#maincontent").on('click', '#btn-viewSubmissions', function() {
    hasher.setHash('?status=' + tab + '&ts=' + new Date().getTime());
  });

  // Print button
  $("#maincontent").on('click', '#btn-print', function() {
    window.print();
  });

  // Export to CSV button
  $("#maincontent").on('click', '#btn-exportCsv', function() {});

  // Navigation tab links by report status
  $("#maincontent").on('click', '.tablink', function() {
    hasher.setHash('?status=' + $(this).attr('data-id') + '&ts=' + new Date().getTime());
  });

  $("#maincontent").on('click', '#btn-adminSearch', function () {
    var query = $('#admin_search').val();
    if (query.trim() != "") {
      hasher.setHash('?status=' + $(this).attr('data-id') + '&search=' + 'payload~' + query + '&ts=' + new Date().getTime());
    }
  });

  // View / Edit report button
  $("#maincontent").on('click', '.btn-view-edit-report', function() {
    hasher.setHash($(this).parents('tr').attr('data-id') + '?ts=' + new Date().getTime()+'&repo=human_rights');
  });


  // Set action parameter value based on button clicked
  $("#maincontent").on("click", ".btn-save, .btn-notify, .btn-submit, .btn-approve, .btn-reject", function() {
    $("#action").val($(this).attr('id'));
  });



  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });

  // Scroll to top
  $("#back-to-top").click(function() {
    $("#back-to-top").tooltip('hide');
    $("html, body").animate({
      scrollTop: 0
    }, 'fast');
    return false;
  });

  $("#back-to-top").tooltip('show');
}
function newReport(query) {
  console.log("in new report");
  if (auth()) {
    if (query && query.alert && query.msg) {
      config.messages.current = eval('config.messages.' + query.msg);
    } else {
      config.messages.current = '';
    }

    tpl('#app-content-bottom', 'newReport.html', function () {
      if (query && query.alert && query.msg) {
        if (query.alert === 'success') {
          $("#new-content > .alert-success").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function () {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        } else if (query.alert === 'danger') {
          $("#new-content > .alert-danger").removeClass('hidden').fadeOut(config.messages.fadeOutTime, function () {
            $(this).addClass('hidden');
            config.messages.current = '';
          });
        }
      }
      // loadForm("#new-form");
      loadReportSearch("#new-form");
    });
  }
}

function createReport(modal) {
  $(".btn-cancel").trigger( "click" );
  var reportType = $("#reportType").val();
  var searchYear = $("#reportYear").val();

  if (searchYear !== "") {
    var submissionsHTML = '';
    var json = {};
    var tabVal = "All";

    json.repo = 'human_rights';

    $("#viewtitle").text(searchYear + " " + reportType);

    // Building Search results
    submissionsHTML = '<div class="table-responsive"><table class="table table-striped table-bordered table-' + tab + '">';

    $.getJSON(config.httpHost.app[httpHost]+ config.api.get + json.repo  + '?json=' + JSON.stringify(json) + '&sid=' + getCookie('human_rights.sid'), function (data) {
      sortSubmissionsByDate(data);

      var repSecTitle = "";
      var repSecChoices = "";
      var repSecFieldName = "";

      if (reportType != "") {
        switch (reportType) {
          case 'Complaints':
            // COMPLAINTS REPORT PARAMETERS
            var repSecTitle = ["By Status", "By Issue", "By Employee Type", "By Application"];
            var repSecChoices = [[config.complaintStatus.choices], [config.issue.choices, config.issuePrevVer.choices], [config.cotEmployeeTypeList.choices], [config.complaintType.choices]];
            var repSecFieldName = ["complaintStatus", "issue", "cotEmployeeType", "typeComplaint"];
            break;
          case 'Issues':
            // ISSUES REPORT PARAMETERS
            var repSecTitle = ["By Grounds"];
            var repSecChoices = [[config.groundAll.choices]];
            var repSecFieldName = ["ground"];
            break;
          case 'Actions':
            // ACTION REPORT PARAMETERS
            var repSecTitle = ["By Enquiry Type", "Consultation Type", "By Intervention Type", "By Action Type"];
            var repSecChoices = [[config.enquiryList.choices, config.enquiryListPrevVer.choices], [config.consultationList.choices, config.consultationListPrevVer.choices], [config.interventionList.choices], [config.actionList.choices, config.actionListPrevVer.choices]];
            var repSecFieldName = ["enquiryList", "consultationList", "interventionList", "actionList"];
            break;
        }
            let k;
        for (k = 0; k < repSecTitle.length; k++) {
          submissionsHTML = submissionsHTML + createRepSection(data, searchYear, repSecTitle[k], repSecChoices[k], repSecFieldName[k]) + "<tr><td></td><td></td></tr>";
        }
      }
      if (submissionsHTML) {

        $("#view_pane").empty().html(submissionsHTML);
      } else {

        $(".loading img").replaceWith(config.messages.noSubmissionsFound);
      }

    });
  }

  $(".btn").prop('disabled', true);
  modal.modal('hide');
  $(".btn").removeAttr('disabled').removeClass('disabled');
}

function createRepSection(data, searchYear, repSecTitle, repSecChoices, repSecFieldName) {
  let submissionsHTML = "";
  let i,j;
  if (repSecTitle != "") {
    submissionsHTML = '<tr><td><b>' + repSecTitle + '</b></td><td><b>' + "Total Complaints" + '</b></td>';
  }
  var keyVals = new Array();
  // Gets key parameters
  for (j = 0; j < repSecChoices.length; j++) {
    for (i = 0; i < repSecChoices[j].length; i++) {
      if (repSecChoices[j][i].value != "") {
        keyVals.push(repSecChoices[j][i].value);
      }
    }
  }
  keyVals.push("<b>Total</b>");
  var keyCounters = getCounts(data, searchYear, repSecFieldName, keyVals);
  // Gets the totals
  for (i = 0; i < keyVals.length; i++) {
    submissionsHTML += '<tr><td>' + keyVals[i] + '</td><td>' + keyCounters[i] + '</td></tr>';
  }
  return submissionsHTML;

}

function getCounts(data, searchYear, fieldName, fieldValue) {
  //   console.log("in reportSearch");
  let i,j;
  var counter = new Array();
  for (i = 0; i < fieldValue.length; i++) {
    counter.push(0)
  }

  // Generate HTML for each table row entry
  $.each(data, function (i, row) {

    var payload = JSON.parse(row.payload);
    for (j = 0; j < fieldValue.length - 1; j++) {
      if (row.status != "Deleted") {
        var complaintCreated = payload["complaintCreated"];
        if (searchYear === "All" || (complaintCreated != undefined && complaintCreated.indexOf(searchYear) > -1)) {
          if (((Array.isArray(payload[fieldName]) && (payload[fieldName].indexOf(fieldValue[j])) > -1))) {
            counter[j] = counter[j] + 1;
            counter[fieldValue.length - 1] = counter[fieldValue.length - 1] + 1;
          } else if (payload[fieldName] === fieldValue[j]) {
            counter[j] = counter[j] + 1;
            counter[fieldValue.length - 1] = counter[fieldValue.length - 1] + 1;
          }
        }
      }

    }

  })
  return counter;
}
// Sort submissions in order of last modified date with most recent first
function sortSubmissionsByDate(data) {
  data.sort(function (a, b) {
    //    return new Date(b.updated).getTime() - new Date(a.updated).getTime();
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });
}
