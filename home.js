
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
  var currentuser = firebase.auth().currentUser;
  var userId;
  const database = firebase.database();
  const rootRef = database.ref('users');

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

   
var imgs = document.getElementById("profile-photo"),
first_name = document.getElementById("first_name"),
last_name = document.getElementById("last_name"),
phone = document.getElementById("phone"),
address = document.getElementById("address"),
language = document.getElementById("language"),
password_change = document.getElementById("password_change");


var first_name_label = document.getElementById("first_name_label");
var last_name_label = document.getElementById("last_name_label");
var userId_label = document.getElementById("userId_label");
var phone_label = document.getElementById("phone_label");
var address_label = document.getElementById("address_label");
var language_label = document.getElementById("language_label");

  function signOut(){
  
  auth.signOut();
  //alert("Signed Out");
  window.location = "index.html";
  
 }

 
 auth.onAuthStateChanged(function(user){
  var email = user.email;
  document.getElementById("userId").innerHTML = "Current user:" +email;
  sessionStorage["username_user"]=email;
  
  if(user){
   
   userId = user.uid;
   

   firebase.storage().ref('users/' + userId + '/profile.jpg').getDownloadURL().then(imgURL=>{
    imgs.src = imgURL;
   })

   firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    first_name_label.innerHTML = (snapshot.val() && snapshot.val().first_name) || 'Anonymous';
    phone_label.innerHTML = (snapshot.val() && snapshot.val().phone) || 'Anonymous';
    address_label.innerHTML = (snapshot.val() && snapshot.val().address) || 'Anonymous';
    language_label.innerHTML = (snapshot.val() && snapshot.val().language) || 'Anonymous';
    userId_label.innerHTML = (snapshot.val() && snapshot.val().userId) || 'Anonymous';
    last_name_label.innerHTML = (snapshot.val() && snapshot.val().last_name) || 'Anonymous';
    
    
  });
   //Take user to a different or home page

   //is signed in
   }
});

let file = {};

function chooseFile(e){
  file = e.target.files[0];
}

function profileSubmit(){
  firebase.storage().ref('users/' + userId + '/profile.jpg').put(file).then(function(){
    console.log("sucessfully uploaded");
    window.location.href="profile.html";
    alert("Profile Successfully updated");
  }).catch(error => {
    console.log(error.message);
  });

  database.ref('/users/' + userId).set({
    first_name: first_name.value,
    last_name: last_name.value,
    userId: userId,
    phone: phone.value,
    address: address.value,
    language: language.value


  });
  
}

function profileUpdate(){
  firebase.storage().ref('users/' + userId + '/profile.jpg').put(file).then(function(){
    console.log("sucessfully uploaded");
  }).catch(error => {
    console.log(error.message);
  });

  const newData = {
    first_name: first_name.value,
    last_name: last_name.value,
    userId: userId,
    phone: phone.value,
    address: address.value,
    language: language.value
  };
  rootRef.child(userId).update(newData);

  }


