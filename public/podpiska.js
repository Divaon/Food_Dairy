var home_page=document.querySelector("#home_page");

home_page.addEventListener("click", ()=>{
    // alert("hgytf")
    document.location.replace("home.html");
  });

podpiska=localStorage.getItem("podpiska");

//   <p class="name" id="status">Calories today:</p>


var statuss=document.querySelector("#status");
// alert(aims)
var text=""
if (podpiska == 0)
{
    text="You not activate podpiska earlier. Actions on this page blocked"
}
else
{
    text="Hi user"
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
        alert("Block")
    }
});

var user_id=localStorage.getItem('userid')


function addnewuserfoodd(){

  names = document.getElementById('foodname').value
  caloriess = document.getElementById('foodcalories').value

  if (names=="")
  {
    alert('Name field cant be empty!!')
    return
  }
  else if (caloriess=="")
  {
    alert('Calories field cant be empty!!')
    return
  }
  caloriess=Number(caloriess)
  if (isNaN(caloriess))
  {
    alert('In caloriess field must be only numbers!!')
    return
  }

    insertnewuserfoods(names, caloriess, user_id)

    selectUserFoood.innerHTML="";
    // alert("changeactivity")
    ChangeActivity()
};


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









var insertuserfoood=document.querySelector("#inputactivity");
var selectUserFoood=document.querySelector("#activity_select")

insertuserfoood.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('activity_tyme').value

    if (weight=="")
    {
      alert('Weight field cant be empty!!')
      return
    }
    weight=Number(weight)
    if (isNaN(weight))
    {
      alert('In weight must be only numbers!!')
      return
    }


    if (podpiska != 0)
    {
        insertusertfoodindairy('user',weight, user_id, selectUserFoood.value)
    }
    else
    {
        alert("Block")
    }




});





async function insertusertfoodindairy(type, weight, user_id, food_id) {
    const dd = new Date();
    console.log("Send")
    console.log(user_id)
    console.log(food_id)
    console.log("Send")
    const response = await fetch("api/insertfood", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            type: type,
            foodsid: food_id, 
            userid: user_id,
            weight: weight,
            dates: dd
        })
    });

}


selectUserFoood.innerHTML="";
// alert("changeactivity")
ChangeActivity()


{/* <p class="name" id="caloriesoutput">Calories for 100g = </p> */}
var caloriesinfo=document.querySelector("#caloriesoutput");

selectUserFoood.addEventListener("change", ()=>{
    fooduserobject=JSON.parse(localStorage.getItem('alluserfood'))
    const text='Calories for 100g ='+fooduserobject[selectUserFoood.value]+' for product choose product';
    caloriesinfo.innerHTML=(text)
});

async function ChangeActivity() {

    // const response = await fetch("/api/activitytypes/", {
    const response = await fetch("/api/userfoodall/"+user_id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Types")
        console.log(user)

        result={}

        var option = new Option("Select", "Select");
        selectUserFoood.options[selectUserFoood.options.length]=option;

        for (let i=0; i<user.length; i++)
        {
            console.log(user[i]);
            var option = new Option(user[i].name, user[i].id);
            result[user[i].id]=user[i].calories;
            selectUserFoood.options[selectUserFoood.options.length]=option;
        }



        localStorage.setItem('alluserfood', JSON.stringify(result))
    }

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
            alert("Have res");
            alert(res)
            console.log(res)
          if (res.ok) return res.json()
          // If there is an error then make sure we catch that
          return res.json().then(e => Promise.reject(e))
        })
        .then(({ url }) => {
            alert("Have url");
          // On success redirect the customer to the returned URL
          window.location = url
        })
        .catch(e => {
            alert(e.error)
            alert("Have error");
            console.log(e.error)
          console.error(e.error)
        })

  });


