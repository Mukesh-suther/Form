function signup() {
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const mobileno = document.getElementById("mobileno");
  const email = document.getElementById("emailaddress");
  const password = document.getElementById("password");
  const reenterpassword = document.getElementById("reenterpassword");
  const message = document.getElementById("message");
  var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

  if (firstname.value === "") {
    message.innerHTML = "Firstname Required!";
    message.style.color = "red";
    firstname.focus();
  } else if (lastname.value === "") {
    message.innerHTML = "lastname Required!";
    message.style.color = "red";
    lastname.focus();
  } else if (mobileno.value === "") {
    message.innerHTML = "Mobile Number Required!";
    message.style.color = "red";
    mobileno.focus();
  } else if (mobileno.value.length < 11) {
    message.innerHTML = "Please Enter 11 digit Mobile No.";
    message.style.color = "red";
    mobileno.focus();
  } else if (email.value === "") {
    message.innerHTML = "Email Address Required!";
    message.style.color = "red";
    email.focus();
  } else if (!email.value.match(regex)) {
    message.innerHTML = "Please Enter Correct Email Address";
    message.style.color = "red";
    email.focus();
  } else if (password.value === "") {
    message.innerHTML = "Password Required";
    message.style.color = "red";
    password.focus();
  } else if (password.value.length < 6) {
    message.innerHTML = "Please Enter at least 6 digit Password";
    message.style.color = "red";
    password.focus();
  } else if (reenterpassword.value !== password.value) {
    message.innerHTML = "Password donot match";
    message.style.color = "red";
    reenterpassword.focus();
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        message.innerHTML = "Successfully created New account";
        message.style.color = "green";
        const user = firebase.auth().currentUser;
        user.sendEmailVerification();
        //database
        function userdata() {
          firebase
            .database()
            .ref("users/")
            .push({
              Name: firstname.value + " " + lastname.value,
              MobileNumber: mobileno.value,
              Email: email.value,
              Password: password.value,
              Reenterpassword: reenterpassword.value,
            });
        }
        userdata();

        //firestore
        firebase.firestore().collection("users").doc(userCredential.user.uid).set({
          Name: firstname.value + " " + lastname.value,
          MobileNo: mobileno.value,
          Email: email.value,
          Password: password.value,
          Reenterpassword: reenterpassword.value,
        })
        .then((resolve) =>{
          console.log(resolve.user)
        }).catch((error) => {
          console.log(error.message)
        })
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.style.color = "red";
        console.log(error)
      });
  }
  setTimeout(() => {
    message.innerHTML = "";
  }, 4000);
}
