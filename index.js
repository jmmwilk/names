'use strict';

let name = '';
let sex = '';
let table = [];
let childrenBorn = [378348, 368205, 353765, 351072, 356131, 364383, 374244, 387873, 414499, 417589, 413300, 388416, 386257, 369576, 375160, 369308, 382257, 402000, 388200, 374800];
let girlsBorn = [];
let boysBorn = [];
let numberOfPlaces = [];
let numberOfYears = 20;



$.get( "./imiona.csv", function( data ) {
	var results = Papa.parse(data);
	table = results.data
  	for (let i=1; i<table.length; i++) {
  		if (table[i][1] == name) {
  		}
  	}
});



function showHomeScreen () {
//	countPlaces ();
//	countChildrenInYear2000 ();
	for (let z=0; z<20; z++) {
		countAllPlaces (z);
	}
	
	cleanUpHomeScreen ();
	let checkButton = document.getElementById('check');
	checkButton.onclick = check;
	let back = document.getElementById('back');
	back.onclick = showHomeScreen;
	let input = document.getElementById('name-input');
	input.onclick = hideFeedbackName;
	let femaleButton = document.getElementById('female-button');
	femaleButton.onclick = function () {
		saveSexK ();
		chooseFemaleButton ();
		hideFeedbackSex ();
	} 
	let maleButton = document.getElementById('male-button');
	maleButton.onclick = function () {
		saveSexM ();
		chooseMaleButton ();
		hideFeedbackSex ();
	}
}

function findName () {
  	for (let i=1; i<table.length; i++) {
  		if (table[i][1] == name && table[i][3] == sex) {
  			let year = table[i][0];
  			let nuberOfChildren = table[i][2];
  		}
  	}
}

function chooseMaleButton () {
	let maleButton = document.getElementById('male-button');
	maleButton.style.color = 'red';
	let femaleButton = document.getElementById('female-button');
	femaleButton.style.color = 'black';
}

function chooseFemaleButton () {
	let femaleButton = document.getElementById('female-button');
	femaleButton.style.color = 'red';
	let maleButton = document.getElementById('male-button');
	maleButton.style.color = 'black';
}

function check () {
	if (sex == '') {
		showFeedbackSex ();
	} else {
		if (isNameFilled () == false) {
		showFeedback ();
		}
		if (isNameFilled () == true) {
			goToApplication ();
		} 
	}
}

function goToApplication () {
	saveInput ();
	cleanUpApplication ();
	saveInput ();
	fillName ();
	createBarsContainers ();
	findName ();
	createAxisLabels ();
	createGridlines ();
	fillInformation ();
	enableInfoIcon ();
	// let axisYTitile = document.getElementById('axis-y-title');
	// axisYTitile.style.top = 
}

function enableInfoIcon () {
	let informationIcon = document.getElementById('information-icon');
	informationIcon.onclick = showInformation;
	informationIcon.onmouseover = function () {informationIcon.style.top = '-50px'};
	informationIcon.onmouseout = function () {informationIcon.style.top = '-45px'};
}

function saveSexM () {
	sex = 'M';
}

function saveSexK () {
	sex = 'K';
}

function isNameFilled () {
	let input = document.getElementById('name-input');
// check if there is name in the file
	return true

}

function showFeedbackName () {
	let feedback = document.getElementById('feedback-name');
	feedback.style.display = '';
}

function hideFeedbackName () {
	let feedback = document.getElementById('feedback-name');
	feedback.style.display = 'none';
}

function showFeedbackSex () {
	let feedback = document.getElementById('feedback-sex');
	feedback.style.display = '';
}

function hideFeedbackSex () {
	let feedback = document.getElementById('feedback-sex');
	feedback.style.display = 'none';
}

function cleanUpApplication () {
	let homeScreen = document.getElementById('home-screen');
	homeScreen.style.display = 'none';
	let application = document.getElementById('application');
	application.style.display = '';
	removeBarContainers ();
	hideInformation ();
	removeInfoNumberBox ();
	removeAxisLabels ();
}

