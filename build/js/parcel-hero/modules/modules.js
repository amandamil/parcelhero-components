

const SearchInputModule = function (searchContainer) {
  this.inputElement = searchContainer.querySelector("input");
  this.inputElementId = this.inputElement.id;

  this.searchContainer = searchContainer;

  let eventActions = {
    inputManuallyAction: function () { },
    chooseItemAction: (item) => { this.inputElement.value = item.name },
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

  this.inputElement.addEventListener("input", (e) => {
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

      visibleItems.forEach((visibleItem) => {
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

    pagiatorPrev.addEventListener("click", () => {
      pagiatorNext.classList.add("active");
      if (currentPage - 1 == 1) pagiatorPrev.classList.remove("active");
      if (currentPage - 1 > 0) {
        pagiatorPages.innerHTML = ((currentPage - 1) * itemsPerPage - itemsPerPage + 1) + ' to ' + ((currentPage - 1) * itemsPerPage) + " of " + length;
        eventActions.rebuild(pagiatorContainer, items, -1);

        let updatePagiator = new CustomEvent('updatePagiator');
        document.dispatchEvent(updatePagiator);
      }
    });
    pagiatorNext.addEventListener("click", () => {
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

