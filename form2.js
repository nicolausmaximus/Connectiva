
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

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

  function signOut(){
  
  auth.signOut();
  //alert("Signed Out");
  window.location = "index.html";
  
 }

 
 auth.onAuthStateChanged(function(user){
  
  if(user){
   
   var email = user.email;
   document.getElementById("userId").innerHTML = "Current user:" +email;
   
   
   //Take user to a different or home page

   //is signed in
   
  }
  
  
  
 });