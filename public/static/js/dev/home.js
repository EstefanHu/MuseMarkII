'use strict';
(function() {
	window.addEventListener('load', init);
	
	function init() {
		var mymap = L.map('mapid', {zoomControl: false}).setView([47.65595008733427, -122.30885982513426], 15);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXN0ZWZhbjA3NCIsImEiOiJjanozbm83OXUwNHRqM25tcm84MHYxd3cyIn0.MSuA8qUuoo1A2aWOcXI5ng', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.streets',
				accessToken: 'your.mapbox.access.token'
		}).addTo(mymap);
		new L.Control.Zoom({ position: 'topright' }).addTo(mymap);
		
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