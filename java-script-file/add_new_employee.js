//anonymousSignIn for take permision to store image in storage firebase
anonymousSignIn();
//get all category
getAllCategory();

document.myForm.submit_btn.onclick = function () {
    if (validate()) {
        showProressiveDialog();
        addNewEmployee()
    }
}

function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i].value;
        }
    }
}


function writeUserData(data) {
    console.log(data)
    showProressiveDialog()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition=>{
            console.log(showPosition.coords)
            var d = new Date();
            var n = d.getTime();
            firebase.database().ref('fooditem').child(n).set({
                address: search("address", data),
                avg_rating: -1,
                category_id: search("catgeory", data),
                foodId: n,
                price:search("price", data),
                name: search("name", data),
                menuday: search("menuday", data),
                menutime: search("menutime", data),
                starttime: search("starttime", data),
                endtime: search("endtime", data),
                lat:showPosition.coords.latitude,
                lng:showPosition.coords.longitude,
                status: 1,
            }, function (error) {
                if (error) {
                    alert("Data could not be saved." + error);
                    hideProgressiveDialog();
                } else {
                    const file = document.querySelector('#image').files;
                    if (file.length > 0) {
                        for (let image of file) {
                            uploadImages(image,n)
                        }
                    }
                    hideProgressiveDialog();

                    alert("Data saved successfully.");
                    var frm = document.getElementsByName('myForm')[0];
                    frm.reset();
                    return false
                }
            });
        })

    } else {
      alert( "Geolocation is not supported by this browser.")
    }

}



function uploadImages(image,id) {
    const name = (+new Date()) + '-' + image.name;
    const metadata = {contentType: image.type};
    var d = new Date();
    var n = d.getTime();
    const ref = firebase.storage().ref();
    const task = ref.child("images").child("fooditem").child(name).put(image, metadata);
    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            console.log("image url"+url)
            firebase.database().ref('fooditemImages').child(id).child(n).set({
                images: url,
            }, function (error) {
            });
        })
        .catch(console.error);
}

function addNewEmployee() {
    imagesArray = []
    var x = $('#myFrom').serializeArray();
    writeUserData(x)
}

function clearDropbox(menuname) {
    $(menuname).empty();
    // var select = document.getElementById(menuname);
    // var length = select.options.length;
    // alert(length)
    // for (i = 0; i < length; i++) {
    //     select.options[i] = null;
    // }
}

function onStartTimeSelect() {
    let id = document.getElementById("starttime_select").value.split("-")[0];
    console.log(id)
    setEndTime(id, 40900)
}

function onTimeChange() {
    let id = document.getElementById("menutime_select").value.split("-")[0];
    if (id == 1) {
        setStartTime(25200, 40900)
    } else if (id == 2) {
        setStartTime(40900, 50900)
    } else if (id == 3) {
        setStartTime(40900, 50900)
    }
    clearDropbox("starttime_select")
}

function setStartTime(starttime, endtime) {
    for (let i = starttime; i <= endtime; i = i + 900) {
        val = toHHMMSS(i)
        $('#starttime_select').append('<option value="' + i + "-" + val + '">' + val + '</option>');
    }
}

function setEndTime(starttime, endtime) {
    clearDropbox("endtime_select")
    for (let i = starttime; i <= endtime; i = parseInt(i) + 900) {
        console.log(i)
        val = toHHMMSS(i)
        $('#endtime_select').append('<option value="' + i + "-" + val + '">' + val + '</option>');
    }
}

function toHHMMSS(sec_num) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ':' + minutes;
}

function getAllCategory() {
    let weekArray = ["Monday", "Tuesday", "Wednesday", "Thursaday", "Friday", "Saturday", "Sunday"]
    let foodTimeArray = ["Break Fast", "Launch", "Dinner"]
    firebase.database().ref().child('categories').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            $('#catgeory_select').append('<option value="' + childData.category_id + "-" + childData.category_name + '">' + childData.category_name + '</option>');
        });
    });

    for (let i = 0; i <= 6; i++) {
        val = i + 1;
        console.log(i + "" + weekArray[i])
        $('#menuday_select').append('<option value="' + val + "-" + weekArray[i] + '">' + weekArray[i] + '</option>');

    }


    for (let i = 0; i <= 2; i++) {
        val = i + 1;
        console.log(i + "" + foodTimeArray[i])
        $('#menutime_select').append('<option value="' + val + "-" + foodTimeArray[i] + '">' + foodTimeArray[i] + '</option>');

    }
}

function anonymousSignIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            console.log('Anonymous user signed-in.', user);
        } else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            // Sign the user in anonymously since accessing Storage requires the user to be authorized.
            firebase.auth().signInAnonymously().catch(function (error) {
                if (error.code === 'auth/operation-not-allowed') {
                    window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
                        'sign-in on your Firebase project.');
                } else {
                    console.log(error.code);
                }
            });
        }
    });
}

function validate() {

    if (document.myForm.name.value == "") {
        alert("Please provide your name!");
        document.myForm.name.focus();
        return false;
    }
    if (document.myForm.price.value == "") {
        alert("Please provide your food price.");
        document.myForm.price.focus();
        return false;
    }
    if (document.myForm.address.value == "") {
        alert("Please provide your address");
        document.myForm.address.focus();
        return false;
    }

    var cat_id = $('#catgeory_select').find(":selected").val();
    console.log(cat_id);
    if (cat_id == -1) {
        alert("Select your food type");
        return false;
    }

    var day_id = $('#menuday_select').find(":selected").val();
    console.log(day_id);
    if (day_id == -1) {
        alert("Select food day");
        return false;
    }
    var menutime_id = $('#menutime_select').find(":selected").val();
    console.log(day_id);
    if (menutime_id == -1) {
        alert("Select food time");
        return false;
    }
    if ($("#image").val() == '') {
        alert("Please select image");
        return false;
    }
    return (true);
}

function showProressiveDialog() {
    $("#submit_btn").prop('disabled', true);
    $("#submit_btn").prop('backgrround', '#fff');
    $("#loading-div").css({display: 'block'});


}

function hideProgressiveDialog() {

    $("#loading-div").css({display: 'none'});
    $("#submit_btn").prop('backgrround', '#fff');
    $("#submit_btn").prop('disabled', false);
}
