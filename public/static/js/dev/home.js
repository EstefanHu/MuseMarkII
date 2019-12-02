'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(res => res.json())
			.then(populateFeed)
			.catch(console.err);
		
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(res => res.json())
			.then(getUpdates)
			.catch(console.err);
	}

	function populateFeed(res) {
		const main = document.querySelector('main');
		for (let i = 0; i < 10; i++) {
			let section = document.createElement('section');
			let article = document.createElement('article');
			let footer = document.createElement('footer');
			section.appendChild(getArticle(article, res[i]));
			section.appendChild(getFooter(footer))
			main.appendChild(section);
		}
	}

	function getArticle(article, res) {
		let h2 = document.createElement('h2');
		let p = document.createElement('p');
		h2.textContent = res.title;
		p.textContent = res.body;
		article.appendChild(h2);
		article.appendChild(p);
		return article;
	}

	function getFooter(footer) {
		return footer;
	}

	function getUpdates(res) {
		const aside = document.querySelector('aside');
		for (let i = 0; i < res.length; i++) {
			let span = document.createElement('span');
			let h3 = document.createElement('h3');
			h3.textContent = res[i].title;
			span.appendChild(h3);
			aside.appendChild(span);
		}
	}
})();