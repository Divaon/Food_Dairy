var home_page=document.querySelector("#home_page");

home_page.addEventListener("click", ()=>{
    document.location.replace("home.html");
  });




// var tt=document.querySelector("#tt");

// tt.addEventListener("click", ()=>{
//     // alert(nickname.textContent)
//     var date = new Date()
//     date.setDate(date.getDate()) //изменение дня
//     date.setMonth(date.getMonth()) //изменение месяца
//     alert(date)

// });


var foodobject= {};

foodobject=JSON.parse(localStorage.getItem('allfood'))
// allactivity
activityobject=JSON.parse(localStorage.getItem('allactivity'))

// localStorage.setItem('alluserfood', JSON.stringify(result))
fooduserobject=JSON.parse(localStorage.getItem('alluserfood'))

userweight=localStorage.getItem('userweight')
// console.log('hmm')
// console.log(activityobject)

// "/api/getfoodportions"



var nicknames=localStorage.getItem('username')

{/* <canvas id="yearsfood"></canvas>
 */}

 async function GetUserId(name) {
    const response = await fetch("/api/usersinfo/"+name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        // const text='User info: nick='+user[0].name+', weight='+ user[0].weight+', rost=' +user[0].rost+', pol=' +pol;
        // console.log(user)
        return user[0].id
    }
}

 weekfoodgr=document.querySelector("#weekfood")

weekfoodgr.width=300;
weekfoodgr.height=300;
var ctx=weekfoodgr.getContext('2d');

dayfoodgr=document.querySelector("#dayfood")

dayfoodgr.width=300;
dayfoodgr.height=300;
var ctx2=weekfoodgr.getContext('2d');




async function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = "#052403";
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}


async function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

var Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
        //drawing the grid lines 
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
            
            //writing grid markers 
            this.ctx.save();
            this.ctx.fillStyle = "#052403";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
            gridValue+=this.options.gridScale;
        }
 
        //drawing the bars 
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
            barIndex++;
        }

        this.ctx.save();
        this.ctx.textBaseline="bottom";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.ctx.restore(); 


        barIndex = 0;
        var legend = document.querySelector("#legendweekfood");
        var ul = document.createElement("ul");
        legend.append(ul);
        for (categ in this.options.data){
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.textContent = categ;
            ul.append(li);
            barIndex++;
        }
 
    }
}

var myweekfoodcalories = {

};




async function GetFoodWeek(userid) {
    const response = await fetch("/api/getfoodportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        // console.log("responce is ok")
        const user = await response.json();
        // console.log(user)
        now = new Date();
        now.setDate(now.getDate()-6)
        for (let i=0; i<7; i++)
        {
            myweekfoodcalories[now.getDate()] = 0;

            for (let j=0; j<user.length; j++)
            {   
                tempdate=new Date(user[j].dates)

                if (now.toDateString() == tempdate.toDateString())
                {
                    // console.log("Совпадение найдено")
                    calories=0
                    if (user[j].type == "norm")
                    {
                        calories=user[j].weight*foodobject[user[j].food_id]/100
                        // console.log("calories= "+ calories)
                    } 
                    else
                    {   
                        calories=user[j].weight*fooduserobject[user[j].food_id]/100
                        // console.log("Нас здесь покат не должно быть")
                    }
                    myweekfoodcalories[now.getDate()] = myweekfoodcalories[now.getDate()]+calories ;
                }

            }
            now.setDate(now.getDate()+1)
        }
        // console.log('Result')
        // console.log(myweekfoodcalories)
        return myweekfoodcalories
    }
}


// caloriestoday
var caloriestd=document.querySelector("#caloriestoday");

async function GetFoodDay(userid) {
    const response = await fetch("/api/getfoodportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        // console.log("responce is ok")
        const user = await response.json();
        // console.log(user)
        now = new Date();
        mydayfoodcalories={
            "today": 0
        }
        for (let j=0; j<user.length; j++)
        {   
            tempdate=new Date(user[j].dates)

            if (now.toDateString() == tempdate.toDateString())
            {
                // console.log("Совпадение найдено")
                calories=0
                if (user[j].type == "norm")
                {
                    calories=user[j].weight*foodobject[user[j].food_id]/100
                    // console.log("calories= "+ calories)
                } 
                else
                {
                    calories=user[j].weight*fooduserobject[user[j].food_id]/100
                    // console.log("Нас здесь покат не должно быть")
                }
                // console.log(tempdate)
                // console.log(tempdate.getHours())
                // console.log(tempdate.getMinutes())
                mydayfoodcalories["today"] =mydayfoodcalories["today"] + calories ;
            }

        }
        // console.log('Result')
        // console.log(mydayfoodcalories)
        return mydayfoodcalories
    }
}




