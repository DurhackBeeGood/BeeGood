/**
 * Next/previous buttons
 * Code from https://github.com/ShaifArfan/30days30submits/blob/master/day-20/main.js
 * @author ShaifArfan on github
 * @license MIT
 */
/**
 * Checking the form is filled
 * Code from https://stackoverflow.com/a/57087206
 * @author Black Mamba on stack overflow
 * @license CC-BY-SA-4.0.
 */

 const steps = Array.from(document.querySelectorAll('form .step'));
 const prevBtn = document.querySelectorAll('form .prev-btn');
 const form = document.getElementById('newMemberForm');

 prevBtn.forEach(button => {
    button.addEventListener('click', () => {
        changeStep('prev');
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    let allAreFilled = true;
    document.getElementById('part1').querySelectorAll('[required]').forEach(function (i) {
        if (!allAreFilled) return;
        if (!i.value) allAreFilled = false;
    });
    if (allAreFilled) {
        changeStep('next');
    } else {
        alert('Please fill all the fields.');
    }
});

form.addEventListener('submit', (e) => {
    let index = 0;
    const active = document.querySelector('.activeStep');
    index = steps.indexOf(active);
    steps[index].classList.remove('activeStep');
    steps[0].classList.add('activeStep');
    return false;
});

function changeStep (btn) {
    let index = 0;
    const active = document.querySelector('.activeStep');
    index = steps.indexOf(active);
    steps[index].classList.remove('activeStep');
    if (btn === 'next') {
        index++;
    } else if (btn === 'prev') {
        index--;
    }
    steps[index].classList.add('activeStep');
}