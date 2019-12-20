(function () {
  const paymentAddCard = document.querySelector("#payment-add-card");
  const cardForm = document.querySelector("#card-form");
  const changePaymentBilling = document.querySelector("#change-payment-billing");
  const paymentBilling = document.querySelector("#payment-billing");
  const paymentBillingForm = document.querySelector("#payment-billing-form");

  events();

  function events() {
    paymentAddCard.addEventListener("click", function () {
      paymentAddCard.classList.add("d-none");
      cardForm.classList.remove("d-none");
    });

    changePaymentBilling.addEventListener("click", function () {
      paymentBilling.classList.add("d-none");
      paymentBillingForm.classList.remove("d-none");
    });
  };

})();

