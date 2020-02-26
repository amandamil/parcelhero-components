let topMenuBtn = document.getElementById('top-menu-btn');
let profileSectionWrap = document.getElementById('profile-section-wrap');

if(topMenuBtn)
topMenuBtn.addEventListener('click', function (){
    profileSectionWrap.classList.toggle('d-flex');
});