firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log('Anonymous user signed-in.', user);
     getAllCategories();
    } else {
      console.log('There was no anonymous session. Creating a new anonymous user.');
      // Sign the user in anonymously since accessing Storage requires the user to be authorized.
      firebase.auth().signInAnonymously().catch(function(error) {
        if (error.code === 'auth/operation-not-allowed') {
          window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
              'sign-in on your Firebase project.');
        }
        else{
          console.log(error.code);
        }
      });
    }
  });



document.skill_form.btn_add_skill.onclick=function(){
if(validate())
{
  showProressiveDialog();
  const ref = firebase.storage().ref();
  const file = document.querySelector('#image').files[0];
  console.log(file);
  const name = (+new Date()) + '-' + file.name;
  const metadata = { contentType: file.type };
  const task = ref.child("category_images").child(name).put(file, metadata);
task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then((url) => {
    console.log(url);
    var x=$('#skill_form').serializeArray();
    writeSkillData(x[0].value,url);
  })
  .catch(console.error);
  console.log(file);
}

  }

    function writeSkillData(skill_name,image) {
      var d = new Date();
       var n = d.getTime();
       firebase.database().ref('categories').child(n).set({
        category_id: n,
        category_name:skill_name,
        image:image
      }, function(error) {
  if (error) {
    alert("Data could not be saved." + error);
  } else {
    hideProgressiveDialog();
    alert("Data saved successfully.");
    var frm = document.getElementsByName('skill_form')[0];

   //frm.submit(); // Submit the form

   frm.reset();  // Reset all form data


  }
});



    }

function validate() {

   if( document.skill_form.name.value == "" ) {
    //  alert( "Please provide your skill name!" );
      document.skill_form.name.style.border = "1px solid red";
      var skillErr=document.getElementById('skillNameErr');
      skillErr.style.display="block";
      skillErr.style.color="red";
      return false;
   }
else{

  document.skill_form.name.style.border = "none";
  var skillErr=document.getElementById('skillNameErr');
  skillErr.style.display="none";

}

   if(document.getElementById("image").value == "") {
       alert( "Please select image" );
return false;
}
   return true;
 }

function getAllCategories(){
 firebase.database().ref().child('categories').once('value',function(snapshot)
 {
   snapshot.forEach(function(childSnapshot)
   {

   var skill_data='';
   console.log(childSnapshot.val());
   skill_data+='<tr>';
   skill_data+='<td>'+childSnapshot.val().category_id+'</td>';
   skill_data+='<td>'+childSnapshot.val().category_name+ '</td>';
    //skill_data+='<td>'+childSnapshot.val().image+ '</td>';
   var downurl=childSnapshot.val().image;
   console.log(downurl);
  skill_data+='<td><button id=edit_btn" class="btn btn-primary" value='+childSnapshot.val().category_id+'>Edit Skill</button></td>';
   skill_data+='</tr>'
   $('#example').append(skill_data);

});
 });
}

$(document).on("click","#example tbody tr td button.btn", function() {

  localStorage.setItem("storageName",$(this).val());
  window.open('edit_skill.html', '_self');
   console.log($(this).val());
});

 function showProressiveDialog(){
       $("#btn_add_skill").prop('disabled',true);
       $("#btn_add_skill").prop('backgrround','#fff');
      $("#loading-div").css({ display: 'block' });


    }
    function hideProgressiveDialog(){

         $("#loading-div").css({ display: 'none' });
         $("#btn_add_skill").prop('backgrround','#fff');
               $("#btn_add_skill").prop('disabled',false);
       }
