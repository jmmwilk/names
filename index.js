'use strict';

let name = '';
let sex = '';
let table = [];
let childrenBorn = [378348, 368205, 353765, 351072, 356131, 364383, 374244, 387873, 414499, 417589, 413300, 388416, 386257, 369576, 375160, 369308, 382257, 402000, 388200, 374800];
let girlsBorn = [];
let boysBorn = [];
let numberOfPlaces = [];



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
	console.log(table);
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
	name = input.value;
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
		axisLabel.className = 'axis-label';
		axisLabel.style.bottom = i*80 + 'px';
		axisLabel.innerText = i*10;
	}
}

function createBarsContainers () {
	for (let i=0; i<20; i++) {
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
	let bar = document.createElement('div');
	bar.className = 'bar';
	barContainer.appendChild(bar);
	createNumberBox (bar, i);
	let numberPer1000 = countPer1000 (i);
	console.log ('numberPer1000', numberPer1000)
	bar.style.height = numberPer1000 * 8 + 'px';
}

function createYearBox (barContainer, i) {
	let yearBox = document.createElement('div');
	yearBox.className = 'year-box';
	barContainer.appendChild(yearBox);
	if (i<10) {
		yearBox.innerText = '0' + i;
	} else {
		yearBox.innerText = i;
	}
}

function createNumberBox (bar, i) {
	let numberBox = document.createElement('div');
	numberBox.className = 'number-box';
	bar.appendChild(numberBox);
	fillNumberBox (numberBox, i)
	let place = countPlace (i);
	console.log ('place', place);
	console.log ('childrenBorn', childrenBorn[i])
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
	console.log ('number', number)
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
	console.log (place)
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


