if (/Explorer/.test(navigator.userAgent) == true) {
	document.write("hey, don't use ie. that's not a good browser :(");
}

//debug
var loadInfo

var boxInterval;
var inLoop = false;
var lastBox = "b";
var clicked = false;
var box = document.getElementById("b");

var b = false; //box
var ab = false; //antiBox
var sb = false; //superBox

var points = 0;
var pointsInBank = 0;
var bankInterest = 0.01;
var pointsPerBox = 1;

var antiBoxChance = 20;
var superBoxChance = 0;

var antiBoxPoints = 20; //points subtracted using antiBoxes (income*antiBoxPoints=true amount lost)
var superBoxPoints = 2; //points added by superBoxes (income*superBoxPoints=true amount gained)

var timeBetweenBoxes = 2000;

//upgrade costs/vars
var timeUCost = 20;
var pointsPerBoxUCost = 100;
var antiBoxChanceUCost = 50;
var antiBoxPointsUCost = 50;
var superBoxChanceUCost = 75;
var superBoxPointsUCost = 100;

//crude inventory
var amntOfShields = 0;

function showTheBoxes() {
	var boxChance = Math.floor(Math.random() * 100) + 1; //int to choose boxes in % //random int 1-100
	if(!clicked) {
		if(boxChance <= antiBoxChance) {
			if(amntOfShields < 1) {
				box.innerHTML = '<img src="../img/ab.png"></img>AntiBox! Want to lose '+calcAntiBox()+' boxes? <br><button onclick="t()">Take</button><button onclick="l()">Leave</button>';
				lastBox = "ab";
			} else {
				box.innerHTML = '<img src="../img/sab.png"></img>Shielded AntiBox! Want to get '+pointsPerBox+' boxes? <br><button onclick="t()">Take</button><button onclick="l()">Leave</button>'
				lastBox = "b";
				amntOfShields = amntOfShields - 1;
			}
			clicked = true;
		} else if(boxChance >= antiBoxChance && boxChance < antiBoxChance+superBoxChance) {
			box.innerHTML = '<img src="../img/sb.png"></img>SuperBox! Want to get '+calcSuperBox()+' boxes? <br><button onclick="t()()">Take</button><button onclick="l()">Leave</button>';
			clicked = true;
			lastBox = "sb";
		} else {
			box.innerHTML = '<img src="../img/b.png"></img>Box! Want '+pointsPerBox+' boxes? <br><button onclick="t()">Take</button><button onclick="l()">Leave</button>';
			clicked = true;
			lastBox = "b";
		}
		pointsInBank = pointsInBank+(pointsInBank*bankInterest);
	}
	updateLook();
}

//leave button
function l(){ 
	box.innerHTML = "<br>";
	if(lastBox!="ab") {
		inLoop = false;
		clearInterval(boxInterval);
	} else {
		lastBox = "b";
	}
	clicked = false;
	updateLook();
}
//take button/give points
function t(){
	if(clicked) {
		if(lastBox == "b") {
			points = points+pointsPerBox;
			box.innerHTML = "<br>";
		}else if(lastBox == "ab") {
			points = points-(calcAntiBox());
			box.innerHTML = "<br>";
		}else if (lastBox == "sb") {
			points = points+(calcSuperBox());
			box.innerHTML = "<br>";
		}
		if (points < 0) {
			points = 0;
		}
		clicked = false;
	}
	updateLook();
}


function startLoop() {
	if(!inLoop) {
		boxInterval = setInterval("showTheBoxes()", timeBetweenBoxes);
		inLoop = true;
	} else {
	}
}

