//====================
// Charge Active
//====================

// زر اظهار الفورم
let charge = document.getElementById('mdn-submit');

// الفورم
let visa = document.getElementById('visa');
let v_cash = document.getElementById('v-cash');
let total_v = document.getElementById('total-v');
let total_c = document.getElementById('total-c');
let cancel_v = document.getElementById('can-1');
let cancel_c = document.getElementById('can-2');

// غير مفعل
let disable_1 = document.getElementById('priceLabel_751');
let disable_2 = document.getElementById('priceLabel_337');
let disable_3 = document.getElementById('priceLabel_750');

// كمية الشحن
let charge_1 = document.getElementById('denomination_5137');
let charge_2 = document.getElementById('denomination_5138');
let charge_3 = document.getElementById('denomination_5139');
let charge_4 = document.getElementById('denomination_5140');
let charge_5 = document.getElementById('denomination_5141');
let charge_6 = document.getElementById('denomination_5142');

// سعر الشحن بعد الخصم
let price_1 = document.getElementById('priceInfo_338');
let price_2 = document.getElementById('priceInfo_341');
let price_3 = document.getElementById('priceInfo_344');
let price_4 = document.getElementById('priceInfo_347');
let price_5 = document.getElementById('priceInfo_350');

// الخصم علي الشحن
let dis_1 = document.getElementById('priceInfo_339');
let dis_2 = document.getElementById('priceInfo_342');
let dis_3 = document.getElementById('priceInfo_345');
let dis_4 = document.getElementById('priceInfo_348');
let dis_5 = document.getElementById('priceInfo_351');

// سعر الشحن الاصلي
let orignal_1 = document.getElementById('priceInfo_340');
let orignal_2 = document.getElementById('priceInfo_343');
let orignal_3 = document.getElementById('priceInfo_346');
let orignal_4 = document.getElementById('priceInfo_349');
let orignal_5 = document.getElementById('priceInfo_352');

// طريقة دفع المال
let pay_1 = document.getElementById('paymentChannel_338');
let pay_2 = document.getElementById('paymentChannel_339');
let pay_3 = document.getElementById('paymentChannel_340');
let pay_4 = document.getElementById('paymentChannel_341');
let pay_5 = document.getElementById('paymentChannel_342');

// ظهور النص
let txt_1 = document.getElementById('payment-channel__tagline_412');
let txt_2 = document.getElementById('payment-channel__tagline_413');
let txt_3 = document.getElementById('payment-channel__tagline_414');
let txt_4 = document.getElementById('payment-channel__tagline_415');
let txt_5 = document.getElementById('payment-channel__tagline_416');


//Pay with Vodafone Cash
//Pay with Masary, Aman, Momken
//Pay with Fawry. NOTE: Extra 2.00 EGP fee will be added by Fawry
//Pay with Meeza Card
//Pay with a credit or debit card

disable_1.innerHTML = "غير متاح حاليا"
disable_2.innerHTML = "غير متاح حاليا"
disable_3.innerHTML = "غير متاح حاليا"


if (price_1.value == null && price_5.value == null && dis_1.value == null && dis_5.value == null && orignal_1.value == null && orignal_5.value == null) {
    charge_1.classList.add('active');
    price_1.innerHTML = "14.99 EGP";
    price_5.innerHTML = "14.99 EGP";
    dis_1.innerHTML = "-17%";
    dis_5.innerHTML = "-17%";
    orignal_1.innerHTML = "17.99 EGP";
    orignal_5.innerHTML = "17.99 EGP";
    pay_1.classList.add('active');
    txt_1.innerHTML = "Pay with Vodafone Cash";
} else {
    charge_1.classList.remove('active');
    charge_2.classList.remove('active');
    charge_3.classList.remove('active');
    charge_4.classList.remove('active');
    charge_5.classList.remove('active');
    charge_6.classList.remove('active');
}

pay_1.addEventListener("click", function (eo) {
    if (pay_1.classList.contains('active')) {
        pay_2.classList.remove('active');
        pay_3.classList.remove('active');
        pay_4.classList.remove('active');
        pay_5.classList.remove('active');
    } else {
        pay_1.classList.add('active');
        pay_2.classList.remove('active');
        pay_3.classList.remove('active');
        pay_4.classList.remove('active');
        pay_5.classList.remove('active');
    }

    txt_1.innerHTML = "Pay with Vodafone Cash";
    txt_2.innerHTML = "";
    txt_3.innerHTML = "";
    txt_4.innerHTML = "";
    txt_5.innerHTML = "";

});

