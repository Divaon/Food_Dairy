
var out=document.querySelector("#outofprofile");

var nickname=document.querySelector("#nameuser");


var nicknames=localStorage.getItem('username')

var grafics_page=document.querySelector("#grafics");

grafics_page.addEventListener("click", ()=>{
    document.location.replace("grafics.html");
  });

if (nicknames != null)
{   
    nickname.innerText=nicknames
}
else
{
    nickname.innerText="Пользователь не активен"
}


var changepage=document.querySelector("#changeuserpage");

changepage.addEventListener("click", ()=>{
    document.location.replace('changeuser.html')
});





out.addEventListener("click", ()=>{
    nickname.innerText="Пользователь не активен"
    localStorage.removeItem('username')
    document.location.replace('first_page.html')
});

{/* <input type="weight" id="updateweight" class="login-input" placeholder="new weight">
<input type="submit" value="New weight" id="updatingweight" class="btn"> */}




{/* <div class="informational">
<p class="name" id="userinformation">Current user</p>
</div> */}


// <select name="typefood" id="type_food_select">
// <option value="Meat">Meat</option>
// <option value="Corns">Corns</option>
// <option value="C">C</option>
// </select>


{/* <select name="finalfood" id="final_food_select"></select> */}

var selectType=document.querySelector("#type_food_select")
var selectFood=document.querySelector("#final_food_select")

selectType.innerHTML="";
Change1()

async function Change1() {

    const response = await fetch("/api/foodtypes/", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Types")
        console.log(user)

        var option = new Option("Select", "Select");
        selectType.options[selectType.options.length]=option;

        for (let i=0; i<user.length; i++)
        {
            console.log(user[i]);
            var option = new Option(user[i].type, user[i].id);
            selectType.options[selectType.options.length]=option;
        }
    }

}



console.log(selectType.value);
selectType.addEventListener("change", ()=>{
    selectFood.innerHTML="";
    Change2(selectType.value)
});





{/* <p class="name" id="caloriesoutput">Calories for 100g = </p> */}
var caloriesinfo=document.querySelector("#caloriesoutput");

selectFood.addEventListener("change", ()=>{
    foodobject=JSON.parse(localStorage.getItem('allfood'))
    const text='Калорий на 100 грамм ='+foodobject[selectFood.value]+' для выбраного продукта';
    caloriesinfo.innerHTML=(text)
});

async function Change2(type) {
    const response = await fetch("/api/foods/"+type, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Food")
        console.log(user)

        var option = new Option("Select", "Select");
        selectFood.options[selectFood.options.length]=option;
        for (let i=0; i<user.length; i++)
        {
            console.log(user[i]);
            var option = new Option(user[i].name, user[i].id);
            selectFood.options[selectFood.options.length]=option;
        }
    }
    
}

{/* <input type="weightfood" id="weight_food" class="login-input" placeholder="weight">
<input type="submit" value="Add in dairy" id="inputfood" class="btn"> */}

var insertfood=document.querySelector("#inputfood");

insertfood.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('weight_food').value

    if (weight=="")
    {
      alert('Weight field cant be empty!!')
      return
    }
    weight=Number(weight)
    if (isNaN(weight))
    {
      alert('In weight field must be only numbers!!')
      return
    }
    if (nickname.textContent=="Пользователь не активен")
    {
        alert('Enter in profile first')
      return
    }

    GetUserId(nickname.textContent).then(
        function(result)
        {
            insertfoods('norm',weight, result, selectFood.value);
        }
    );
    // insertfoods('normal',weight, id, selectFood.value);


});

async function insertfoods(type, weight, user_id, food_id) {
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


async function GetFoods() {
    const response = await fetch("/api/getallfoods/", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Food")
        console.log(user)

        var foodobject = {};

        for (let i=0; i<user.length; i++)
        {
            foodobject[user[i].id] = user[i].calories;
        }

        return foodobject
    }
}



async function GetFoodsname() {
    const response = await fetch("/api/getallfoods/", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Food")
        console.log(user)

        var foodobject = {};

        for (let i=0; i<user.length; i++)
        {
            foodobject[user[i].id] = user[i].name;
        }
        
        return foodobject
    }
}
// console.log(GetFoods())

GetFoods().then(
    function(result)
    {
        console.log("insert")
        console.log(result)
        localStorage.setItem('allfood', JSON.stringify(result))
    }
)
GetFoodsname().then(
    function(result)
    {
        console.log(";lkjhgfdsfxcgvbhjnm,./,mnbvgcfdx")
        console.log(result)
        localStorage.setItem('allnamefood', JSON.stringify(result))
    }
)





// <div class="chooseactivity">
// <select name="activity_choose" id="activity_select">
//   <option value="anons">Anons</option>
// </select>
// <input type="activitytyme" id="activity_tyme" class="login-input" placeholder="Activity minutes">
// <input type="submit" value="Add in dairy" id="inputactivity" class="btn">
// </div>

var insertuserfoood=document.querySelector("#inputactivity");
var selectUserFoood=document.querySelector("#activity_select")

var insertuseractivity=document.querySelector("#inputactivity");
var selectUserActivity=document.querySelector("#activity_select")

insertuseractivity.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('activity_tyme').value

    if (weight=="")
    {
      alert('Activity minutes field cant be empty!!')
      return
    }
    weight=Number(weight)
    if (isNaN(weight))
    {
      alert('In Activity minutes must be only numbers!!')
      return
    }
    if (nickname.textContent=="Пользователь не активен")
    {
        alert('Enter in profile first')
      return
    }

    GetUserId(nickname.textContent).then(
        function(result)
        {
            insertusertactivity(weight, result, selectUserActivity.value);
        }
    );



});





