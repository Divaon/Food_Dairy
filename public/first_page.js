var login_page=document.querySelector("#login");
var register_page=document.querySelector("#register");


login_page.addEventListener("click", ()=>{
    document.location.replace("login.html");
        console.log("Cath");
  });

register_page.addEventListener("click", ()=>{
    document.location.replace("register.html");
        console.log("Cath");
});