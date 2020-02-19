
getAllFoodItems();
function getAllFoodItems()
{
  var database = firebase.database().ref().child('fooditem');
  database.once('value',function(snapshot)
  {
    console.log(snapshot.val());

      snapshot.forEach(function(child){
          console.log(child)
        var food_item='';
        food_item+='<tr>';
        food_item+='<td>'+child.val().name+'</td>';
          var category = child.val().category_id.split("-")[1];
        food_item+='<td>'+category+ '</td>';
        food_item+='<td>'+"Rs "+child.val().price+ '</td>';
        food_item+='<td>'+child.val().address+ '</td>';
          var menuday = child.val().menuday;
        food_item+='<td>'+menuday+ '</td>';
          var menutime = child.val().menutime;
        food_item+='<td>'+menutime+ '</td>';
        food_item+='<td>'+'<button id=delete_btn" type="button" class="btn2 btn-danger" value='+child.val().foodId+'>Delete Food Item</button>'+'</td>';
        food_item+='</tr>'
        $('#example').append(food_item);
      });



  });
}

 $(document).on("click","#example tbody tr td button.btn2", function() {

  var str=$(this).val();
  var res = str.split("-");
  firebase.database().ref().child('fooditem').child(str).remove();
   document.location.reload();

});
