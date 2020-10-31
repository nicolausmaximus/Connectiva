
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnFV1NPOLEBpg-3dDxr-CImPwBUOfXEsc",
    authDomain: "connectiva-a6906.firebaseapp.com",
    databaseURL: "https://connectiva-a6906.firebaseio.com",
    projectId: "connectiva-a6906",
    storageBucket: "connectiva-a6906.appspot.com",
    messagingSenderId: "616492841512",
    appId: "1:616492841512:web:9e88f3e99650d11b0b931d",
    measurementId: "G-T8F0SPCM9Y"
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
var img = document.getElementById("profile-photo");
let file = {};

  const auth = firebase.auth(); 

  function chooseFile(e){
    file = e.target.files[0];
  }

  function signUp(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(auth =>{

    // firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').put(file).then(function(){
    //   console.log("sucessfully uploaded");
    // }).catch(error => {
    //   console.log(error.message);
    // });
  }).catch(error => {
    console.log(error.message);
  })

  // const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  // promise.catch(e => alert(e.message));
  //firebase.storage().ref('users/' + auth.user.uid + '/profile.jpg').put(file);
  
  //alert("Signed In");
 }

 function signIn(){
  
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  
  const promise = auth.signInWithEmailAndPassword(email2.value, password2.value);
  promise.catch(e => alert(e.message));

  //Takes user to different page
}

auth.onAuthStateChanged(function(user){
  
  if(user){
   
   var email = user.email;
  
   window.location = "home.html";
   
   //Take user to a different or home page

   //is signed in
   }
});