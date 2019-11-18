function changeQuantityCount(){
  let quantityCountBlock = document.getElementsByClassName('quantity-input-block');

  for(let block of quantityCountBlock){
      let minusBtn = block.querySelector('.quantity-minus');
      let plusBtn = block.querySelector('.quantity-plus');
      let quantityInput = block.querySelector('.quantity-count');

      if (minusBtn.querySelector('.disabled') && parseInt(quantityInput.value) > 0) {
          minusBtn.querySelector('.fa-circle').classList.remove('disabled');
      }

      minusBtn.onclick = function () {
          if (minusBtn.querySelector('.disabled')) return false;

          quantityInput.value = parseInt(quantityInput.value) - 1;

          if (parseInt(quantityInput.value) == 0) {
              minusBtn.querySelector('.fa-circle').classList.add('disabled');
          }
      }

      plusBtn.onclick = function () {
          quantityInput.value = parseInt(quantityInput.value) + 1;

          if (parseInt(quantityInput.value) == 1) {
              minusBtn.querySelector('.fa-circle').classList.remove('disabled');
          }
      }

  }
}

changeQuantityCount();
