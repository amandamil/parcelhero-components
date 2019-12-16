let country = "United States";

const paymentAddCard = document.querySelector("#payment-add-card");
const cardForm = document.querySelector("#card-form");
const changePaymentBilling = document.querySelector("#change-payment-billing");
const paymentBilling = document.querySelector("#payment-billing");
const paymentBillingForm = document.querySelector("#payment-billing-form");
const paymentEditCountry = document.querySelector("#payment-edit-country");
const billignCountry = document.querySelector("#billign-country");
const changeBillingCountry = document.querySelector("#change-billing-country");
const continueChangeCountry = document.querySelector("#continue-change-country");

$(document).ready(function () {
  events();

  billignCountry.innerHTML = country;
});

function events() {
  paymentAddCard.addEventListener("click", function(){
    paymentAddCard.classList.add("d-none");
    cardForm.classList.remove("d-none");
  });

  changePaymentBilling.addEventListener("click", function(){
    paymentBilling.classList.add("d-none");
    paymentBillingForm.classList.remove("d-none");
  });

  changeBillingCountry.addEventListener("click", function(){
    modalOpen("#modal-change-country");
  });

  continueChangeCountry.addEventListener('click', function () {
    country = document.querySelector("#select-country").value;
    modalClose("#modal-change-country");
  
    billignCountry.innerHTML = country;
  
  });

  
};