window.addEventListener('DOMContentLoaded', function(){
    
    'use strict';
    
	console.log('test');
    //Tabs
    
    //Получаем элементы, которые будут скрываться/отображаться
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
    
    //Скрывает все блоки кроме первого
    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    
    hideTabContent(1);
    
    //Отображает указаный таб при вызове
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    
    //Обработчик, показывает выбранный таб, в зависимости от указания
    info.addEventListener('click', function(e) {
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    
    // Timer
    
    let deadLine = '2019-12-05';
    
    //функция получает текущее время и расчитывает deadline
    function getTimeRemining(endtime) {
        
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60))),
            days = Math.floor(t / (1000 * 60 * 60 * 24));
        
        return {                                    // Возвращает объект данных для работы со временем
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };  
    }
    
    //функция поиска элемента и подстановки значений в таймер и обновление таймера
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {                    // Устанавливает время до deadline
            let t = getTimeRemining(endtime);  
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            
            
            
            if (t.total <=0) {                      // При достижении deadline останавливает таймер!
                days.innerHTML = ' 00';                
                hours.innerHTML = ' 00';
                minutes.innerHTML = ' 00';
                seconds.innerHTML = ' 00';
                clearInterval(timeInterval);
            }
            
            days.innerHTML = t.days;                // Добавляет "ноль" к значению, если оно сотоит из 1й цифр
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    }
    
    setClock('timer', deadLine);
    
});