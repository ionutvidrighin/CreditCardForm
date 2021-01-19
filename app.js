

const amount = document.querySelector('#amount');
const cardNo = document.querySelector('#card_no');
const cardHolder = document.querySelector('#card_holder');
const expDate = document.querySelector('#exp_date');
const securityCode = document.querySelector('#security_code');
const btn = document.querySelector('button');


const retrieveData = () => {
    if (amount.value == '' || amount.value.includes('e')) {
        alert('Please enter amount to pay')
        return;
    }

    if (cardNo.value == '' || !(cardNo.value.length === 16) ){
        alert('Invalid credit card number')
        return;
    }

    if (cardHolder.value == '') {
        alert('Please enter credit card holder name')
        return;
    }

    if (expDate.value == '') {
        alert('Invalid expiry date')
        return;
    }

    if (!(securityCode.value.length === 3)){
        alert('Incorrect security code')
        return;
    }

    axios.post('http://localhost:2000/data', {
        amount: amount.value,
        creditCardNo: cardNo.value,
        creditCardHolder: cardHolder.value,
        expDate: expDate.value,
        securityCode: securityCode.value
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    
}

btn.addEventListener('click', retrieveData);

async function data() {
    let data =  await fetch('http://localhost:2000/data');
    let res = await data.json()
    console.log(res)

    let content = document.querySelector('.db_content')
    for (let i = 0; i < res.length; i++) {
        console.log(res[i])

    let entry = document.createElement('span');
        entry.setAttribute('class', 'entry');
        entry.innerText = 'Entry: ' + res[i].id;

    let amountPay = document.createElement('span');
        amountPay.setAttribute('id', 'amountPay');
        amountPay.innerText = `Amount: ` + res[i].amount;

    let cardNo = document.createElement('span');
        cardNo.setAttribute('id', 'cardNumber');
        cardNo.innerText = 'Card no: ' + res[i].creditCardNo;

    let cardHold = document.createElement('span');
        cardHold.setAttribute('id', 'cardHolder');
        cardHold.innerText = 'Name on the card: ' + res[i].creditCardHolder;

    let cardExp = document.createElement('span');
        cardExp.setAttribute('id', 'expDate');
        cardExp.innerText = 'Expiry date: ' + res[i].expDate;

    let cardCode = document.createElement('span');
        cardCode.setAttribute('id', 'secCode');
        cardCode.innerText = 'Security code: ' + res[i].securityCode;

    let line = document.createElement('div');
    line.setAttribute('class', 'line');
    
    content.append(entry, amountPay, cardNo, cardHold, cardExp, cardCode, line)
    }
}
 
 data();
