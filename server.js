import { Console } from 'console';
import express from 'express'
import fs from 'fs'
import pg from 'pg'

    
const app = express();
const jsonParser = express.json();






  
app.use(express.static('public'));
  
const filePath = "users.json";

const cursors=new pg.Pool ({
    host: "127.0.0.1",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "12345",
});


cursors.connect();


// "api/userage"

// изменение возраста пользователя
app.put("/api/userage", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    const name= req.body.name;
    const age = req.body.age;
    cursors.query("UPDATE public.user SET age=$1	WHERE name = $2;",
     [age, name], function(err, result){
        if (err){
            console.log("Hi problem /api/users")
            return console.log(err)
        }
    })
    res.send();
});


// "api/updatepassword"

// изменение пароля пользователя
app.put("/api/updatespassword", jsonParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    const name= req.body.name;
    const password = req.body.password;
    const oldpassword= req.body.oldpassword;
    console.log("We was here really")
    console.log(name, password, oldpassword)
    console.log("check check check")
    cursors.query("UPDATE public.user SET password=$1	WHERE name = $2 and password = $3;",
     [oldpassword, name,    password], function(err, result){
        if (err){
            console.log("Hi problem /api/updatepassword")
            return console.log(err)
        }

    })
    res.send();
});






// получение одного пользователя по name
app.get("/api/user/:name", function(req, res){
    // console.log("User by name")  ;
    const name = req.params.name; 
    let getthisuser = null;
    cursors.query("SELECT id, name, password, weight, podpiska	FROM public.user where name = $1;", [name], function(err, result){
        if (err){
            console.log("Hi problem /api/user/:name")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            if (result.rows[0] == undefined)
            {
                // console.log("Select is null")
                getthisuser=true
            }
            else
            {
                // console.log("Row have smth")
                getthisuser=false
            }
            
            res.send(getthisuser)

        }
    })

});


//проверка логирования
app.get("/api/us/:m" , function(req, res){
    console.log("User by name and password")  ;
    const m =JSON.parse(req.params.m);
    console.log(typeof(m))
    const name = m[0]; 
    const password=m[1]; 
    console.log(name, password)
    let getthisuser = null;
    console.log(name, password)
    cursors.query("SELECT id, name, password, weight, podpiska FROM public.user where name = $1 and password = $2;", 
    [name, password], function(err, result){
        if (err){
            console.log("Hi problem /api/us/:m")
            return console.log(err)
        }
        else
        {   
            console.log("And Select give me")
            console.log(result.rows)
            if (result.rows[0] == undefined)
            {
                console.log("Select is null")
                getthisuser=false
            }
            else
            {
                console.log("Row have smth")
                getthisuser=true
            }
            
            res.send(getthisuser)

        }
    })

});




// получение отправленных данных


app.post("/api/users", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const password=req.body.userpassword;
    const userWeight = req.body.userweight;
    const userRost = req.body.userrost;
    const userPol = req.body.userpol
    const podpiska=req.body.userpodpiska;
    const age=req.body.userage;
    const aim='Null'


    cursors.query("Insert Into public.user(name, password, weight, rost, pol, podpiska, age, aim) values ($1, $2, $3, $4, $5, $6, $7, $8);", 
    [userName, password, userWeight, userRost, userPol,  podpiska, age, aim], function(err, result){
        if (err){
            console.log("Hi problem /api/users isert user")
            console.log(age)
            console.log("wait")
            return console.log(err)
        }
    })
    res.send();
});


 // удаление пользователя по id
 app.delete("/api/userdelete/:id", function(req, res){
       
    const id = req.params.id;
    cursors.query("DELETE FROM public.activityuser WHERE user_id = $1;", 
    [id], function(err, result){
        if (err){
            console.log("api/userdelete/:id")
            return console.log(err)
        }
    })
    cursors.query("DELETE FROM public.foodportions WHERE user_id = $1;", 
    [id], function(err, result){
        if (err){
            console.log("api/userdelete/:id")
            return console.log(err)
        }
    })
    cursors.query("DELETE FROM public.userfood WHERE user_id = $1;", 
    [id], function(err, result){
        if (err){
            console.log("api/userdelete/:id")
            return console.log(err)
        }
    })
    cursors.query("DELETE FROM public.user WHERE id = $1;", 
    [id], function(err, result){
        if (err){
            console.log("api/userdelete/:id")
            return console.log(err)
        }
    })
    res.send();

});



