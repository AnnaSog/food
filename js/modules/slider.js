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

export default slider;