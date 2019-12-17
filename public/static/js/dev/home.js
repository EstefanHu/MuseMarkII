'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		fetch('/static/js/dev/data.json')
			.then(res => res.json())
			.then(populateFeed)
			.catch(console.err);
	}

	function populateFeed(res) {
		const section = document.querySelector('section');
		for (let i = 0; i < res.posts.length; i++) {
			let article = document.createElement('article');
			section.appendChild(getArticle(article, res.posts[i]));
		}
	}

	function getArticle(article, res) {
		let a = document.createElement('a');
		let genre = document.createElement('p');
		genre.textContent = res.genre;
		a.href = '/';
		a.appendChild(genre);
		a.classList.add('genre');
		article.appendChild(a);

		let a3 = document.createElement('a');
		let author = document.createElement('p');
		author.textContent = "By: " + res.author;
		a3.href = '/profile/' + res.authorId;
		a3.appendChild(author);
		a3.classList.add('author');
		article.appendChild(a3);

		let cred = document.createElement('p');
		cred.textContent = "Cred: " + res.credibility;
		cred.classList.add('credibility');
		article.appendChild(cred);

		let a2 = document.createElement('a');
		let title = document.createElement('h2');
		title.textContent = res.title;
		a2.href = '/'
		a2.appendChild(title);
		a2.classList.add('title');
		article.appendChild(a2);

		let desc = document.createElement('p');
		desc.textContent = res.description;
		desc.classList.add('description');
		article.appendChild(desc);

		getFooter(article, res);
		return article;
	}

	function getFooter(article, res) {

	}
})();