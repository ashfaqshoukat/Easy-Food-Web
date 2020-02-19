firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      console.log('Anonymous user signed-in.', user);

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


var profile_image="";
var skill_id=localStorage.getItem("storageName");
console.log(skill_id);
fillDataInForm(skill_id);


document.skill_form.btn_add_skill.onclick=function(){
if(validate())
{
  showProressiveDialog();
  var  x=$('#skill_form').serializeArray();
  if($("#image").val() != '')
  {
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

      writeSkillData(x[0].value,url);
    })
    .catch(console.error);
    console.log(file);
  }
  else{
    writeSkillData(x[0].value,profile_image);
  }


}
}



  function writeSkillData(namee, image) {
    firebase.database().ref('categories').child(skill_id).set({
      category_id:parseInt(skill_id),
      category_name:namee,
      image:image
   },function(error){
     if(error){
alert("Data could not be saved." + error);
hideProgressiveDialog();
     }
     else{
            alert("Data update successfully.");
            hideProgressiveDialog();

     }
   });
  }

  function fillDataInForm(skillid){
       firebase.database().ref().child('categories').child(skillid+"").once('value',function(snapshot)
       {

        console.log(snapshot.val());
// $('#name').val(snapshot.val().category_name);
// profile_image=snapshot.val().image;



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
 if(profile_image==""){
  alert( "Please select image" );
  return false;
 }

    return true;
  }


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
