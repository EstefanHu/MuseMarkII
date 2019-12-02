'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			alert("Geolocation is not supported by this browser.");
		}

		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(res => res.json())
			.then(populateFeed)
			.catch(console.err);
	}

	function showPosition(position) {
		console.log(position);
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