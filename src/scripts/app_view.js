/**
 * Created by gperry2 on 03/14/2017.
 */

class cc_retrieve_view{
  constructor(args){
    // url of rest api data source
    this.url = args.url;
    //dom object to inject table
    this.target = args.target;
    //json object with key value pairs:  [ {'field':'updated','label':'Submission Date'}]
    //display a footer row as well?
    this.addFooter = args.addFooter;
    this.columnDefs = args.columnDefs;
    this.dateFormat = args.dateFormat;
    this.dom_table;
    this.dt;
  }
  //function to generate a unique id for the table
  uniqueId(length){
    let  id = Math.floor(Math.random() * 26) + Date.now();
    return id.toString().substring(length);
  }
  //function to return the column titles
  getColumns(){
    let listHTML= "";
    $.each(this.columnDefs, function(i, item){
      listHTML +='<th></th>';
    });
    return listHTML;
  }

  getTable(){return this.dom_table;}
  // Main method to generate table
  render(){
    let unid = this.uniqueId(4);
    let cols= this.getColumns();
    let listHTML = '<table style="width:100%;" id="'+unid+'" >';
    listHTML +='<thead><tr>' + cols  + '</tr></thead>';
    listHTML +=this.addFooter?'<tfoot><tr>'+cols+'</tr></tfoot>':'';
    listHTML +='</table>';
    let dateFormat=this.dateFormat;
    this.target.empty().html(listHTML);
    this.dt = $("#"+ unid).DataTable({
      dom: "<'row'<'col-sm-3'i><'col-sm-3'l><'col-sm-6'p>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'hidden'B><'col-sm-7'f>>",
      buttons: ['pdfHtml5', 'csvHtml5', 'copyHtml5', 'excelHtml5'],
      'deferRender': true,
      'ajax':{
        'url': this.url,
        'dataSrc': function(json) {
          //retrieve api buries the submission data in the payload object.
          //we want the payload in the main object so we use jquery extent to merge.
          let return_data = new Array();
          //let dateFormat = 'YYYY/MM/DD';
          $.each(json, function(i, row) {
            row.updated = moment(row.updated).format(dateFormat);
            row.created = moment(row.created).format(dateFormat);
            return_data.push($.extend({},row,JSON.parse(row.payload)))
          });
          return return_data;
        }
      },
      createdRow: function( row, data, dataIndex ) {$(row).attr('data-id',data.id);},
      "columnDefs":this.columnDefs
    });
    this.dom_table = $("#"+ unid);

    return this.dt;
  }
}
