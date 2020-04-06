$("#tel").mask("+380(99)99-99-99-9");
$("#ktel").mask("99-99-99-99");

document.querySelector("#secondname").addEventListener("input", function () {
    this.value = this.value[0].toUpperCase() + this.value.slice(1);
})

document.querySelector("#fname").addEventListener("input", function () {
    this.value = this.value[0].toUpperCase() + this.value.slice(1);
})

document.querySelector("#lastname").addEventListener("input", function () {
    this.value = this.value[0].toUpperCase() + this.value.slice(1);
})
document.querySelector("[name=lab]").addEventListener("input", function () {
    this.value = this.value[0].toUpperCase() + this.value.slice(1);
})

document.querySelector("[name=gor]").addEventListener("input", function () {
    this.value = this.value[0].toUpperCase() + this.value.slice(1);
})
document.querySelector("[name=email]").addEventListener("input", function () {
    this.value = this.value.toLowerCase();
})


function Prov(Form) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    /////////////////////////////
    if (Form.secondname.value == "") {
        alert("Пожалуйста, заполните поле \"Фамилия\".");
        Form.secondname.focus();
        return false;
    }
    else if(Form.secondname.value.length < 2) {
        alert("Пожалуйста, заполните поле \"Фамилия\".");
        Form.secondname.focus();
        return false;
    } 
    else if (/\d/.test(Form.secondname.value)) {
        alert("Поле с фамилией имеет числа ");
        Form.secondname.focus();
        return false;
    } 
    ////////////////////////////////
     else  if (Form.fname.value == "") {
        alert("Пожалуйста, заполните поле \"Имя\".");
        Form.fname.focus();
        return false;
    } 
    else if (Form.fname.value.length < 2) {
        alert("Пожалуйста, заполните поле \"Имя\".");
        Form.fname.focus();
        return false;
    }
    else if (/\d/.test(Form.fname.value)) {
        alert("Поле с иминем имеет числа ");
        Form.fname.focus();
        return false;
    }
    /////////////////////////////////
    else if (Form.lastname.value == "") {
        alert("Пожалуйста, заполните поле \"Отчество\".");
        Form.lastname.focus();
        return false;
        
    } 
    else if (Form.lastname.value.length<5) {
        alert("Пожалуйста, заполните поле \"Отчество\".");
        Form.lastname.focus();
        return false;
    }else if (/\d/.test(Form.lastname.value)) {
        alert("Поле с отчеством имеет числа ");
        Form.lastname.focus();
        return false;
    } 
    /////////////////////////////////////
    else if (Form.ktel.value == "") {
        alert("Пожалуйста, заполните поле \"Контактный телефон\".");
        Form.ktel.focus();
        return false;
    } 
    ////////////////////////////////
    else if (Form.mtel.value == "") {
        alert("Пожалуйста, заполните поле \"Мобильный телефон\".");
        Form.mtel.focus();
        return false;
    } 
    ///////////////////////////////////////////S
    else if (Form.email.value == "") {
        alert("Пожалуйста, заполните поле \"Адрес электронной почты\".");
        Form.email.focus();
        return false;
    } else if (reg.test(document.querySelector("[name=email]").value) == false) {
        alert('Введите не корректный e-mail');
        return false;
    } 
    /////////////////////////////////////////
    else if (Form.lab.value == "") {
        alert("Пожалуйста, заполните поле \"Название учебного заведения\".");
        Form.lab.focus();
        return false;
    } 
    else if (Form.lab.value.length<5) {
        alert("Пожалуйста, заполните поле \"Название учебного заведения\".");
        Form.lab.focus();
        return false;
    } 
    ///////////////////////////////////////////////////
    else if (Form.gor.value == "") {
        alert("Пожалуйста, заполните поле \"Город\".");
        Form.gor.focus();
        return false;
    }
    else if (Form.gor.value.length<2) {
        alert("Пожалуйста, заполните поле \"Город\".");
        Form.gor.focus();
        return false;
    } 
    else if (/\d/.test(Form.gor.value)) {
        alert("Поле с городом имеет числа ");
        Form.gor.focus();
        return false;
    } else return;
}
