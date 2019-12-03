

const SearchInputModule = function(searchContainer) {
  this.inputElement = searchContainer.querySelector("input");
  this.inputElementId = this.inputElement.id;

  this.searchContainer = searchContainer;

  let eventActions = {
    inputManuallyAction: function() {},
    chooseItemAction: (item) => {this.inputElement.value = item.name},
    resetAction: function() {},
    hideSearchInputByChoose: false
  };

  this.initActions = function(actions) {
    Object.keys(actions).forEach(function (actionName) {
      eventActions[actionName] = actions[actionName];
    });
  }

  this.resetSearch = function() {
    this.inputElement.value = '';
    searchResultContainer.innerHTML = '';
    eventActions.resetAction();
  }

  const searchResultContainer = document.createElement("ul");
  searchContainer.appendChild(searchResultContainer);

  this.inputElement.addEventListener("focus", function() {
    searchContainer.classList.add("focus");
  });

  this.inputElement.addEventListener("blur", function() {
    setTimeout(function(){
      searchContainer.classList.remove("focus");
    }, 200);
  });

  this.inputElement.addEventListener("input", (e) => { 
    const searchData = this.inputElement.dataset.data;
    const searchType = this.inputElement.dataset.type;

    searchResultContainer.innerHTML = '';

    const result = search(data[searchData], e.target.value, searchType === "advanced");

    if(result) {
      const cont = document.createElement("div");
      cont.classList.add("search-input-overflow");

      const notifi = document.createElement("div");
      const custom = document.createElement("div");

      if(searchType === "advanced") {
        notifi.innerHTML = "Keep typing to show more results";
        custom.innerHTML = "Or, enter address manually";
        custom.classList.add("search-input-footer");
        notifi.classList.add("search-input-notifi");
        custom.classList.add("add-custom-adress");
        searchResultContainer.appendChild(notifi);

        custom.addEventListener("click", eventActions.inputManuallyAction);
      }

      result.forEach(function(item) {
        const li = document.createElement("li");

        if(searchData === "adress") {
          li.innerHTML = "<div>"+item.adress+"</div><div>"+item.name+" "+item.postCode+"</div>";
        }else{
          li.innerHTML = item.name;
        }

        li.addEventListener("click", eventActions.chooseItemAction.bind(null, item));

        cont.appendChild(li);
        searchResultContainer.appendChild(cont);
      });

      if(searchType === "advanced") searchResultContainer.appendChild(custom);
    }
  });
}

const SearchInputManager = function(querySelector = ".search-input") {
  const searchInputContainers = document.querySelectorAll(querySelector);
  const searchInputModules = {};

  searchInputContainers.forEach(function(searchInputContainer) {
    const searchInputModule = new SearchInputModule(searchInputContainer);
    searchInputModules[searchInputModule.inputElementId] = searchInputModule;
  });

  this.getById = function(elementId) {
    return searchInputModules[elementId];
  }
}

