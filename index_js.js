// JavaScript source code
window.onload = function(){
    //function structure
    function num_input(num) {
        var length = on_display.textContent.length;
        if (is_final_result == true) {
            on_display.textContent = null;
            input.textContent = 0;
            is_final_result = false;
        }
        if (on_display.textContent[length - 1] == ")"){         //error e.g.: (1+2)3
            delete_right_bracket(true);
            input.textContent = null;
        }
        if (input.textContent == "0"){                               //error e.g.: 00 or 02
            if (num == 0){
                if (on_display.textContent[length - 1] != "0") {
                    on_display.textContent += num;
                }
            } else {
                input.textContent = num;
                if (on_display.textContent[length - 1] == "0")
                    on_display.textContent = on_display.textContent.substring(0, length - 1);
                on_display.textContent += num;
            }
        } else {
            on_display.textContent += num;
            input.textContent += num;
        }
        is_input = true;
        extra_feature(false);
    }
    
    function dot_input() {
        var length = on_display.textContent.length;
        if (input.textContent == "0" || input.textContent.length == 0 || is_final_result == true){    //if the first number is 0
            input.textContent = "0.";
            if (is_final_result == true){
                is_final_result = false;
                on_display.textContent = null;
            }
            if (on_display.textContent[length - 1] == "0") on_display.textContent += ".";
            else on_display.textContent += "0.";
        } else if (find_dot() == false){                       //if there is a decimal
            input.textContent += ".";
            on_display.textContent += ".";
        }
        is_input = true;
        extra_feature(false);
    }

    function bracket_input(brac){
        var length = on_display.textContent.length;
        if (brac == "(") {
            if ((on_display.textContent[length - 1] >= 0 && on_display.textContent[length - 1] <= 9)
                || on_display.textContent[length - 1] == ")" || on_display.textContent[length - 1] == ".") {                                //error e.g.: 12(3) or (12)(3)
            } else {
                on_display.textContent += brac;
                brackets_relative++;
            }
        } else if (brac == ")") {
            if (on_display.textContent[length - 1] >= 0 && on_display.textContent[length - 1] <= 9 && brackets_relative > 0) {                         //check if the number of '(' is the same as ')' 
                brackets_relative--;
                on_display.textContent += brac;
            }
        }
        extra_feature(false);
    }
    
    function symbol_input(sym){
        var length = on_display.textContent.length;
        var last_char = on_display.textContent[length - 1];
        var negative_check = on_display.textContent[length - 2];
        if (is_final_result == true) {
            on_display.textContent = "(" + on_display.textContent + ")";
            input.textContent = 0;
            is_final_result = false;
            is_input = false;
        }
        if (last_char == "." || length == 0 || (last_char == "-" && negative_check == "(")) {
        } else if (last_char == "(") {
            if (sym == "-") {
                on_display.textContent += sym;
                is_input = true;
            }
        } else if ((last_char == "+" || last_char == "-" || last_char == "*" || last_char == "/") && is_input == false){
            on_display.textContent = on_display.textContent.substring(0, length - 1);
            on_display.textContent += sym;
        } else {
            on_display.textContent += sym;
            is_input = false;
        }
        input.textContent = 0;
        extra_feature(false);
    }

    function backspace_input () {
        var input_length = input.textContent.length;
        var on_display_length = on_display.textContent.length;
        var last_char = on_display.textContent[on_display_length - 1];
        if (input.textContent == "Infinity") {
            input.textContent = 0;
        } else if (input.textContent != "0") {
            if (input_length == 1) input.textContent = 0;
            else input.textContent = input.textContent.substring(0, input_length - 1);
        }
        if (last_char == "(") brackets_relative--;
        else if (last_char == ")") brackets_relative++;
        on_display.textContent = on_display.textContent.substring(0, on_display_length - 1);
        last_char = on_display.textContent[on_display_length - 2];
        if (last_char >= 0 && last_char <= 9) {
            input.textContent = find_num_from_last();
        }
        is_final_result = false;
        extra_feature(false);
    }

    function clear_input() {
        is_final_result = false;
        is_input = false;
        brackets_relative = 0;
        on_display.textContent = null;
        input.textContent = 0;
        extra_feature(false);
    }

    function result_input() {
        var length = on_display.textContent.length;
        var last_char = on_display.textContent[length - 1];
        if (last_char == ".") {
            on_display.textContent = on_display.textContent.substring(0, length - 1);
        }
        var res = final_result(on_display.textContent);
        input.textContent = res;                           // display the precise of result
        if (input.textContent.length > input_max_length) 
            input.textContent = res.toPrecision(12);
        else input.textContent = res;
        is_final_result = true;
        extra_feature(true);
    }

    var final_result = function (string){
        try {
            return eval(string);
        } catch (undefined) {
            alert("Invalid Input!!!!!");
        }
    }

    var find_dot = function(){
        for (var i = 0; i < input.textContent.length; i++){
            if (input.textContent[i] == ".") return true;
        }
        return false;
    }

    function find_num_from_last() {
        var length = on_display.textContent.length;
        for (var i = length - 1; i >= 0; i--) {
            if (!((on_display.textContent[i] >= 0 && on_display.textContent[i] <= 9) || on_display.textContent[i] == "."))
                break;
        }
        return on_display.textContent.substring(i+1, length);
    }

    function word_refresh() {                               //Font adaptive
        if (input.textContent.length <= 9) {
            input.style.fontSize = "60px";
        }
        else {
            var size = 10 / input.textContent.length;
            input.style.fontSize = (60 * size.toFixed(2)) + "px";
        }
    }

    function check_input_length() {
        var on_length = on_display.textContent.length;
        var length = input.textContent.length;
        if (length > input_max_length) {
            input.textContent = input.textContent.substring(0, input_max_length);
            on_display.textContent = on_display.textContent.substring(0, on_length-1);
        }
    }

    function check_on_display_length() {
        var length = on_display.textContent.length;
        var input_length = input.textContent.length;
        if (length > on_max_length) {
            on_display.textContent = on_display.textContent.substring(0, on_max_length);
            input.textContent = input.textContent.substring(0, input_length-1);
        }
    }

    function extra_feature(result) {
        if (result == true) {
            input.style.float = "left";
        } else {
            input.style.float = "right";
        }
        check_input_length();
        check_on_display_length();
        word_refresh();
    }

    //get element by HTML
    var input = document.getElementById("input_display");
    var on_display = document.getElementById("on_display");
    var display = document.getElementById("display");
    var number = document.getElementsByClassName("display_able");
    var dot = document.getElementById("dot");
    var bracket = document.getElementsByClassName("brackets");
    var symbol = document.getElementsByClassName("symbol");
    var result = document.getElementById("result");
    var backspace = document.getElementById("backspace");
    var clear = document.getElementById("clear");

    //define
    var is_final_result = false;        // check if the "=" button is pressed
    var is_input = false;               // check if the symbol buttons have been pressed once
    var brackets_relative = 0;          // the difference between left and right brackets
    var input_max_length = 18;
    var on_max_length = 90;
    
    // button onclick
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener("click", function () { num_input(this.innerHTML); }, false);
    }
    for (var i = 0; i < bracket.length; i++) {
        bracket[i].addEventListener("click", function () { bracket_input(this.innerHTML); }, false);
    }
    for (var i = 0; i < symbol.length; i++) {
        symbol[i].addEventListener("click", function () { symbol_input(this.innerHTML); }, false);
    }
    dot.addEventListener("click", function () { dot_input(); }, false);
    clear.addEventListener("click", function () { clear_input(); }, false);
    backspace.addEventListener("click", function () { backspace_input(); }, false);
    result.addEventListener("click", function () { result_input(); }, false);

}