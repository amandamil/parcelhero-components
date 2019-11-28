var parcelContents = document.querySelector("#parcel-contents");
var saveButton = document.querySelector("#parcel-save");
var loginButton = document.querySelector("#parcel-login");
var parcelValue = document.querySelector("#parcel-value");
var parcelCost = document.querySelector("#parcel-cost");
var parcelCostIns = document.querySelector("#parcel-cost-ins");
var parcelVatIns = document.querySelector("#parcel-vat-ins");
var parcelShipingCost = document.querySelector("#parcel-shiping-cost");
var parcelShipingVat = document.querySelector("#parcel-shiping-vat");
var parcelShipingTotal = document.querySelector("#parcel-shiping-total");
var parcelFindAdress = document.querySelector("#parcel-find-adress");
var parcelFindAdressResult = document.querySelector("#parcel-find-adress-result");
var parcelFindAdressAdvResult = document.querySelector("#parcel-find-adress-adv");

var parcelFindDAdress = document.querySelector("#parcel-find-dadress");
var parcelFindDAdressResult = document.querySelector("#parcel-find-dadress-result");
var parcelFindDAdressAvdResult = document.querySelector("#parcel-find-dadress-adv");

var parcelCollectionSerachNew = document.querySelector("#parcel-collection-serach-new");
var parcelCollectionSerachNewD = document.querySelector("#parcel-collection-serach-new-d");

const changeCollectionDateBtn = document.querySelector("#change-collection-date");
const cancelChooseCollectionDateBtn = document.querySelector("#cancel-choose-collection-date");
const parcelChangeCollectionDate = document.querySelector("#parcel-change-collection-date");
const parcelChooseCollectionDate = document.querySelector("#parcel-choose-collection-date");
const setCollectionDateBtn = document.querySelector("#set-collection-date");
const saveCollectionDate = document.querySelector("#save-collection-date");

const dayBoxes = document.querySelectorAll(".day-box");
const timeBoxes = document.querySelectorAll(".time-box");

const customAddressItems = document.querySelectorAll(".add-custom-address");

const parcelEditCollectionAddress = document.querySelector("#parcel-edit-collection-adress");
const parcelEditDeliveryAddress = document.querySelector("#parcel-edit-collection-dadress");

const parcelAddCollectionAddress = document.querySelector("#parcel-add-collection-address");
const parcelAddDeliveryAddress = document.querySelector("#parcel-add-delivery-address");

$(function () {
  init();
  events();
});

function init() {
  parcelContents.value ? saveButton.classList.remove("disabled") : saveButton.classList.add("disabled");
}

