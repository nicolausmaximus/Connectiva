
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
  

  const auth = firebase.auth(); 


  function signUp(){
  
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  
  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  
  alert("Signed In");
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
   //alert("current user:" + user.email)

   window.location = "form2.html";
   
   //Take user to a different or home page

   //is signed in
   
  }
  
  
  
 });