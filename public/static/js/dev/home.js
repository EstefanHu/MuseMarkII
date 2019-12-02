'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(res => res.json())
			.then(populateFeed)
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
})();