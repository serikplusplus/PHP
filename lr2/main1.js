var NextItem = 0;
var Name = document.querySelector("#name");

Name.addEventListener("input", function() {
  this.value = this.value[0].toUpperCase() + this.value.slice(1);
})



function clearForm(Form){
    Form.list.options.length = 0;
    Form.list.options[0] = 
        new Option("----Фамилия Имя Отчество-----",
"PromptText", 0, 0);
    NextItem = 0
    return;
}

function pushForm(Form){

    var str = Name.value;
    var wordCount = str.split(/\s+/).length;
    if (Name.value == ""){
        alert("Пожалуйста, заполните поле \"Имя\".");
        Form.name.focus ();
     }
     else if(str.length < 10)
     {
        alert("поле содержит меньше 10 символов");
        Form.name.focus ();
     }
     else if(wordCount < 3)
     {
        alert("поле содержит меньше 3 слов");
        Form.name.focus ();
     }
     else if(wordCount > 3)
     {
        alert("поле содержит больше 3 слов");
        Form.name.focus ();
     }
     else if (/\d/.test(Name.value)) 
     {
        alert("Поле с иминем имеет числа ");

    }
    else{
        NextItem++;
        var str = Name.value;
        Form.list.options[NextItem] = 
        new Option( capitalize(str), capitalize(str), false,  false);
        Name.value = "";
        return;
    }
}
function capitalize(str) {

    return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
   
}
function saveFormResults(Form){

    var itemList = "";
    for (var i = 1; i < Form.list.length; i++){
        itemList = itemList + Form.list.options[i].value;
        itemList = itemList + ","; 
    }
    Form.ServerNameList.value = itemList;
    return;
}
