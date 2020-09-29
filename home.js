// Your web app's Firebase configuration
var firebaseConfig = {

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