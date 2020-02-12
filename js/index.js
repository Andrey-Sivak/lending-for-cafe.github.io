'use strict'

class MobileMenu {

	constructor(options) {
		this.btnMenu = document.getElementById(options.btn);
		this.menuContent = document.getElementById(options.menuContent);
	}

	showMenu() {
		let ths = this;
		this.btnMenu.addEventListener('click', function() {
			this.classList.toggle('active');
			if (this.classList.contains('active')) {
				ths.menuContent.style.display = 'flex';		
			} else {
				ths.menuContent.style.display = 'none';
			}
		})
	}

	init() {
		this.showMenu();
	}
}

class ScrollBtn {

	constructor(options) {
		this.btn = document.getElementById(options.btn);
		this.timeOut;
		this.getUp = this.getUp.bind(this);
	}

	showBtn() {
		let ths = this;
		window.onscroll = function() {
			if(document.body.scrollTop > document.documentElement.clientHeight ||
				document.documentElement.scrollTop > document.documentElement.clientHeight) {
				ths.btn.style.opacity = '1';
			} else {
				ths.btn.style.opacity = '0';
			}
		}
	}

	getUp() {
		let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		if (top > 0) {
			window.scrollBy(0, -100);
			this.timeOut = setTimeout(this.getUp, 20);
		} else {
			clearTimeout(this.timeOut);
		}
	}

	initGetUp() {
		this.btn.addEventListener('click', this.getUp);
	}

	init() {
		this.initGetUp();
		this.showBtn();
	}
}

class Menu {

	constructor(options) {
		this.items = options.items;
		this.container = document.getElementById(options.container);
		this.scr = this.scr.bind(this);
	}

	showMenu() {
		for(let i = 0; i < this.items.length; i++) {
			let item = document.createElement('li');
			item.innerHTML = this.items[i];
			item.className = 'header__item';
			item.setAttribute('id', 'js-menu__item')
			this.container.appendChild(item);
		}
	}

	scr(n) {
		let timeOut;
		(function f() {
			let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
			if(n == 0) {
				if(top > n) {
					window.scrollBy(0, -100);
					timeOut = setTimeout(f, 25);
				} else {
					clearTimeout(timeOut);
				}
			} else {
				if(top < n) {
					window.scrollBy(0, 100);
					timeOut = setTimeout(f, 25);
				} else {
					clearTimeout(timeOut);
				}
			}
		})()
	}

	scrollToElem() {
		const parentEl      = document.querySelector('main');
		const itemContainer = document.getElementById('js-menuContent');

		for(let i = 0; i < this.items.length; i++) {
			let item       = itemContainer.children[i];
			let elemScroll = parentEl.children[i];
			let coordY = elemScroll.getBoundingClientRect().top -50;
			let self = this;
			function f1() {
				self.scr(coordY);
			}
			item.addEventListener('click', f1);
		}
	}

	init() {
		this.showMenu();
		this.scrollToElem();
	}
}



window.onload = function() {
	
	const mobileMenu = new MobileMenu({
		btn: 'js-menu_burg',
		menuContent: 'js-menuContent'
	});

	const scrollBtn = new ScrollBtn({
		btn: 'js-scroll'
	});

	const menu = new Menu({
		items: ['Home', 'About', 'Ingredients', 'Menu', 'Reviews', 'Reservations'],
		container: 'js-menuContent'
	});


	scrollBtn.init();
	mobileMenu.init();
	menu.init();


	$('#date').daterangepicker({
    "singleDatePicker": true,
    "autoApply": true,
    "showCustomRangeLabel": false,
    "startDate": "03/09/2019",
    "endDate": "03/09/2019"
	});			

}