function hideInformation () {
	let info = document.getElementById("info-container");
	info.style.display = 'none';
}

function showInformation () {
	let info = document.getElementById("info-container");
	info.style.display = '';
}

function cleanUpHomeScreen () {
	name = '';
	let homeScreen = document.getElementById('home-screen');
	homeScreen.style.display = '';
	let application = document.getElementById('application');
	application.style.display = 'none';
	let input = document.getElementById('name-input');
	input.value = '';
	hideFeedbackName ();
	hideFeedbackSex ();
	clearSexButton ();
}

function clearSexButton () {
	sex = '';
	let femaleButton = document.getElementById('female-button');
	femaleButton.style.color = 'black';
	let maleButton = document.getElementById('male-button');
	maleButton.style.color = 'black';
}

function saveInput () {
	let input = document.getElementById('name-input');
	let str = input.value;
	str.toUpperCase();
	name = str.toUpperCase();
	console.log(name);
}

function fillName () {
	let givenName = document.getElementById('given-name');
	givenName.innerText = name;
}

function createAxisLabels () {
	let axisYContainer = document.getElementById('axis-y-container');
	for (let i=1; i<6; i++) {
		let axisLabel = document.createElement('div');
		axisYContainer.appendChild(axisLabel);
		axisLabel.className = 'axis-label axis-y-color';
		axisLabel.style.bottom = i*80 - 9 + 'px';
		axisLabel.innerText = i*10;
	}
}

function removeAxisLabels () {
	let axisYContainer = document.getElementById('axis-y-container');
	let axisLabels = document.getElementsByClassName('axis-label');
	Array.from(axisLabels).forEach(function(axisLabel){
		axisYContainer.removeChild(axisLabel);
	})
}

function createGridlines () {
	let chartContainer = document.getElementById('chart-container');
	for (let i=1; i<11; i++) {
		let gridline = document.createElement('div');
		chartContainer.appendChild(gridline);
		gridline.className = 'gridline';
		gridline.style.bottom = i*40 + 'px';
	}
}

function createBarsContainers () {
	for (let i=0; i<numberOfYears; i++) {
		createBarContainer (i);
	}
}

function createBarContainer (i) {
	let barContainer = document.createElement('div');
	barContainer.className = 'bar-container';
	let chartContainer = document.getElementById('chart-container');
	chartContainer.appendChild(barContainer);
	barContainer.style.left = (10 + i*40) + 'px';
	createBar (barContainer, i);
	createYearBox (barContainer, i);

}

function removeBarContainers () {
	let chartContainer = document.getElementById('chart-container');
	let barContainers = document.getElementsByClassName('bar-container');
	Array.from(barContainers).forEach(function(barContainer) {
	chartContainer.removeChild(barContainer);
	})
}

function createBar (barContainer, i) {
	let numberPer1000 = countPer1000 (i);
	if (String(numberPer1000) == 'NaN') {
		return
	}
	let bar = document.createElement('div');
	bar.className = 'bar';
	barContainer.appendChild(bar);
	createNumberBox (bar, i);
	if (i == numberOfYears-1) {
		createInformationIcon (bar);
		fillInfoIcon (i);
	}
	bar.style.height = numberPer1000 * 8 + 'px';
	addBarImage (bar, numberPer1000);
	
}

function fillInfoIcon (i) {
	let number = countChildrenWithThisName (i);
	let infoNumberIcon = document.getElementById('info-number-icon');
	let numberBox = document.createElement('div');
	numberBox.id = 'info-number-box'
	numberBox.className = 'number-box info-number-box';
	infoNumberIcon.appendChild(numberBox);
	fillNumberBox (numberBox, i)
}

function removeInfoNumberBox () {
	let infoNumberIcon = document.getElementById('info-number-icon');
	let numberBoxes = document.getElementsByClassName('info-number-box')
	Array.from(numberBoxes).forEach(function(numberBox) {
	infoNumberIcon.removeChild(numberBox);
	})
}

