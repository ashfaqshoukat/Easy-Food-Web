   firebase.database().ref().child('user').once('value',function(snapshot)
   {
     snapshot.forEach(function(childSnapshot)
     {
         var user_list = '';
         console.log(childSnapshot.val())
         if(childSnapshot.val().usertype==="rider") {
             console.log(childSnapshot.val());
             user_list += '<tr>';
             user_list += '<td>' + childSnapshot.val().name + '</td>';
             user_list += '<td>' + childSnapshot.val().phoneNumber + '</td>';
             user_list += '<td>' + childSnapshot.val().address + '</td>';
             user_list += '<td>' + childSnapshot.val().cnic + '</td>';
             user_list += '<td>' + childSnapshot.val().accountStatus + '</td>';
             user_list += '<td>' + '<button id=delete_btn" type="button" class="btn1 " value=' + childSnapshot.val().customerID + '>Activate</button>' + '</td>';
             user_list += '<td>' + '<button id=delete_btn" type="button" class="btn2 btn-danger" value=' + childSnapshot.val().customerID + '>Deactivate</button>' + '</td>';
             user_list += '</tr>'
             $('#example').append(user_list);
         }

  });

   });

   $(document).on("click","#example tbody tr td button.btn1", function() {
     var str=$(this).val();
     firebase.database().ref().child("user").child(str).update({"accountStatus":'activate'});
       // location.reload();
     alert("Account Activate Successfully")
   });

   $(document).on("click","#example tbody tr td button.btn2", function() {
     var str=$(this).val();
     firebase.database().ref().child("user").child(str).update({"accountStatus":'deactivate'})
       // location.reload();
     alert("Account Deactivate Successfully")
   });
