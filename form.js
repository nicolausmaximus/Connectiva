
// Your web app's Firebase configuration
  var firebaseConfig = {
    
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
  
   window.location = "home.html";
   
   //Take user to a different or home page

   //is signed in
   }
});