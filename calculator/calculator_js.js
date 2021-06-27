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
                $("#result").html(inputentry);
            }
        }
    }else {
        formula = formula_temporary + input;
        inputentry += input;
        compute_update(input, formula_temporary)
        $("#formula").html(formula);
        $("#result").html(inputentry);
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
        $("#result").html(inputentry);
    }
    new_input = "";
}

function compute_update(input, formula_temporary) {
    formula_for_compute = ((formula_temporary.replace(/×/g, "*")).replace(/÷/g, "/")).replace(/,/g, "") + input;
}