// console.log("r")
// console.log(myweekfoodcalories)
// console.log("r")



GetUserId(nicknames).then(
    function(result)
    {
        // console.log("Try get food portions with user id "+result)
        GetFoodWeek(result).then(
            function(result)
            {
            myweekfoodcalories=result;

            // var myweekfoodcalories = {
            //     "1": 7,
            //     "3": 9,
            //     "6": 12
            // };

            var myBarchart = new Barchart(
                {
                    canvas:weekfoodgr,
                    seriesName:"Weeek food calories",
                    padding:20,
                    gridScale:100,
                    gridColor:"#eeeeee",
                    data:myweekfoodcalories,
                    colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743", "#459743", "#eb2443", "#052443"]
                }
            );
            myBarchart.draw();
            }
        )
    }
);


GetUserId(nicknames).then(
    function(result)
    {
        // console.log("Try get food portions with user id "+result)
        GetFoodDay(result).then(
            function(result)
            {
            mydayfoodcalories=result;
            var caloriestd=document.querySelector("#caloriestoday");
            caloriestd.innerText="You eat today calories on = "+mydayfoodcalories["today"];

            // alert("Day calories go in")
            // console.log("asdfghjkl;qwertyuiop")
            // console.log(mydayfoodcalories)

            // var myweekfoodcalories = {
            //     "1": 7,
            //     "3": 9,
            //     "6": 12
            // };

            var myBarchart = new Barchart(
                {
                    canvas:dayfoodgr,
                    seriesName:"Day food calories",
                    padding:20,
                    gridScale:100,
                    gridColor:"#eeeeee",
                    data:mydayfoodcalories,
                    colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743", "#459743", "#eb2443", "#052443"]
                }
            );
            myBarchart.draw();
            }
        )
    }
);




//вывод информации с расчетом калорий

async function UserInfo(name) {
    const response = await fetch("/api/usersinfo/"+name, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        var cc=0;
        var cc1=0;
        console.log("check user");
        console.log(user);
        pol="male";


        console.log(user[0])

        if (user[0].pol)
        {
            pol="female";
            cc=(10*user[0].weight)+(6.25*user[0].rost)-(5*user[0].age)-161
            cc1=cc-250

        }
        else
        {
            pol="male"
            cc=(10*user[0].weight)+(6.25*user[0].rost)-(5*user[0].age)+5
            cc1=cc-250
        }
        var text=""
        console.log(user[0].pol)
        // alert(cc)
        // alert(cc1)
        if (cc<1500)
        {
            text='We cant calculate. Check your info';
        }
        else
        {
            text='Withoun activities: to keeep weight need '+cc+" and to start lose weight need "+cc1;
        }
        // return text;
        var aims=document.querySelector("#aims");
        // alert(aims)
        aims.innerHTML=(text)
    }
}


UserInfo(nicknames)


{/* <p class="name" id="caloriesactivitytoday">Activity used calories:</p> */}

GetUserId(nicknames).then(
    function(result)
    {
        // console.log("Try get food portions with user id "+result)
        GetActivityiesDay(result).then(
            function(result)
            {
            mydayfoodcalories=result;
            var caloriesacttd=document.querySelector("#caloriesactivitytoday");
            alert(mydayfoodcalories)
            caloriesacttd.innerText="You spend calories today calories on = "+mydayfoodcalories["today"];

            // alert("Day calories go in")
            // console.log("asdfghjkl;qwertyuiop")
            // console.log(mydayfoodcalories)

            // var myweekfoodcalories = {
            //     "1": 7,
            //     "3": 9,
            //     "6": 12

            }
        )
    }
);


async function GetActivityiesDay(userid) {
    const response = await fetch("/api/getactivityportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        // console.log("responce is ok")
        const user = await response.json();
        // console.log(user)
        now = new Date();
        mydayfoodcalories={
            "today": 0
        }
        for (let j=0; j<user.length; j++)
        {   
            tempdate=new Date(user[j].dates)

            if (now.toDateString() == tempdate.toDateString())
            {
                // console.log("Совпадение найдено")
                calories=0

                calories=(user[j].time / 60)*(activityobject[user[j].activity_id]*userweight)
                    // console.log("calories= "+ calories)
                mydayfoodcalories["today"] =mydayfoodcalories["today"] + calories ;
            }

        }

        return mydayfoodcalories
    }
}