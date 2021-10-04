require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import calc  from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () =>{
    const modalTimerId = setTimeout (() => openModal('.modal', modalTimerId), 60000);
        
           

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader_item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    forms('form', modalTimerId);
    timer('.timer', '2021-10-18');

});