'use strict';

// let chartTitle = name
// let NrOfAxisXLabels = numberOfYears;


export function createChart (parent, chartTitle, axisXTitle, axisYTitle, NrOfAxisXLabels, totalNumbers, numbers) {
	cleanUpChart ();
	createChartContainer (parent);
	createChartTitle (chartTitle);
	createAxises (axisXTitle, axisYTitle)
	createBarsContainers (NrOfAxisXLabels, totalNumbers, numbers);
	createAxisLabels ();
	createGridlines ();
}

function cleanUpChart () {
	removeBarContainers ();
	removeAxisYLabels ();
}

function createChartContainer (parent) {
	let chart = document.createElement('div');
	chart.id = 'chart-container';
	parent.appendChild(chart);
}

function createChartTitle (chartTitleText) {
	let chartTitle = document.createElement('div');
	chartTitle.id = 'chart-title';
	chartTitle.className = 'main-color';
	chartTitle.innerText = chartTitleText;
}

function createAxises (axisXTitle, axisYTitle) {
	let axisX = document.createElement('div');
	axisX.id = 'axis-x';
	axisX.className = 'axis';
	createAxisTitle (axisX, 'x', axisXTitle);

	let axisY = document.createElement('div');
	axisY.id = 'axis-y';
	axisY.className = 'axis';
	createAxisTitle (axisY, 'y', axisYTitle);
}

function createAxisTitle (axis, axisName, titleText) {
	let axisTitle = document.createElement('div');
	axisTitle.id = 'axis-' + axisName + '-title';
	axis.className = 'axis-title';
	axis.appendChild(axisTitle);
	axisTitle.innerText = titleText;
}

function createAxisYLabels () {
	let axisYContainer = document.getElementById('axis-y-container');
	for (let i=1; i<6; i++) {
		let axisLabel = document.createElement('div');
		axisYContainer.appendChild(axisLabel);
		axisLabel.className = 'axis-label axis-y-color';
		axisLabel.style.bottom = i*80 - 9 + 'px';
		axisLabel.innerText = i*10;
	}
}

function removeAxisYLabels () {
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

function createBarsContainers (NrOfAxisXLabels, totalNumbers, numbers) {
	for (let i=0; i<NrOfAxisXLabels; i++) {
		createBarContainer (i, totalNumbers);
	}
}

function createBarContainer (i, totalNumbers, numbers) {
	let barContainer = document.createElement('div');
	barContainer.className = 'bar-container';
	let chartContainer = document.getElementById('chart-container');
	chartContainer.appendChild(barContainer);
	barContainer.style.left = (10 + i*40) + 'px';
	createBar (barContainer, i, totalNumbers);
	createLabelXBox (barContainer, i);
}

function removeBarContainers () {
	let chartContainer = document.getElementById('chart-container');
	let barContainers = document.getElementsByClassName('bar-container');
	Array.from(barContainers).forEach(function(barContainer) {
	chartContainer.removeChild(barContainer);
	})
}

function createBar (barContainer, i, totalNumbers, numbers) {
	let numberPer1000 = countPer1000 (i, totalNumbers, numbers);
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

function countPer1000 (i, totalNumbers, numbers) {
	let childrenWithThisName;
	for (let x=1; x<table.length; x++) {
  		if (table[x][0] == i + 2000 && table[x][1] == name) {
  			childrenWithThisName = parseInt(table[x][2]);
  		}
  	}
  	let numberPer1000 = childrenWithThisName / totalNumbers[i] * 1000;
  	return (numberPer1000)
}

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
	if (i<10) {
		axisXLabel.innerText = '\'' + '0' + i;
	} else {
		axisXLabel.innerText = '\'' + i;
	}
}


