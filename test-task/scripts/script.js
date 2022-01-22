// Переключатель режима дневной/ночной
const btn = document.querySelector(".mode");
btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
});


// Индикатор прокрутки страницы в виде полосы над шапкой(внизу) страницы
window.onscroll = function() {scrolledBar()};

function scrolledBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-Bar").style.width = scrolled + "%";
}


// Скрипт для хедера. При скролле вниз - прячем и при скролле вверх - показываем
let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector("header");

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains("header-hide");

window.addEventListener("scroll", () =>  {
    if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        header.classList.add("header-hide");
    }
    else if (scrollPosition() < lastScroll && containHide()) {
        header.classList.remove("header-hide")
    }
    lastScroll = scrollPosition();
});


// плавное последовательное появление 6ти блоков в секции с 6тью изображениями, при докручивании до центра секции
const animItems = document.querySelectorAll(".animated");
if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 2;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add("active");
            } else {
                animItem.classList.remove("active");
            }
        }
    }

    function offset(elem) {
        const rect = elem.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left +  scrollLeft }
    }
}