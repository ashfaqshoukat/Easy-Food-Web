   firebase.database().ref().child('riderOrder').once('value',function(snapshot)
   {
     this.orderList=[];
     snapshot.forEach(function(childSnapshot)
     {
       childSnapshot.forEach(function (childSnapshott) {
         this.orderList.push(childSnapshott.val())
       })
       showOrder();

     });

   });


function showOrder()
   {

     this.orderList.sort(function(a, b){
       if(a.menuday < b.menuday) { return -1; }
       if(a.menuday > b.menuday) { return 1; }
       return 0;
     })
     document.getElementById("ridername").innerHTML = "Goodbye";

     for (let i = 0; i < this.orderList.length; i++) {
       var user_order = '';
       console.log(this.orderList[i]);
       user_order += '<tr>';
       user_order += '<td>' + this.orderList[i].orderId + '</td>';
       user_order += '<td>' + this.orderList[i].foodName + '</td>';
       user_order += '<td>' + this.orderList[i].quantity + '</td>';
       user_order += '<td>' + "Rs" + this.orderList[i].price + '</td>';
       let totalprice = parseInt(this.orderList[i].quantity) * parseInt(this.orderList[i].price)
       user_order += '<td>' + "Rs " + totalprice + '</td>';
       user_order += '<td>' + this.orderList[i].userName + '</td>';
       user_order += '<td>' + this.orderList[i].contactNbr + '</td>';
       user_order += '<td>' + this.orderList[i].userAddress + '</td>';
       var menuday = this.orderList[i].menuday;
       user_order += '<td>' + menuday + '</td>';
       var menutime = this.orderList[i].menutime;
       user_order += '<td>' + menutime + '</td>';
       user_order += '<td>' + this.orderList[i].orderStatus + '</td>';
       user_order += '</tr>'
       $('#example').append(user_order);

     }
   }

   $(document).on("click","#example tbody tr td button.btn2", function() {
     var str=$(this).val();
   firebase.database().ref().child("orders").child(str).update({"orderStatus":'cancel'})
     alert("Order Cancel Successfully")
   });


