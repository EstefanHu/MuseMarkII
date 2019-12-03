'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		if (navigator.geolocation) {
			console.log('map rendered');
			// navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		fetch('/static/js/dev/data.json')
			.then(res => res.json())
			.then(populateFeed)
			.catch(console.err);
	}

	function showPosition(position) {
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
		let genre = document.createElement('h4');
		let cred = document.createElement('p');
		let title = document.createElement('h2');
		let a2 = document.createElement('a');
		let author = document.createElement('p');
		let desc = document.createElement('p');
		genre.textContent = res.genre;
		a.href = '/';
		a.appendChild(genre);
		a.classList.add('genre');
		cred.textContent = "Cred: " + res.credibility;
		cred.classList.add('credibility');
		title.textContent = res.title;
		author.textContent = "By: " + res.author;
		a2.href = '/profile/' + res.authorId;
		a2.appendChild(author);
		a2.classList.add('author');
		desc.textContent = res.description;
		article.appendChild(a);
		article.appendChild(cred);
		article.appendChild(title);
		article.appendChild(a2);
		article.appendChild(desc);
		getFooter(article, res);
		return article;
	}

	function getFooter(article, res) {

	}
})();