//pay_2.addEventListener("click", function (eo) {
//    if(pay_2.classList.contains('active')){
//        pay_1.classList.remove('active');
//        pay_3.classList.remove('active');
//        pay_4.classList.remove('active');
//        pay_5.classList.remove('active');
//    }else{
//        pay_2.classList.add('active');
//        pay_1.classList.remove('active');
//        pay_3.classList.remove('active');
//        pay_4.classList.remove('active');
//        pay_5.classList.remove('active');
//    }
//    
//    txt_2.innerHTML = "Pay with Masary, Aman, Momken";
//    txt_1.innerHTML = "";
//    txt_3.innerHTML = "";
//    txt_4.innerHTML = "";
//    txt_5.innerHTML = "";
//});
//
//pay_3.addEventListener("click", function (eo) {
//    if(pay_3.classList.contains('active')){
//        pay_1.classList.remove('active');
//        pay_2.classList.remove('active');
//        pay_4.classList.remove('active');
//        pay_5.classList.remove('active');
//    }else{
//        pay_3.classList.add('active');
//        pay_1.classList.remove('active');
//        pay_2.classList.remove('active');
//        pay_4.classList.remove('active');
//        pay_5.classList.remove('active');
//    }
//    
//    txt_3.innerHTML = "Pay with Fawry. NOTE: Extra 2.00 EGP fee will be added by Fawry";
//    txt_1.innerHTML = "";
//    txt_2.innerHTML = "";
//    txt_4.innerHTML = "";
//    txt_5.innerHTML = "";
//});
//
//pay_4.addEventListener("click", function (eo) {
//    if(pay_4.classList.contains('active')){
//        pay_1.classList.remove('active');
//        pay_2.classList.remove('active');
//        pay_3.classList.remove('active');
//        pay_5.classList.remove('active');
//    }else{
//        pay_4.classList.add('active');
//        pay_1.classList.remove('active');
//        pay_2.classList.remove('active');
//        pay_3.classList.remove('active');
//        pay_5.classList.remove('active');
//    }
//    
//    txt_4.innerHTML = "Pay with Meeza Card";
//    txt_1.innerHTML = "";
//    txt_2.innerHTML = "";
//    txt_3.innerHTML = "";
//    txt_5.innerHTML = "";
//});

pay_5.addEventListener("click", function (eo) {
    if (pay_5.classList.contains('active')) {
        pay_1.classList.remove('active');
        pay_2.classList.remove('active');
        pay_3.classList.remove('active');
        pay_4.classList.remove('active');
    } else {
        pay_5.classList.add('active');
        pay_1.classList.remove('active');
        pay_2.classList.remove('active');
        pay_3.classList.remove('active');
        pay_4.classList.remove('active');
    }

    txt_5.innerHTML = "Pay with a credit or debit card";
    txt_1.innerHTML = "";
    txt_2.innerHTML = "";
    txt_3.innerHTML = "";
    txt_4.innerHTML = "";
});

charge_1.addEventListener("click", function (eo) {
    if (charge_1.classList.contains('active')) {
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');
    } else {
        charge_1.classList.add('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');
    }

    price_1.innerHTML = "14.99 EGP";
    //price_2.innerHTML = "14.99 EGP";
    //price_3.innerHTML = "14.99 EGP";
    //price_4.innerHTML = "14.99 EGP";
    price_5.innerHTML = "14.99 EGP";
    dis_1.innerHTML = "-17%";
    //    dis_2.innerHTML = "-17%";
    //    dis_3.innerHTML = "-17%";
    //    dis_4.innerHTML = "-17%";
    dis_5.innerHTML = "-17%";
    orignal_1.innerHTML = "17.99 EGP";
    //    orignal_2.innerHTML = "17.99 EGP";
    //    orignal_3.innerHTML = "17.99 EGP";
    //    orignal_4.innerHTML = "17.99 EGP";
    orignal_5.innerHTML = "17.99 EGP";
});

