/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc (){
  //Calc урок 66

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){ //используем localStorage
        sex = localStorage.getItem('sex');
    }else{
        sex='female';
        localStorage.setItem('sex', "female");
    } //если не указаны данные в лок хр., то по умолчанию будет указаны female и 1.375

    if(localStorage.getItem('ratio')){
        ratio=localStorage.getItem('ratio');
    }else{
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //фун-ия ктр будет настраивать, чтобы настройки в лок хр. совпадали с отражением на стр после обновления(не слетали)

    function initLocalSeletting (selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);

            if(elem.getAttribute('id')=== localStorage.getItem('sex')){
                elem.classList.add(activeClass); 
            }

            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSeletting('#gender div', 'calculating__choose-item_active');
    initLocalSeletting('.calculating__choose_big div', 'calculating__choose-item_active');


    //расчетывает итог по формулам, т.е функция расчета
    function calcTotal (){
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = "_____";
            return;
        }

        if(sex === 'female'){
            result.textContent= Math.round ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        
        }else{
            result.textContent= Math.round ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);//Math.round округляет до целого
            
        }
    }

    calcTotal();

    //фун-ия по получению статистических данных, т.е. срабатывание клика

    function getStacticInformation (selector, activeClass){
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem =>{
            elem.addEventListener('click', (e) =>{
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));//устанавливаем localStorage
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id')); //устанавливаем localStorage
                }
                

                elements.forEach(elem =>{
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();

            });
        });
    }
        
    

    getStacticInformation('#gender div', 'calculating__choose-item_active');
    getStacticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    //функция, которая будет обрабатывать каждый input

    function getDynamicInformation (selector){
        const input = document.querySelector(selector);

        

        input.addEventListener('input', ()=>{

            //если пользователь внес не числовое значение
            if(input.value.match(/\D/g)){  
                input.style.backgroundColor = 'red';
            }else{
                input.style.backgroundColor='none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;      
            }
            calcTotal();
            
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards (){
    //CLASS Урок 48

    class MenuCard{
        constructor(scr, alt, subtitle, descr, price, parentSelector, ...classes ){ //помогает создат n-ое кол-вл классов
            this.scr=scr;
            this.alt=alt;
            this.subtitle=subtitle;
            this.descr=descr;
            this.price=price;
            this.classes=classes;
            this.parent=document.querySelector(parentSelector); //DOM-эл ктр можно использовать
            this.transfer=27;
            this.changeToUAH(); //вызываем метод сразу
        }

        //метод конвертации валют с гривни на доллар
        changeToUAH(){
            this.price=this.price*this.transfer;
        }

        //render - создать эл., поместить вертку и показать на стр.
        render(){
            const element=document.createElement ('div');

            if (this.classes.length===0){
                this.element = "menu__item";
                element.classList.add(this.element);
            } else{
                this.classes.forEach(className => element.classList.add(className));//перебираем массив и где нет класса указывает  
            }

            element.innerHTML= `
                <img src=${this.scr} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle} </h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.prepend(element);
        }

    }

    //вызваем фун-ию (ур. 59)
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource) ('http://localhost:3000/menu')
    .then (data =>{
        data.forEach ( ({img, altimg, title, descr, price}) =>{
            new MenuCard (img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    //Подключаем библиотеку axios (урок 60)
    // axios.get ('http://localhost:3000/menu')
    //     .then (data => {
    //         data.data.forEach ( ({img, altimg, title, descr, price}) =>{
    //             new MenuCard (img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    //Создание динамически эл. на стр (без шаблона, только на 1 эл), ур. 59
    // getResource ('http://localhost:3000/menu')
    //     .then(data => createCart(data));

    // function createCart (data){
    //     data.forEach ( ({img, altimg, title, descr, price}) =>{
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');
    //         element.innerHTML =`
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title} </h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);

    //     });
    // }



    //УЖЕ НЕ АКТУАЛЬНЫ, тк уже есть фун-ия выше
    // new MenuCard (
    //     "img/tabs/vegy.jpg", 
    //     "vegy", 
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
    //     10,
    //     '.menu .container'
    // ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");





function forms (formSelector, modalTimerId){
    
    const forms = document.querySelectorAll(formSelector);

    const message={
        loading: 'img/form/spinner.svg',
        success: "Спасибо! Скоро свяжемся с вами",
        failure: 'Что-то пошло не так'
    };


    forms.forEach(item=>{
        bindPostData(item);
    });




    function bindPostData(form){ //отвечает за привязку постинка
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement ('img');
            statusMessage.src=message.loading;
            statusMessage.style.cssTex = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);
            
           const json = JSON.stringify (Object.fromEntries (formData.entries()));

           
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then (data => {
                console.log (data);
                showThanksModal(message.success);
                statusMessage.remove(); 
            }).catch ( () =>{
                showThanksModal(message.failure);
            }).finally ( () =>{
                form.reset();
            });

        });       
    }     
            
    function showThanksModal (message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class= "modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout ( () =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow='';
}

function openModal (modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow="hidden";

    console.log (modalTimerId); //каждый раз когда будет открыт модалка, то будем видеть modalTimerId
    if (modalTimerId){
        clearInterval(modalTimerId);
    } //после обновл.стр модалка откр через 6 сек, если пользователь сам октрыл, то таймер на модалку не срабатывает 
    
}


function modal (triggerSelector, modalSelector, modalTimerId){
    //MODAL


    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach (btn =>{
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    modal.addEventListener('click', (e)=>{
        if (e.target===modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener ('keydown', (e) =>{
        if (e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modalSelector); 
        }
    });

    function showModalByScroll (){
        if (window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight){
            openModal (modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){

    //SlIDER (62 урок), 2 вариант

    const slides = document.querySelectorAll(slide),
           slider = document.querySelector(container),
           prev = document.querySelector(prevArrow),
           next = document.querySelector(nextArrow),
           total = document.querySelector(totalCounter),
           current = document.querySelector(currentCounter),
           slidesWrappe = document.querySelector(wrapper), //доступ к обертке
           slidesField = document.querySelector(field), //доступ к окошке в ктр нахдятся все слайды
           width = window.getComputedStyle(slidesWrappe).width; //ширина окошка

    let slideIndex = 1; //кол-во слайдов и показывает текущий слайд
    let offset = 0; //смещение вправо и влево 

    
    //настроиваем нумерацию текущей и итоговой

    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //настрой всех картинок одной ширины
    slidesField.style.display = 'flex'; //картинки в ряд
    slidesField.style.transition = '0.5s all'; //плавный переход картинок

    slidesWrappe.style.overflow = 'hidden'; //вскываем остальные картинки

    slides.forEach (slide =>{
        slide.style.width = width;
    }); // перебраем слайды и назначаем одну ширину

    
    slider.style.position = 'relative';
    const indicators = document.createElement ('ol'),//Создаем новый эл c точками
          dots = []; //создаем переменную, чтобы получить [] и использовать метод push
    indicators.classList.add('carousel-indicators'); //создаем класс
    slider.append(indicators); //доб новый эл к slider

    //создаем кол-во точек с помощью цикла
    for (let i=0; i<slides.length; i++) {
        const dot =document.createElement('li');
        dot.classList.add('dot');
    
        dot.setAttribute ('data-slide-to', i+1);

        if (i==0){
            dot.style.opacity=1;
            
        }
        indicators.append(dot);

        dots.push(dot); //после обработки цикла, мы получим массив с точками

    }

    function addZero (){
        if (slides.length < 10){
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function transformField (){
        slidesField.style.transform = `translateX(-${offset}px)`;
    }


    function showOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex -1].style.opacity = 1;
    }


   function deleteNotDigits (){
       return +width.replace(/\D/g, '');
   }
    

    //назначаем обработчик событий для стрелки вперед neхt
    next.addEventListener('click', () =>{
        if (offset == deleteNotDigits () * (slides.length -1)){ // в ширине удаляем буквы px * ширину слайда умножить на кол-во слайдов
            offset = 0; //долистав до конца вернется к началу 
        }else{ //если не последний слайд, то
            offset += deleteNotDigits ();
            
        } 

        transformField ();
        // slidesField.style.transform = `translateX(-${offset}px)`;//большое внутрее поле транформирует и перемещает влево

        if (slideIndex == slides.length){
            slideIndex =1;
        } else{
            slideIndex ++;
        } //если тек слайд равен кол-ву слайдов на стр, то переходит на начало слайда, если нет, то прибавляет на 1

       
        addZero();
        // if (slides.length < 10){
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // } //если нумерация слайда меньше 10, то прибавляет к тек 0, если больше, то указывает тек

        showOpacity();
        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex -1].style.opacity = 1;

    }); //если мы нажимаем на кнопку next, то к этому offset(смещению) добавляется ширина еще одного слайда и слайд перемещается 
  
    
    //назначаем обработчик событий для стрелки prev
    prev.addEventListener('click', () =>{
        if (offset == 0){ //если смещение равен 1-му слайду, то перемещается сразу в конец
            (offset = deleteNotDigits () * (slides.length -1)); //в переменую offset записываю мой посл слайд, ктр вычисляется по такой формуле
        }else{ //если не первый слайд,
            offset -= deleteNotDigits (); //то отнемаем на ширину слайда на ктр перещаюсь
        } 
        
        transformField ();
        // slidesField.style.transform = `translateX(-${offset}px)`;//большое внутрее поле транформирует и перемещает влево
        
        if (slideIndex == 1){
            slideIndex = slides.length;
        } else{
            slideIndex --;
        } //если тек слайд равен 1, то смещаемся в конец, если нет, то уменьшаем на 1 слайд


        addZero();
        // if (slides.length < 10){
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }


        showOpacity();
        // dots.forEach(dot => dot.style.opacity = '.5');
        // dots[slideIndex -1].style.opacity = 1;

    });

    //настроиваем, чтобы при клике на точку она переключвла слайд

    dots.forEach(dot =>{
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits () * (slideTo -1);

            transformField ();
            // slidesField.style.transform = `translateX(-${offset}px)`;
           
            addZero();
            // if (slides.length < 10){
            //     current.textContent = `0${slideIndex}`;
            // } else {
            //     current.textContent = slideIndex;
            // }

            showOpacity();
            // dots.forEach(dot => dot.style.opacity = '.5');
            // dots[slideIndex -1].style.opacity = 1;

        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    
    //TABS

    let tabs = document.querySelectorAll (tabsSelector),
        tabsContent = document.querySelectorAll (tabsContentSelector),
        tabsParent = document.querySelector (tabsParentSelector);

    function hideTabContent () {
        tabsContent.forEach (item => { //т.к. псевдомассивы, то forEach
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        }); //скрываем табы

        tabs.forEach (item => {
            item.classList.remove (activeClass);//точку не ставим т.к. и так работаем с классами
        }); //убирание классы активности у всех табов
    }    

    function showTabContent (i =0) {
        tabsContent [i].classList.add ('show', 'fade');
        tabsContent [i].classList.remove ('hide');
        tabs [i].classList.add (activeClass);
    }

    hideTabContent ();
    showTabContent ();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach ((item, i)=> {
                if (target == item) {
                    hideTabContent ();
                    showTabContent (i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline){
    //TIMER

    function getTimeRemaining (endtime){
        const t = Date.parse(endtime) - Date.parse (new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor ( (t/1000)%60 ),
            minutes = Math.floor( (t/1000/60)% 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

            

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num){
        if (num >= 0 && num <10){
            return `0${num}`;
        } else{
            return num;
        }
    }

    function setClock (selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining (endtime);

            days.innerHTML= getZero(t.days);
            hours.innerHTML= getZero(t.hours);
            minutes.innerHTML=getZero(t.minutes);
            seconds.innerHTML=getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {

    const res = await fetch (url, {
        method:'POST',
        body: data,
        headers:{
            'Content-type': 'application/json'
        },
    });
    
    return await res.json ();
};

//создаем фун-ию для GET запроса (ур. 59)
async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok){
        throw new Error (`Could not fetch ${url}, ${res.status}`);
    }
    
    return await res.json ();
}






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () =>{
    const modalTimerId = setTimeout (() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimerId), 60000);
        
           

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader_item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)('form', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', '2021-04-18');

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map