function addBarImage (bar, numberPer1000) {
	let barImage = document.createElement('img');
	bar.appendChild(barImage);
	barImage.src = 'bar.png';
	barImage.className = 'bar-image';
	barImage.style.height = numberPer1000 * 8 + 'px';
}

function createYearBox (barContainer, i) {
	let yearBox = document.createElement('div');
	yearBox.className = 'year-box';
	barContainer.appendChild(yearBox);
	if (i<10) {
		yearBox.innerText = '\'' + '0' + i;
	} else {
		yearBox.innerText = '\'' + i;
	}
}

function createNumberBox (bar, i) {
	let numberBox = document.createElement('div');
	numberBox.className = 'number-box chart-number-box';
	bar.appendChild(numberBox);
	fillNumberBox (numberBox, i)
	let place = countPlace (i);
}

function createInformationIcon (bar) {
	let informationIcon = document.createElement('img');
	informationIcon.id = 'information-icon'
	informationIcon.src = 'grey-i-icon.png'
	informationIcon.className = "information-icon";
	bar.appendChild(informationIcon);
	informationIcon.style.left = '40px';
	informationIcon.style.top = '-45px';
}

function fillNumberBox (numberBox, i) {
	let number = countChildrenWithThisName (i);
	numberBox.innerText = number;
}

function countChildrenWithThisName (i) {
	let number;
	for (let x=1; x<table.length; x++) {
		if (table[x][0] == 2000 + i && table[x][1] == name) {
			number = table[x][2]
		}
	}
	return number
}

function countPlace (i) {
	let place = 1;
	for (let x=1; x<table.length; x++) {
		if (table[x][0] == 2000 + i) {
			if (table[x][1] < table[x-1][1]) {
				place = place + 1;
			}
			if (table[x][1] == name) {
				return place
			}
		}
	}
}

function countAllPlaces (i) {
	let place = 0;
	for (let x=1; x<table.length; x++) {
		if (table[x][0] == 2000 + i) {
			if (table[x][1] < table[x-1][1]) {
				place = place + 1;
			}
		}
	}
}

// function countPlaces () {
// 	for (let i=2000; i<2020; i++) {
// 		let number = countChildrenInYear (i);
// 		numberOfPlaces.push (number);
// 	}
// 	console.log (numberOfPlaces);
// }

// function countChildrenInYear (i) {
// 	let number = 0;
// 	for (let x=1; x<table.length; x++) {
//   		if (table[x][0] == i) {
//   			number = number + 1;
//   		}
//   	}
// 	return number
// }

// function countChildrenInYear2000 () {
// 	let number = 0;
// 	for (let x=1; x<table.length; x++) {
//   		if (table[x][0] == 2000) {
//   			number = number + parseInt(table[x][2]);
//   		}
//   	}
// 	console.log(number)
// }

function countPer1000 (i) {
	let allChildren = childrenBorn[i];
	let childrenWithThisName;
	for (let x=1; x<table.length; x++) {
  		if (table[x][0] == i + 2000 && table[x][1] == name) {
  			childrenWithThisName = parseInt(table[x][2]);
  		}
  	}
  	let numberPer1000 = childrenWithThisName / allChildren * 1000;
  	return (numberPer1000)
}

function fillInformation () {
	let infoNumberText = document.getElementById('info-number-text');
	infoNumberText.innerText = 'Liczba nad słupkiem to liczba dzieci, które w danym roku zostały zarejestrowane jako ' + name + '.'
	let infoBarText = document.getElementById('info-bar-text');
	infoBarText.innerText = 'Wysokość słupka pokazuje, ile to dzieci na tysiąc. Możemy dzięki temu porównać, czy imię ' + name + ' zyskiwało czy traciło na popularności. Liczba urodzeń w poszczególnych latach różni się, dlatego dla miarodajnego porównania sprawdzamy liczbę dzieci o danym imieniu na tysiąc.'
	let gusText = document.getElementById('gus-text');
	gusText.innerText = 'Dane pochodzą ze strony Głównego Urzędu Statystycznego.';
}


