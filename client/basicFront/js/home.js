
var jwt = localStorage.getItem('jwt') || '';
console.log('Bearer '+jwt)
var h1User = document.getElementById('username');
async function checkToken()  {

if (jwt) {
    var userdata = ""
    // Make an authenticated request
    await fetch('http://localhost:5001/api/home', {
        headers: {
            'Auth': 'Bearer '+jwt
        }
    })
   .then(response => response.json())
   .then(data => {console.log(data)
    if (data.message =="Token is not valid"){
        localStorage.removeItem('jwt');
        window.location.href = "/login";
        return;
    }
    userdata = data;
   })
   .catch(error => console.error('Error:', error));

   console.log(userdata)
   h1User.innerHTML = "Welcome "+ userdata.user + userdata.phone;


}
else {
    h1User.innerHTML = "You are not logged in";
}
}

checkToken()
