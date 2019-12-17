
$(document).ready(function () {
  events();
});

function events() {

  function handlePaymentTable() {

    const paymentTable = document.querySelector(".payment-table");
    let subtotalElem = paymentTable.querySelector("#pt-subtotal");
    let vatElem = paymentTable.querySelector("#pt-vat");
    let promoElem = paymentTable.querySelector("#pt-promo");
    let totalElem = paymentTable.querySelector("#pt-total");

    let promocodeElem = document.querySelector("#promocode");

    let promoDiscountRow = paymentTable.querySelector("tr").cloneNode(true);
    promoDiscountRow.firstElementChild.textContent = "Promo offer";
    let removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-link btn-link-remove";
    removeBtn.textContent = "Remove";
    promoDiscountRow.firstElementChild.appendChild(removeBtn);
    promoDiscountRow.lastElementChild.innerHTML = '<span id="pt-promo"></span>';
    console.log(promoDiscountRow);

    

    function convertCurrencyToNumber(string) {
      return Number( string.replace(/[£$]/, '').trim() )
    }
    function convertNumberToCurrency(number) {
      return number < 0 ? "-£" + -number.toFixed(2) : "£" + number.toFixed(2)
    }
    
    function getSubtotal() {
      const subtotalString = subtotalElem.textContent;
      return convertCurrencyToNumber(subtotalString)
    }
    function getVat() {
      const vatString = vatElem.textContent;
      return convertCurrencyToNumber(vatString)
    }

    function calcPromo(total, percent) {
      return ( -total * percent / 100 )
    }
    function calcVat(amount, vatRate = 20) {
      // either get from server or calculate by some rules
      return ( amount * vatRate / 100 )
    }
    function calcTotal(subtotal, vat, promoDiscount) {
      // discount is negative
      return (subtotal + vat + promoDiscount)
    }

    function defineDiscountRate(promocode) {
      if ( promocode.indexOf("50%") >= 0 ) {
        return 50
      } else if (promocode.indexOf("25%") >= 0) {
        return 25
      } else {
        return 0
      }
    }

    function applyDiscount(rate = 50) {
      let subtotal = getSubtotal();
      let discount = calcPromo(subtotal, rate) || 0;
      let vat = calcVat(subtotal-discount);
      let total = calcTotal(subtotal, vat, discount);

      // if (!promoElem) {
      //   paymentTable.rows[1].parentElement.insertBefore(promoDiscountRow, paymentTable.rows[1]);
      //   promoElem = paymentTable.querySelector("#pt-promo");
      //   promoDiscountRow.addEventListener("click", function(evt) {
      //     console.log(evt.target, evt.currentTarget, promoDiscountRow.querySelector(".btn-link-remove"));
      //     if (evt.target === promoDiscountRow.querySelector(".btn-link-remove")) {
      //       promoDiscountRow.parentNode.removeChild(promoDiscountRow);
      //     }
      //   });
      // }

      promoElem.textContent = convertNumberToCurrency(discount);
      vatElem.textContent = convertNumberToCurrency(vat);
      totalElem.textContent = convertNumberToCurrency(total);
    }

    document.querySelector("#form-promocode").addEventListener("submit", function(evt) {
      evt.preventDefault();

      let promocodeText = promocodeElem.value;
      console.log(promocodeText);
      let discountRate = defineDiscountRate(promocodeText);

      console.log(promoElem);

      if (!paymentTable.querySelector("#pt-promo")) {
        paymentTable.rows[1].parentElement.insertBefore(promoDiscountRow, paymentTable.rows[1]);
        promoElem = paymentTable.querySelector("#pt-promo");
        promoDiscountRow.addEventListener("click", function (evt) {
          console.log(evt.target, evt.currentTarget, promoDiscountRow.querySelector(".btn-link-remove"));
          if (evt.target === promoDiscountRow.querySelector(".btn-link-remove")) {
            promoDiscountRow.parentNode.removeChild(promoDiscountRow);
            applyDiscount(0);
          }
        });
      }

      applyDiscount(discountRate);
    });

  }

  handlePaymentTable();

  $('td > .collapse').on('show.bs.collapse', function () {
    console.log(this);
    $(this).closest("tr").prev("tr").addClass("has-open-details");
  });

  $('td > .collapse').on('hidden.bs.collapse', function () {
    console.log(this);
    $(this).closest("tr").prev("tr").removeClass("has-open-details");
  });

};