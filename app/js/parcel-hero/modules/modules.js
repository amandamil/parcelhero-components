

const SearchInputModule = function (searchContainer) {
  this.inputElement = searchContainer.querySelector("input");
  this.inputElementId = this.inputElement.id;

  this.searchContainer = searchContainer;

  let eventActions = {
    inputManuallyAction: function () { },
    chooseItemAction: function(item) { this.inputElement.value = item.name },
    resetAction: function () { },
    hideSearchInputByChoose: false
  };

  this.initActions = function (actions) {
    Object.keys(actions).forEach(function (actionName) {
      eventActions[actionName] = actions[actionName];
    });
  }

  this.resetSearch = function () {
    this.inputElement.value = '';
    searchResultContainer.innerHTML = '';
    eventActions.resetAction();
  }

  const searchResultContainer = document.createElement("ul");
  searchContainer.appendChild(searchResultContainer);

  this.inputElement.addEventListener("focus", function () {
    searchContainer.classList.add("focus");
  });

  this.inputElement.addEventListener("blur", function () {
    setTimeout(function () {
      searchContainer.classList.remove("focus");
    }, 200);
  });

  this.inputElement.addEventListener("input", function(e) {
    const searchData = this.inputElement.dataset.data;
    const searchType = this.inputElement.dataset.type;

    searchResultContainer.innerHTML = '';

    const result = search(data[searchData], e.target.value, searchType === "advanced");

    if (result) {
      const cont = document.createElement("div");
      cont.classList.add("search-input-overflow");

      const notifi = document.createElement("div");
      const custom = document.createElement("div");

      if (searchType === "advanced") {
        notifi.innerHTML = "Keep typing to show more results";
        custom.innerHTML = "Or, enter address manually";
        custom.classList.add("search-input-footer");
        notifi.classList.add("search-input-notifi");
        custom.classList.add("add-custom-adress");
        searchResultContainer.appendChild(notifi);

        custom.addEventListener("click", eventActions.inputManuallyAction);
      }

      result.forEach(function (item) {
        const li = document.createElement("li");

        if (searchData === "adress") {
          li.innerHTML = "<div>" + item.adress + "</div><div>" + item.name + " " + item.postCode + "</div>";
        } else {
          li.innerHTML = item.name;
        }

        li.addEventListener("click", eventActions.chooseItemAction.bind(null, item));

        cont.appendChild(li);
        searchResultContainer.appendChild(cont);
      });

      if (searchType === "advanced") searchResultContainer.appendChild(custom);
    }
  });
}

const SearchInputManager = function (querySelector = ".search-input") {
  const searchInputContainers = document.querySelectorAll(querySelector);
  const searchInputModules = {};

  searchInputContainers.forEach(function (searchInputContainer) {
    const searchInputModule = new SearchInputModule(searchInputContainer);
    searchInputModules[searchInputModule.inputElementId] = searchInputModule;
  });

  this.getById = function (elementId) {
    return searchInputModules[elementId];
  }
}

const Pagiator = function (querySelector = ".pagiator") {
  const pagiatorContainers = document.querySelectorAll(querySelector);
  const itemsPerPage = 4;
  let currentPage = 1;

  let eventActions = {
    rebuild: function (pagiatorContainer, items, direction = 0) {
      let pagiatorContent = pagiatorContainer.querySelector(".pagiator-content");
      currentPage = currentPage + direction;

      let visibleItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      pagiatorContent.innerHTML = '';

      visibleItems.forEach(function(visibleItem) {
        pagiatorContent.appendChild(visibleItem);
      });

    },
  };

  pagiatorContainers.forEach(function (pagiatorContainer) {

    const pagiatorPagination = document.createElement("div");
    let length = Array.from(pagiatorContainer.querySelectorAll(".pagiator-item")).length;
    let items = Array.from(pagiatorContainer.querySelectorAll(".pagiator-item"));

    pagiatorPagination.classList.add("pagiator-pagination");
    pagiatorPagination.innerHTML = "<div class='pagiator-prev'>< PREV</div><div class='pagiator-pages'>" + currentPage + ' to ' + (currentPage * itemsPerPage) + " of " + length + "</div><div class='pagiator-next active'>NEXT ></div>";
    pagiatorContainer.appendChild(pagiatorPagination);
    let pagiatorPages = pagiatorContainer.querySelector(".pagiator-pages");

    const pagiatorPrev = pagiatorContainer.querySelector(".pagiator-prev");
    const pagiatorNext = pagiatorContainer.querySelector(".pagiator-next");

    eventActions.rebuild(pagiatorContainer, items);

    pagiatorPrev.addEventListener("click", function() {
      pagiatorNext.classList.add("active");
      if (currentPage - 1 == 1) pagiatorPrev.classList.remove("active");
      if (currentPage - 1 > 0) {
        pagiatorPages.innerHTML = ((currentPage - 1) * itemsPerPage - itemsPerPage + 1) + ' to ' + ((currentPage - 1) * itemsPerPage) + " of " + length;
        eventActions.rebuild(pagiatorContainer, items, -1);

        let updatePagiator = new CustomEvent('updatePagiator');
        document.dispatchEvent(updatePagiator);
      }
    });
    pagiatorNext.addEventListener("click", function() {
      pagiatorPrev.classList.add("active");
      if ((currentPage + 1) == (Math.ceil(items.length / itemsPerPage))) pagiatorNext.classList.remove("active");
      if ((currentPage + 1) < (items.length / itemsPerPage + 1)) {
        if ((currentPage + 1) == (Math.ceil(items.length / itemsPerPage))) {
          pagiatorPages.innerHTML = ((currentPage + 1) * itemsPerPage - itemsPerPage + 1) + ' to ' + length + " of " + length;
        } else {
          pagiatorPages.innerHTML = ((currentPage + 1) * itemsPerPage - itemsPerPage + 1) + ' to ' + ((currentPage + 1) * itemsPerPage) + " of " + length;
        }
        eventActions.rebuild(pagiatorContainer, items, 1)
        let updatePagiator = new CustomEvent('updatePagiator');
        document.dispatchEvent(updatePagiator);
      }
    });
  });
}

