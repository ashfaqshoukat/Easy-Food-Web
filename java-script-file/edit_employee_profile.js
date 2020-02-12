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
var str=localStorage.getItem("storageName");
var res = str.split("-");
var e_id=res[0];
var c_id=res[1];
console.log(res);
fillDataInForm(c_id,e_id);




      function validate() {

         if( document.myForm.name.value == "" ) {
            alert( "Please provide your name!" );
            document.myForm.name.focus() ;
            return false;
         }
         if( document.myForm.phonenbr.value == "" ) {
            alert( "Please provide your phone no." );
            document.myForm.phonenbr.focus() ;
            return false;
         }
         if( document.myForm.cnic.value == "" ) {

            alert( "Please provide a cnic" );
            document.myForm.cnic.focus() ;
            return false;
         }
         if( document.myForm.address.value == "" ) {
            alert( "Please provide your address" );
              document.myForm.address.focus() ;
            return false;
         }

         var cat_id = $('#catgeory_select').find(":selected").val();
         console.log(cat_id);
         if( cat_id==-1 ) {
            alert( "Select your skill" );
            return false;
         }

         var radios = document.getElementsByName("radios");
         var formValid = false;
         var i = 0;
         while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }

    if (!formValid){
        alert("Must check some option!");
        return false;
    }


         if( document.myForm.wage.value=="" ) {
            alert( "Please provide wage" );
            return false;
         }
         return( true );
      }

document.myForm.submit_btn.onclick=function(){

if(validate())
{
  if($("#image").val() != ''){
    const ref = firebase.storage().ref();
    const file = document.querySelector('#image').files[0];
    console.log(file);
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = ref.child("images").child("employee_images").child(name).put(file, metadata);
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
      profile_image=url;
    }).catch(console.error);
    console.log(file);
  }
  var x=$('#myFrom').serializeArray();
  console.log(x);
    writeUserData(x[0].value,x[1].value, x[2].value, x[3].value,x[4].value,x[5].value,x[6].value,profile_image,x[4].value)

}
}



  function writeUserData(namee, phone, cnics, address,skilll,wage_type,wagee,profile_imge,cat_id) {
    firebase.database().ref('employee').child(c_id).child(e_id).set({
      address: address,
      avg_rating:-1,
      category_id:c_id,
      cnic:cnics,
      employee_id:parseInt(e_id),
      image:profile_imge,
      name:namee,
      phone_no:phone,
      skill:skilll,
      status:1,
      hired:"0",
      wage:parseInt(wagee, 10),
     wage_type:wage_type
   },function(error){
     if(error){
alert("Data could not be saved." + error);
     }
     else{
            alert("Data update successfully.");

     }
   });
  }

  function fillDataInForm(cat_id,emp_id){
       firebase.database().ref().child('employee').child(c_id).child(e_id).on('value',function(snapshot)
       {

$('#name').val(snapshot.val().name);
$('#phonenbr').val(snapshot.val().phone_no);
$('#cnic').val(snapshot.val().cnic);
$('#address').val(snapshot.val().address);
$('#wage').val(snapshot.val().wage);
profile_image=snapshot.val().image;
if(snapshot.val().wage_type=="Hourly")
{
$("#radio_1").prop("checked", true);
}
else
{
  $("#radio_2").prop("checked", true);
}
 $('#catgeory_select').append('<option value="'+snapshot.val().skill +'">'+snapshot.val().skill+'</option>');


firebase.database().ref().child('categories').on('value',function(snap)
{
  snap.forEach(function(childSnapshot)
  {
  var childData = childSnapshot.val();
  if(snapshot.val().category_id!=childData.category_id)
   $('#catgeory_select').append('<option value="'+childData.category_name +'">'+childData.category_name+'</option>');
});
});
       });

  }