charge_2.addEventListener("click", function (eo) {
    if (charge_2.classList.contains('active')) {
        charge_1.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');

    } else {
        charge_2.classList.add('active');
        charge_1.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');
    }

    price_1.innerHTML = "76.49 EGP";
    //price_2.innerHTML = "76.49 EGP";
    //price_3.innerHTML = "76.49 EGP";
    //price_4.innerHTML = "76.49 EGP";
    price_5.innerHTML = "76.49 EGP";
    dis_1.innerHTML = "-12%";
    //    dis_2.innerHTML = "-12%";
    //    dis_3.innerHTML = "-12%";
    //    dis_4.innerHTML = "-12%";
    dis_5.innerHTML = "-12%";
    orignal_1.innerHTML = "86.99 EGP";
    //    orignal_2.innerHTML = "86.99 EGP";
    //    orignal_3.innerHTML = "86.99 EGP";
    //    orignal_4.innerHTML = "86.99 EGP";
    orignal_5.innerHTML = "86.99 EGP";
});

charge_3.addEventListener("click", function (eo) {
    if (charge_3.classList.contains('active')) {
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');

    } else {
        charge_3.classList.add('active');
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');
    }

    price_1.innerHTML = "149.99 EGP";
    //price_2.innerHTML = "149.99 EGP";
    //price_3.innerHTML = "149.99 EGP";
    //price_4.innerHTML = "149.99 EGP";
    price_5.innerHTML = "149.99 EGP";
    dis_1.innerHTML = "-17%";
    //    dis_2.innerHTML = "-17%";
    //    dis_3.innerHTML = "-17%";
    //    dis_4.innerHTML = "-17%";
    dis_5.innerHTML = "-17%";
    orignal_1.innerHTML = "179.99 EGP";
    //    orignal_2.innerHTML = "179.99 EGP";
    //    orignal_3.innerHTML = "179.99 EGP";
    //    orignal_4.innerHTML = "179.99 EGP";
    orignal_5.innerHTML = "179.99 EGP";
});

charge_4.addEventListener("click", function (eo) {
    if (charge_4.classList.contains('active')) {
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');

    } else {
        charge_4.classList.add('active');
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_5.classList.remove('active');
        charge_6.classList.remove('active');
    }

    price_1.innerHTML = "369.99 EGP";
    //price_2.innerHTML = "369.99 EGP";
    //price_3.innerHTML = "369.99 EGP";
    //price_4.innerHTML = "369.99 EGP";
    price_5.innerHTML = "369.99 EGP";
    dis_1.innerHTML = "-18%";
    //    dis_2.innerHTML = "-18%";
    //    dis_3.innerHTML = "-18%";
    //    dis_4.innerHTML = "-18%";
    dis_5.innerHTML = "-18%";
    orignal_1.innerHTML = "449.99 EGP";
    //    orignal_2.innerHTML = "449.99 EGP";
    //    orignal_3.innerHTML = "449.99 EGP";
    //    orignal_4.innerHTML = "449.99 EGP";
    orignal_5.innerHTML = "449.99 EGP";
});

charge_5.addEventListener("click", function (eo) {
    if (charge_5.classList.contains('active')) {
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_6.classList.remove('active');

    } else {
        charge_5.classList.add('active');
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_6.classList.remove('active');
    }

    price_1.innerHTML = "711.99 EGP";
    //price_2.innerHTML = "711.99 EGP";
    //price_3.innerHTML = "711.99 EGP";
    //price_4.innerHTML = "711.99 EGP";
    price_5.innerHTML = "711.99 EGP";
    dis_1.innerHTML = "-21%";
    //    dis_2.innerHTML = "-21%";
    //    dis_3.innerHTML = "-21%";
    //    dis_4.innerHTML = "-21%";
    dis_5.innerHTML = "-21%";
    orignal_1.innerHTML = "899.99 EGP";
    //    orignal_2.innerHTML = "899.99 EGP";
    //    orignal_3.innerHTML = "899.99 EGP";
    //    orignal_4.innerHTML = "899.99 EGP";
    orignal_5.innerHTML = "899.99 EGP";
});

charge_6.addEventListener("click", function (eo) {
    if (charge_6.classList.contains('active')) {
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');

    } else {
        charge_6.classList.add('active');
        charge_1.classList.remove('active');
        charge_2.classList.remove('active');
        charge_3.classList.remove('active');
        charge_4.classList.remove('active');
        charge_5.classList.remove('active');
    }

    price_1.innerHTML = "1,399.99 EGP";
    //price_2.innerHTML = "1,399.99 EGP";
    //price_3.innerHTML = "1,399.99 EGP";
    //price_4.innerHTML = "1,399.99 EGP";
    price_5.innerHTML = "1,399.99 EGP";
    dis_1.innerHTML = "-20%";
    //    dis_2.innerHTML = "-20%";
    //    dis_3.innerHTML = "-20%";
    //    dis_4.innerHTML = "-20%";
    dis_5.innerHTML = "-20%";
    orignal_1.innerHTML = "1,749.99 EGP";
    //    orignal_2.innerHTML = "1,749.99 EGP";
    //    orignal_3.innerHTML = "1,749.99 EGP";
    //    orignal_4.innerHTML = "1,749.99 EGP";
    orignal_5.innerHTML = "1,749.99 EGP";
});

