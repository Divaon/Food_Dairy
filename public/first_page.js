var login_page=document.querySelector("#login");
var register_page=document.querySelector("#register");
var changepassword=document.querySelector("#changepassword_page");


login_page.addEventListener("click", ()=>{
    document.location.replace("login.html");
        console.log("Cath");
  });

register_page.addEventListener("click", ()=>{
    document.location.replace("register.html");
        console.log("Cath");
});


changepassword.addEventListener("click", ()=>{
    document.location.replace("changepassword.html");
        console.log("Cath");
});


