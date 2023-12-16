
const firebaseConfig = {
  apiKey: "AIzaSyB5I3xEGrnD_MJ_YjaYnz8u16anBsMwGaI",
  authDomain: "hossam-8bf1a.firebaseapp.com",
  projectId: "hossam-8bf1a",
  storageBucket: "hossam-8bf1a.appspot.com",
  messagingSenderId: "971961193714",
  appId: "1:971961193714:web:881ca1dab5044b765dac6b"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to  RealTime Database service
const database = firebase.database();

let signUp = document.querySelector(".signUp");
let regester = document.querySelector(".regester");


regester.addEventListener("click", (e) => {
  e.preventDefault();

  let Name = signUp.name.value;
  let email = signUp.email.value;
  let password = signUp.password.value;
  let confirmPassword = signUp.confirm.value;
  let usernamewifi = signUp.usernamewifi.value;
  let passwordwifi = signUp.passwordwifi.value;
  let confirmpasswordwifi = signUp.confirmpasswordwifi.value;

  if (password === confirmPassword && passwordwifi === confirmpasswordwifi) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // تحديث بيانات المستخدم في قاعدة البيانات
        database.ref("users/" + user.uid).set({
          Name: Name,
          email: email,
          password: password,
          usernamewifi: usernamewifi,
          passwordwifi: passwordwifi,
        });

        signUp.email.value = "";
        signUp.password.value = "";
        signUp.name.value = "";
        signUp.confirm.value = "";
        signUp.usernamewifi.value = "";
        signUp.passwordwifi.value = "";
        signUp.confirmpasswordwifi.value = "";
      alret("User created successfully");

      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    alert("Password does not match");
  }
});
