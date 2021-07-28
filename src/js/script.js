//import library for masking inputs
import IMask from "imask";

const billInput = document.querySelector('#bill');
const tipSelect = document.querySelectorAll('.form-check-input[type=radio]');
const tipSelectCustom = document.querySelector('.form-check-input[type=text], .form-check-input[type=number]');
const numOfPeople = document.querySelector('#peopleCount');
const tipAmount = document.querySelector('#tipAmount');
const totalAmount = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');



billInput.addEventListener('input', bill);
tipSelect.forEach(el => {
    el.addEventListener('input', tipValue)
});
tipSelectCustom.addEventListener('input', customTipValue);
numOfPeople.addEventListener('input', peopleValue);
resetBtn.addEventListener('click', reset);

let billValue;
let numOfPeopleValue;
let tipSelectValue;
let tipSelectCustomValue;

//handle bill value
function bill() {
    
    let numberMask = IMask(billInput, {
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
    
    calculate();

    resetBtn.addEventListener('click', function() {
        numberMask.updateValue();
    });

}
//handle tip value
function tipValue() {
    tipSelect.forEach(el => {
        if (el.checked) {
            tipSelectValue = el.value;
            tipSelectCustom.value = '';   
        }
    });
    calculate();
}
//handle custom tip value
function customTipValue() {

    let numberMask = IMask(tipSelectCustom, {
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

    if (tipSelectCustom.value >= 0) {
       
        tipSelect.forEach(el => {
            el.checked = false;
        });
    }

    tipSelectValue = (tipSelectCustom.value/100);

    resetBtn.addEventListener('click', function() {
        numberMask.updateValue();
    });

    tipSelect.forEach(el => {
        el.addEventListener('input', function() {
            numberMask.updateValue();
        });
    });

    if (tipSelectValue > 0 ) {
        calculate();
    }
}
//handle people value
function peopleValue() {

    let digitsMask = IMask(numOfPeople, {
        mask: /^\d+$/
      });

    if (numOfPeople.value <= 0) {
        document.querySelector('#peopleCount').classList.add('error');
        document.querySelector('.people-count span').style.display = 'block';
    } else {
        document.querySelector('#peopleCount').classList.remove('error');
        document.querySelector('.people-count span').style.display = 'none';
    }

    numOfPeopleValue = numOfPeople.value;

    calculate();

    resetBtn.addEventListener('click', function() {
        digitsMask.updateValue();
    });
}
//handle reset
function reset() {
    billInput.value = '';
    tipSelect.forEach(el => {
        el.checked = false;
    });
    tipSelectCustom.value = '';
    numOfPeople.value = '';
    resetBtn.classList.remove('active');
    tipAmount.innerHTML = '$0.00';
    totalAmount.innerHTML = '$0.00';
}
//calculate tip
function calculate() {
    if (billValue || tipSelectValue || numOfPeopleValue !== '') {
        resetBtn.classList.add('active');
    }

    if ( billValue && tipSelectValue && numOfPeopleValue > 0 ) {
        let tip = ((billValue * tipSelectValue) / numOfPeopleValue).toFixed(2);
        let total = ( (parseFloat(billValue) + parseFloat(tip) ) / numOfPeopleValue).toFixed(2);
        tipAmount.innerHTML = `$${tip}`;
        totalAmount.innerHTML = `$${total}`;
    }
}