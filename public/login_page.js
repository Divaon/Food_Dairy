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
    alert('Поле ника дожно быть заполнено!')
    return
  }
  else if (password=="")
  {
    alert('Поле пароля должно быть заполнено!')
    return
  }

  GetUserbynameandpassword(nick, password).then((result)=>{

    if (result)
    {
    document.location.replace("home.html");
    localStorage.setItem('username',nick)
    // console.log("Cath");
    }
    else
    {
      alert("Ник или пароль неверны");
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


var changepassword=document.querySelector("#changepassword_page");
changepassword.addEventListener("click", ()=>{
    document.location.replace("changepassword.html");
        console.log("Cath");
});

