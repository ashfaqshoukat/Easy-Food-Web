   firebase.database().ref().child('user').on('value',function(snapshot)
   {
     snapshot.forEach(function(childSnapshot)
     {

     var employe_data='';
     console.log(childSnapshot.val());
     employe_data+='<tr>';
     employe_data+='<td>'+childSnapshot.val().name+'</td>';
     employe_data+='<td>'+childSnapshot.val().phoneNumber+ '</td>';
     employe_data+='<td>'+childSnapshot.val().address+ '</td>';
     employe_data+='</tr>'
     $('#example').append(employe_data);

  });
   });