const SearchWidget = function (querySelector = ".search-widget") {
   var searchs = document.querySelectorAll(querySelector);

  searchs.forEach(function (search) {
    search.querySelector("input").addEventListener("input", function (e) {
      search.querySelectorAll("i").forEach(function (icon) {
        icon.classList.remove("active");
      })
      e.target.value.length != 0 ? search.querySelector(".search-widget-remove").classList.add("active") : search.querySelector(".search-widget-search").classList.add("active")
    });
    search.querySelector(".search-widget-remove").addEventListener("click", function (e) {
      search.querySelector("input").value = '';
      search.querySelector(".search-widget-remove").classList.remove("active")
      search.querySelector(".search-widget-search").classList.add("active")
    })
  });
}

const ChangeCountry = function (querySelector = ".module-change-country") {
  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    const link = block.querySelector("[data-action='change-country']");
    const proceed = block.querySelector("[data-action='change-country-continue']");
    const label = block.querySelector("[data-action='change-country-label']");
    const back = block.querySelector("[data-action='change-country-back']");
    const input = block.querySelector("input");
    const modal = block.querySelector(".modal-custom");

    link.addEventListener("click", function () {
      modalOpen(modal);
    });

    proceed.addEventListener('click', function () {
      country = block.querySelector("select").value;
      modalClose(modal);
      input.value = country;
      label.innerHTML = country;
    });

    back.addEventListener('click', function () {
      modalClose(modal);
    })
  });
}

const Adress = function (querySelector = ".module-adress") {
  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    const preview = block.querySelector("[data-action='adress-preview']");
    const change = block.querySelector("[data-action='adress-change']");
    const form = block.querySelector("[data-action='adress-form']");

    change.addEventListener("click", function () {
      preview.classList.add("d-none");
      form.classList.remove("d-none");
    });
  });
}

const PaymentMethod = function (querySelector = ".module-payment-method") {
  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    const add = block.querySelector("[data-action='add-card']");
    const form = block.querySelector("[data-action='card-form']");

    add.addEventListener("click", function () {
      add.classList.add("d-none");
      form.classList.remove("d-none");
    });
  });
}

const Favorite = function (querySelector = ".module-favorite") {
  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    block.addEventListener("click", function () {
      const groupName = block.dataset.favorite;
      const items = document.querySelectorAll("[data-favorite=" + groupName + "]");
      const id = block.dataset.id;

      items.forEach(function (item) {
        if (item != block) item.classList.remove("active");
      });

      block.classList.toggle("active");
    });
  });
}

const ProgressCircle = function (querySelector = ".progress-circle") {

  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    $(block).circleChart({
      animate: true,
      size: (block.dataset.diameter ? block.dataset.diameter : 100),
      value: block.dataset.percent,
      text: block.dataset.percent + "%",
      guage: 8,
      color: '#248dd5',
      textSize: '15px',
      lineCap: "square",
    });
  })
}

