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
var foodnameobject={}

foodobject=JSON.parse(localStorage.getItem('allfood'))
// allactivity
activityobject=JSON.parse(localStorage.getItem('allactivity'))
// localStorage.setItem('allactivity', JSON.stringify(result))
// localStorage.setItem('allactivity1', JSON.stringify(result))
activityobject1=JSON.parse(localStorage.getItem('allactivity1'))
// 'allnamefood'
foodnameobject=JSON.parse(localStorage.getItem('allnamefood'))
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

        namemonth=[" января", " февраля", " марта", " апреля", " мая", " июня", " июля", " августа", " сентября", " октебря", " ноября", " декабря"]

        // console.log("responce is ok")
        const user = await response.json();
        // console.log(user)
        now = new Date();
        now.setDate(now.getDate()-6)
        month=now.getMonth();
        finalemonth=namemonth[month]

        for (let i=0; i<7; i++)
        {
            
        }




        for (let i=0; i<7; i++)
        {
            myweekfoodcalories[String(now.getDate())+finalemonth] = 0;
            // console.log(myweekfoodcalories);

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
                    newlegendname=String(now.getDate())+finalemonth
                    myweekfoodcalories[now.getDate()+finalemonth] = myweekfoodcalories[now.getDate()+finalemonth]+calories ;
                }


            }
            now.setDate(now.getDate()+1)
            month=now.getMonth();
            finalemonth=namemonth[month]
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
                    seriesName:"Калории за неделю",
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
            caloriestd.innerText="Сегодня вы сьели калорий в количестве = "+mydayfoodcalories["today"];

            var myBarchart = new Barchart(
                {
                    canvas:dayfoodgr,
                    seriesName:"Калории за сегодня",
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
        if (cc<1000)
        {
            text='Мы не смогли посчитать. Проферте информацию о себе.';
        }
        else
        {
            text='Без активности: чтобы держать вес нужно потреблять в среднеем '+cc+" и чтобы начать терять вес нужно потреблять "+cc1;
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
            // alert(mydayfoodcalories)
            caloriesacttd.innerText="Сегодня вы потратити калорий в количестве = "+mydayfoodcalories["today"].toFixed(2);

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




ulelement=document.querySelector('.allfood')
var user_id=localStorage.getItem('userid');


GetFoodsinul(user_id)
async function GetFoodsinul(userid) {
    const response = await fetch("/api/getfoodportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        
        const user = await response.json();
        console.log("l;OKJHGFHD")
        console.log(foodnameobject)
        console.log(foodobject)

        for (j=0; j<user.length; j++)
        {
            let lielement=document.createElement('li');
            date=new Date(user[j].dates)
            let name=""
            calories=0
            if (user[j].type == "norm")
            {
                calories=user[j].weight*foodobject[user[j].food_id]/100
                name=foodnameobject[user[j].food_id]
            } 
            else
            {
                calories=user[j].weight*fooduserobject[user[j].food_id]/100
                name=fooduserobjectp[user[j].food_id].name
            }

            temp1=date.getDate()

            temp2=date.getMonth()+1
            temp3=date.getFullYear()
            if (temp1<10)
            {
                temp1='0'+temp1
            }
            if (temp2<10)
            {
                temp2='0'+temp2
            }
            d=temp1+'.'+temp2+'.'+temp3

            const text="Вы съели "+name+" весом " +user[j].weight+" грамм, с итоговой каларийностью "+calories+ " и дата тогда была "+d
            lielement.innerHTML=text;
            ulelement.append(lielement);
            let pelement=document.createElement('p');
            ulelement.append(pelement);
        }


        return
    }
}




ulelement2=document.querySelector('.allactivity')


GetActivityiesinul(user_id)
async function GetActivityiesinul(userid) {
    const response = await fetch("/api/getactivityportionsid/"+userid, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();

        console.log("lkjhuiygtfrdedftghjmk,lm")
        console.log(activityobject1)

        for (let j=0; j<user.length; j++)
        { 

            let lielement=document.createElement('li');
            date=new Date(user[j].dates)
            let time=10
            calories=(user[j].time / 60)*(activityobject[user[j].activity_id]*userweight)
            let name=activityobject1[user[j].activity_id]
            
            temp1=date.getDate()

            temp2=date.getMonth()+1
            temp3=date.getFullYear()
            if (temp1<10)
            {
                temp1='0'+temp1
            }
            if (temp2<10)
            {
                temp2='0'+temp2
            }
            d=temp1+'.'+temp2+'.'+temp3

            const text="Вы занимались "+name+ " в течении " +time+ " минут и потратили на это "+calories.toFixed(2)+" и делали вы это "+d
            lielement.innerHTML=text;
            ulelement2.append(lielement);
            let pelement=document.createElement('p');
            ulelement2.append(pelement);
        }

        return 
    }
}