
getAllEmployee();
function getAllEmployee()
{
  var database = firebase.database().ref().child('fooditem');
  database.once('value',function(snapshot)
  {
    console.log(snapshot.val());

      snapshot.forEach(function(child){
          console.log(child)
        var employe_data='';
        employe_data+='<tr>';
        employe_data+='<td>'+child.val().name+'</td>';
          var category = child.val().category_id.split("-")[1];
        employe_data+='<td>'+category+ '</td>';
        employe_data+='<td>'+"Rs "+child.val().price+ '</td>';
        employe_data+='<td>'+child.val().address+ '</td>';
          var menuday = child.val().menuday.split("-")[1];
        employe_data+='<td>'+menuday+ '</td>';
          var menutime = child.val().menutime.split("-")[1];
        employe_data+='<td>'+menutime+ '</td>';
          child.val().status==1?employe_data+='<td>'+"Pending"+ '</td>':employe_data+='<td>'+"Done"+ '</td>';
        employe_data+='<td>'+'<button id=edit_btn" class="btn btn-primary" value='+child.val().foodId+'>Edit Status</button>'+'</td>';
        employe_data+='<td>'+'<button id=delete_btn" type="button" class="btn2 btn-danger" value='+child.val().foodId+'>Delete Food Item</button>'+'</td>';
        employe_data+='</tr>'
        $('#example').append(employe_data);
      });



  });
}

   $(document).on("click","#example tbody tr td button.btn", function() {

     localStorage.setItem("storageName",$(this).val());
     window.open('edit_employee.html', '_self');
      console.log($(this).val());
 });
 $(document).on("click","#example tbody tr td button.btn2", function() {

  var str=$(this).val();
  var res = str.split("-");
  var e_id=res[0];
  var c_id=res[1];
  firebase.database().ref().child('employee').child(c_id).child(e_id).remove();
   console.log(e_id);
   console.log(c_id);
   document.location.reload();

});
