var result = 0;
var formula="";
var formula_for_compute = "";
var inputentry = "";
var new_input;
var input_count = 0;
function gohome() {
    window.location.replace = "http://192.168.200.142:8088/mypage/";
}

function input(input) {
    var formula_temporary=formula;
    new_input = formula.charAt(formula.length - 1);
    if(input == "+" || input == "-" || input == "×" || input ==  "÷") {
        if(!(new_input == "+" || new_input == "-" || new_input == "×" || new_input == "÷") && formula != "") {
            if (input == "×") {
                formula_for_compute = formula_temporary + "*";
                formula = formula_temporary + "×";
             } else if(input == "÷") {
                 formula_for_compute = formula_temporary + "/";
                 formula = formula_temporary + "÷";
              } else {
                   formula = formula_temporary + input;
            }
        $("#formula").html(formula);
    }
    inputentry = "";
    } else if(input == ".") {
        if(inputentry.indexOf('.') == -1) {
            if(inputentry != "") {
                inputentry += input;
                formula = formula_temporary + input;
                compute_update(input, formula_temporary)
                $("#formula").html(formula);
                $("#result").html(comma(inputentry));
            } else {
                inputentry = "0.";
                formula = formula_temporary + "0" + input;
                compute_update("0" + input, formula_temporary);
                $("#formula").html(formula);
                $("#result").html(comma(inputentry));
            }
        }
    }else {
        if(inputentry.length < 16 || function() {if(inputentry.indexOf(".") != -1 && inputentry.length < 17){return true;}}()) {
            formula = formula_temporary + input;
            inputentry += input;
            compute_update(input, formula_temporary)
            $("#formula").html(formula);
            $("#result").html(comma(inputentry));
        }
    }
    new_input = ""
}

function compute() {
    if(formula_for_compute != ""){
        result = eval(formula_for_compute);
        result = Math.round((result)*1e12) / 1e12;
        if(result == Infinity) {
            $("#result").html("0으로 나눌 수 없습니다.")
        }else{
            $("#result").html(result)
        }
        $("#formula").html("");
        formula = String(result);
        formula_for_compute = formula;
        inputentry = result;
        result = 0;
    }
}

window.addEventListener('keydown', (e) => {keyinput(e.key);});
function keyinput(key) {
    $("input").blur();
    if(!(isNaN(parseInt(key)))) {
        input(key);
    } else {
        if(key == "*") {
            input("×");
        } else if(key == "/") {
            input("÷");
        }else if(key == "+" || key == "-"){
            input(key)
        } else if(key == "Enter") {
            compute();
        } else if(key == "Backspace") {
            Backspace();
        } else if(key ==".") {
            input(key)
        } else if(key == "Escape") {
            AllClear()
        } else if(key == "Delete") {
            ClearEntry()
        }
    }
}

function AllClear() {
    formula = "";
    formula_for_compute = "";
    inputentry = "";
    result = 0;
    $("#formula").html("");
    $("#result").html("0");
}

function ClearEntry() {
    if(!(result != 0)) {
        formula = formula.slice(0, formula.length-inputentry.length);
        formula_for_compute = (formula.replace(/×/g, "*")).replace(/÷/g, "/");
        inputentry = "";
        $("#formula").html(formula);
        $("#result").html("0");
    } else {
        AllClear();
    }
}

function Backspace() {
    new_input = formula.charAt(formula.length - 1);
    if(!(new_input == "+" || new_input == "-" || new_input == "×" || new_input == "÷")) {
        inputentry = inputentry.slice(0, inputentry.length - 1);
    }
    formula = formula.slice(0, formula.length - 1);
    formula_for_compute = formula_for_compute.slice(0, formula_for_compute.length - 1);
    $("#formula").html(formula);
    if(inputentry == "") {
        $("#result").html("0")
    } else {
        $("#result").html(comma(inputentry));
    }
    new_input = "";
}

function compute_update(input, formula_temporary) {
    formula_for_compute = ((formula_temporary.replace(/×/g, "*")).replace(/÷/g, "/")).replace(/,/g, "") + input;
}

function insert(str, index, value) {
    return str.slice(0, index) + value + str.slice(index);
}

function comma(inputentry) {
    var back_of_decimal_point = "";
    if(inputentry.indexOf('.') != -1) {back_of_decimal_point = inputentry.slice(inputentry.indexOf('.'))}
    var inputentry_for_show;
    if(inputentry.indexOf('.') == -1) {inputentry_for_show = inputentry;}else {inputentry_for_show = inputentry.slice(0, inputentry.indexOf('.'))}
    var comma_amount = Math.floor((inputentry_for_show.length - 1) / 3);
    for(i=1; i <= comma_amount; i++)
    {
        var insertindex = inputentry_for_show.length - (3 * i);
        inputentry_for_show = insert(inputentry_for_show, insertindex, ',');
    }
    var comma_result = inputentry_for_show + back_of_decimal_point;
    console.log(comma_result);
    console.log(inputentry_for_show);
    console.log(back_of_decimal_point);
    return comma_result;
}