//upgrades with standard convention, 
function timeUpgrade() {
	if(points >= timeUCost) {                  //check points
		points = points - timeUCost;           //subtract points
		timeBetweenBoxes = timeBetweenBoxes/2; //apply upgrade
		if(inLoop) {
			clearInterval(boxInterval);
			inLoop = false;
			startLoop();
		}
		timeUCost = timeUCost*2;               //change upgrade price
		updateLook();                          //updateLook();
	}
}
function pointsPerBoxUpgrade() {
	if(points >= pointsPerBoxUCost) {
		points = points - pointsPerBoxUCost;
		pointsPerBox = pointsPerBox+1;
		pointsPerBoxUCost = pointsPerBoxUCost*1.4
		updateLook();
	}
}
function antiBoxChanceUpgrade() {
	if(points >= antiBoxChanceUCost) {
		points = points - antiBoxChanceUCost;
		antiBoxChance = antiBoxChance*0.75;
		antiBoxChanceUCost = antiBoxChanceUCost*1.5;
		updateLook();
	}
}
function antiBoxPointsUpgrade() {
	if(points >= antiBoxPointsUCost) {
		points = points - antiBoxPointsUCost;
		antiBoxPoints = antiBoxPoints*0.75;
		antiBoxPointsUCost = antiBoxPointsUCost*1.3;
		updateLook();
	}
}
function superBoxChanceUpgrade() {
	if(points >= superBoxChanceUCost) {
		points = points - superBoxChanceUCost;
		superBoxChance = (superBoxChance+1)*1.1;
		superBoxChanceUCost = superBoxChanceUCost*1.4
		updateLook();
	}
}
function superBoxPointsUpgrade() {
	if(points >= superBoxPointsUCost) {
		points = points - superBoxPointsUCost;
		superBoxPoints = superBoxPoints+1;
		superBoxPointsUCost = superBoxPointsUCost*1.3
		updateLook();
	}
}
function interestUpgrade() {
	if(points >= calcInterest()) {
		points = points - calcInterest();
		bankInterest = bankInterest + 0.01;
	}
}

function buyShield() {
	if(points >= calcShield()) {
		points = points - calcShield();
		amntOfShields = amntOfShields + 1;
		updateLook();
	}
}

function calcAntiBox() {
	return antiBoxPoints*pointsPerBox*(superBoxPoints/2);
}
function calcSuperBox() {
	return superBoxPoints*pointsPerBox;
}
function calcShield() {
	return calcAntiBox()*0.7;
}
function calcInterest() {
	return Math.pow(5000,(bankInterest*100))
}

function deposit() {
	try {
		if(document.getElementById("bankInput").value <= points && document.getElementById("bankInput").value > 0) {
			points = points - parseFloat(document.getElementById("bankInput").value);
			pointsInBank = pointsInBank + parseFloat(document.getElementById("bankInput").value);
		}
	} catch(e) {
	}
	updateLook();
}
function withdraw() {
	try {
		if(document.getElementById("bankOutput").value <= pointsInBank && document.getElementById("bankOutput").value > 0) {
			pointsInBank = pointsInBank - parseFloat(document.getElementById("bankOutput").value);
			points = points + parseFloat(document.getElementById("bankOutput").value);
		}
	} catch(e) {
	}
	updateLook();
}

function save() { //self-explanatory. vars is /'s+1
	document.getElementById("ioBox").value = 
		Math.floor(points)+"/"+
		pointsInBank+"/"+
		bankInterest+"/"+
		pointsPerBox+"/"+
		antiBoxChance+"/"+
		superBoxChance+"/"+
		antiBoxPoints+"/"+
		superBoxPoints+"/"+
		timeBetweenBoxes+"/"+
		timeUCost+"/"+
		pointsPerBoxUCost+"/"+
		antiBoxChanceUCost+"/"+
		antiBoxPointsUCost+"/"+
		superBoxChanceUCost+"/"+
        superBoxPointsUCost+"/"+
		amntOfShields;
}
function load() {
	if(document.getElementById("ioBox").value != "") {
		loadInfo = document.getElementById("ioBox").value.split(/\x2f/);
		var i = 0;
		points=parseFloat(loadInfo[i]); i++;
		pointsInBank=parseFloat(loadInfo[i]); i++;
		bankInterest=parseFloat(loadInfo[i]); i++;
		pointsPerBox=parseFloat(loadInfo[i]); i++;
		antiBoxChance=parseFloat(loadInfo[i]); i++;
		superBoxChance=parseFloat(loadInfo[i]); i++;
		antiBoxPoints=parseFloat(loadInfo[i]); i++;	
		superBoxPoints=parseFloat(loadInfo[i]);	i++;	
		timeBetweenBoxes=parseFloat(loadInfo[i]); i++;	
		timeUCost=parseFloat(loadInfo[i]); i++;
		pointsPerBoxUCost=parseFloat(loadInfo[i]); i++;
		antiBoxChanceUCost=parseFloat(loadInfo[i]); i++;
		antiBoxPointsUCost=parseFloat(loadInfo[i]); i++;
		superBoxChanceUCost=parseFloat(loadInfo[i]); i++;
		superBoxPointsUCost=parseFloat(loadInfo[i]); i++;
		amntOfShields=parseFloat(loadInfo[i]);
		updateLook();
	}
}

