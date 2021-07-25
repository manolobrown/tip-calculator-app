//import library for masking inputs
import IMask from "imask";

const billInput = document.querySelector('#bill');
const tipSelect = document.querySelectorAll('.form-check-input');
const tipSelectCustom = document.querySelector('.form-check-input[input]');
const numOfPeople = document.querySelector('#peopleCount');
//const tipAmount = document.querySelector('#tipAmount');
//const total = document.querySelector('#total');
//const reset = document.querySelector('#reset');



billInput.addEventListener('input', bill);
tipSelect.forEach(el => {
    el.addEventListener('input', calculate)
});

let billValue;
let numOfPeopleValue;
let tipSelectValue;

//bill.value = billValue;
//numOfPeople.value = numOfPeopleValue;
function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

//handle bill value
function bill() {
    
    var numberMask = IMask(billInput, {
        mask: Number,  // enable number mask
      
        // other options are optional with defaults below
        scale: 2,  // digits after point, 0 for integers
        signed: false,  // disallow negative
        thousandsSeparator: '',  // any single char
        padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
        normalizeZeros: false,  // appends or removes zeros at ends
        radix: '.',  // fractional delimiter
        mapToRadix: ['.'],  // symbols to process as radix
      
        // additional number interval options (e.g.)
        min: -1000,
        max: 10000

      });


      billValue = billInput.value;
    

    console.log(billValue);

}
//handle tip value
//handle custom tip value
//handle people value
//handle reset
//calculate tip
function calculate() {
    //tipAmount = ((billValue.value * tipSelect.value) / numOfPeople.value).toFixed(2);
    //console.log(tipSelect.value);
    //console.log(billValue.value);
    
    tipSelect.forEach(el => {
        if (el.checked) {
            tipSelectValue = el.value;
        }
    });
    console.log(tipSelectValue);
}