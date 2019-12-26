(function () {

  const addCardBtn = document.querySelector("#add-card-btn");
  const addPaymentMethod = document.querySelector("#add-payment-method");
  const editBussinesCard = document.querySelector("#edit-bussines-card");
  const edits = document.querySelectorAll(".edit-card");

  addCardBtn.addEventListener("click", function(){
    addPaymentMethod.classList.remove("d-none");
    addPaymentMethod.scrollIntoView({ behavior: "smooth" });
  });

  edits.forEach(function(edit){
    edit.addEventListener("click", function(e){
      e.preventDefault();
      editBussinesCard.classList.remove("d-none");
      editBussinesCard.scrollIntoView({ behavior: "smooth" });
    });
  });

})();