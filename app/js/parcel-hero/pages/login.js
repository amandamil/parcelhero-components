(function () {

  formValidation();

  $(document).ready(function () {
    function onHashChange() {
      var hash = window.location.hash;

      if (hash) {
        $(`[data-toggle="tab"][href="${hash}"]`).trigger('click');
      }
    }

    window.addEventListener('hashchange', onHashChange, false);
    onHashChange();


    $('a[role="tab-outside"]').on('click', function (e) {
      e.preventDefault();
  
      var target = this.href.split('#');
      $('.nav a').filter('[href="#' + target[1] + '"]').tab('show');
  
      $(`[data-toggle="tab"][href="#${target[1]}"]`).attr("aria-selected", "true").addClass("active");
    })
  });



  function formValidation() {
    if(document.querySelector("#password")) bootstrapValidate('#password', 'min:6:Please fill a valid password. Or <a href="./login-reset.html">reset your password</a>');
    if(document.querySelector("#email")) bootstrapValidate('#email', 'email:Enter a valid email address');

    if(document.querySelector("#password-register")) bootstrapValidate('#password-register', 'min:6:Please fill a valid password. Minimum 6 characters');
    if(document.querySelector("#email-register")) bootstrapValidate('#email-register', 'email:This email is incorect or registered. Please try signing in. Or <a href="./login-reset.html">reset your password.</a>');

    if(document.querySelector("#password-new")) bootstrapValidate('#password-new', 'min:6:Please fill a valid password. Minimum 6 characters');

    if(document.querySelector("#email-forgot")) bootstrapValidate('#email-forgot', 'email:Enter a valid email address');

    
  }

})();



