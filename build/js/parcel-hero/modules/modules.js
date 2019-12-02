

const SearchInputModule = function(searchContainer) {
  const inputElement = searchContainer.querySelector("input");
  this.inputElementId = inputElement.id;

  this.searchContainer = searchContainer;

  let eventActions = {
    inputManuallyAction: function() {},
    chooseItemAction: function(item) { inputElement.value = item.name },
    resetAction: function() {},
    hideSearchInputByChoose: false
  };

  this.initActions = function(actions) {
    Object.keys(actions).forEach(function (actionName) {
      eventActions[actionName] = actions[actionName];
    });
  }

  this.resetSearch = function() {
    inputElement.value = '';
    searchResultContainer.innerHTML = '';

    eventActions.resetAction();
  }

  const searchResultContainer = document.createElement("ul");
  searchContainer.appendChild(searchResultContainer);

  inputElement.addEventListener("focus", function() {
    searchContainer.classList.add("focus");
  });

  inputElement.addEventListener("blur", function() {
    setTimeout(function(){
      searchContainer.classList.remove("focus");
    }, 200);
  });

  inputElement.addEventListener("input", function(e){ 
    const searchData = inputElement.dataset.data;
    const searchType = inputElement.dataset.type;

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

