//=========================
// Login & Signup Form
//=========================

const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(iconc =>{
                        iconc.classList.replace("fa-eye-slash", "fa-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(iconc =>{
                        iconc.classList.replace("fa-eye", "fa-eye-slash");
                    })
                }
            }) 
        })
    });

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });




//====================
// Arrow & Nav
//====================

// arrwo go to top
let arrwo = document.querySelector(".arrwo");

document.addEventListener("scroll", function (eo) {
    if (scrollY >= 600) {
        arrwo.classList.add("reset-arrwo");
    } else {
        arrwo.classList.remove("reset-arrwo");
    }
});
arrwo.addEventListener("click", function (eo) {
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
});

let exul = document.querySelector(".ex-ul");
let ulphone = document.querySelector(".ul-phone");
let spanheader = document.querySelector(".span-header");

exul.addEventListener("click", function (eo) {
    ulphone.classList.remove("ulphone-X");
});
spanheader.addEventListener("click", function (eo) {
    ulphone.classList.add("ulphone-X");
});

// move overlay
let overlay = document.querySelector(".overlay");
let exo = document.querySelector(".exo");

exo.addEventListener("click", function (eo) {
    overlay.classList.remove("tranlatex");
    // console.log("sssss")
});



