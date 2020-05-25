'use strict';

// let chartTitle = name
// let NrOfAxisXLabels = numberOfYears;


export function createChart (parent, chartTitle, axisXTitle, axisYTitle, axisXLabels, axisYLabels, NrOfAxisXLabels, NrOfAxisYLabels, totalNumbers, numbers, textInInfoNumber, textInInfoBar) {
	cleanUpChart (parent);
	createChartContainer (parent, NrOfAxisXLabels);
	createChartTitle (chartTitle);
	createAxises (axisXTitle, axisYTitle, NrOfAxisXLabels, NrOfAxisYLabels)
	createInformation (textInInfoNumber, textInInfoBar);
	createBarsContainers (NrOfAxisXLabels, totalNumbers, numbers, axisXLabels);
	createAxisYLabels (NrOfAxisYLabels, axisYLabels);
	createGridlines (NrOfAxisXLabels, NrOfAxisYLabels);
	hideInformation ();
	enableInfoIcon ();
}

function cleanUpChart (parent) {
	// removeBarContainers ();
	// removeAxisYLabels ();
	 removeInformation ();
	// removeChartTitle ()
	removeChartContainer (parent);
}

function createChartContainer (parent, NrOfAxisXLabels) {
	let chart = document.createElement('div');
	chart.id = 'chart-container';
	chart.className = 'chart';
	chart.style.width = NrOfAxisXLabels * 40 + 'px';
	parent.appendChild(chart);
}

function removeChartContainer (parent) {
	let chartContainers = document.getElementsByClassName('chart');
	Array.from(chartContainers).forEach(function(chartContainer){
		parent.removeChild(chartContainer);
	})
}

function createChartTitle (chartTitleText) {
	let chartTitle = document.createElement('div');
	let chart = document.getElementById('chart-container');
	chartTitle.id = 'chart-title';
	chartTitle.className = 'main-color chart-title';
	chartTitle.innerText = chartTitleText;
	chart.appendChild(chartTitle);
}

function removeChartTitle () {
	let chart = document.getElementById('chart-container');
	let chartTitles = document.getElementsByClassName('chart-title');
	Array.from(chartTitles).forEach(function(chartTitle){
		chart.removeChild(chartTitle);
	})
}

function createAxises (axisXTitle, axisYTitle, NrOfAxisXLabels, NrOfAxisYLabels) {
	let chart = document.getElementById('chart-container');
	let axisX = document.createElement('div');
	axisX.id = 'axis-x';
	axisX.className = 'axis';
	axisX.style.width = (NrOfAxisXLabels * 40) +'px';
	chart.appendChild(axisX);
	createAxisTitle (axisX, 'x', axisXTitle);

	let axisY = document.createElement('div');
	axisY.id = 'axis-y';
	axisY.className = 'axis';
	axisY.style.height = NrOfAxisYLabels*80 +'px';
	chart.appendChild(axisY);
	createAxisTitle (axisY, 'y', axisYTitle);
}

function createAxisTitle (axis, axisName, titleText) {
	let axisTitle = document.createElement('div');
	axisTitle.id = 'axis-' + axisName + '-title';
	axisTitle.className = 'axis-title';
	axis.appendChild(axisTitle);
	axisTitle.innerText = titleText;
}

function createAxisYLabels (NrOfAxisYLabels, axisYLabels) {
	let axisYContainer = document.getElementById('axis-y');
	for (let i=0; i<NrOfAxisYLabels; i++) {
		let axisLabel = document.createElement('div');
		axisYContainer.appendChild(axisLabel);
		axisLabel.className = 'axis-label axis-y-color';
		axisLabel.style.bottom = (i+1)*80 - 9 + 'px';
		axisLabel.innerText = axisYLabels[i];
	}
}

function removeAxisYLabels () {
	let axisYContainer = document.getElementById('axis-y');
	let axisLabels = document.getElementsByClassName('axis-label');
	Array.from(axisLabels).forEach(function(axisLabel){
		axisYContainer.removeChild(axisLabel);
	})
}

