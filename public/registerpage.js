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
    alert('Поле ника должно быть заполнено!')
    return
  }
  else if (password=="")
  {
    alert('Поле пароля должно быть заполнено!')
    return
  }
  else if (weight=="")
  {
    alert('Поле веса должно быть заполнено!')
    return
  }
  else if (rost=="")
  {
    alert('Поле роста должно быть заполнено!')
    return
  }
  else if (age=="")
  {
    alert('Поле возраста должно быть заполнено!')
    return
  }
  weight=Number(weight)
  rost=Number(rost)
  age=Number(age)
  if (isNaN(weight))
  {
    alert('В поле веса должны быть только цифры!')
    return
  }
  else if (isNaN(rost))
  {
    alert('В поле роста должны быть только цифры!')
    return
  }
  else if (isNaN(age))
  {
    alert('В поле возраста должны быть только цифры!!')
    return
  }

  if (password.length < 8)
  {
    alert("Пароль должен содержать не менее 8 символов.")
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
      alert("Выберите другой ник. Этот занят.")
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