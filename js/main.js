//в рот ебал гит

window.addEventListener('DOMContentLoaded', function () {

   // Tabs

   let tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {

      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', function (event) {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   // Timer
   const deadLine = '2021-06-21';

   function getTimeRemaining(endDate){
      const t = Date.parse(endDate) - new Date(),
            days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor(t/(1000*60*60) % 24),
            minutes = Math.floor(t/(1000*60) % 60),
            seconds = Math.floor(t/1000 % 60);
      return {
         'total':t,
         days,
         hours,
         minutes,
         seconds
      };
   }

   function getZero(num){
      if(num >= 0 && num <10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setTimer(selector, endDate){
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();
      function updateClock(){
         const time = getTimeRemaining(endDate);
         days.innerHTML = getZero(time.days);
         hours.innerHTML = getZero(time.hours);
         minutes.innerHTML = getZero(time.minutes);
         seconds.innerHTML = getZero(time.seconds);
         
         if (time.total <= 0){
            clearInterval(timeInterval);
         }
      }
   }

   setTimer('.timer', deadLine);


   //modal window
   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modalWindow = document.querySelector('.modal'),
         modalClose = modalWindow.querySelector('.modal__close');




   function showModal(){
      modalWindow.classList.toggle('show');
      document.body.style.overflow = 'hidden';
      //clearInterval(modalTimer);
   }

   function closeModal(){
      modalWindow.classList.toggle('show');
      document.body.style.overflow = '';
   }

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', showModal);
   });

   modalClose.addEventListener('click', closeModal);

   modalWindow.addEventListener('click', e => {
      if (e.target === modalWindow){
         closeModal();
      }
   });

   document.addEventListener('keydown', e => {
      if (e.code === "Escape" && modalWindow.classList.contains('show')){
         closeModal();
      }
   });

   //const modalTimer = setTimeout(showModal, 10000);

   function showModalOffset(){
      if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
         showModal();
         window.removeEventListener('scroll', showModalOffset);
      }
   }

   window.addEventListener('scroll', showModalOffset);



   class menuCard{
      constructor(src, alt, title, description, price, rate, parent, ...classes){
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.description = description;
         this.classes = classes;
         this.price = this.сonvertСurrency(price, rate);
         this.rate = rate;
         this.parent = document.querySelector(parent);
         ;
      }
      сonvertСurrency(price, rate){
         return price*rate;
      }

      render(){
         let elem = document.createElement('div');
         if(this.classes.length === 0){
            this.classes = 'menu__item';
            elem.classList.add(this.classes);
         }else{
            this.classes.forEach(className=>elem.classList.add(className));
         }
         elem.innerHTML =
         `<img src="${this.src}" alt="${this.alt}">
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.description}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>`;
         this.parent.append(elem);
      }
   }
   let newCard1 = new menuCard(
      "./img/tabs/vegy.jpg",
      "vegy", 
      'Меню "Фитнес"', 
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      6,
      28,
      '.menu .container',
      'menu__item'
   ).render();

   let newCard2 = new menuCard(
      "./img/tabs/elite.jpg",
      "elite", 
      'Меню “Премиум”', 
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      20,
      28,
      '.menu .container',
      'menu__item'
   ).render();
   let newCard3 = new menuCard(
      "./img/tabs/post.jpg",
      "post", 
      'Меню "Постное"', 
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      15,
      28,
      '.menu .container',
      'menu__item'
   ).render();

});