function createGridlines (NrOfAxisXLabels, NrOfAxisYLabels) {
	let chartContainer = document.getElementById('chart-container');
	for (let i=1; i<=NrOfAxisYLabels*2; i++) {
		let gridline = document.createElement('div');
		chartContainer.appendChild(gridline);
		gridline.className = 'gridline';
		gridline.style.bottom = i*40 + 'px';
		gridline.style.width = NrOfAxisXLabels * 40 + 'px';
	}
}

function createBarsContainers (NrOfAxisXLabels, totalNumbers, numbers, axisXLabels) {
	for (let i=0; i<NrOfAxisXLabels; i++) {
		createBarContainer (NrOfAxisXLabels, i, totalNumbers, numbers, axisXLabels);
	}
}

function createBarContainer (NrOfAxisXLabels, i, totalNumbers, numbers, axisXLabels) {
	let barContainer = document.createElement('div');
	barContainer.className = 'bar-container';
	let chartContainer = document.getElementById('chart-container');
	chartContainer.appendChild(barContainer);
	barContainer.style.left = (10 + i*40) + 'px';
	createBar (barContainer, NrOfAxisXLabels, i, totalNumbers, numbers);
	createLabelXBox (barContainer, i, axisXLabels);
}

function removeBarContainers () {
	let chartContainer = document.getElementById('chart-container');
	let barContainers = document.getElementsByClassName('bar-container');
	Array.from(barContainers).forEach(function(barContainer) {
	chartContainer.removeChild(barContainer);
	})
}

function createBar (barContainer, NrOfAxisXLabels, i, totalNumbers, numbers) {
	let numberPer1000 = numbers[i] / totalNumbers[i] * 1000;
	if (String(numberPer1000) == 'NaN') {
		return
	}
	let bar = document.createElement('div');
	bar.className = 'bar';
	barContainer.appendChild(bar);
	createNumberBox (bar, i, numbers);
	if (i == NrOfAxisXLabels-1) {
		createInformationIcon (bar);
		fillInfoIcon (i, numbers);
	}
	bar.style.height = numberPer1000 * 8 + 'px';
	addBarImage (bar, numberPer1000);
}

function countPer1000 (i, totalNumbers, numbers) {
	let numberPer1000 = numbers[i] / totalNumbers[i] * 1000;
}

function createNumberBox (bar, i, numbers) {
	let numberBox = document.createElement('div');
	numberBox.className = 'number-box chart-number-box main-color';
	bar.appendChild(numberBox);
	fillNumberBox (numberBox, i, numbers)
//	let place = countPlace (i);
}

function fillNumberBox (numberBox, i, numbers) {
	let number = numbers[i];
	numberBox.innerText = number;
}

// function countPer1000 (i, totalNumbers, numbers) {
// 	let childrenWithThisName;
// 	for (let x=1; x<table.length; x++) {
//   		if (table[x][0] == i + 2000 && table[x][1] == name) {
//   			childrenWithThisName = parseInt(table[x][2]);
//   		}
//   	}
//   	let numberPer1000 = childrenWithThisName / totalNumbers[i] * 1000;
//   	return (numberPer1000)
// }

function addBarImage (bar, numberPer1000) {
	let barImage = document.createElement('img');
	bar.appendChild(barImage);
	barImage.src = 'bar.png';
	barImage.className = 'bar-image';
	barImage.style.height = numberPer1000 * 8 + 'px';
}

function createAxisXLabels (barContainer, i) {
	let axisXLabel = document.createElement('div');
	axisXLabel.className = 'year-box';
	barContainer.appendChild(axisXLabel);
	axisXLabel.innerText = axisXLabels[i];
}

