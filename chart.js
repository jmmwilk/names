'use strict';

// let chartTitle = name
// let NrOfAxisXLabels = numberOfYears;


export function createChart (parent, chartTitle, axisXTitle, axisYTitle, axisXLabels, axisYLabels, NrOfAxisXLabels, NrOfAxisYLabels, totalNumbers, numbers) {
	cleanUpChart ();
	createChartContainer (parent, NrOfAxisXLabels);
	createChartTitle (chartTitle);
	createAxises (axisXTitle, axisYTitle, NrOfAxisXLabels, NrOfAxisYLabels)
	createBarsContainers (NrOfAxisXLabels, totalNumbers, numbers, axisXLabels);
	createAxisYLabels (NrOfAxisYLabels, axisYLabels);
	createGridlines (NrOfAxisXLabels, NrOfAxisYLabels);
}

function cleanUpChart () {
	removeBarContainers ();
	removeAxisYLabels ();
}

function createChartContainer (parent, NrOfAxisXLabels) {
	let chart = document.createElement('div');
	chart.id = 'chart-container';
	chart.style.width = NrOfAxisXLabels * 40 + 'px';
	parent.appendChild(chart);
}

function createChartTitle (chartTitleText) {
	let chartTitle = document.createElement('div');
	let chart = document.getElementById('chart-container');
	chartTitle.id = 'chart-title';
	chartTitle.className = 'main-color';
	chartTitle.innerText = chartTitleText;
	chart.appendChild(chartTitle);
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
//		createInformationIcon (bar);
//		fillInfoIcon (i);
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