const ParcelWidget = function (querySelector = ".parcel-widget-full") {
  const blocks = document.querySelectorAll(querySelector);

  blocks.forEach(function (block) {
    const containers = block.querySelectorAll(".details-list-section");
    const links = block.querySelectorAll(".nav-link");

    if (links) links.forEach(function (link) {
      link.addEventListener("click", function () {
        let targetTitle = link.getAttribute("data-action-ttitle");

        block.querySelectorAll("[data-action-title]").forEach(function (elm) {
          elm.classList.remove("d-block")
        });

        block.querySelector("[data-action-title=" + targetTitle + "]").classList.add("d-block");

      });
    });

    containers.forEach(function (container) {
      const crow = container.querySelector(".details-list-row");
      let rowHTML = '';
      if (crow) rowHTML = container.querySelector(".details-list-row").cloneNode(true).innerHTML;
      const add = container.querySelector(".info-input-more");
      const toggleWeight = container.querySelector("[data-action='target-toggler']");
      const quoteBtn = container.querySelector("[data-action='quote-btn']");
      const quoteBtnAdd = container.querySelector("[data-action='quote-btn-additional']");
      const addRow = container.querySelector("[data-action='add-row']");
      const listContainer = container;
      const customSize = container.querySelector("[data-action='custom-size']");
      const sizesBack = container.querySelector("[data-action='sizes-back']");
      const focusToggle = container.querySelector("[data-action='focus-toggle']");
      const changeUnit = container.querySelector("[data-action='change-unit']");
      let unit = "1";

      let isVolume = false;

      if (changeUnit) changeUnit.addEventListener("change", function () {
        let measures = changeUnit.closest(".details-list-container").querySelectorAll(".input-measure");

        measures.forEach(function (measure) {
          changeUnit.value == "2" ? measure.classList.add("switch") : measure.classList.remove("switch");
          unit = changeUnit.value;
        });

      })

      if (sizesBack) sizesBack.addEventListener("click", function () {
        sizesBack.closest(".details-list-row").querySelector("[data-action='custom-size-inputs']").classList.add("d-none");
        sizesBack.closest(".details-list-row").querySelector("[data-action='size-selector']").classList.remove("d-none");
        quoteBtn.classList.remove("d-none");
        quoteBtnAdd.classList.add("d-none");
        toggleWeight.classList.add("d-none");

        customSize.value = "";

        $('.custom-picker').selectpicker("refresh");

      });

      if (customSize) customSize.addEventListener("change", function (e) {

        if (e.target.value == "Custom size") {
          customSize.closest(".details-list-row").querySelector("[data-action='size-selector']").classList.add("d-none");
          customSize.closest(".details-list-row").querySelector("[data-action='custom-size-inputs']").classList.remove("d-none");
          quoteBtn.classList.add("d-none");
          quoteBtnAdd.classList.remove("d-none");
          toggleWeight.classList.remove("d-none");
        }
      });

      if (focusToggle) focusToggle.addEventListener("click", function () {
        container.querySelectorAll(".details-list-row").forEach(function (rowC) {
          const vs = rowC.querySelector("[data-action='volume-section']");
          if (vs) vs.classList.remove("d-none");
        });

        isVolume = true;

        listContainer.classList.add("w-100");
        quoteBtn.classList.add("d-none");
        quoteBtnAdd.classList.remove("d-none");
      });

      if (addRow) addRow.addEventListener("click", function () {
        const row = document.createElement('div');
        row.classList.add("details-list-row");
        row.innerHTML = rowHTML;
        const customSize = row.querySelector("[data-action='custom-size']");
        const sizesBack = row.querySelector("[data-action='sizes-back']");

        //if (toggleWeight) toggleWeight.classList.add("d-none");

        container.querySelectorAll(".details-list-row").forEach(function (rowC) {
          const vs = rowC.querySelector("[data-action='volume-section']")
          if (vs) vs.classList.remove("d-none");
        });

        isVolume = true;

        if (listContainer) listContainer.classList.add("w-100");
        quoteBtn.classList.add("d-none");
        quoteBtnAdd.classList.remove("d-none");

        if (sizesBack) sizesBack.addEventListener("click", function () {
          sizesBack.closest(".details-list-row").querySelector("[data-action='custom-size-inputs']").classList.add("d-none");
          sizesBack.closest(".details-list-row").querySelector("[data-action='size-selector']").classList.remove("d-none");

          customSize.value = "";

          $('.custom-picker').selectpicker("refresh");
        });

        container.querySelector(".details-list-container").append(row);

        row.querySelectorAll('.custom-picker').forEach(function (picker) {
          $(picker).selectpicker();
        });

        const volumeSection = row.querySelector("[data-action='volume-section']");

        if (volumeSection) volumeSection.classList.remove("d-none");

        const remove = row.querySelector('.info-input-more.remove');

        remove.addEventListener("click", function () {
          const rows = row.closest(".details-list-container").querySelectorAll(".details-list-row");
          if (rows.length < 3) if (toggleWeight) toggleWeight.classList.remove("d-none");
          if (row) row.remove();
        })

        if (customSize) customSize.addEventListener("change", function (e) {

          if (e.target.value == "Custom size") {
            customSize.closest(".details-list-row").querySelector("[data-action='size-selector']").classList.add("d-none");
            customSize.closest(".details-list-row").querySelector("[data-action='custom-size-inputs']").classList.remove("d-none");
          }
        });

        const measures = row.querySelectorAll(".input-measure");

        measures.forEach(function (measure) {
          unit == "2" ? measure.classList.add("switch") : measure.classList.remove("switch");
        });
      });

      if (add) add.addEventListener("click", function () {
        const row = document.createElement('div');
        row.classList.add("details-list-row");
        row.innerHTML = rowHTML;
        add.closest(".details-list-container").append(row);

        row.querySelectorAll('.custom-picker').forEach(function (picker) {
          $(picker).selectpicker();
        });

        const remove = row.querySelector('.info-input-more.remove');

        remove.addEventListener("click", function () {
          const rows = row.closest(".details-list-container").querySelectorAll(".details-list-row");
          if (rows.length < 2) if (toggleWeight) toggleWeight.classList.remove("d-none");
          if (row) row.remove();
        })
      })
    })
  });

  $('.custom-picker').selectpicker();
}