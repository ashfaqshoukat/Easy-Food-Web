   firebase.database().ref().child('orders').once('value',function(snapshot)
   {
     console.log(snapshot)
     snapshot.forEach(function(childSnapshot)
     {

     var employe_data='';
     console.log(childSnapshot.val());
     employe_data+='<tr>';
     employe_data+='<td>'+childSnapshot.val().orderId+'</td>';
     employe_data+='<td>'+childSnapshot.val().foodName+ '</td>';
     employe_data+='<td>'+childSnapshot.val().quantity+ '</td>';
     employe_data+='<td>'+"Rs"+childSnapshot.val().price+ '</td>';
     let totalprice=parseInt(childSnapshot.val().quantity)*parseInt(childSnapshot.val().price)
     employe_data+='<td>'+"Rs "+totalprice +'</td>';
     employe_data+='<td>'+childSnapshot.val().userName +'</td>';
     employe_data+='<td>'+childSnapshot.val().contactNbr +'</td>';
     employe_data+='<td>'+childSnapshot.val().userAddress +'</td>';
       var menuday = childSnapshot.val().menuday.split("-")[1];
     employe_data+='<td>'+menuday +'</td>';
       var menutime = childSnapshot.val().menutime.split("-")[1];
     employe_data+='<td>'+menutime +'</td>';
       employe_data+='<td>'+'<button id=edit_btn" class="btn btn-primary" value='+childSnapshot.val().orderId+'>Assign Order</button>'+'</td>';
       employe_data+='<td>'+'<button id=delete_btn" type="button" class="btn2 btn-danger" value='+childSnapshot.val().orderId+'>Delete Order</button>'+'</td>';
     employe_data+='</tr>'
     $('#example').append(employe_data);

  });
   });