function createLabelXBox (barContainer, i, axisXLabels) {
	let labelXBox = document.createElement('div');
	labelXBox.className = 'label-x-box';
	barContainer.appendChild(labelXBox);
	labelXBox.innerText = axisXLabels[i];
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

function createInformation (textInInfoNumber, textInInfoBar) {
	let application = document.getElementById('application');
	let infoContainer = document.createElement('div');
	infoContainer.id = 'info-container';
	infoContainer.className = 'information';
	application.appendChild(infoContainer);
	createInfoTitle (infoContainer);
	createInfoNumberContainer (infoContainer, textInInfoNumber);
	createInfoBarContainer (infoContainer, textInInfoBar);
}

function createInfoBarContainer (infoContainer, textInInfoBar) {
	let infoBarContainer = document.createElement('div');
	infoBarContainer.id = 'info-bar-container';
	infoContainer.appendChild(infoBarContainer);
	let infoBarIconContainer = document.createElement('div');
	infoBarIconContainer.id = 'info-bar-icon-container';
	infoBarIconContainer.className = 'icon-box';
	infoBarContainer.appendChild(infoBarIconContainer);
	let infoBarIcon = document.createElement('img');
	infoBarIcon.id = 'info-bar-icon';
	infoBarIcon.src = 'bar.png';
	infoBarIconContainer.appendChild(infoBarIcon);
	let infoBarText = document.createElement('div');
	infoBarText.id = 'info-bar-text';
	infoBarText.innerText = textInInfoBar;
	infoBarContainer.appendChild(infoBarText);
}

function createInfoNumberContainer (infoContainer, textInInfoNumber) {
	let infoNumberContainer = document.createElement('div');
	infoNumberContainer.id = 'info-number-container';
	infoContainer.appendChild(infoNumberContainer);
	let infoNumberIcon = document.createElement('div');
	infoNumberIcon.id = ('info-number-icon');
	infoNumberIcon.className = 'icon-box';
	infoNumberContainer.appendChild(infoNumberIcon);
	let infoNumberText = document.createElement('div');
	infoNumberText.id = 'info-number-text';
	infoNumberText.innerText = textInInfoNumber
	infoNumberContainer.appendChild(infoNumberText);
}

function createInfoTitle (infoContainer) {
	let infoTitle = document.createElement('div');
	infoTitle.id = 'info-title';
	infoContainer.appendChild(infoTitle);
	let infoIconContainer = document.createElement('div');
	infoIconContainer.id = 'info-icon-container';
	infoIconContainer.className = 'icon-box';
	infoTitle.appendChild(infoIconContainer);
	let infoIcon = document.createElement('img');
	infoIcon.id = 'information-icon-2';
	infoIcon.src = 'i-icon.png';
	infoIcon.className = 'information-icon';
	infoIconContainer.appendChild(infoIcon);
	let info = document.createElement('div');
	info.id = 'information';
	info.innerText = 'Informacja';
	infoTitle.appendChild(info);
}

function fillInfoIcon (i, numbers) {
	let number = numbers[i];
	let infoNumberIcon = document.getElementById('info-number-icon');
	let numberBox = document.createElement('div');
	numberBox.id = 'info-number-box'
	numberBox.className = 'number-box info-number-box main-color';
	infoNumberIcon.appendChild(numberBox);
	fillNumberBox (numberBox, i, numbers)
}

function enableInfoIcon () {
	let informationIcon = document.getElementById('information-icon');
	informationIcon.onclick = showInformation;
	informationIcon.onmouseover = function () {informationIcon.style.top = '-50px'};
	informationIcon.onmouseout = function () {informationIcon.style.top = '-45px'};
}

function hideInformation () {
	let info = document.getElementById('info-container');
	info.style.display = 'none';
}

function showInformation () {
	let info = document.getElementById('info-container');
	info.style.display = '';
	console.log('dupa zbita')
}

function removeInformation () {
	let application = document.getElementById('application');
	let informations = document.getElementsByClassName('information');
	Array.from(informations).forEach(function(information){
		application.removeChild(information);
	})
}