async function  insertusertactivity( weight, user_id, actid) {
    const dd = new Date();
    // console.log("Send")
    // console.log(user_id)
    // console.log(food_id)
    // console.log("Send")
    const response = await fetch("api/insertactivity", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            activityid: actid,
            userid: user_id,
            dates: dd,
            time: weight
        })
    });
    

}


selectUserActivity.innerHTML="";
// alert("changeactivity")
ChangeActivity()

async function ChangeActivity() {

    const response = await fetch("/api/activitytypes/", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        console.log("Types")
        console.log(user)

        result={}
        result1={}

        var option = new Option("Select", "Select");
        selectUserActivity.options[selectUserActivity.options.length]=option;

        for (let i=0; i<user.length; i++)
        {
            console.log(user[i]);
            var option = new Option(user[i].name, user[i].id);
            result[user[i].id]=user[i].coeficent;
            result1[user[i].id]=user[i].name;
            selectUserActivity.options[selectUserActivity.options.length]=option;
        }



        localStorage.setItem('allactivity', JSON.stringify(result))
        localStorage.setItem('allactivity1', JSON.stringify(result))
    }

}

{/* <button type="button" id="podpiksa"  class="btn">Grafics</button> */}

var podpiska_page=document.querySelector("#podpiksa");

podpiska_page.addEventListener("click", ()=>{
    if (nickname.textContent=="Пользователь не активен")
    {
    alert('Enter in profile first')
      return
    }
    else
    {
        document.location.replace("podpiska.html");
    }
  });


var insertuserfoood=document.querySelector("#inputuserfood");
var selectUserFoood=document.querySelector("#userfood_select")

insertuserfoood.addEventListener("click", ()=>{
    // alert(nickname.textContent)
    weight=document.getElementById('userfood_c').value

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
    podpiska=localStorage.getItem("podpiska");
    var user_id=localStorage.getItem('userid')

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
ChangeActivity3()


{/* <p class="name" id="caloriesoutput">Calories for 100g = </p> */}
var caloriesinfo2=document.querySelector("#caloriesoutput2");

selectUserFoood.addEventListener("change", ()=>{
    fooduserobject=JSON.parse(localStorage.getItem('alluserfood'))
    const text='Калорий на 100 грамм ='+fooduserobject[selectUserFoood.value]+' для выбраного продукта';
    caloriesinfo2.innerHTML=(text)
});

async function ChangeActivity3() {
    var user_id=localStorage.getItem('userid')
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


{/* <input type="password" id="newpassword" class="login-input" placeholder="Password">
<input type="password" id="oldpassword" class="login-input" placeholder="Password">
<input type="submit" value="Изменить пароль" id="updatepassword" class="btn"> */}




GetFoodDay(user_id=localStorage.getItem('userid'))


async function GetFoodDay(userid) {
    const response = await fetch("/api/getfoodportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        // console.log("responce is ok")
        const user = await response.json();
        now = new Date();
        mydayfoodcalories={
            "today": 0
        }
        for (let j=0; j<user.length; j++)
        {   
            tempdate=new Date(user[j].dates)

            if (now.toDateString() == tempdate.toDateString())
            {
                return
            }

        }
        // console.log('Result')
        // console.log(mydayfoodcalories)
        alert("За сегодня вы пока не внесли в дневник питапния ничего.")
        return 
    }
}


UserInfo(nicknames)

var hidendiv=document.querySelector(".insertuserfood");

async function UserInfo(name) {
    const response = await fetch("/api/usersinfo/"+name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        localStorage.setItem("userweight", user[0].weight)
        localStorage.setItem("podpiska", user[0].podpiska)
        localStorage.setItem("userid", user[0].id)
        // alert(user[0].podpiska)
        if (user[0].podpiska != 0)
        {
            // alert("Пытаемся показать")
            // hidendiv.show=true;
            hidendiv.hidden=false
        }
        else
        {
            // alert("Пытаемся спрятать")
            hidendiv.hidden=true;
        }
    }
}