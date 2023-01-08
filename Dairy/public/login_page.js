var login_page=document.querySelector("#logining");


{/* <input type="submit" value="Login" id="return" class="login-button"> */}

var returning=document.querySelector("#return");


returning.addEventListener("click", () =>{
  document.location.replace('first_page.html')
});


login_page.addEventListener("click", ()=>{
  register();
});




function register(){

  nick = document.getElementById('nick').value
  password = document.getElementById('password').value

  if (nick=="")
  {
    alert('Nickneim field cant be empty!!')
    return
  }
  else if (password=="")
  {
    alert('Password field cant be empty!!')
    return
  }

  GetUserbynameandpassword(nick, password).then((result)=>{
    alert("And login result is")
    alert(result);
    if (result)
    {
    document.location.replace("home.html");
    localStorage.setItem('username',nick)
    // console.log("Cath");
    }
    else
    {
      alert("Nick or password unright");
    }

 
  });


}



// async function EditUser(userId, userName, userAge) {
//   const response = await fetch("api/users", {
//       method: "PUT",
//       headers: { "Accept": "application/json", "Content-Type": "application/json" },
      // body: JSON.stringify({
      //     id: userId,
      //     name: userName,
      //     age: parseInt(userAge, 10)
      // })
//   });
//   if (response.ok === true) {
//       const user = await response.json();
//       reset();
//       document.querySelector("tr[data-rowid='" + user.id + "']").replaceWith(row(user));
//   }
// }





async function GetUserbynameandpassword(name, password) {
  alert("We will see")
  const mm = [name , password];
  const m=JSON.stringify(mm)

  const response = await fetch("/api/us/" + m, {
    method: "GET",
    headers: { "Accept": "application/json" }
});
  if (response.ok === true) {
      const found = await response.json();

      return found
  }
}