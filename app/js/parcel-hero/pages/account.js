$(function () {
  events();
  setProgress();
  confirmRemove();
  widgetAllShipments();
});

function widgetAllShipments() {
  searchs = document.querySelectorAll(".search-widget");

  searchs.forEach(function (search) {
    filter('', search);
    search.querySelector("input").addEventListener("input", function (e) {
      filter(e.target.value, search);
      calculate(search)
    });
    search.querySelector(".search-widget-remove").addEventListener("click", function (e) {
      filter('', search);
      calculate(search);
    })

    function filter(txt, search) {
      var trs = search.closest(".card-body").querySelectorAll("table tbody tr");

      trs.forEach(function (tr) {
        tr.classList.add("filtered");
        var count = 0;
        tr.querySelectorAll("td").forEach(function (td) {
          if (td.innerHTML.indexOf(txt) != -1) {
            count ++;
          }
          count > 0 ? tr.classList.add("found") : tr.classList.remove("found");
        });
      })
    }
  });

  function calculate(search) {
    var tables = search.closest(".card-body").querySelectorAll(".table");
    tables.forEach(function (table) {
      var length = table.querySelectorAll("table tr.filtered.found").length;
      var container = table.closest(".collapse");
      var lenghAll = 0;

      container.querySelectorAll(".table table").forEach(function (tab) {
        lenghAll += tab.querySelectorAll("tr.filtered.found").length;
      });

      container.closest(".accordion-group").querySelector(".shipments-count-all").innerHTML = lenghAll;
      container.querySelector(".shipments-count").innerHTML = length;
    });
  }
}

function confirmRemove() {
  var current;
  var action;

  document.querySelectorAll('[data-toggle=modal]').forEach(function (elm) {
    elm.addEventListener("click", function (e) {
      current = e.target;
      action = e.target.dataset.action;
    });
  });
  document.querySelector('#removeRow').addEventListener("click", function () {
    $('#confirmRemove').modal('hide');
    var table = current.closest(".table");
    if (action == "all") {
      table.querySelectorAll("table input").forEach(function (input) {
        if (input.checked) input.closest("tr").remove();
      });
    } else {
      if (current.closest("tr")) current.closest("tr").remove();
    }
    calculate(table);
  });

  function calculate(table) {
    var length = table.querySelectorAll("table tr").length - 1;
    var container = table.closest(".collapse");
    var lenghAll = 0;

    container.querySelectorAll(".table table").forEach(function (tab) {
      lenghAll += tab.querySelectorAll("tr").length - 1
    });

    container.closest(".accordion-group").querySelector(".shipments-count-all").innerHTML = lenghAll;
    container.querySelector(".shipments-count").innerHTML = length;

  }
}

function setProgress() {
  var progress = document.querySelector("[data-progress]");
  progress.style.transform = "scaleX(" + progress.dataset.progress + ")";
}

function events() {

}