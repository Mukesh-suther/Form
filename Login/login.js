
function login() {
  const email = document.getElementById("emailinput");
  const password = document.getElementById("passwordinput");
  const Message = document.getElementById("message");
  const emailvalue = email.value;
  const passwordvalue = password.value;
  var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

  if (emailvalue === "") {
    Message.innerHTML = "Email Address required!";
    Message.style.color = "red";
    email.focus();
  } else if (!emailvalue.match(regex)) {
    Message.innerHTML = "Please enter correct email!";
    Message.style.color = "red";
    email.focus();
  } else if (passwordvalue === "") {
    Message.innerHTML = "Password required!";
    Message.style.color = "red";
    password.focus();
  } else if (passwordvalue.length < 6) {
    Message.innerHTML = "Please Enter at least 6 digits password";
    Message.style.color = "red";
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailvalue, passwordvalue)
      .then((userCredential) => {
        Message.innerHTML = "Successfully Login";
        Message.style.color = "green";
        console.log(userCredential.user);
      })
      .catch((error) => {
        Message.innerHTML = error.message;
        Message.style.color = "red"
      });
  }
  setTimeout(() => {
    Message.innerHTML = "";
  }, 3000);
}
