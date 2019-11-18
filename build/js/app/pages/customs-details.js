function changeQuantityCount(){
  const quantityCountBlock = document.getElementsByClassName('quantity-input-block');

  for(let block of quantityCountBlock){
      const minusBtn = block.querySelector('.quantity-minus');
      const plusBtn = block.querySelector('.quantity-plus');
      const quantityInput = block.querySelector('.quantity-count');

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

function changeExportReason() {
  const exportReasonSelect = document.getElementById('export-reason');

  const saleOptionText = document.getElementById('sale-option-text');
  const saleOptionEditLink = document.getElementById('sale-option-edit');
  const saleOptionEditor = document.getElementById('sale-option-editor');

  saleOptionEditLink.onclick = function () {
    saleOptionEditor.style.display = "block";
    saleOptionText.style.display = "none";
    saleOptionEditLink.style.display = "none";
    saleOptionEditor.focus();
  }

  saleOptionEditor.onblur = function () {
    saleOptionEditor.style.display = "none";
    saleOptionText.style.display = "block";
    saleOptionEditLink.style.display = "block";

    saleOptionText.innerHTML = saleOptionEditor.value;
  }

  exportReasonSelect.onchange = function () {
    hideOptionElements('sale-option');
    hideOptionElements('personal-gift-option');
    hideOptionElements('other-reason');

    switch(exportReasonSelect.value) {
      case 'sale':
        showOptionElements('sale-option');
        break;
      case 'personal-gift':
        showOptionElements('personal-gift-option');
        break;
      case 'other-reason':
        break;
      default:
    }
  }
}

function hideOptionElements(optionName) {
  const optionElements = document.getElementsByClassName(optionName);

  for(let element of optionElements) {
    element.style.display = "none";
  }
}

function showOptionElements(optionName) {
  const optionElements = document.getElementsByClassName(optionName);

  for(let element of optionElements) {
    element.style.display = "block";
  }
}

changeExportReason();
