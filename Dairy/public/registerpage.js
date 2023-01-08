var register_page=document.querySelector("#registering");



var returning=document.querySelector("#return");


returning.addEventListener("click", () =>{
  document.location.replace('first_page.html')
});


register_page.addEventListener("click", ()=>{
    register();
  });

//   <input type="rost" id="rost" class="register input" placeholder="Rost">
//   <!-- <input type="checkbox" id="pol" class="register input" placeholder="Pol(put if you male)"> -->
// </div>
// <label>Pol(put if you male)</label>
// <input type="checkbox" id="pol" class="register input">


function register(){

  // <!-- pol==1 male pol=0 is female -->

  nick = document.getElementById('nick').value
  password = document.getElementById('password').value
  weight=document.getElementById('weight').value
  rost=document.getElementById('rost').value
  pol=document.getElementById('pol')
  age=document.getElementById('age').value
  let radio=document.querySelectorAll('input[type="radio"]')
  // alert(radio[0].value)
  if (radio[0].checked)
  {
    pol=0
    alert("Мужской")
  }
  else
  {
    pol=1
    alert("Женский")
  }


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
  else if (weight=="")
  {
    alert('Weight field cant be empty!!')
    return
  }
  else if (rost=="")
  {
    alert('Rost field cant be empty!!')
    return
  }
  else if (age=="")
  {
    alert('Age field cant be empty!!')
    return
  }
  weight=Number(weight)
  rost=Number(rost)
  age=Number(age)
  if (isNaN(weight))
  {
    alert('In weight field must be only numbers!!')
    return
  }
  else if (isNaN(rost))
  {
    alert('In weight field must be only numbers!!')
    return
  }
  else if (isNaN(age))
  {
    alert('In weight field must be only numbers!!')
    return
  }




//   getData().then((result)=>{
//     t=JSON.parse(result);
//     userlist2(result);
// });



  GetUserbyname(nick).then((result)=>{
    // alert(result);
    if (result)
    {
    CreateUser(nick, password, weight, rost, pol, age)
    document.location.replace("home.html");
    localStorage.setItem('username',nick)
    console.log("Cath");
    }
    else
    {
      alert("Choose another nick")
    }

 
  });


}



async function CreateUser(userName, userPassword, userWeigth, userRost, userPol, userAge) {
  // alert(userAge)
  const response = await fetch("api/users", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
          name: userName,
          userpassword: userPassword, 
          userweight: userWeigth,
          userrost: userRost,
          userpol: userPol,
          userage: userAge,
          userpodpiska: 0,
      })
  });
  if (response.ok === true) {
      reset();
  }
}



async function GetUserbyname(name) {
  const response = await fetch("/api/user/" + name, {
      method: "GET",
      headers: { "Accept": "application/json" }
  });
  if (response.ok === true) {
      const user = await response.json();
      // alert(user)

      return user
  }
}