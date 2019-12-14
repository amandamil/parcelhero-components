const paymentAddCard = document.querySelector("#payment-add-card");
const cardForm = document.querySelector("#card-form");


$(document).ready(function () {
  events();
});

function events() {
  paymentAddCard.addEventListener("click", function(){
    paymentAddCard.classList.add("d-none");
    cardForm.classList.remove("d-none");
  });
};