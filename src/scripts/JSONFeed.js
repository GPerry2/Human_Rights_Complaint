"use strict";

callback({
  "items": [
    {
      "title":"config",
      "summary":
        {
          'role': {
            'title': 'Role',
            choices: [{ 'text': 'Enquirer', 'value': 'Enquirer' },
              { 'text': 'Complainant', 'value': 'Complainant' },
              { 'text': 'Respondent', 'value': 'Respondent' },
              { 'text': 'Other', 'value': 'Other' }]
          },
          'actionReferral': {
            'title': 'Action Referral:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Human Rights Tribunal Ontario (HRTO)', 'value': 'Human Rights Tribunal Ontario (HRTO)' },
              { 'text': 'Ontario Labour Relations Board (OLRB)', 'value': 'Ontario Labour Relations Board (OLRB)' },
              { 'text': 'Other Provincial Government', 'value': 'Other Provincial Government' },
              { 'text': 'Canadian Human Rights Commission (CHRC)', 'value': 'Canadian Human Rights Commission (CHRC)' },
              { 'text': 'Other Federal Government', 'value': 'Other Federal Government' },
              { 'text': 'Divisional Complaint Handling', 'value': 'Divisional Complaint Handling' },
              { 'text': 'Human Resources', 'value': 'Human Resources' },
              { 'text': 'Union/Employee Organization', 'value': 'Union/Employee Organization' },
              { 'text': 'Toronto Ombudsman', 'value': 'Toronto Ombudsman' },
              { 'text': 'Auditor General', 'value': 'Auditor General' },
              { 'text': 'Integrity Commissioner', 'value': 'Integrity Commissioner' },
              { 'text': 'Agency or Corporation', 'value': 'Agency or Corporation' },
              { 'text': 'OTHER', 'value': 'OTHER' }]
          },
          'title': 'Human Rights Complaints',
          'v2': { 'title': "Human Rights Complaints" },
          'dateTimeFormat': 'MM/DD/YYYY hh:mm',
          'dateTimeFormat2': 'YYYY/MM/DD hh:mm',
          'dateFormat': 'MM/DD/YYYY',
          'dateFormat2': 'YYYY-MM-DD',
          'default_repo': 'human_rights',
          'formName':{'demo':'Human Rights Complaint Form'},
          'division': {
            'title': 'Division:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'AOCC', 'value': 'AOCC' },
              { 'text': '311 Toronto', 'value': '311 Toronto' },
              { 'text': 'Accounting Services', 'value': 'Accounting Services' },
              { 'text': 'Affordable Housing Office', 'value': 'Affordable Housing Office' },
              { 'text': 'Agency or Corporation', 'value': 'Agency or Corporation' },
              { 'text': 'Auditor General\'s Office', 'value': 'Auditor General\'s Office' },
              { 'text': 'Chief Corporate Officer', 'value': 'Chief Corporate Officer' },
              { 'text': 'Children\'s Services', 'value': 'Children\'s Services' },
              { 'text': 'City Clerk\'s Office', 'value': 'City Clerk\'s Office' },
              { 'text': 'City Integrity Commissioner', 'value': 'City Integrity Commissioner' },
              { 'text': 'City Manager\'s Office', 'value': 'City Manager\'s Office' },
              { 'text': 'City Planning', 'value': 'City Planning' },
              { 'text': 'Clean and Beautiful City Secretariat', 'value': 'Clean and Beautiful City Secretariat' },
              { 'text': 'Corporate Finance', 'value': 'Corporate Finance' },
              { 'text': 'Councillor\'s Offices', 'value': 'Councillor\'s Offices' },
              { 'text': 'Court Services', 'value': 'Court Services' },
              { 'text': 'Deputy City Manager Cluster A', 'value': 'Deputy City Manager Cluster A' },
              { 'text': 'Deputy City Manager Cluster B', 'value': 'Deputy City Manager Cluster B' },
              { 'text': 'Deputy City Manager Cluster C and CFO ', 'value': 'Deputy City Manager Cluster C and CFO ' },
              { 'text': 'Economic Development and Culture', 'value': 'Economic Development and Culture' },
              { 'text': 'Emergency Medical Services', 'value': 'Emergency Medical Services' },
              { 'text': 'Employment and Social Services', 'value': 'Employment and Social Services' },
              { 'text': 'Engineering and Construction Services', 'value': 'Engineering and Construction Services' },
              { 'text': 'Environment and Energy Division', 'value': 'Environment and Energy Division' },
              { 'text': 'Equity, Diversity & Human Rights Office', 'value': 'Equity, Diversity & Human Rights Office' },
              { 'text': 'Executive Management', 'value': 'Executive Management' },
              { 'text': 'Facilities Management', 'value': 'Facilities Management' },
              { 'text': 'Finance and Administration', 'value': 'Finance and Administration' },
              { 'text': 'Financial Planning', 'value': 'Financial Planning' },
              { 'text': 'Fire Services', 'value': 'Fire Services' },
              { 'text': 'Fleet Services', 'value': 'Fleet Services' },
              { 'text': 'Human Resources', 'value': 'Human Resources' },
              { 'text': 'Information and Technology', 'value': 'Information and Technology' },
              { 'text': 'Internal Audit', 'value': 'Internal Audit' },
              { 'text': 'Legal Services', 'value': 'Legal Services' },
              { 'text': 'Long-Term Care Homes & Services', 'value': 'Long-Term Care Homes & Services' },
              { 'text': 'Major Capital Infrastructure Coordination Office', 'value': 'Major Capital Infrastructure Coordination Office' },
              { 'text': 'Municipal Licensing and Standards', 'value': 'Municipal Licensing and Standards' },
              { 'text': 'Office of Emergency Management', 'value': 'Office of Emergency Management' },
              { 'text': 'Office of the Lobbyist Registrar', 'value': 'Office of the Lobbyist Registrar' },
              { 'text': 'Office of the Mayor', 'value': 'Office of the Mayor' },
              { 'text': 'Office of the Ombudsman', 'value': 'Office of the Ombudsman' },
              { 'text': 'Parks, Forestry and Recreation', 'value': 'Parks, Forestry and Recreation' },
              { 'text': 'Pension, Payroll and Employee Benefits', 'value': 'Pension, Payroll and Employee Benefits' },
              { 'text': 'Policy, Planning, Finance and Administration', 'value': 'Policy, Planning, Finance and Administration' },
              { 'text': 'Purchasing and Materials Management', 'value': 'Purchasing and Materials Management' },
              { 'text': 'Real Estate Services', 'value': 'Real Estate Services' },
              { 'text': 'Revenue Services', 'value': 'Revenue Services' },
              { 'text': 'Shelter, Support and Housing Administration', 'value': 'Shelter, Support and Housing Administration' },
              { 'text': 'Social Development, Finance and Administration', 'value': 'Social Development, Finance and Administration' },
              { 'text': 'Solid Waste Management Services', 'value': 'Solid Waste Management Services' },
              { 'text': 'Special Projects', 'value': 'Special Projects' },
              { 'text': 'Strategic and Corporate Policy', 'value': 'Strategic and Corporate Policy' },
              { 'text': 'Strategic Communications', 'value': 'Strategic Communications' },
              { 'text': 'Technical Services', 'value': 'Technical Services' },
              { 'text': 'Toronto Building', 'value': 'Toronto Building' },
              { 'text': 'Toronto Environment Office', 'value': 'Toronto Environment Office' },
              { 'text': 'Toronto Office of Partnerships', 'value': 'Toronto Office of Partnerships' },
              { 'text': 'Toronto Paramedic Services', 'value': 'Toronto Paramedic Services' },
              { 'text': 'Toronto Public Health', 'value': 'Toronto Public Health' },
              { 'text': 'Toronto Water', 'value': 'Toronto Water' },
              { 'text': 'Transportation Services', 'value': 'Transportation Services' },
              { 'text': 'Treasurer', 'value': 'Treasurer' },
              { 'text': 'Waterfront Secretariat', 'value': 'Waterfront Secretariat' },
              { 'text': 'Other', 'value': 'Other' }]
          },
          'contactHow': {
            'title': 'Contacted By',
            choices: [
              { 'text': 'Phone', 'value': 'Phone' },
              { 'text': 'Email', 'value': 'Email' },
              { 'text': 'In person', 'value': 'In person' },
              { 'text': 'Mail', 'value': 'Mail' },
              { 'text': 'Fax', 'value': 'Fax' },
              { 'text': 'Online', 'value': 'Online' }
              ]
          },
          'complaintType': {
            'title': 'Complaint Type',
            choices: [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Access to or use of City of Toronto facilities', 'value': 'Access to or use of City of Toronto facilities' },
              { 'text': 'Administration or delivery of City of Toronto services', 'value': 'Administration or delivery of City of Toronto services' },
              { 'text': 'Employment with the City of Toronto', 'value': 'Employment with the City of Toronto' },
              { 'text': 'Job application with the City of Toronto', 'value': 'Job application with the City of Toronto' },
              { 'text': 'Legal contracts with the City of Toronto', 'value': 'Legal contracts with the City of Toronto' },
              { 'text': 'Occupancy of City of Toronto-owned accommodations', 'value': 'Occupancy of City of Toronto-owned accommodations' },
              { 'text': 'Other', 'value': 'Other' }]
          },
          'pointerType': {
            'title': 'Pointer',
            choices: [{ 'text': 'Select one', 'value': '' }]
          },
          'groundAccessFacilities': {
            'title': 'Ground Access Facilities',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Place of origin - Ethnic & Place', 'value': 'Place of origin - Ethnic & Place' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Record of Offence', 'value': 'Record of Offence' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual harassment', 'value': 'Sexual harassment' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' }]
          },
          'groundJobApplication': {
            'title': 'Ground Job Application',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Membership in a union or staff association', 'value': 'Membership in a union or staff association' },
              { 'text': 'Place of origin', 'value': 'Place of origin' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Record of offences', 'value': 'Record of Offence' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' }]
          },
          'groundAdministration': {
            'title': 'Ground Administration',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Place of origin', 'value': 'Place of origin' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Record of Offence', 'value': 'Record of Offence' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' }]
          },
          'groundLegalContracts': {
            'title': 'Ground Legal Contracts',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Place of origin', 'value': 'Place of origin' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' }]
          },
          'groundOccupancy': {
            'title': 'Ground Occupancy',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Place of origin', 'value': 'Place of origin' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' }]
          },
          'groundEmployment': {
            'title': 'Ground Employment',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Harassment', 'value': 'Harassment' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Membership in a union or staff association', 'value': 'Membership in a union or staff association' },
              { 'text': 'Place of origin', 'value': 'Place of origin' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Record of Offence', 'value': 'Record of Offence' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual harassment', 'value': 'Sexual harassment' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' },
              { 'text': 'Workplace harassment', 'value': 'Workplace harassment' },]
          },
          'groundAll': {
            'title': 'Ground All',
            'choices': [
              { 'text': 'Age', 'value': 'Age' },
              { 'text': 'Ancestry', 'value': 'Ancestry' },
              { 'text': 'Citizenship', 'value': 'Citizenship' },
              { 'text': 'Colour', 'value': 'Colour' },
              { 'text': 'Creed', 'value': 'Creed' },
              { 'text': 'Disability', 'value': 'Disability' },
              { 'text': 'Ethnic origin', 'value': 'Ethnic origin' },
              { 'text': 'Family status', 'value': 'Family status' },
              { 'text': 'Gender Expression', 'value': 'Gender Expression' },
              { 'text': 'Gender Identity', 'value': 'Gender Identity' },
              { 'text': 'Harassment', 'value': 'Harassment' },
              { 'text': 'Level of literacy', 'value': 'Level of literacy' },
              { 'text': 'Marital status', 'value': 'Marital status' },
              { 'text': 'Membership in a union or staff association', 'value': 'Membership in a union or staff association' },
              { 'text': 'No Ground', 'value': 'No Ground' },
              { 'text': 'Place of origin', 'value': 'Place of origin - Ethnic & Place' },
              { 'text': 'Political affiliation', 'value': 'Political affiliation' },
              { 'text': 'Race', 'value': 'Race' },
              { 'text': 'Record of Offence', 'value': 'Record of Offence' },
              { 'text': 'Reprisal', 'value': 'Reprisal' },
              { 'text': 'Sex (including pregnancy and breast feeding)', 'value': 'Sex (including pregnancy and breast feeding)' },
              { 'text': 'Sexual harassment', 'value': 'Sexual harassment' },
              { 'text': 'Sexual orientation', 'value': 'Sexual orientation' },
              { 'text': 'Workplace harassment', 'value': 'Workplace harassment' }]
          },
          'typeOfComplaintHelp_header':'Type of Compliant',
          'issue': {
            'title': 'Issue',
            choices: [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Failure to Accommodate', 'value': 'Failure to Accommodate' },
              { 'text': 'Discrimination', 'value': 'Discrimination' },
              { 'text': 'Harassment', 'value': 'Harassment' },
              { 'text': 'Reprisal', 'value': 'Reprisal' }]
          },
          'issuePrevVer': {
            'title': 'Issue Prev Version',
            choices: [{ 'text': 'Division Complaint Handling', 'value': 'Division Complaint Handling' },
              { 'text': 'Policy Information', 'value': 'Policy Information' },
              { 'text': 'Special Programs/Projects', 'value': 'Special Programs/Projects' },
              { 'text': 'Training', 'value': 'Training' },
              { 'text': 'Other', 'value': 'Other' },
              { 'text': 'No entry', 'value': 'No entry' }]
          },
          'reportType': {
            'title': 'Report Type',
            choices: [{ 'text': 'Complaints', 'value': 'Complaints' },
              { 'text': 'Issues', 'value': 'Issues' },
              { 'text': 'Actions', 'value': 'Actions' }]
          },
          'reportYear': {
            'title': 'Report Year',
            choices: [{ 'text': '2011', 'value': '2011' },
              { 'text': '2012', 'value': '2012' },
              { 'text': '2013', 'value': '2013' },
              { 'text': '2014', 'value': '2014' },
              { 'text': '2015', 'value': '2015' },
              { 'text': '2016', 'value': '2016' },
              { 'text': '2017', 'value': '2017' }]
          },
          'button': {
            'submit': 'Submit',
            'submitPublic': 'Submit Public',
            'createNewEntry': 'Create New',
            'viewSubmissions': 'View Submissions',
            'print': 'Print',
            'exportCsv': 'Export to CSV',
            'exportExcel': 'Export to Excel',
            'viewEdit': 'View / Edit',
            'delete': 'Delete',
            'addNewItem': 'Add New Item',
            'removeItem': 'Remove Item',
            'clearItem': 'Clear Item',
            'saveReport': 'Save Draft',
            'save': 'Save',
            'notifyReport': 'Notify Captain',
            //     'submitReport': 'Submit to Administrator',
            'submitReport': 'Submit',
            'submitPublicReport': 'Submit Public',
            'approveReport': 'Approve',
            'rejectReport': 'Reject',
            'removeReport': 'Remove Record',
            'removeTitle': 'Remove Item',
            'createReport': 'Create Report',
            'reports': 'Reports'
          },
          'choices': {
            'yesNo': [{
              'text': 'Yes',
              'value': 'y'
            }, {
              'text': 'No',
              'value': 'n'
            }],
            'yesNoSelect': [{
              'text': 'Select One',
              'value': ''
            }, {
              'text': 'Yes',
              'value': 'y'
            }, {
              'text': 'No',
              'value': 'n'
            }],
            'yesNoNA': [{
              'text': 'Yes',
              'value': 'y'
            }, {
              'text': 'No',
              'value': 'n'
            }, {
              'text': 'N/A',
              'value': 'n/a'
            }]
          },
          'httpHost': {
            'app': {
              'local':'https://was-intra-sit.toronto.ca',
              'dev': 'https://was-intra-sit.toronto.ca',
              'qa': 'https://was-intra-qa.toronto.ca',
              'prod': 'https://insideto-secure.toronto.ca'
            },
            'app_public': {
              'local':'https://was-inter-sit.toronto.ca',
              'dev': 'https://was-inter-sit.toronto.ca',
              'qa': 'https://was-inter-qa.toronto.ca',
              'prod': 'https://secure.toronto.ca'
            },
            'eventDispatcher': {
              'dev': 'http://cheetah-b4.corp.toronto.ca:5680',
              'qa': 'https://esb1qa.toronto.ca:5680',
              'prod': 'https://esb1.toronto.ca:5680'
            }
          },
          'api': {
            'get': '/cc_sr_admin_v1/retrieve/eventrepo/',
            'post': '/cc_sr_admin_v1/submit/',
            'put': '/cc_sr_admin_v1/submit/eventrepo/',
            'delete': '/cc_sr_admin_v1/submit/eventrepo/',
            'email': '/cc_sr_admin_v1/submit/csu_email',
            'eventDispatcher': '/rest/COTEventDispatcher_V2/REST',
            'upload':'/cc_sr_admin_v1/upload/'
          },
          'api_public':{
            'post': '/cc_sr_v1/submit/',
            'upload':'/cc_sr_v1/upload/'
          },
          'groups': {
            'csu_g': 'G',
            'csu_admin': 'testweb1'
          },
          'administrator': {
            'G': {
              'testweb1': 'gperry2@toronto.ca'
            },
            'M': {
              'testweb1': 'gperry2@toronto.ca'
            }
          },
          'captain': {
            'G': {
              'testweb1': 'gperry2@toronto.ca'
            },
            'M': {
              'testweb1': 'gperry2@toronto.ca'
            }
          },
          'messages': {
            'current': '',
            'load': {
              'fail': '<strong>Unable to load!</strong> Report could not be retrieved. Please try again.'
            },
            'save': {
              'done': '<strong>Saved!</strong> This report was successfully saved.',
              'fail': '<strong>Unable to save!</strong> This report could not be saved. Please try again.'
            },
            'notify': {
              'done': '<strong>Notified!</strong> This report was successfully sent to the Emergency Management Captain.',
              'fail': '<strong>Unable to notify!</strong> This report could not be sent to the Emergency Management Captain. Please try again.'
            },
            'submit': {
              'done': '<strong>Submitted!</strong> This report was successfully sent to the Administrator.',
              'fail': '<strong>Unable to submit!</strong> This report could not be submitted to the Administrator. Please try again.'
            },
            'approve': {
              'done': '<strong>Approved!</strong> This report was successfully approved.</div>',
              'fail': '<strong>Unable to approve!</strong> This report could not be approved. Please try again.'
            },
            'reject': {
              'done': '<strong>Rejected!</strong> This report was successfully rejected and assigned back to the incident manager.',
              'fail': '<strong>Unable to reject!</strong> This report could not be rejected. Please try again.'
            },
            'delete': {
              'done': '<strong>Deleted!</strong> Report was successfully deleted.',
              'fail': '<strong>Unable to delete!</strong> This report could not be deleted. Please try again.'
            },
            'noSubmissionsFound': 'No submissions found.',
            'fadeOutTime': 8000
          },
          'auth': {
            'login': '<h2><strong>Session timeout!</strong> Please log in to access this application.</h2>',
            'group': '<h2><strong>Unauthorized!</strong> You don\'t have sufficient group permissions to view this application.</h2>'
          },
          'status': {
            'Draft': 'Yes',
            'Submitted': 'Submitted',
            'Approved': 'Approved',
            'Deleted': 'Deleted',
            'Yes': 'New',
            'Ongoing':'Submitted',
            'Closed':'Approved',
            'Search':'Global Search',
            'All': 'All',
            'DraftHRC': 'New',
            'YesHRC':'New',
            'SubmittedHRC': 'Ongoing',
            'ApprovedHRC': 'Closed',
            'DeletedHRC': 'Deleted'
          },
          'modal': {
            'confirmRemoveReport': 'Are you sure you want to permanently remove this record?',
            'confirmRemoveTitle': 'Are you sure you want to remove this item from the Human Rights Complaints application?',
            'confirmCreateReport': 'Please select report type and report year.',
            'reportType': 'Report Type',
            'reportYear': 'Report Year'
          },
          'actionList': {
            'title': 'Action:',
            'choices': [{ 'text': 'Consultation', 'value': 'Consultation' },
              { 'text': 'Intervention', 'value': 'Intervention' },
              { 'text': 'HRTO', 'value': 'HRTO' }]
          },
          'enquiryList': {
            'title': 'Enquiry List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Complaint related (internal)', 'value': 'Complaint related (internal)' },
              { 'text': 'Complaint related (external)', 'value': 'Complaint related (external)' },
              { 'text': 'Non-complaint related (internal)', 'value': 'Non-complaint related (internal)' },
              { 'text': 'Non-complaint related (external)', 'value': 'Non-complaint related (external)' },
              { 'text': 'Other', 'value': 'Other' }]
          },
          'consultationList': {
            'title': 'Consultation List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Consult employee', 'value': 'Consult employee' },
              { 'text': 'Consult external', 'value': 'Consult external' },
              { 'text': 'Consult HR', 'value': 'Consult HR' },
              { 'text': 'Consult legal', 'value': 'Consult legal' },
              { 'text': 'Consult management', 'value': 'Consult management' },
              { 'text': 'Consult union', 'value': 'Consult union' },
              { 'text': 'No return call', 'value': 'No return call' },
              { 'text': 'Training', 'value': 'Training' },
              { 'text': 'Equity/Diversity', 'value': 'Equity/Diversity' },
              { 'text': 'Referral', 'value': 'Referral' },
              { 'text': 'Other', 'value': 'Other' }
              ]
          },
          'interventionList': {
            'title': 'Consultation List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Support resolution HR', 'value': 'Support resolution HR' },
              { 'text': 'Support resolution management', 'value': 'Support resolution management' },
              { 'text': 'Support resolution employee', 'value': 'Support resolution employee' },
              { 'text': 'Support resolution external', 'value': 'Support resolution external' },
              { 'text': 'Support resolution legal', 'value': 'Support resolution legal' },
              { 'text': 'Informal Investigation', 'value': 'Informal Investigation' },
              { 'text': 'Formal Investigation', 'value': 'Formal Investigation' },
              { 'text': 'Mediation', 'value': 'Mediation' },
              { 'text': 'Monitoring', 'value': 'Monitoring' },
              { 'text': 'Training (development)', 'value': 'Training (development)' },
              { 'text': 'Training (delivery)', 'value': 'Training (delivery)' },
              { 'text': 'Equity & Diversity Project/program ', 'value': 'Equity & Diversity Project/program ' },
              { 'text': 'Other', 'value': 'Other' }]
          },
          'cotEmployeeTypeList': {
            'title': 'Employee Type List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Union', 'value': 'Union' },
              { 'text': 'Union executive', 'value': 'Union executive' },
              { 'text': 'Non-union', 'value': 'Non-union' }]
          },
          'cotJobTypeUnionList': {
            'title': 'Employee Type Details List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'CUPE Local 79', 'value': 'CUPE Local 79' },
              { 'text': 'CUPE Local 416', 'value': 'CUPE Local 416e' },
              { 'text': 'TPFFA Local 3888', 'value': 'TPFFA Local 3888' },
              { 'text': 'CUPE Locals 2998 & 2998-12', 'value': 'CUPE Locals 2998 & 2998-12' },
              { 'text': 'OTHER', 'value': 'OTHER' }]
          },
          'cotJobTypeNonUnionList': {
            'title': 'Employee Type Details List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Exempt/non-union', 'value': 'Exempt/non-union' },
              { 'text': 'HR', 'value': 'HR' },
              { 'text': 'Management', 'value': 'Management' },
              { 'text': 'AOCC management', 'value': 'AOCC management' },
              { 'text': 'Agency or Corporation', 'value': 'Agency or Corporation' },
              { 'text': 'OTHER', 'value': 'OTHER' }]
          },
          'complaintStatus': {
            'title': 'Complaint Status List:',
            'choices': [{ 'text': 'New', 'value': 'New' },
              { 'text': 'Ongoing', 'value': 'Ongoing' },
              { 'text': 'Closed', 'value': 'Closed' }]
          },
          'caseManager': {
            'title': 'Case Manager List:',
            'choices': [{ 'text': 'Select one', 'value': '' },
              { 'text': 'Kim Jeffreys', 'value': 'Kim Jeffreys' },
              { 'text': 'Andrew Sunstrum', 'value': 'Andrew Sunstrum' },
              { 'text': 'Ursula Cowieson', 'value': 'Ursula Cowieson' },
              { 'text': 'Devika Ratnayake', 'value': 'Devika Ratnayake' },
              { 'text': 'Tarandeep Chilana', 'value': 'Tarandeep Chilana' },
              { 'text': 'Catharinah Kim', 'value': 'Catharinah Kim' },
              { 'text': 'Jenny Neiman', 'value': 'Jenny Neiman' },
              { 'text': 'Digal Haio', 'value': 'Digal Haio' }]
          },
          'paperFile': {
            'title': 'Paper File List:',
            'choices': [{ 'text': 'Paper file', 'value': 'Paper file' }]
          }
        }
    },
    {
      "summary": "Role",
      "title": "Role"
    },
    {
      "summary": "Role Other",
      "title": "Role Other"
    },
    {
      "summary": "Other Enquiry Type",
      "title": "Enquiry List Other"
    },
    {
      "summary": "Other Consultation Type",
      "title": "Consultation List Other"
    },
    {
      "summary": "Other Intervention Type",
      "title": "Intervention List Other"
    },
    {
      "summary": "Referral",
      "title": "Action Referral"
    },
    {
    "title": "breadcrumbtrail",
    "summary": [{
      "name": "Living in Toronto",
      "link": "http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=3ea2ba2ae8b1e310VgnVCM10000071d60f89RCRD"
    }, {
      "name": "AGO",
      "link": "http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=01b755ab0e9b1410VgnVCM10000071d60f89RCRD"
    }, {
      "name": "Human Rights",
      "link": "http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=63b0ff0e43db1410VgnVCM10000071d60f89RCRD"
    }]
  },
    {"summary":"Contacted By",
      "title":"Contacted By"
    },
    {"summary":"Created",
      "title":"Complaint Created"
    },
    {
      "summary":"Eligibility",
      "title":"Eligibility"
    },{
      "summary":"My complaint involves this City Division",
      "title":"Division"
    },{
      "summary":"Division",
      "title":"cotDivision"
    },{
      "summary":"Type of Complaint",
      "title":"Type of Complaint"
    },{
      "summary":"Ground",
      "title":"Ground"
    },{
      "summary":"<p>My concern does not fall into any of the categories. I have a complaint about: <ul class=\"square\"><li>A program, service, facility, or staff conduct but is not about discrimination or harassment -  <a href=\"javascript:Web('http://www.toronto.ca/customerservice/divisional_complaint_protocols.htm')\" ;>Division complaint processes</a> or  <a href=\"javascript:Web('http://www.toronto.ca/311/')\" ;>311</a> to find out more about City services.</li> <li>If you have a concern about the service you receive from the City of Toronto and have been unable to work out your issues with the Division directly -  <a href=\"javascript:Web('http://ombudstoronto.ca/')\" ;>Ombudsman</a>.</li> <li>Suspected wrongdoing involving municipal resources, waste or contracts – <a href=\"javascript:Web('http://www.toronto.ca/audit/fraud_hot.htm')\" ;>Auditor General's Fraud & Waste Hotline</a>.</li></ul></p>",
      "title":"Ground Other Details"
    },{
      "summary":"Contact information",
      "title":"Contact information Section"
    },{
      "summary":"2 - Contact information",
      "title":"Contact information Section 2"
    },{
      "summary":"3 - Contact information",
      "title":"Contact information Section 3"
    },{
      "summary":"4 - Contact information",
      "title":"Contact information Section 4"
    },{
      "summary":"Help",
      "title":"TypeComplaintHelp"
    },{
      "summary":"We cannot accept anonymous complaints. If you would like to request general information, please <a href=\"http://www1.toronto.ca/wps/portal/contentonly?vgnextoid=526ae03bb8d1e310VgnVCM10000071d60f89RCRD\">contact</a> us by phone (416) 392-8383 or <a href=\"mailto:humanrights@toronto.ca?Subject=Human%20Rights%20Complaint\" target=\"_top\">email</a>.",
      "title":"ContactInfoText1"
    },{
      "summary":"You must provide contact information so that we can follow-up with you to get more details, discuss the matter, and provide you with assistance.",
      "title":"ContactInfoText2"
    },{
      "summary":"First Name",
      "title":"First Name"
    },
    {
      "summary":"Last Name",
      "title":"Last Name"
    },
    {
      "summary":"Title",
      "title":"Title"
    },
    {
      "summary":"Phone",
      "title":"Phone"
    },
    {
      "summary":"Alternative Phone",
      "title":"Alternative Phone"
    },
    {
      "summary":"Address",
      "title":"Address"
    },
    {
      "summary":"Email",
      "title":"Email"
    },
    {
      "summary":"City of Toronto Employee?",
      "title":"Cot Employee"
    },
    {
      "summary":"Employee Type",
      "title":"cotEmployeeType"
    },
    {
      "summary":"Union",
      "title":"union"
    },
    {
      "summary":"Non-union",
      "title":"nonUnion"
    },
    {
      "summary":"Union???",
      "title":"cotJobType"
    },
    {
      "summary":"Complaint Details",
      "title":"Complaint Details Section"
    },
    {
      "summary":"Complaint Details",
      "title":"Complaint Details"
    },
    {
      "summary":"You will be asked to identify the date of the incident. If you don't know the exact date, please provide an approximate date. If you are alleging an ongoing series of incidents, please indicate the date of the most recent incident.",
      "title":"ComplaintDetailText1"
    },
    {
      "summary":"If the incident you are reporting happened more than one year ago, please explain why you are filing a complaint now.",
      "title":"ComplaintDetailText2"
    },
    {
      "summary":"Describe the incident(s) that you believe was discrimination or harassment. For each incident or event, include:<ul><li>What happened?</li><li>Who was involved? </li><li>When did it happen? </li><li>Where did it happen? </li><li>Were there any witnesses?</li></ul>",
      "title":"ComplaintDetailText3"
    },
    {
      "summary":"You may enter the details directly in this form (in the field below) and/or attach a text file.",
      "title":"ComplaintDetailText4"
    },
    {
      "summary":"Do not attach files larger than 15 MB.",
      "title":"ComplaintDetailText5"
    },
    {
      "summary":"<p>Toronto's Equity, Diversity and Human Rights Office collects personal information on this form under authority of the Human Rights Code, 1990, s. 46.3(1), the Toronto Municipal Code, Chapter 169, Article I, ss. 169-2, 169-3, and 169-4, and the City of Toronto Act, 2006, s. 136(c). The information is used to maintain communication with you regarding your human rights related inquiry or complaint, to investigate the complaint, and may be used for aggregate statistical reporting. Questions about this collection can be directed to the Senior Human Rights Consultant at the Equity, Diversity and Human Rights Office, Toronto City Hall, 14th Floor West, 100 Queen Street West, Toronto, ON M5H 2N2, or by telephone at 416-392-8383. </p><strong>Important!</strong> Before clicking the Submit button, please review all your entries in the fields above. After submitting, you will have the opportunity to print your submission.",
      "title":"ComplaintDetailText6"
    },
    {
      "summary":"<ul><li>Who did you complain to? </li><li>When?</li><li>What action was taken?</li></ul>",
      "title":"ComplaintDetailText7"
    },
    {
      "summary":"Date of the Incident",
      "title":"Date of the Incident"
    },
    {
      "summary":"Explanation",
      "title":"Explanation"
    },
    {
      "summary":"Issue",
      "title":"Issue"
    },
    {
      "summary":"File Attachment",
      "title":"File Attachment"
    },
    {
      "summary":"Complaint Details",
      "title":"Complaint Details"
    },
    {
      "summary":"Have you already tried to resolve your complaint?",
      "title":"Resolve complaint"
    },
    {
      "summary":"Have you filed an HRTO application?",
      "title":"Filed HRTO application"
    },
    {
      "summary":"Have you filed a grievance?",
      "title":"Filed grievance"
    },
    {
      "summary":"Please provide more details",
      "title":"More details"
    },
    {
      "summary":"Resolution desired",
      "title":"Resolution desired"
    },
    {
      "summary":"Who is the complaint against?",
      "title":"Complaint against"
    },
    {
      "summary":"STAFF AREA",
      "title":"Staff Area Footer"
    },
    {
      "summary":"Action Type",
      "title":"Action List"
    },
    {
      "summary":"Enquiry Type",
      "title":"Enquiry List"
    },
    {
      "summary":"Consultation Type",
      "title":"Consultation List"
    },
    {
      "summary":"Intervention Type",
      "title":"Intervention List"
    },
    {
      "summary":"Date Open",
      "title":"Date Open"
    },
    {
      "summary":"Date Closed",
      "title":"Date Closed"
    },
    {
      "summary":"Complaint Status",
      "title":"Complaint Status"
    },
    {
      "summary":"Case Manager",
      "title":"Case Manager"
    },
    {
      "summary":"File Number",
      "title":"File Number"
    },
    {
      "summary":"Paper File",
      "title":"Paper File"
    },
    {
      "summary":"human_rights_complaints_submissions",
      "title":"Excel File Name"
    },
    {
      "summary":"Staff Notes",
      "title":"Staff Notes"
    },
    {
      "summary":"Intervention Outcome",
      "title":"Intervention Outcome"
    },
    {
      "title":"typeOfComplaintHelpBody",
      "summary":'<strong class="h4">The Human Rights Policy has the following application:</strong><p class="help-block"><ul class="help-block"><li>Access to or use of City of Toronto facilities:  For example, because of a physical disability you cannot access a City facility or a poster in a facility creates an unwelcome environment based on a prohibited ground.</li><li>Administration or delivery of City of Toronto services:  For example, you feel that a City service is being delivered in a discriminatory way based on one of the prohibited grounds or you experienced harassing behaviour from a City staff person.</li><li>Employment with the City of Toronto: For example as an employee, you feel that you have experienced discrimination or harassment by co-workers, your supervisor, manager, or a client. If you are a member of the Toronto Public Service with a human rights question or complaint, you can find more information on the Human Rights Office page on the staff intranet.</li><li>Job application with the City of Toronto: For example you feel you have been treated in a discriminatory manner or have not been appropriately accommodated while applying for a job with the City.</li><li>Legal Contracts with the City of Toronto: For example you feel you have been denied a contract with the City because of one of the prohibited grounds.</li><li>Occupation of City of Toronto-owned Accommodations: Means you are a current tenant, or are applying to become a tenant, of a residential dwelling that is owned by the City as a landlord under the applicable legislation governing landlord and tenant relations for residential properties, e.g. Residential Tenancies Act 2006.</li></ul></p><p class="help-block">If you have questions please call (416) 392-8383 or email us at <a href="mailto:humanrights@toronto.ca?Subject=Human%20Rights%20Complaint - Question regarding grounds" target="_top">humanrights@toronto.ca</a>.</p>'
    },
    {
      "title":"typeOfComplaintHelpHeader",
      "summary":"Type of Complaint"
    },
    {
      "title":"groundsHelpOtherHeader",
      "summary":"Grounds"
    },
    {
      "title":"groundsHelpOtherBody",
      "summary":'<p class="help-block">You will be asked to indicate on what basis or prohibited ground you feel you are being discriminated against or harassed. If you have questions about which ground may apply to your situation, please call (416) 392-8383 or email us at <a href="mailto:humanrights@toronto.ca?Subject=Human%20Rights%20Complaint - Question regarding grounds" target="_top">humanrights@toronto.ca</a>.</p>'
    },
    {
      "title":"groundsHelpHeader",
      "summary":"Grounds"
    },
    {
      "title":"groundsHelpBody",
      "summary":'<p class="help-block">You will be asked to indicate on what basis or prohibited ground you feel you are being discriminated against or harassed. If you have questions about which ground may apply to your situation, please call (416) 392-8383 or email us at <a href="mailto:humanrights@toronto.ca?Subject=Human%20Rights%20Complaint - Question regarding grounds" target="_top">humanrights@toronto.ca</a>.</p>'
    },
    {
      "title":"issueHelpHeader",
      "summary":"Issues"
    },
    {
      "title":"issueHelpBody",
      "summary":'<h4 class="h4">The Human Rights Policy has the following application:</h4><p class="help-block"><ul class="help-block"><li>Access to or use of City of Toronto facilities.  For example, because of a physical disability you cannot access a City facility or a poster in a facility creates an unwelcome environment based on a prohibited ground.</li><li>Administration or delivery of City of Toronto services.  For example, you feel that a City service is being delivered in a discriminatory way based on one of the prohibited grounds or you experienced harassing behaviour from a City staff person.</li><li>Employment with the City of Toronto.  For example as an employee, you feel that you have experienced discrimination or harassment by co-workers, your supervisor, manager, or a client. If you are a member of the Toronto Public Service with a human rights question or complaint, you can find more information on the Human Rights Office page on the staff intranet.</li><li>Job application with the City of Toronto.  For example you feel you have been treated in a discriminatory manner or have not been appropriately accommodated while applying for a job with the City.</li><li>Legal Contracts with the City of Toronto.  For example you feel you have been denied a contract with the City because of one of the prohibited grounds.</li><li>Occupation of City of Toronto-owned Accommodations means you are a current tenant, or are applying to become a tenant, of a residential dwelling that is owned by the City as a landlord under the applicable legislation governing landlord and tenant relations for residential properties, e.g. Residential Tenancies Act 2006.</li></ul></p><p class="help-block">If you have questions please call (416) 392-8383 or email us at <a href="mailto:humanrights@toronto.ca?Subject=Human%20Rights%20Complaint - Question regarding grounds" target="_top">humanrights@toronto.ca</a>.</p>'
    },
    {
      "title":'groundHelpButton',
      "summary":'<button type="button" aria-label="Ground help button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#groundsHelp" >Help</button>'
    },
    {
      "title":'groundOtherHelpButton',
      "summary":'<button type="button" aria-label="Other Ground help button"  class="btn btn-primary btn-xs" data-toggle="modal" data-target="#groundsHelpOther">Help</button>'
    },
    {
      "title":'typeComplaintHelpButton',
      "summary":'<button type="button" aria-label="Type help button"  class="btn btn-primary btn-xs" data-toggle="modal" data-target="#typeComplaintHelp">Help</button>'
    },
    {
      "title":'issueHelpButton',
      "summary":'<button type="button" aria-label="Issue help button"  class="btn btn-primary btn-xs" data-toggle="modal" data-target="#issueComplaintHelp">Help</button>'
    },
    {
      "summary": " <p>My concern does not fall into any of the categories. I have a complaint about: <ul class=\"square\"> <li>One of the City's ABCC's such as TTC, Toronto Community Housing Corporation, Arena Boards, etc. Please contact the organization directly to file your complaint - contact  <a href=\"javascript:Web('http://www.toronto.ca/311/knowledgebase/58/101001058558.html')\" ;>311</a>.</li> <li>The conduct of Members of Council, Members of Local Boards (Restricted Definition) and Adjudicative Boards – <a href=\"javascript:Web('http://www.toronto.ca/integrity/index.htm')\" ;>Integrity Commissioner</a>.  For information on which Local and Adjudicative Boards over which the Integrity Commissioner has jurisdiction, please contact <a href=\"javascript:Web('http://www.toronto.ca/311/')\" ;>311</a>.</li> <li>Another employer or another facility or service (e.g. private gymnastics club, restaurant, retail store) -  <a href=\"javascript:Web('http://www.attorneygeneral.jus.gov.on.ca/english/justice-ont/human_rights.asp')\" ;>Government of Ontario's information on human rights</a>.</li> <li>A bank, airline, phone company or other federally regulated business -  <a href=\"javascript:Web('http://www.chrc-ccdp.ca/default-en.asp')\" ;>Canadian Human Rights Commission</a>.</li></ul></p>",
      "title": "Division Other Details"
  }
]
});
