(function () {
  const dropoff = 1;

  const parcelContents = document.querySelector("#parcel-contents");
  const saveButton = document.querySelector("#parcel-save");
  const loginButton = document.querySelector("#parcel-login");
  const parcelValue = document.querySelector("#parcel-value");
  const parcelCost = document.querySelector("#parcel-cost");
  const parcelCostIns = document.querySelector("#parcel-cost-ins");
  const parcelVatIns = document.querySelector("#parcel-vat-ins");
  const parcelShipingCost = document.querySelector("#parcel-shiping-cost");
  const parcelShipingVat = document.querySelector("#parcel-shiping-vat");
  const parcelShipingTotal = document.querySelector("#parcel-shiping-total");

  const parcelFindAdress = document.querySelector("#parcel-find-adress");
  const parcelFindAdressResult = document.querySelector("#parcel-find-adress-result");
  const parcelFindAdressAdvResult = document.querySelector("#parcel-find-adress-adv");

  const parcelFindDAdress = document.querySelector("#parcel-find-dadress");
  const parcelFindDAdressResult = document.querySelector("#parcel-find-dadress-result");
  const parcelFindDAdressAvdResult = document.querySelector("#parcel-find-dadress-adv");

  const parcelCollectionSerachNew = document.querySelector("#parcel-collection-serach-new");
  const parcelCollectionSerachNewD = document.querySelector("#parcel-collection-serach-new-d");

  const changeCollectionDateBtn = document.querySelector("#change-collection-date");
  const cancelChooseCollectionDateBtn = document.querySelector("#cancel-choose-collection-date");
  const parcelChangeCollectionDate = document.querySelector("#parcel-change-collection-date");
  const parcelChooseCollectionDate = document.querySelector("#parcel-choose-collection-date");
  const setCollectionDateBtn = document.querySelector("#set-collection-date");
  const saveCollectionDate = document.querySelector("#save-collection-date");
  const termsAgree = document.querySelector("#terms-agree");
  const parcelFormSubmit = document.querySelector("#parcel-form-submit");
  const parcelContinueOrder = document.querySelector("#parcel-continue-order");
  const changeDeliveryAdress = document.querySelector("#change-delivery-adress");
  const continueSuggestion = document.querySelector("#continue-suggestion");
  const dropOffBlock = document.querySelector("#drop-off-block");
  const dropOffButton = document.querySelector("#drop-off-button");
  const revertBack = document.querySelector("#revert-back");
  const collectParcel = document.querySelector("#collect-parcel");
  const parcelCollectionAddress = document.querySelector("#parcel-collection-address");
  const dropMapTab = document.querySelector("#drop-map-tab");

  const collectionAddressSearchModule = searchInputManager.getById('parcel-collection-address');
  const deliveryAddressSearchModule = searchInputManager.getById('parcel-collection-daddress');

  const nearestAdress = document.querySelector("#nearest-adress");
  const nearestDistance = document.querySelector("#nearest-distance");
  const nearestViewOnMap = document.querySelector("#nearest-view-on-map");

  const selectedDistance = document.querySelector("#selected-distance");
  const selectedName = document.querySelector("#selected-name");
  const selectedViewOnmap = document.querySelector("#selected-view-onmap");
  const selectedAdress = document.querySelector("#selected-adress");
  const selectedPostal = document.querySelector("#selected-postal");

  const showOnmapDistance = document.querySelector("#show-onmap-distance");
  const showOnmapName = document.querySelector("#show-onmap-name");
  const showOnmapAdress = document.querySelector("#show-onmap-adress");
  const showOnmapPostal = document.querySelector("#show-onmap-postal");
  const showOnmapWorktime = document.querySelector("#show-onmap-worktime");

  const nearestInsurance = document.querySelector("#nearest-insurance");


  $(document).ready(function () {
    $(".owl-carousel").owlCarousel(
      {
        margin: 10,
        dots: false,
        nav: false,
        responsive: {
          0: {
            items: 3,
            stagePadding: 24,
          },
          767: {
            items: 7,
          },
        }
      }
    );
  });

  init();
  buildDropOffList();
  buildDropOffSelected(1);
  buildNearest(1);
  events();
  buttonsEvents();

  function buttonsEvents() {
    let selectsDO = document.querySelectorAll("[data-action='selectDropOff']");
    let selectsNE = document.querySelectorAll("[data-action='selectNearest']");

    selectsDO.forEach(function (select) {
      select.addEventListener("click", function (e) {
        e.preventDefault();
        buildDropOffSelected(select.dataset.id);
        dropOffBlock.scrollIntoView({ behavior: "smooth" });
      });
    });

    selectsNE.forEach(function (select) {
      select.addEventListener("click", function (e) {
        e.preventDefault();
        buildNearest(select.dataset.id);
        nearestInsurance.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function events() {
    let showOnMaps = document.querySelectorAll("[data-action='showOnMap']");

    showOnMaps.forEach(function (showOnMap) {
      showOnMap.addEventListener("click", function (e) {
        let eventUpdDropOffMap = new CustomEvent('updateDropOffMap', { 'detail': { id: showOnMap.dataset.id } });
        document.dispatchEvent(eventUpdDropOffMap);
        modalOpen("#modal-show-onmap");
      });
    });

    document.addEventListener("updateDropOffMap", function (e) {
      showOnmapDistance.innerHTML = collectionsAdr[e.detail.id].distance
      showOnmapName.innerHTML = collectionsAdr[e.detail.id].name;
      showOnmapAdress.innerHTML = collectionsAdr[e.detail.id].adress;
      showOnmapPostal.innerHTML = collectionsAdr[e.detail.id].postcode;
      showOnmapWorktime.innerHTML = '';

      collectionsAdr[e.detail.id].worktime.forEach(function (item) {
        showOnmapWorktime.innerHTML += item.days + ": " + item.time + "<br>";
      });

    });

    document.addEventListener("updateSelected", function (e) {
      buildDropOffSelected(e.detail.id);
      modalClose("#modal-drop-off");
    });

    document.addEventListener("updatePagiator", function (e) {
      buttonsEvents();
    });

  }

  function buildNearest(i) {

    nearestAdress.innerHTML = collectionsAdr[i].adress;
    nearestDistance.innerHTML = collectionsAdr[i].distance;
    nearestViewOnMap.setAttribute("data-action", "showOnMap");
    nearestViewOnMap.setAttribute("data-id", i);

  }

  function buildDropOffSelected(i) {

    selectedDistance.innerHTML = collectionsAdr[i].distance;
    selectedName.innerHTML = collectionsAdr[i].name;
    selectedAdress.innerHTML = collectionsAdr[i].adress;
    selectedPostal.innerHTML = collectionsAdr[i].postcode;

    selectedViewOnmap.setAttribute("data-action", "showOnMap");
    selectedViewOnmap.setAttribute("data-id", i);

  }

  function buildDropOffList() {

    let containers = document.querySelectorAll(".pagiator-content");

    containers.forEach(function (container) {
      let html = '';
      let adv = container.dataset.adv;

      collectionsAdr.forEach(function (item, i) {

        if (adv) {
          html += `<div class="pagiator-item d-flex border-top pb-3 pt-3">
          <div class="w-75 w-md-100 lh-18 pl-5 position-relative">
            <img class="preset-icononlist" src="../img/icons/store.png" alt="">
            <div>${item.distance} miles</div>
            <div><strong>${item.name}</strong></div>
            <div class="link-primary-spec">See opening times</div>
            <div>${item.adress}, ${item.postcode}</div>
            <div class="link-primary-spec" data-action="showOnMap" data-id="${i}">Show on map</div>
          </div>
          <div class="w-25 w-md-100">
            <button class="btn btn-outline-gray-darker double not-rounded w-100 text-uppercase" data-action="selectDropOff" data-id=${i}>select</button>
          </div>
        </div>
      `
        } else {
          html += `<div class="pagiator-item d-flex border-top pb-3 pt-3">
          <div class="w-75 lh-18">
            <div>${item.distance} miles</div>
            <div><strong>${item.name}</strong></div>
            <div class="link-primary-spec">See opening times</div>
            <div>${item.adress}, ${item.postcode}</div>
            <div class="link-primary-spec" data-action="showOnMap" data-id="${i}">Show on map</div>
          </div>
          <div class="w-25 w-md-100">
            <button class="btn btn-outline-gray-darker double not-rounded w-100 text-uppercase" data-action="selectNearest" data-id=${i}>select</button>
          </div>
        </div>`;
        }

      });

      container.innerHTML = html;
    });

    const pagiatorManager = new Pagiator();
  }

  function init() {
    parcelContents.value ? saveButton.classList.remove("disabled") : saveButton.classList.add("disabled");

    buttonsEvents();
  }

  saveButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  dropMapTab.addEventListener('click', function () {
    modalOpen("#modal-drop-off");
  });

  dropOffButton.addEventListener('click', function (e) {
    e.preventDefault();
    dropOffBlock.classList.remove("d-none");
    dropOffBlock.scrollIntoView({ behavior: "smooth" });
  });

  revertBack.addEventListener('click', function (e) {
    e.preventDefault();
    dropOffBlock.classList.add("d-none");
  });

  collectParcel.addEventListener('click', function (e) {
    e.preventDefault();
    parcelCollectionAddress.scrollIntoView({ behavior: "smooth" });
    parcelCollectionAddress.value = "TW8 8HP";
    parcelCollectionAddress.focus();
  });

  loginButton.addEventListener('click', function () {
    modalOpen("#modal-sign-in");
  });

  termsAgree.addEventListener('change', function () {
    termsAgree.checked ? parcelFormSubmit.classList.remove("disabled") : parcelFormSubmit.classList.add("disabled")
  });

  parcelFormSubmit.addEventListener('click', function () {

    const customTowns = document.querySelectorAll("[name=custom-town]");
    let adressConfirm = true;

    customTowns.forEach((customTown) => {

      if (customTown.value.length > 0) adressConfirm = false;

    });

    adressConfirm ? modalOpen("#modal-adress-confirm") : modalOpen("#modal-city-suggestion");
  });

  parcelContinueOrder.addEventListener('click', function () {
    modalClose("#modal-adress-confirm");
  });

  changeDeliveryAdress.addEventListener('click', function () {
    modalClose("#modal-adress-confirm");
  });

  continueSuggestion.addEventListener('click', function () {
    suggestions = document.querySelectorAll("[name=city-suggestion]");

    modalClose("#modal-city-suggestion");

    suggestions.forEach((suggestion) => {
      if (suggestion.checked) {
        towns = document.querySelectorAll("[name=custom-town]");
        towns.forEach((town) => {
          town.value = suggestion.value;
        });
      }
    });

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

  changeCollectionDateBtn.addEventListener("click", function () {
    parcelChangeCollectionDate.classList.add("d-none");
    parcelChooseCollectionDate.classList.remove("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  cancelChooseCollectionDateBtn.addEventListener("click", function () {
    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.add("d-none");
  });

  setCollectionDateBtn.addEventListener("click", function (e) {
    e.preventDefault();

    parcelChangeCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    saveCollectionDate.classList.remove("d-none");
  })


  /********************************************* Address States *********************************************/

  /*** Search Input Init ***/

  const chooseItemActionDelivery = function (item) {
    const parentElement = this.searchContainer.parentElement.parentElement;

    parcelFindDAdressResult.classList.remove("d-none");
    parcelFindDAdressAvdResult.classList.remove("d-none");

    this.inputElement.value = item.name;

    for (elm in item) {
      let res = parentElement.querySelector("[data-result=" + elm + "]");
      if (res) res.innerHTML = item[elm];
    }
  }

  const chooseItemActionCollection = function (item) {
    const parentElement = this.searchContainer.parentElement.parentElement;
    const saveCollectionDate = parentElement.querySelector("#save-collection-date");

    parcelFindAdressResult.classList.remove("d-none");
    parcelFindAdressAdvResult.classList.remove("d-none");
    saveCollectionDate.classList.remove("d-none");
    parcelChooseCollectionDate.classList.remove("d-none");

    this.inputElement.value = item.name;

    for (elm in item) {
      let res = parentElement.querySelector("[data-result=" + elm + "]");
      if (res) res.innerHTML = item[elm];
    }
  }

  const inputManuallyCollectionAction = function () {
    const parentElement = this.searchContainer.parentElement.parentElement;
    const parcelFindAddress = parentElement.querySelector(".add-custom-address");
    parcelFindAddress.classList.remove("d-none");
    parcelFindAdressResult.classList.add("d-none");
    parcelFindAdressAdvResult.classList.remove("d-none");
    saveCollectionDate.classList.add("d-none");
    parcelChooseCollectionDate.classList.add("d-none");
    parcelFindAdress.classList.add("d-none");
  }

  const inputManuallyDeliveryAction = function () {
    const parentElement = this.searchContainer.parentElement.parentElement;
    const parcelFindAddress = parentElement.querySelector(".add-custom-address");
    parcelFindAddress.classList.remove("d-none");
    parcelFindDAdressResult.classList.add("d-none");
    parcelFindDAdressAvdResult.classList.remove("d-none");
    parcelFindDAdress.classList.add("d-none");
  }

  collectionAddressSearchModule.initActions({
    chooseItemAction: chooseItemActionCollection.bind(collectionAddressSearchModule),
    inputManuallyAction: inputManuallyCollectionAction.bind(collectionAddressSearchModule)
  })

  deliveryAddressSearchModule.initActions({
    chooseItemAction: chooseItemActionDelivery.bind(deliveryAddressSearchModule),
    inputManuallyAction: inputManuallyDeliveryAction.bind(deliveryAddressSearchModule)
  })

  /*** Collection Scheduled States ***/

  const dayBoxes = document.querySelectorAll(".day-box");
  dayBoxes.forEach(function (dayBox) {
    dayBox.addEventListener('click', function () {
      const activeDayBox = document.querySelector(".day-box.active");
      activeDayBox.classList.remove('active');

      dayBox.classList.add('active');
    });
  });

  const timeBoxes = document.querySelectorAll(".time-box");
  timeBoxes.forEach(function (timeBox) {
    timeBox.addEventListener('click', function () {
      const activeTimeBox = document.querySelector(".time-box.active");
      activeTimeBox.classList.remove('active');

      timeBox.classList.add('active');
    });
  });

  /*** Add Template For Input Manually ***/

  const customAddressItems = document.querySelectorAll(".add-custom-address");

  customAddressItems.forEach(function (customAddress) {

    const backFindAddress = customAddress.querySelector(".find-address");
    const saveAddress = customAddress.querySelector(".save-address");

    backFindAddress.addEventListener('click', function () {
      const parentElement = customAddress.parentElement;
      const parcelFindAddress = parentElement.querySelector(".parcel-find-address");

      if (parentElement.querySelector("#parcel-find-adress-adv")) parentElement.querySelector("#parcel-find-adress-adv").classList.add("d-none");
      if (parentElement.querySelector("#parcel-find-dadress-adv")) parentElement.querySelector("#parcel-find-dadress-adv").classList.add("d-none");

      customAddress.classList.add("d-none");
      parcelFindAddress.classList.remove("d-none");
    });

    saveAddress.addEventListener('click', function () {
      const parentElement = customAddress.parentElement;
      const parcelFindAddress = parentElement.querySelector(".parcel-find-address");

      if (parentElement.querySelector("#parcel-find-adress-result")) parentElement.querySelector("#parcel-find-adress-result").classList.remove("d-none");
      if (parentElement.querySelector("#parcel-find-adress-adv")) parentElement.querySelector("#parcel-find-adress-adv").classList.remove("d-none");
      if (parentElement.querySelector("#save-collection-date")) parentElement.querySelector("#save-collection-date").classList.remove("d-none");
      if (parentElement.querySelector("#parcel-choose-collection-date")) parentElement.querySelector("#parcel-choose-collection-date").classList.remove("d-none");

      if (parentElement.querySelector("#parcel-find-dadress-result")) parentElement.querySelector("#parcel-find-dadress-result").classList.remove("d-none");
      if (parentElement.querySelector("#parcel-find-dadress-adv")) parentElement.querySelector("#parcel-find-dadress-adv").classList.remove("d-none");

      customAddress.classList.add("d-none");
      parcelFindAddress.classList.remove("d-none");



    });
  });

  /*** Edit Address ***/

  const parcelEditCollectionAddress = document.querySelector("#parcel-edit-collection-adress");
  const parcelAddCollectionAddress = document.querySelector("#parcel-add-collection-address");
  const parcelAddDeliveryAddress = document.querySelector("#parcel-add-delivery-address");

  parcelEditCollectionAddress.addEventListener('click', function () {
    parcelAddCollectionAddress.classList.remove("d-none");
    parcelFindAdressResult.classList.add("d-none");
    parcelFindAdress.classList.add("d-none");

    const resultAddress = parcelFindAdressResult.querySelector("[data-result=adress]").innerHTML;
    const resultName = parcelFindAdressResult.querySelector("[data-result=name]").innerHTML;
    const resultPostcode = parcelFindAdressResult.querySelector("[data-result=postCode]").innerHTML;
    const resultCountry = parcelFindAdressResult.querySelector("[data-result=country]").innerHTML;

    parcelAddCollectionAddress.querySelector("[name=custom-zipcode]").value = resultPostcode;
    parcelAddCollectionAddress.querySelector("[name=custom-address]").value = resultAddress;
    parcelAddCollectionAddress.querySelector("[name=custom-company]").value = resultName;
    parcelAddCollectionAddress.querySelector(".custom-country").value = resultCountry;
  });

  const parcelEditDeliveryAddress = document.querySelector("#parcel-edit-collection-dadress");

  parcelEditDeliveryAddress.addEventListener('click', function () {
    parcelAddDeliveryAddress.classList.remove("d-none");
    parcelFindDAdressResult.classList.add("d-none");
    parcelFindDAdress.classList.add("d-none");

    const resultAddress = parcelFindDAdressResult.querySelector("[data-result=adress]").innerHTML;
    const resultName = parcelFindDAdressResult.querySelector("[data-result=name]").innerHTML;
    const resultPostcode = parcelFindDAdressResult.querySelector("[data-result=postCode]").innerHTML;
    const resultCountry = parcelFindDAdressResult.querySelector("[data-result=country]").innerHTML;

    parcelAddDeliveryAddress.querySelector("[name=custom-zipcode]").value = resultPostcode;
    parcelAddDeliveryAddress.querySelector("[name=custom-address]").value = resultAddress;
    parcelAddDeliveryAddress.querySelector("[name=custom-company]").value = resultName;
    parcelAddDeliveryAddress.querySelector(".custom-country").value = resultCountry;
  });
})();