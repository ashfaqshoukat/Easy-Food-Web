   firebase.database().ref().child('hiredEmployee').on('value',function(snapshot)
   {
     snapshot.forEach(function(childSnapshot)
     {

     var employe_data='';
     console.log(childSnapshot.val());
     employe_data+='<tr>';
     employe_data+='<td>'+childSnapshot.val().user_name+'</td>';
     employe_data+='<td>'+childSnapshot.val().employee_name+ '</td>';
     employe_data+='<td>'+childSnapshot.val().address+ '</td>';
     employe_data+='</tr>'
     $('#example').append(employe_data);

  });
   });
