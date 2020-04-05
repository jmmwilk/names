'use strict';

let name = '';

function showHomeScreen () {
	cleanUpHomeScreen ();
	let checkButton = document.getElementById('check');
	checkButton.onclick = check;
}

function check () {
	saveInput ();
	cleanUpApplication ();
	saveInput ();
	fillName ();
	createBars ();
}

function cleanUpApplication () {
	let homeScreen = document.getElementById('home-screen');
	homeScreen.style.display = 'none';
	let application = document.getElementById('application');
	application.style.display = '';
}

function cleanUpHomeScreen () {
	name = '';
	let homeScreen = document.getElementById('home-screen');
	homeScreen.style.display = '';
	let application = document.getElementById('application');
	application.style.display = 'none';
}

function saveInput () {
	let input = document.getElementById('name-input');
	name = input.value;
	console.log(name);
}

function fillName () {
	let givenName = document.getElementById('given-name');
	givenName.innerText = name;
}

function createBars () {
	for (let i=0; i<20; i++) {
		createBar (i);
	}
}

function createBar (i) {
	let bar = document.createElement('div');
	bar.className = 'bar';
	let chartContainer = document.getElementById('chart-container');
	chartContainer.appendChild(bar);
	bar.style.left = (40 + i*30) + 'px';
}