charge.addEventListener("click", function (eo) {
    if (pay_5.classList.contains('active') && charge_1.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "14.99 EGP";
    } else if (pay_5.classList.contains('active') && charge_2.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "76.49 EGP";
    } else if (pay_5.classList.contains('active') && charge_3.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "149.99 EGP";
    } else if (pay_5.classList.contains('active') && charge_4.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "369.99 EGP";
    } else if (pay_5.classList.contains('active') && charge_5.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "711.99 EGP";
    } else if (pay_5.classList.contains('active') && charge_6.classList.contains('active')) {
        visa.style.display = "inherit";
        total_v.innerHTML = "1,399.99 EGP";
    } else if (pay_1.classList.contains('active') && charge_1.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "14.99 EGP";
    } else if (pay_1.classList.contains('active') && charge_2.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "76.49 EGP";
    } else if (pay_1.classList.contains('active') && charge_3.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "149.99 EGP";
    } else if (pay_1.classList.contains('active') && charge_4.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "369.99 EGP";
    } else if (pay_1.classList.contains('active') && charge_5.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "711.99 EGP";
    } else if (pay_1.classList.contains('active') && charge_6.classList.contains('active')) {
        v_cash.style.display = "inherit";
        total_c.innerHTML = "1,399.99 EGP";
    }
});

cancel_v.addEventListener("click", function (eo) {
    visa.style.display = "none";
});

cancel_c.addEventListener("click", function (eo) {
    v_cash.style.display = "none";
});


//====================
// Check ID
//====================

let check_btn = document.getElementById('code-btn');
let check_inp = document.getElementById('code-inp');
let check_pra = document.getElementById('code-pra');
let prog = document.querySelector('.progress');
let count = document.querySelector('.count');
let cor = document.querySelector('.now');
let con = document.querySelector('.con');
let maxlength = check_inp.getAttribute("maxlength");

function isnumber(evt) {
    var ch = String.fromCharCode(evt.which);

    if (!/[0-9]/.test(ch)) {
        evt.preventDefault();
    }
};


//check_btn.isNumber(onkeypress);



check_btn.addEventListener("click", function (eo) {
    if (check_inp.value == null || check_inp.value == undefined || check_inp.value.trim() == "") {
        alert("Please Write ID");
        check_pra.innerHTML = "Please Write Correct ID";
        check_pra.style.top = "90%";
        check_pra.style.display = "inherit";
        con.style.height = "110px";
    } else if (check_inp.value.length < 10) {
        check_pra.innerHTML = "Incorrect ID";
        check_pra.style.display = "inherit";
        check_pra.style.top = "90%";
        con.style.height = "110px";
    }


    if (check_inp.value.length == 10) {
        check_pra.innerHTML = "Correct ID";
        check_pra.style.color = "#1aac90";
        check_pra.style.display = "inherit";
        check_btn.style.display = "none";
        check_inp.style.display = "none";
        prog.style.display = "none";
        count.style.display = "none";
        cor.style.width = "130px";
        con.style.width = "130px";
        con.style.height = "80px";
        cor.style.height = "50px";
        check_pra.style.top = "0";
    }
});

count.innerHTML = maxlength;

check_inp.oninput = function () {
    count.innerHTML = maxlength - this.value.length;
    count.innerHTML == 0 ? count.style.color = "red" : count.style.color = "#2f6165";

    // Set The Progress
    prog.style.width = ((this.value.length * 100) / 23.1) + "%";
};


//====================
// About Msg
//====================

let msg_show = document.querySelector(".msg-show");
let msg = document.querySelector(".msg");
let ok = document.querySelector(".ok-but");

msg_show.addEventListener("click", function (eo) {
    msg.style.display = "inherit";
    ulphone.classList.remove("ulphone-X");
});

ok.addEventListener("click", function (eo) {
    msg.style.display = "none";
});



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
