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

export default calc;