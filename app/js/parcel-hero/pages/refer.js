(function () {

  window.onload = function(){
    document.querySelector("[data-action='add-friend']").addEventListener("click", function(e){
      addFriendField();
    });
    document.querySelector("[data-action='friends-node'] input").addEventListener("input", function(e){
      addFriendFieldif();
    });
  }

  function addFriendFieldif(){
    var inputs = document.querySelectorAll("[data-action='friends-container'] input");
    var empty = 0;

    inputs.forEach(function(input){
      if(input.value.length == 0) empty++;
    })

    if (empty == 0) addFriendField();
  }

  function addFriendField(){
    var container = document.querySelector("[data-action='friends-container']");
    var node = container.querySelector("[data-action='friends-node']");
    var newNode = document.createElement("div");

    newNode.classList.add("form-group");
    newNode.innerHTML = node.innerHTML;

    newNode.querySelector("input").addEventListener("input", function(){
      console.log(111)
      addFriendFieldif();
    })

    container.appendChild(newNode);
  }

})();