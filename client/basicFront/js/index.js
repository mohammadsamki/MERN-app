var table = document.getElementById("myTable");
console.log(table.children[1]);
var addData = document.getElementById("addData");
addData.addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var phone = document.getElementById("phone").value;
    console.log(username, phone);
    postData(username,phone)
    alert('data were added')
})

async function postData(username,phone){
    var data = {username:username,phone:phone}
    await fetch('http://127.0.0.1:5001/api/users',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then(response=>response.json()).then(
        data=>{
            console.log(data)
        }
    )
}
async function deleteUser(id){
    await fetch(`http://127.0.0.1:5001/api/users/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response=>response.json()).then(
        data=>{
            console.log(data)
        }
    )
}
//  get the data (id,udername,phone) from the api
//
var allData = [];

async function getData() {
await fetch('http://127.0.0.1:5001/api/users',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    // body: JSON.stringify({username: 'admin', phone: 34567890})

}).then(response => {
    // console.log(response.json());
    return response.json();
}).then(data => {
    console.log(data);
    var i = 1;
    data.forEach(element => {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var updateButton = document.createElement("button")
        updateButton.innerHTML="update"
        cell5.append(updateButton)
        var cell6 = document.createElement("td");
        var daleteButton = document.createElement("button")
        daleteButton.onclick=function(){
            deleteUser(element._id)
        }

        daleteButton.innerHTML="delete"

        cell6.append(daleteButton)
        cell4.innerHTML=i;
        cell1.innerHTML = element._id;
        cell2.innerHTML = element.username;
        cell3.innerHTML = element.phone;
        row.appendChild(cell4);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell5);
        row.appendChild(cell6);
        table.children[1].appendChild(row);
        i++;

    allData = data;
    });
}).catch(error => {
    console.error('Error:', error);
})
}
getData()
console.log(allData);


