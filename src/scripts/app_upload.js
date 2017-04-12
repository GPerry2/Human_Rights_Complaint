/**
 * Created by gperry2 on 03/22/2017.
 */
function deleteAttachment(DZ, bin_id, repo){
  updateAttachmentStatus(DZ,bin_id, repo, 'delete');
}
function updateAttachmentStatus(DZ,bin_id, repo, status){
  let deleteURL = config.api.post + 'binUtils/'+config.default_repo + '/' + bin_id + '/'+status+'?sid=' + getCookie(repo+'.sid');
  $.get(deleteURL, function(response){
    if(status=='delete'){
      $('#'+ bin_id).remove();
      DZ.existingUploads = $.grep(DZ.existingUploads, function(e){return e.bin_id!=bin_id})

      var form_id = DZ.options.form_id;
      processForm('updateAttachments', form_id, repo)
    }
  }).fail(function(){
    console.log('failed');
  });
}
function processUploads(DZ, repo, sync){

  let  uploadFiles = DZ.existingUploads?DZ.existingUploads:new Array;
  let _files = DZ.getFilesWithStatus(Dropzone.SUCCESS);
  let syncFiles = sync;
  if (_files.length == 0) {
    console.log('No Files Attached')
  }else {
    $.each(_files, function (i, row) {
      let json = JSON.parse(row.xhr.response);
      json.name = row.name;
      json.type = row.type;
      json.size = row.size;
      json.bin_id = json.BIN_ID[0];
      delete json.BIN_ID;
      uploadFiles.push(json);
      syncFiles ? updateAttachmentStatus(DZ,json.bin_id, repo, 'keep'):'';
    });
  }
  return uploadFiles;
}
/*
    function: showUploads
      parameters:
      id (target):  the id of the element to render the uploaded file attachments table
      data:         serialized json returned from the event repo (the payload)
      repo:         the event repo name that will be used to use in the delete url.
      allowDelete:  display the delete button?

 */
function showUploads(DZ, id, data, repo, allowDelete){
  let thisDZ = DZ;
  let _uploads=`<table width='100%' class="table-condensed table-responsive"><thead><tr><th>Name</th><th>Size</th><th>Actions</th></tr></thead><tbody>`;
  thisDZ.existingUploads = data.uploads;
  if(data.uploads) {
    $.each(data.uploads, function (i, row) {
      let getURL = config.httpHost.app[httpHost] + config.api.upload + repo + '/' + row.bin_id + '?sid=' + getCookie(repo+'.sid');
      let getLink = `<button onclick="event.preventDefault();window.open('` + getURL + `')"><span class="glyphicon glyphicon-download"></span></button>`;
      var deleteLink = '<button class="removeUpload" data-id="' + i + '" data-bin="' + row.bin_id + '" ><span class="glyphicon glyphicon-trash"></span></button>';
      let buttons = getLink;
      buttons += allowDelete ? deleteLink : '';
      _uploads += '<tr id="' + row.bin_id + '"><td>' + row.name + '</td><td>' + row.size + '</td><td>' + buttons + '</td></tr>'
    });
  }else{}
  _uploads+=`</tbody></table>` ;
  $('#'+id).html(_uploads);

  $(".removeUpload").on('click', function () {
    event.preventDefault();updateAttachmentStatus( thisDZ, $(this).attr('data-bin'),repo, 'delete', $(this).attr('data-id'));
  });

}
function setupDropzone(o) {
  let options = $.extend({
    allowImages: true,
    allowDocuments: true,
    maxFiles: 5,
    onAdd: function (fileName, binId) {
    },
    onRemove: function (fileName, binId) {
    }
  }, o);

  Dropzone.autoDiscover = false;
  let acceptFiles = options.allowImages ? 'image/gif,image/GIF,image/png,image/PNG,image/jpg,image/JPG,image/jpeg,image/JPEG' : '',
    fileTypes = options.allowImages ? 'gif, png, jpg, jpeg' : '';

  if (options.allowDocuments) {
    acceptFiles += (acceptFiles ? ',' : '') + 'application/pdf,application/PDF,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    fileTypes += (fileTypes ? ', ' : '') + 'pdf, doc, docx, xls, xlsx, txt, csv, text';
  }

    options.dictDefaultMessage= "Drop files here or click to upload";
    // acceptedFiles: acceptFiles,
    // dictInvalidFileType: "Only following file types are allowed: " + fileTypes,
    options.addRemoveLinks=true;
    options.maxFilesize= 5;
    options.dictFileTooBig="Maximum size for file attachment is 5 MB";
    options.maxFiles= 5;
    options.dictMaxFilesExceeded= "Maximum " + options.maxFiles + " uploaded files";


   return options;

}
