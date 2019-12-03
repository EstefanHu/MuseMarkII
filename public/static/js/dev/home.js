'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		fetch('/static/js/dev/data.json')
			.then(res => res.json())
			.then(populateFeed)
			.catch(console.err);
	}

	function showPosition(position) {
		console.log(position.coords);
		var mymap = L.map('mapid', {zoomControl: false}).setView([position.coords.latitude, position.coords.longitude], 15);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXN0ZWZhbjA3NCIsImEiOiJjanozbm83OXUwNHRqM25tcm84MHYxd3cyIn0.MSuA8qUuoo1A2aWOcXI5ng', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.streets',
				accessToken: 'your.mapbox.access.token'
		}).addTo(mymap);
		new L.Control.Zoom({ position: 'topright' }).addTo(mymap);
	}

	function populateFeed(res) {
		const main = document.querySelector('main');
		for (let i = 0; i < res.posts.length; i++) {
			let section = document.createElement('section');
			let article = document.createElement('article');
			let footer = document.createElement('footer');
			section.appendChild(getArticle(article, res.posts[i]));
			main.appendChild(section);
		}
	}

	function getArticle(article, res) {
		let a = document.createElement('a');
		let genre = document.createElement('p');
		let cred = document.createElement('p');
		let a2 = document.createElement('a');
		let title = document.createElement('h2');
		let a3 = document.createElement('a');
		let author = document.createElement('p');
		let desc = document.createElement('p');
		genre.textContent = res.genre;
		a.href = '/';
		a.appendChild(genre);
		a.classList.add('genre');
		cred.textContent = "Cred: " + res.credibility;
		cred.classList.add('credibility');
		title.textContent = res.title;
		a2.href = '/'
		a2.appendChild(title);
		a2.classList.add('title');
		author.textContent = "By: " + res.author;
		a3.href = '/profile/' + res.authorId;
		a3.appendChild(author);
		a3.classList.add('author');
		desc.textContent = res.description;
		desc.classList.add('description');
		article.appendChild(a);
		article.appendChild(cred);
		article.appendChild(a2);
		article.appendChild(a3);
		article.appendChild(desc);
		getFooter(article, res);
		return article;
	}

	function getFooter(article, res) {

	}
})();