var action=document.querySelector("#registering");


{/* <input type="submit" value="Login" id="return" class="login-button"> */}

var returning=document.querySelector("#return");


returning.addEventListener("click", () =>{
  document.location.replace('first_page.html')
});


action.addEventListener("click", () =>{
    changepassword()
  });


function changepassword (){

    // <!-- pol==0 male pol=1 is female -->
  
    nick = document.getElementById('nick').value
    password = document.getElementById('password').value
    pol=document.getElementById('pol')
    age=document.getElementById('age').value
    let radio=document.querySelectorAll('input[type="radio"]')
    // alert(radio[0].value)
    if (radio[0].checked)
    {
      pol=0
    //   alert("Мужской")
    }
    else
    {
      pol=1
    //   alert("Женский")
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

    else if (age=="")
    {
      alert('Поле возраста должно быть заполнено!')
      return
    }

    age=Number(age)

    if (isNaN(age))
    {
      alert('В поле возраста должны быть только цифры!!')
      return
    }
  
    if (password.length < 8)
    {
      alert("Пароль должен содержать не менее 8 символов.")
      return
    }

    Changepassowrd(nick, age, pol, password)
 
  
  }


//   app.get("/api/founduser/:m", function(req, res){


async function Changepassowrd(nick, age, pol, password) {
    const mm = [nick,age,pol, password];
    const m=JSON.stringify(mm)
  
    const response = await fetch("/api/founduser/" + m, {
      method: "GET",
      headers: { "Accept": "application/json" }
  });
    if (response.ok === true) {
        const found = await response.json();
        console.log("ewrgty")
        console.log(found)
        if (found === false)
        {
            alert("Пароль не изменился")
        }
        else
        {
            alert("Пароль изменен")
        }
    }
  }