function updateLook() {
	var pointsE = document.getElementById("points");
	var timeUpgradeE = document.getElementById("timeUpgrade");
	var pointsPerBoxUE = document.getElementById("pointsPerBoxUpgrade");
	var antiBoxChanceUE = document.getElementById("antiBoxChanceUpgrade");
	var antiBoxPointsUE = document.getElementById("antiBoxPointsUpgrade");
	var superBoxChanceUE = document.getElementById("superBoxChanceUpgrade");
	var superBoxPointsUE = document.getElementById("superBoxPointsUpgrade");
	var boxesInBankE = document.getElementById("boxesInBank");
	var bankInterestE = document.getElementById("bankInterest");
	var shieldE = document.getElementById("shieldBuy");
	var interestE = document.getElementById("interestUpgrade");
	
	var timeB = document.getElementById("timeB");
	var pointsPerBoxB = document.getElementById("pointsPerBoxB");
	var antiBoxChanceB = document.getElementById("antiBoxChanceB");
	var antiBoxPointsB = document.getElementById("antiBoxPointsB");
	var superBoxChanceB = document.getElementById("superBoxChanceB");
	var superBoxPointsB = document.getElementById("superBoxPointsB");
	var interestB = document.getElementById("interestB");
	
	pointsE.innerHTML = "Boxes: "+Math.floor(points);
	
	//upgrades
	timeUpgradeE.innerHTML = "Halves the time between boxes.<br>Current time: "+timeBetweenBoxes/1000+" seconds.<br>Cost: "+Math.floor(timeUCost);
	pointsPerBoxUE.innerHTML = "Increases the amount of boxes you get per box.<br>Current boxes per box: "+Math.floor(pointsPerBox)+".<br>Cost: "+Math.floor(pointsPerBoxUCost);
	antiBoxChanceUE.innerHTML = "Decreases the chance to get an Antibox.<br>Current chance: "+Math.floor(antiBoxChance)+"%"+".<br>Cost: "+Math.floor(antiBoxChanceUCost);
	antiBoxPointsUE.innerHTML = "Decreases the boxes you lose with an Antibox.<br>Current lost boxes: -"+Math.floor(calcAntiBox())+".<br>Cost: "+Math.floor(antiBoxPointsUCost);
	superBoxChanceUE.innerHTML = "Increases the chance to get a Superbox.<br>Current chance: "+Math.floor(superBoxChance)+"%"+".<br>Cost: "+Math.floor(superBoxChanceUCost);
	superBoxPointsUE.innerHTML = "Increase the boxes you gain with a Superbox.<br>Current gained boxes: "+Math.floor(calcSuperBox())+".<br>Cost: "+Math.floor(superBoxPointsUCost);
	boxesInBankE.innerHTML = "Boxes in bank: "+Math.floor(pointsInBank);
	bankInterestE.innerHTML = "Interest: "+bankInterest+"%";
	shieldE.innerHTML = "Blocks 1 AntiBox.<br>Amount Owned: "+amntOfShields+"<br>Cost:"+calcShield();
	interestE.innerHTML = "Increases bank interest.<br>Current interest: "+bankInterest+"%.<br>Cost: "+calcInterest();
	//upgrade buttons
	if(points < timeUCost) {
		timeB.disabled = true;
	} else {
		timeB.disabled = false;
	}
	if(points < pointsPerBoxUCost) {
		pointsPerBoxB.disabled = true;
	} else {
		pointsPerBoxB.disabled = false;
	}
	if(points < antiBoxChanceUCost) {
		antiBoxChanceB.disabled = true;
	} else {
		antiBoxChanceB.disabled = false;
	}
	if(points < antiBoxPointsUCost) {
		antiBoxPointsB.disabled = true;
	} else {
		antiBoxPointsB.disabled = false;
	}
	if(points < superBoxChanceUCost) {
		superBoxChanceB.disabled = true;
	} else {
		superBoxChanceB.disabled = false;
	}
	if(points < superBoxPointsUCost) {
		superBoxPointsB.disabled = true;
	} else {
		superBoxPointsB.disabled = false;
	}
	if(points < calcInterest()) {
		interestB.disabled = true;
	} else {
		interestB.disabled = false;
	}
}

updateLook();

//shields: \*/