// изменение веса пользователя
app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    const name= req.body.name;
    const weight = req.body.weight;
    cursors.query("UPDATE public.user SET weight=$1	WHERE name = $2;",
     [weight, name], function(err, result){
        if (err){
            console.log("Hi problem /api/users")
            return console.log(err)
        }
    })
    res.send();
});


// изменение роста пользователя
app.put("/api/usersrost", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    const name= req.body.name;
    const rost = req.body.rost;
    // console.log("We get be here?");
    cursors.query("UPDATE public.user SET rost=$1 WHERE name = $2;",
     [rost, name], function(err, result){
        console.log("HHHH");
        console.log(err);
        console.log(result);
        if (err){
            console.log("Hi problem /api/usersrost")
            return console.log(err)
        }
        else
        {
            // console.log("And what");
            console.log(result);
        }
    })
    res.send();
});
   

// изменение цели пользователя
app.put("/api/usersaim", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    const name= req.body.name;
    const aim = req.body.aim;
    // console.log("We get be here?");
    cursors.query("UPDATE public.user SET aim=$1 WHERE name = $2;",
     [aim, name], function(err, result){
        console.log("HHHH");
        console.log(err);
        console.log(result);
        if (err){
            console.log("Hi problem /api/usersrost")
            return console.log(err)
        }
        else
        {
            // console.log("And what");
            console.log(result);
        }
    })
    res.send();
});