function events() {
  saveButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  loginButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  parcelCollectionSerachNew.addEventListener('click', function () {
    parcelFindAdressResult.classList.add("d-none");
    parcelFindAdressAdvResult.classList.add("d-none");
    parcelFindAdress.classList.remove("d-none");
  });

  parcelCollectionSerachNewD.addEventListener('click', function () {
    parcelFindDAdressResult.classList.add("d-none");
    parcelFindDAdressAvdResult.classList.add("d-none");
    parcelFindDAdress.classList.remove("d-none");
  });

  parcelContents.addEventListener("input", function (item) {
    item.target.value ? saveButton.classList.remove("disabled") : saveButton.classList.add("disabled");
  });

  parcelValue.addEventListener("input", function (item) {
    var value = Number(item.target.value.replace(/\D+/g, ""));
    var shiping = (value * config.vat * config.shipingCost).toFixed(2);

    if (value > 0) {
      parcelCost.classList.remove("d-none");
      parcelCostIns.innerHTML = value;
      parcelVatIns.innerHTML = (value * config.vat).toFixed(2);
      parcelShipingCost.innerHTML = shiping;
      parcelShipingVat.innerHTML = (shiping * config.vat).toFixed(2);
      parcelShipingTotal.innerHTML = Number((shiping * config.vat).toFixed(2)) + Number(shiping);
    } else {
      parcelCost.classList.add("d-none");
      parcelCostIns.innerHTML = '';
      parcelVatIns.innerHTML = '';
    }
  });

  changeCollectionDateBtn.addEventListener("click", function() {
    parcelChangeCollectionDate.classList.add("d-none");
    parcelChooseCollectionDate.classList.remove("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  cancelChooseCollectionDateBtn.addEventListener("click", function() {
    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  setCollectionDateBtn.addEventListener("click", function(e) {
    e.preventDefault();

    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.remove("d-none");
  })

  dayBoxes.forEach(function(dayBox){
    dayBox.addEventListener('click', function () {
      const activeDayBox = document.querySelector(".day-box.active");
      activeDayBox.classList.remove('active');
  
      dayBox.classList.add('active');
    });
  });
  
  timeBoxes.forEach(function(timeBox){
    timeBox.addEventListener('click', function () {
      const activeTimeBox = document.querySelector(".time-box.active");
      activeTimeBox.classList.remove('active');
  
      timeBox.classList.add('active');
    });
  });

  customAddressItems.forEach(function(customAddress){
    customAddress.innerHTML = `<div class="mt-g mb-4">
        <label class="text-label" for="">Zip code / Postcode</label>
        <input type="text" name="custom-zipcode" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-4">
        <label class="text-label" for="">Company <span class="op-05">Optional</span></label>
        <input type="text" name="custom-company" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-4">
        <label class="text-label" for="">Address</label>
        <input type="text" name="custom-address" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-4">
        <label class="text-label" for="">Address 2 <span class="op-05">Optional</span></label>
        <input type="text" name="custom-address-o" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-4">
        <label class="text-label" for="">Town / City</label>
        <input type="text" name="custom-town" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-4">
        <label class="text-label" for="">State</label>
        <input type="text" name="custom-state" class="form-control w-50 w-md-100 not-rounded dark-theme">
      </div>

      <div class="mt-4 mb-2">
        <label class="text-label" for="">Country</label>
        <div class="d-flex justify-content-between">
          <p class="custom-country">United State</p> <span class="link-primary-spec change-custom-country">Change</span>
        </div>
      </div>

      <div class="mt-2 mb-4">
        <span class="link-primary-spec find-address">Find an address</span>
      </div>`;

    const backFindAddress = customAddress.querySelector(".find-address");
  
    backFindAddress.addEventListener('click', function () {
      const parentElement = customAddress.parentElement;
      const parcelFindAddress = parentElement.querySelector(".parcel-find-address");
  
      customAddress.classList.add("d-none");
      parcelFindAddress.classList.remove("d-none");
    });
  });

  parcelEditCollectionAddress.addEventListener('click', function () {
    parcelAddCollectionAddress.classList.remove("d-none");
    parcelFindAdressResult.classList.add("d-none");
    parcelFindAdressAdvResult.classList.add("d-none");

    const resultAddress = parcelFindAdressResult.querySelector("[data-result=adress]").innerHTML;
    const resultName = parcelFindAdressResult.querySelector("[data-result=name]").innerHTML;
    const resultPostcode = parcelFindAdressResult.querySelector("[data-result=postCode]").innerHTML;
    const resultCountry = parcelFindAdressResult.querySelector("[data-result=country]").innerHTML;

    parcelAddCollectionAddress.querySelector("[name=custom-zipcode]").value = resultPostcode;
    parcelAddCollectionAddress.querySelector("[name=custom-address]").value = resultAddress;
    parcelAddCollectionAddress.querySelector("[name=custom-company]").value = resultName;
    parcelAddCollectionAddress.querySelector(".custom-country").value = resultCountry;
  });

  parcelEditDeliveryAddress.addEventListener('click', function () {
    parcelAddDeliveryAddress.classList.remove("d-none");
    parcelFindDAdressResult.classList.add("d-none");
    parcelFindDAdressAvdResult.classList.add("d-none");

    const resultAddress = parcelFindDAdressResult.querySelector("[data-result=adress]").innerHTML;
    const resultName = parcelFindDAdressResult.querySelector("[data-result=name]").innerHTML;
    const resultPostcode = parcelFindDAdressResult.querySelector("[data-result=postCode]").innerHTML;
    const resultCountry = parcelFindDAdressResult.querySelector("[data-result=country]").innerHTML;

    parcelAddDeliveryAddress.querySelector("[name=custom-zipcode]").value = resultPostcode;
    parcelAddDeliveryAddress.querySelector("[name=custom-address]").value = resultAddress;
    parcelAddDeliveryAddress.querySelector("[name=custom-company]").value = resultName;
    parcelAddDeliveryAddress.querySelector(".custom-country").value = resultCountry;
  });
}
