var home_page=document.querySelector("#home_page");

home_page.addEventListener("click", ()=>{
    // alert("hgytf")
    document.location.replace("home.html");
  });

podpiska=localStorage.getItem("podpiska");

//   <p class="name" id="status">Calories today:</p>

var hidendiv=document.querySelector(".inputuserfood");
var hidenbtn=document.querySelector("#pay_page");
if (podpiska == 0)
{
  hidenbtn.hidden=false
}
else
{
  hidendiv.hidden=false
}


var hidendiv=document.querySelector(".insertuserfood");


var statuss=document.querySelector("#status");
// alert(aims)
var text=""
if (podpiska == 0)
{
    text="Активируйте подписку для полноценного доступа к странице"
}
else
{
    text="Привет пользователь. "
}
statuss.innerHTML=(text)



{/* <input type="name" id="foodname" class="login-input" placeholder="Name">
<input type="password" id="foodcalories" class="login-input" placeholder="Caloriess">
<input type="submit" value="AddnewFood" id="addnewfood" class="login-button"> */}


var login_page=document.querySelector("#addnewfood");



login_page.addEventListener("click", ()=>{
    if (podpiska != 0)
    {
        addnewuserfoodd();
    }
    else
    {
        alert("Заблокировано")
    }
});

var user_id=localStorage.getItem('userid')


function addnewuserfoodd(){

  names = document.getElementById('foodname').value
  caloriess = document.getElementById('foodcalories').value

  if (names=="")
  {
    alert('Поле имени должно быть заполнено!')
    return
  }
  else if (caloriess=="")
  {
    alert('Поле калорий должно быть заполнено!')
    return
  }
  caloriess=Number(caloriess)
  if (isNaN(caloriess))
  {
    alert('В поле калорий должны быть только числа!')
    return
  }

    insertnewuserfoods2(names, caloriess, user_id)

    // selectUserFoood.innerHTML="";
    // alert("changeactivity")
    // ChangeActivity()
};

async function insertnewuserfoods2(names, calories, user_id) {
  const mm = [names,calories,user_id];
  const m=JSON.stringify(mm)

  const response = await fetch("/api/insertuserfood/" + m, {
    method: "GET",
    headers: { "Accept": "application/json" }
});
  if (response.ok === true) {
      const found = await response.json();
      console.log("ewrgty")
      console.log(found)
      if (found === false)
      {
          alert("Выберите другое название")
      }
      else
      {
          alert("Еда добавлена")
      }
  }
}


async function insertnewuserfoods(names, calories, user_id) {

    const response = await fetch("api/insertuserfood", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            calories: calories,
            namess: names, 
            userid: user_id,
        })
    });

}



// Podpiska code

// Initiate a POST request to the server
// If the server is on a different domain than the client
// then this needs to be the full url
// http://localhost:3000/create-checkout-session

{/* <button type="button" id="pay_page"  class="btn">Pay on payment page</button> */}


var pay_page=document.querySelector("#pay_page");

pay_page.addEventListener("click", ()=>{


    fetch("/create-checkout-session/"+user_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send along all the information about the items
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: 1,
            },
    
          ],
        }),
      })
        .then(res => {
            // alert("Have res");
            // alert(res)
            console.log(res)
          if (res.ok) return res.json()
          // If there is an error then make sure we catch that
          return res.json().then(e => Promise.reject(e))
        })
        .then(({ url }) => {
            // alert("Have url");
          // On success redirect the customer to the returned URL
          window.location = url
        })
        .catch(e => {
            // alert(e.error)
            // alert("Have error");
            console.log(e.error)
          console.error(e.error)
        })

  });