// получение одного пользователя по name
app.get("/api/usersinfo/:name", function(req, res){
    console.log("UserInfo by name");
    const name = req.params.name; // получаем id
    let user = null;


    cursors.query("SELECT id, name, password, weight, rost, pol ,podpiska, age, aim FROM public.user where name = $1", 
    [name], function(err, result){
        if (err){
            console.log("Hi problem /api/usersinfo/:name")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});


// app.get("/api/us/:m" , function(req, res){

// получение пользователя для изменения пароля поиск
app.get("/api/founduser/:m", function(req, res){
    console.log("/api/founduser");


    const m =JSON.parse(req.params.m);
    const name = m[0]; 
    const age=m[1]; 
    const pol=m[2]*0.0;
    const password=m[3];

    console.log(name[0])

    cursors.query("SELECT id, password FROM public.user where name = $1 and age = $2 and pol = $3", 
    [name, age, pol], function(err, result){
        if (err){
            console.log("Hi problem /api/foodtypes/")
            return console.log(err)
        }
        else
        {   
            // console.log("lkoijuhygtfdfghjklkjhgfds")
            // console.log(typeof(name), typeof(age), typeof(pol), password)
            // console.log(result.rows)
            // console.log(result)

            console.log("hmmmmmmn")
            console.log(result.rowCount)

            if (result.rowCount == 0)
            {
                console.log("qwertyuiop[]asdfghjkl;'zxcvbnm,./")
                const temp=false
                const m=JSON.stringify(temp)
                res.send(m)
            }
            else
            {
                // UPDATE public."user"	SET id=?, name=?, password=?, weight=?, rost=?, pol=?, podpiska=?, age=?, aim=?	WHERE <condition>;
                console.log("147258369147258369")
                cursors.query("UPDATE public.user SET password = $1 WHERE name = $2;",
                [password, name], function(err, result){
                   if (err){
                       console.log("Hi problem /api/users")
                       return console.log(err)
                   }
                   else
                   {
                        console.log("Heeloo")
                        const temp=true
                        const m=JSON.stringify(temp)
                        res.send(temp)
                   }
                })
            }

            }

        })
});







// получение типов еды исключая пользовательский
app.get("/api/foodtypes/", function(req, res){
    // console.log("UserInfo by name");
    let user = null;
    cursors.query("SELECT id, type FROM public.type", 
    function(err, result){
        if (err){
            console.log("Hi problem /api/foodtypes/")
            return console.log(err)
        }
        else
        {   
            res.send(result.rows)
        }
    })

});




// получение определенного типа еды исключая пользовательский
app.get("/api/foods/:id", function(req, res){
    // console.log("We try found food");
    let type_id = req.params.id;
    cursors.query("SELECT id, name, calories, opisanie FROM public.food where id_type= $1", 
    [type_id], function(err, result){
        if (err){
            console.log("Hi problem /api/foods/:id")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});

// type: type,
// foods_id: food_id, 
// user_id: user_id,
// weight: weight,
// dates: new Date()

// app.post("/api/users", jsonParser, function (req, res) {

// вставка еды
app.post("/api/insertfood", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const type = req.body.type;
    const food_id=req.body.foodsid;
    const user_id = req.body.userid;
    const weight = req.body.weight;
    const dates = req.body.dates

    // console.log("Food insert")
    // console.log(food_id)
    // console.log(user_id)
    // console.log(type, food_id, user_id, weight, dates)
    // console.log("Food insert")
    cursors.query("Insert Into public.foodportions(type, food_id, user_id, weight, dates) values ($1, $2, $3, $4, $5);", 
    [type, food_id, user_id, weight, dates], function(err, result){
        if (err){
            console.log("And we cathc error /api/insertfood")
            return console.log(err)
        }
    })
    res.send();
});

// "/api/getfoodbyid/"+userid
// вывод продуктов определенного типа общие пользователя
app.get("/api/getfoodportionsid/:id", function(req, res){
    // console.log("We try found food ");
    let id = req.params.id;
    console.log(id+" and what with id")
    cursors.query("SELECT type, food_id, weight, dates FROM public.foodportions where user_id= $1", 
    [id], function(err, result){
        if (err){
            // console.log("Hi problem /api/getfoodportionsid/:id")
            // return console.log(err)
            return console.log("Hi problem /api/getfoodportionsid/:id")
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});


// вывод всех продуктов не пользовательских
app.get("/api/getallfoods", function(req, res){
    console.log("We want all food");
    let user = null;
    cursors.query("SELECT id, calories, name FROM public.food", 
    function(err, result){
        if (err){
            console.log("Hi problem /api/getfoodportions")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)
        }
    })

});


// получение типов активности пользовательский
app.get("/api/activitytypes/", function(req, res){
    // console.log("UserInfo by name");
    let user = null;
    cursors.query("SELECT id, name, coeficent FROM public.activity", 
    function(err, result){
        if (err){
            console.log("Hi problem /api/activitytypes/")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});



// "api/insertactivity"
// activityid: actid,
// userid: user_id,
// dates: dd,
// time: weight


app.post("/api/insertactivity", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const usid = req.body.userid;
    const times=req.body.time;
    const actid = req.body.activityid;
    const dates = req.body.dates

    // console.log("Food insert")
    // console.log(food_id)
    // console.log(user_id)
    // console.log(type, food_id, user_id, weight, dates)
    // console.log("Food insert")
    cursors.query("Insert Into public.activityuser(user_id, time, activity_id, dates) values ($1, $2, $3, $4);", 
    [usid, times, actid, dates], function(err, result){
        if (err){
            console.log("And we cathc error /api/insertfood")
            return console.log(err)
        }
    })
    res.send();
});


// /api/getactivityportionsid

// вывод активностей пользователя
app.get("/api/getactivityportionsid/:id", function(req, res){
    // console.log("We try found food ");
    let id = req.params.id;
    // console.log(id+" and what with id")
    cursors.query("SELECT user_id, activity_id, dates, time FROM public.activityuser where user_id= $1", 
    [id], function(err, result){
        if (err){
            console.log("Hi problem /getactivityportionsid/:id")
            return console.log(err)
            // return console.log("Hi problem /api/getfoodportionsid/:id")
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});

// api/insertuserfood

// calories: calories,
// namess: names, 
// userid: user_id,

app.post("/api/insertuserfood", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const calories = req.body.calories;
    const names=req.body.namess;
    const user_id = req.body.userid;
    const weight = req.body.weight;
    const dates = req.body.dates

    // console.log("Food insert")
    // console.log(food_id)
    // console.log(user_id)
    // console.log(type, food_id, user_id, weight, dates)
    // console.log("Food insert")
    cursors.query("Insert Into public.userfood(calories, user_id, name) values ($1, $2, $3);", 
    [calories, user_id, names], function(err, result){
        if (err){
            console.log("And we cathc error /api/insertuserfood")
            return console.log(err)
        }
    })
    res.send();
});






    // const response = await fetch("/api/activitytypes/", {
        // const response = await fetch("/api/userfoodall/", {

app.get("/api/userfoodall/:id", function(req, res){
    // console.log("UserInfo by name");
    const user_id = req.params.id; 
    // let user = null;
    cursors.query("SELECT id, name, calories, user_id FROM public.userfood where user_id=$1", 
    [user_id], function(err, result){
        if (err){
            console.log("Hi problem /api/userfoodall/")
            return console.log(err)
        }
        else
        {   
            // console.log("And Select give me")
            // console.log(result.rows)
            // console.log("And we send it")
            res.send(result.rows)

        }
    })

});








// Podpiska code



// Load environment variables from the .env file into process.env
// require("dotenv").config()

import dotenv from 'dotenv'

dotenv.config()
import Stripe from 'stripe'



dotenv.config();
const secretKey = process.env.STRIPESECRETKEY;
const stripe2 = Stripe(publickKey);


app.use(express.json())

// Setup Stripe
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// This is the list of items we are selling
// This will most likely come from a database or JSON file
const storeItems = new Map([
  [1, { priceInCents: 50, name: "TetsPodpiska" }],
])



app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});


// Create a post request for /create-checkout-session
app.post("/create-checkout-session/:id", async (req, res) => {
    try {
        const id = req.params.id; 
      // Create a checkout session with Stripe
      const session = await stripe2.checkout.sessions.create({
        payment_method_types: ["card"],
        // For each item use the id to get it's information
        // Take that information and convert it to Stripe's format
        line_items: req.body.items.map(({ id, quantity }) => {
          const storeItem = storeItems.get(id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: quantity,
          }
        }),
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // These must be full URLs
        // In the next section we will setup CLIENT_URL
        success_url: "http://localhost:3000/api/changepopdpiska/"+id,
        // success_url:`${process.env.CLIENT_URL}`,
        cancel_url: `${process.env.CLIENT_URL}`,
      })
  
      res.json({ url: session.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }
  })


  const createCheckoutSession = async (req, res) => {
    try {
        const { id, payment_purpose } = req.body;

        let payment_cost = 0;
        if (payment_purpose == 'rent') {
            payment_cost = await selectBookingCost(id);
        } else if (payment_purpose == 'fine') {
            payment_cost = await selectFineCost(id);
        }

        const session = await stripe2.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: payment_purpose,
                        },
                        unit_amount: parseInt(payment_cost * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${server_url}/payment/success/?session_id={CHECKOUT_SESSION_ID}&purpose=${payment_purpose}&product=${id}`,
            cancel_url: `${client_url}/`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

const successPay = async (req, res) => {
    console.log("We have benn hear");
    try {
        const session = await stripe2.checkout.sessions.retrieve(
            req.query.session_id
        );

        // create rent or delete fine
        if (req.query.purpose == 'rent') {
            await payBooking(req.query.product);
        } else {
            await payFine(req.query.product);
        }

        res.redirect(`${client_url}/thanks`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// обновление подписки
app.get("/api/changepopdpiska/:id", function(req, res){
    console.log("I have been there")
    const id = req.params.id; 
    console.log("And user id="+ id)
    console.log(id)

    cursors.query("UPDATE public.user SET podpiska=1 WHERE id = $1;",
    [id], function(err, result){
       if (err){
           console.log("Hi problem /api/users")
           return console.log(err)
       }
       else
       {
        return res.redirect("http://localhost:3000/home.html")
       }
   })

});