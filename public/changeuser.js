
var out=document.querySelector("#outofprofile");

var nickname=document.querySelector("#nameuser");


var nicknames=localStorage.getItem('username')




if (nicknames != null)
{   
    nickname.innerText=nicknames
}
else
{
    nickname.innerText="Пользователь не активен"
}

UserInfo(nicknames)

{/* <button type="button" id="changeuserpage" class="btn" >Изменить информацию о профиле</button> */}


out.addEventListener("click", ()=>{
    document.location.replace('home.html')
});


{/* <input type="weight" id="updateweight" class="login-input" placeholder="new weight">
<input type="submit" value="New weight" id="updatingweight" class="btn"> */}

var updateweight=document.querySelector("#updatingweight");

updateweight.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('updateweight').value

    if (weight=="")
    {
      alert('Поле веса должно быть заполнено!')
      return
    }
    weight=Number(weight)
    if (isNaN(weight))
    {
      alert('В поле веса должны быть только числа!')
      return
    }


    EditUserWeight(nick=nickname.textContent, weight)
    UserInfo(nick=nickname.textContent)


});


async function EditUserWeight(nick, weight) {
    const response = await fetch("api/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nick,
            weight: weight
        })
    });
    UserInfo(nick)

}




var updatingage=document.querySelector("#updatingage");

updatingage.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('updateage').value

    if (weight=="")
    {
      alert('Поле возраста должно быть заполнено!')
      return
    }
    weight=Number(weight)
    if (isNaN(weight))
    {
      alert('В поле возраста должны быть только числа!')
      return
    }


    EditUserAge(nick=nickname.textContent, weight)
    UserInfo(nick=nickname.textContent)


});


async function EditUserAge(nick, age) {
    const response = await fetch("api/userage", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nick,
            age: age
        })
    });
    UserInfo(nick)
    UserInfo(nick=nickname.textContent)

}


var updaterost=document.querySelector("#updatingrost");

updaterost.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    rost=document.getElementById('updaterost').value

    if (rost=="")
    {
      alert('Поле роста должно быть заполнено!')
      return
    }
    rost=Number(rost)
    if (isNaN(rost))
    {
      alert('В поле роста должны быть только числа!')
      return
    }


    EditUserRost(nick=nickname.textContent, rost)
    UserInfo(nick=nickname.textContent)


});


async function EditUserRost(nick, rost) {
    // alert("Try");
    const response = await fetch("api/usersrost", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nick,
            rost: rost
        })
    });
    UserInfo(nick)

}


{/* <div class="informational">
<p class="name" id="userinformation">Current user</p>
</div> */}

var userinfo=document.querySelector("#userinformation");

if (nickname.textContent=="Пользователь не активен")
    {
        alert('Enter in profile first')
    }
else
    {
        UserInfo(nick=nickname.textContent)

    }      


async function UserInfo(name) {
    const response = await fetch("/api/usersinfo/"+name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("check user");
        console.log(user);
        pol="male";
        if (user[0].pol)
        {
            pol="женский";
        }
        else
        {
            pol="мужской"
        }
        console.log(user[0].pol)
        const text='Информация о пользователе: ник='+user[0].name+', вес='+ user[0].weight+', рост=' +user[0].rost+', пол=' +pol + ', возраст='+ user[0].age +', а своей целью вы выбрали '+user[0].aim;
        localStorage.setItem("userweight", user[0].weight)
        localStorage.setItem("podpiska", user[0].podpiska)
        localStorage.setItem("userid", user[0].id)
        userinfo.innerHTML=(text)
    }
}



async function GetUserId(name) {
    const response = await fetch("/api/usersinfo/"+name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        // const text='User info: nick='+user[0].name+', weight='+ user[0].weight+', rost=' +user[0].rost+', pol=' +pol;
        console.log(user)
        return user[0].id
    }
}

// console.log(GetFoods())



//   <button type="button" id="delete"  class="btn">Podpiska</button>
var deleteuser=document.querySelector("#delete");


deleteuser.addEventListener("click", ()=>{

    if (nickname.textContent=="Пользователь не активен")
    {
    alert('Enter in profile first')
      return
    }
    else
    {
        DeleteUser()
    }

  });

//   /api/userdelete/
async function DeleteUser() {
    var user_id=localStorage.getItem('userid')
    const response = await fetch("/api/userdelete/"+user_id, {
        method: "Delete",
        headers: { "Accept": "application/json" },
    });
    if (response.ok === true)
    {
        alert("Пользователь удален")
        nickname.innerText="Пользователь не активен"
        localStorage.removeItem('username')
    }
    else
    {
        alert("Что-то пошло не так")
    }
    return

}




{/* <input type="password" id="newpassword" class="login-input" placeholder="Password">
<input type="password" id="oldpassword" class="login-input" placeholder="Password">
<input type="submit" value="Изменить пароль" id="updatepassword" class="btn"> */}


var password_update=document.querySelector("#updatepassword");
// var passwordtext=document.querySelector("#newpassword");
// var oldpasswordtext=document.querySelector("#oldpassword")

password_update.addEventListener("click", ()=>{
    // alert("1")
    var p1=document.getElementById('newpassword').value;
    // alert("1")
    var p2=document.getElementById('oldpassword').value;
    // alert('2')
    if (p1=="" || p2=="")
    {
      alert('Поля для полей должны быть заполнены')
      return
    }


    if (p1.length < 8)
    {
      alert("Пароль должен содержать не менее 8 символов.")
      return
    }

    const nick=nickname.textContent

    updatespasswordd(nick, p1, p2)

  });


//   "api/updatepassword"
async function updatespasswordd(namee, passwordd, oldpasswordd) {
    console.log("And we here")
    const response = await fetch("api/updatespassword", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: namee,
            password: passwordd,
            oldpassword: oldpasswordd
        })
    });
    GetUserbynameandpassword(nick, oldpasswordd).then((result)=>{
        alert("And change password is")
        alert(result);
        if (result === false)
        {
            alert("Пароль не изменился. Провертье поля ввода старого пароля")
        }
        else
        {
          alert("Пароль изменен");
        }
    
     
      });
}



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

// });


{/* <div class="updateaim">
<label>Изменить свою цель </label>
<input type="aim" id="updateaim" class="login-input" placeholder="new rost">
<input type="submit" value="Новый рост" id="updatingaim" class="btn">
</div> */}


var updateaim=document.querySelector("#updatingaim");

updateaim.addEventListener("click", ()=>{
    // alert(nickname.textContent)
   aim=document.getElementById('updateaim').value


    if (aim=="")
    {
      alert('Поле цели должно быть заполнено!')
      return
    }
    else if (aim.length>40)
    {
        alert('В поле не должно быть больше 40 символов!')
        return
    }


    EditUserAim(nick=nickname.textContent, aim)
    UserInfo(nick=nickname.textContent)


});


async function EditUserAim(nick, aim) {
    // alert("Try"); api/usersrost
    const response = await fetch("api/usersaim", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nick,
            aim: aim
        })
    });
    UserInfo(nick)

}