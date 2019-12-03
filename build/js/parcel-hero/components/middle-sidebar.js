const accountMenuBtn = document.getElementById('account-menu-btn');
const responsiveMenuWrap = document.getElementById('responsive-menu-wrap');

if(accountMenuBtn)
accountMenuBtn.addEventListener('click', function(){
    responsiveMenuWrap.classList.toggle('d-block');
})