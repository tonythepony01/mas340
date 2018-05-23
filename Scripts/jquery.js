var TVal = 239;
var CurrentLoc = 'A';
var time = [];
var hours = [];
var hours2 = [];
var EnterToggle = true;
var degrees = 0;
var DivList = ['#p1','#p2','#p3','#p4','#p5','#p6','#p7','#p8','#p9','#p10','#p11','#p12','#p13','#p14','#p15','#p16'];
var isNightTime = true;
	var NTval = [[3,14],[27,38],[51,62],[75,86],[99,110],[123,134],[147,158],[171,182],[195,206],[219,230]];
var QuestDict = [['Q1', false],['Q2', false],['Q3', false],['Q4', false],['Q5', true],['Q6', false]]; // default value
var QuestComp = [false, false, false, false, false,false];


function QuestToggler(QNum,State) { // takes the quest number and true/false state and replaces the second value in each list in QuestDict.
	if (typeof QNum == 'string') {
		for (x =0; x<6; x++) {
			if (QuestDict[x][0] == QNum) {
				QuestDict[x][1] = State;
			}
		}
		localStorage.setItem('QuestStatus', QuestDict); // saves the current state of QuestDict to Localstorage as a string
	} else if (typeof QNum == 'number') {
		for (x =0; x<6; x++) {
			if (x == QNum) {
				QuestComp[QNum] = State;
			}
		}
		localStorage.setItem('QuestCompletion', QuestComp); 
	}

}

function QuestCompletionMemory() {
	if (localStorage.getItem("QuestCompletion") != "undefined" && localStorage.getItem("QuestCompletion") != null) {
		QuestComp = JSON.parse("[" + localStorage.getItem("QuestCompletion") + "]");
		console.log('Memory check1: '+QuestComp);
	} else {
		QuestComp = [false, false, false, false, false,false];
		console.log('Memory check2: '+QuestComp);
	};	
}



function QuestMemory() { 
	// checks if the QuestDict already exists in LocalStorage. If exists, grab from LocalStorage, if not then set as default value.
	if (localStorage.getItem("QuestStatus") != "undefined" && localStorage.getItem("QuestStatus") != null) {
		a = localStorage.getItem("QuestStatus");
		console.log('Memory check1: '+a);
		// current state: "Q1,true,Q2,true,Q3,true,Q4,true,Q5,false,Q6,false"
		var b = a.split(',') // converts the string into list with string as items 
		// from the list of strings, grab each 'true' and 'false' string and convert it back into boolean
		// current state: ["Q1","true","Q2","true","Q3","true","Q4","true","Q5","false","Q6","false"]
		for (x in b) {
			if (b[x] == 'false') {
				b[x] = false;
			} else if (b[x] == 'true') {
				b[x] = true;
			}
		}
		// current state: ["Q1",true,"Q2",true,"Q3",true,"Q4",true,"Q5",false,"Q6",false]
		QuestDict = []
		// take the list of strings and booleans, and convert them into list with sublists consisting of pairs of string and boolean
		for (y in b) {
			if (y % 2 == 0) {
				var c = []
				c.push(b[y])
			} else {
				c.push(b[y])
				QuestDict.push(c)
			}
		}
		// current state: [["Q1",true],["Q2",true],["Q3",true],["Q4",true],["Q5",false],["Q6",false]]
		console.log(QuestDict);
	} else {
		QuestDict = [['Q1', false],['Q2', false],['Q3', false],['Q4', false],['Q5', true],['Q6', false]];
		console.log('Memory check2: '+QuestDict);
	};	
}

function DayPhase() {
		$('#map').css({
		'filter':'brightness(1) saturate(100%) hue-rotate(0deg)',
		'webkitFilter':'brightness(1) saturate(100%) hue-rotate(0deg)',
		'transition':'all 0.7s ease-out',
		'-webkit-transition':'all 0.7s ease-out',
	});
}

function conversationCheck(xAxis,yAxis) {
	var PageLocation = location.href.split("/").slice(-1);
	if (PageLocation == 'town2.html') {
		if ((xAxis < 470 && xAxis > 390) || (xAxis < 955 && xAxis > 835) || (xAxis < 775 && xAxis > 675)) {
			$("#talkbutton").css({left: xAxis-45, top: yAxis-120}).show();
			return true
		} else {
			$("#talkbutton").hide();
			return false
		}
	} else if (PageLocation == 'town3.html') {
		if ((xAxis < 200 && xAxis > 100) || (xAxis < 775 && xAxis > 675) || (xAxis < 955 && xAxis > 835)) {
			$("#talkbutton").css({left: xAxis-45, top: yAxis-120}).show();
			return true
		} else {
			$("#talkbutton").hide();
			return false
		}
	} else if (PageLocation == 'town4.html') {
		if ((xAxis < 470 && xAxis > 370) || (xAxis < 680  & xAxis > 580) || (xAxis < 955 && xAxis > 835)) {
			$("#talkbutton").css({left: xAxis-45, top: yAxis-120}).show();
			return true
		} else {
			$("#talkbutton").hide();
			return false
		}
	} else if (PageLocation == 'town5.html') {
		if ((xAxis < 550 && xAxis > 450) || (xAxis < 955 & xAxis > 835)) {
			$("#talkbutton").css({left: xAxis-45, top: yAxis-120}).show();
			return true
		} else {
			$("#talkbutton").hide();
			return false
		}
	}

}
function NightPhase() {
		$('#map').css({
		'filter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
		'webkitFilter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
		'transition':'all 0.7s ease-out',
		'-webkit-transition':'all 0.7s ease-out',
	});
}
function displayDateTime(TVal) {
	var ClockTimes = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8];
	var DayNTime = [['Day 1',216,239],['Day 2',192,215],['Day 3', 168,191],['Day 4', 144,167],['Day 5', 120,143],['Day 6',96,119],['Day 7',72,95],['Day 8',48,71],['Day 9',24,47],['Day 10',0,23]];
	var DayDisplayTimes = [['Day 1',225,239],['Day 2',201,224],['Day 3', 177,200],['Day 4', 153,176],['Day 5', 129,152],['Day 6',105,128],['Day 7',81,104],['Day 8',57,80],['Day 9',33,56],['Day 10',9,32]];
	for (var a in DayNTime)	{
		range2(DayNTime[a][1],DayNTime[a][2]);
		range3(DayDisplayTimes[a][1],DayDisplayTimes[a][2]);
		if (hours.includes(TVal)) {
			var reverseHour = hours.reverse();
			$('#Time').html(ClockTimes[reverseHour.indexOf(TVal)]+':00'); 
		}
		if (hours2.includes(TVal)) {
			$('#Day').html(DayDisplayTimes[a][0]);
			console.log(DayDisplayTimes[a][0])
			console.log(a)
		}
		hours = []
		hours2 = []
	}
}

	function range(start, end) {	
		for (let i = start; i <= end; i++) {
			time.push(i);
		}
		return
	}
		function range2(start, end) {	
			for (let i = start; i <= end; i++) {
				hours.push(i);
				hours2.push(i);
			}
		return
	}
			function range3(start, end) {	
			for (let i = start; i <= end; i++) {
				hours2.push(i);
			}
		return
	}


function timeDeduction(CurrentLoc2, DestLoc2) {
	var pathTimes = [
	['A','B',3],
	['B','C',6],
	['B','E',6],
	['C','D',3],
	['E','F',6],
	['E','J',6],
	['F','G',3],
	['G','H',3],
	['G','I',9],
	['H','I',3],
	['J','K',6],
	['J','L',6],
	['J','N',6],
	['K','L',3],
	['K','P',9],
	['K','M',12],
	['O','N',6]
	]
	for (var x in pathTimes) {
		if ((CurrentLoc2 == pathTimes[x][0] && DestLoc2 == pathTimes[x][1]) || (CurrentLoc2 == pathTimes[x][1] && DestLoc2 == pathTimes[x][0])) {
			Deduction = pathTimes[x][2]
			return Deduction
		}
	}
}
function drawDayLines() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var locationp1 = $('#p1').position();
	var locationp2 = $('#p2').position();
	var locationp3 = $('#p3').position();
	var locationp4 = $('#p4').position();
	var locationp5 = $('#p5').position();
	var locationp6 = $('#p6').position();
	var locationp7 = $('#p7').position();
	var locationp8 = $('#p8').position();
	var locationp9 = $('#p9').position();
	var locationp10 = $('#p10').position();
	var locationp11 = $('#p11').position();
	var locationp12 = $('#p12').position();
	var locationp13 = $('#p13').position();
	var locationp14 = $('#p14').position();
	var locationp15 = $('#p15').position();
	var locationp16 = $('#p16').position();
	ctx.clearRect(0,0,1000,600);
	ctx.beginPath();
	ctx.moveTo(locationp1.left,locationp1.top);
	ctx.lineTo(locationp2.left,locationp2.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp3.left,locationp3.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp4.left,locationp4.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp5.left,locationp5.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp5.left,locationp5.top);
	ctx.lineTo(locationp6.left,locationp6.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp6.left,locationp6.top);
	ctx.lineTo(locationp7.left,locationp7.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp8.left,locationp8.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
			ctx.beginPath();
	ctx.moveTo(locationp8.left,locationp8.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp11.left,locationp11.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp13.left,locationp13.top);
	ctx.stroke();
				ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp16.left,locationp16.top);
	ctx.stroke();
}
function drawNightLines() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var locationp1 = $('#p1').position();
	var locationp2 = $('#p2').position();
	var locationp3 = $('#p3').position();
	var locationp4 = $('#p4').position();
	var locationp5 = $('#p5').position();
	var locationp6 = $('#p6').position();
	var locationp7 = $('#p7').position();
	var locationp8 = $('#p8').position();
	var locationp9 = $('#p9').position();
	var locationp10 = $('#p10').position();
	var locationp11 = $('#p11').position();
	var locationp12 = $('#p12').position();
	var locationp13 = $('#p13').position();
	var locationp14 = $('#p14').position();
	var locationp15 = $('#p15').position();
	var locationp16 = $('#p16').position();
	ctx.clearRect(0,0,1000,600);
	ctx.beginPath();
	ctx.moveTo(locationp1.left,locationp1.top);
	ctx.lineTo(locationp2.left,locationp2.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp3.left,locationp3.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp4.left,locationp4.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp5.left,locationp5.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp5.left,locationp5.top);
	ctx.lineTo(locationp6.left,locationp6.top);
	ctx.stroke();
				ctx.beginPath();
	ctx.moveTo(locationp5.left,locationp5.top);
	ctx.lineTo(locationp10.left,locationp10.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp6.left,locationp6.top);
	ctx.lineTo(locationp7.left,locationp7.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp8.left,locationp8.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
				ctx.beginPath();
	ctx.moveTo(locationp8.left,locationp8.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp11.left,locationp11.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp13.left,locationp13.top);
	ctx.stroke();
			ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp16.left,locationp16.top);
	ctx.stroke();
}

function drawNoonLines() {
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var locationp1 = $('#p1').position();
	var locationp2 = $('#p2').position();
	var locationp3 = $('#p3').position();
	var locationp4 = $('#p4').position();
	var locationp5 = $('#p5').position();
	var locationp6 = $('#p6').position();
	var locationp7 = $('#p7').position();
	var locationp8 = $('#p8').position();
	var locationp9 = $('#p9').position();
	var locationp10 = $('#p10').position();
	var locationp11 = $('#p11').position();
	var locationp12 = $('#p12').position();
	var locationp13 = $('#p13').position();
	var locationp14 = $('#p14').position();
	var locationp15 = $('#p15').position();
	var locationp16 = $('#p16').position();
	ctx.clearRect(0,0,1000,600);
	ctx.beginPath();
	ctx.moveTo(locationp1.left,locationp1.top);
	ctx.lineTo(locationp2.left,locationp2.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp3.left,locationp3.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp4.left,locationp4.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp5.left,locationp5.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp5.left,locationp5.top);
	ctx.lineTo(locationp6.left,locationp6.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp6.left,locationp6.top);
	ctx.lineTo(locationp7.left,locationp7.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp8.left,locationp8.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp7.left,locationp7.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
				ctx.beginPath();
	ctx.moveTo(locationp8.left,locationp8.top);
	ctx.lineTo(locationp9.left,locationp9.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp11.left,locationp11.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp14.left,locationp14.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp10.left,locationp10.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp13.left,locationp13.top);
	ctx.stroke();
			ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp12.left,locationp12.top);
	ctx.stroke();
		ctx.beginPath();
	ctx.moveTo(locationp11.left,locationp11.top);
	ctx.lineTo(locationp16.left,locationp16.top);
	ctx.stroke();
}

function EnterCheck(DestLoc, Xcoord, Ycoord) {
	Ycoord = Ycoord + 20;
	Xcoord = Xcoord - 30;
	if (LocKeyGet(DestLoc)[3] == true) {
		EnterToggle = true;
		localStorage.setItem("Enter", [EnterToggle,Xcoord,Ycoord]);
		$('#EnterButton').css({
			'left': Xcoord,
			'top': Ycoord,
			'filter':'brightness(1) saturate(100%)',
			'webkitFilter':'brightness(1) saturate(100%)',
			'animation': 'pulsate 2s linear infinite',
			'-webkit-animation': 'pulsate 2s linear infinite'
		}).show();
		var resultList = [true,EnterToggle,Xcoord,Ycoord]
		return resultList
	} else {
		$('#EnterButton').hide();
		EnterToggle = false;
		localStorage.setItem("Enter", [EnterToggle,Xcoord,Ycoord]);
	}
}

function CheckEnter() {
	var coords = JSON.parse("[" + localStorage.getItem('Enter') + "]");
	//console.log(coords);
	if (localStorage.getItem('Enter') != "undefined" && localStorage.getItem('Enter') != null && coords[0] == true) {
		$('#EnterButton').css({
			'left': coords[1],
			'top': coords[2],
			'filter':'brightness(1) saturate(100%)',
			'webkitFilter':'brightness(1) saturate(100%)',
			'animation': 'pulsate 2s linear infinite',
			'-webkit-animation': 'pulsate 2s linear infinite'
			
		}).show();
		Save = localStorage.getItem('SavedLoc');
			document.getElementById('ButtonLink').setAttribute('href',LocKeyGet(Save,0,0)[4])
	} else {
		$('#EnterButton').hide();
	}
}
function CheckTownTime(Night,Day) {
	for (let a =0; a<=9; a++)	{
		time.push(range(NTval[a][0],NTval[a][1]));
	}
	if (localStorage.getItem("Time") != "undefined" && localStorage.getItem("Time") != null	) {
		TVal = parseInt(localStorage.getItem("Time"));
		if (typeof Night == 'string' && typeof Day == 'string') {
			if (isNightTime == time.includes(TVal)) {
				$('#background').addClass(Night);
			} else {
				$('#background').addClass(Day);
			}
		} else {
			if (isNightTime == time.includes(TVal)) {
				return true
			} else {
				return false
			}
		}
	}
}
function CheckTime() {
	for (let a =0; a<=9; a++)	{
		time.push(range(NTval[a][0],NTval[a][1]));
	}
	if (localStorage.getItem("Time") != "undefined" && localStorage.getItem("Time") != null) {
		TVal = parseInt(localStorage.getItem("Time"));
		if (isNightTime == time.includes(TVal)) {
			$('#map').css({
				'filter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
				'webkitFilter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
				'transition':'all 0.0s ease-out',
				'-webkit-transition':'all 0.0s ease-out',
			});
			drawNightLines();
			//console.log('includes T');
		} else {
			$('#map').css({
				'filter':'brightness(1) saturate(100%) hue-rotate(0deg)',
				'webkitFilter':'brightness(1) saturate(100%) hue-rotate(0deg)',
				'transition':'all 0.0s ease-out',
				'-webkit-transition':'all 0.0s ease-out',
			});
			drawDayLines();
			//console.log('does not include T'+TVal)
		}
	} else {
		drawDayLines();
		TVal = 239;
		//console.log('false');
		$('#map').css({
			'filter':'brightness(1) saturate(100%) hue-rotate(0deg)',
			'webkitFilter':'brightness(1) saturate(100%) hue-rotate(0deg)',
			'transition':'all 0.0s ease-out',
			'-webkit-transition':'all 0.0s ease-out',
		});
	}
}

function CheckLoc() {
	if (localStorage.getItem("SavedLoc") != "undefined" && localStorage.getItem("SavedLoc") != null) {
		CurrentLoc = localStorage.getItem("SavedLoc");
		CurrentLoc2 = localStorage.getItem("SavedLoc");
		$( "#char" ).css({left: LocExtractorX(LocKeyGet(CurrentLoc)),top: LocExtractorY(LocKeyGet(CurrentLoc))}, 0, function() {});
	} else {
		CurrentLoc = 'A';
		CurrentLoc2 = 'A';
		$('#char').css({top:520,left:70});
	}
}
	function range(start, end) {	
		for (let i = start; i <= end; i++) {
			time.push(i);
		}
		return
	}
	function HoverColor() {
		var LocName = {p1:'Town 1',p3:'Town 2',p4:'Forest 1',p5:'Bridge',p7:'Town 3',p9:'Forest 2',p10:'Bridge',p12:'Forest 3',p13:'Town 4',p14:'Cave',p15:'Town 5',p16:'Random Hut'};
		var PointerLoc;
		var PathList2 = [['A','B'],['B','A','C','E'],['C','D','B'],['D','C'],['E','F','B','J'],['F','E','G'],['G','F','H','I'],['H','G','I'],['I','H','G'],['J','K','L','N','E'],['K','J','L','M','P'],['L','K','J'],['M','K'],['N'],['O'],['P','K']];
var PathNum2 = {A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15}; 
var LocDict2 = {p1:'A',p2:'B',p3:'C',p4:'D',p5:'E',p6:'F',p7:'G',p8:'H',p9:'I',p10:'J',p11:'K',p12:'L',p13:'M',p14:'N',p15:'O',p16:'P'}; 
		$("#inventorybutton, #p1,#p2,#p3,#p4,#p5,#p6,#p7,#p8,#p9,#p10,#p11,#p12,#p13,#p14,#p15,#p16, #QuestButton,#talkbutton, #nextbutton").hover(function(){
			PointerLoc = String($(this).attr('id'));
			if (CurrentLoc == LocDict2[PointerLoc]) {
				$('#TimeDeduction').html('0');
			} else if (PathList2[PathNum2[CurrentLoc]].includes(LocDict2[PointerLoc])) {
				$('#TimeDeduction').html('-'+timeDeduction(CurrentLoc,LocDict2[PointerLoc]));
			}
			
			
			$(this).css('background-color','#e54444');
			LocPoint = String($(this).attr('id'));

			if (LocName[LocPoint] != "undefined" && LocName[LocPoint] != null) {
				$('#noticebox2 span').html(LocName[LocPoint]);
				$("#noticebox2").stop().slideDown('100');
			}
		}, function(){
			$('#TimeDeduction').html('');
			$(this).css('background-color','#b40000');
			$("#noticebox2").stop().slideUp('100');
		});
	}
	function LocKeyGet(Location) {
		var LocDict2 = [['p1','A',70,520,true,'town1.html'],['p2','B',190,450,false],['p3','C',200,300,true,'town2.html'],['p4','D',60,235,true,'forest1.html'],['p5','E',400,420,false],['p6','F',325,300,false],['p7','G',265,245,true,'town3.html'],['p8','H',360,190,false],['p9','I',430,230,true,'forest2.html'],['p10','J',570,420,false],['p11','K',690,300,false],['p12','L',810,360,true,'forest3.html'],['p13','M',850,220,true,'town4.html'],['p14','N',730,515,true,'cave.html'],['p15','O',905,515,true,'town5.html'],['p16','P',565,210,true,'hut.html']]
		for (let a=0;a<16;a++) {
				if (Location == LocDict2[a][1]) {
					result = [LocDict2[a][0],LocDict2[a][2],LocDict2[a][3],LocDict2[a][4],LocDict2[a][5]]
					return result
			}
		}
	}
	function LocExtractorX(Location) {
		return Location[1]
	}
	function LocExtractorY(Location) {
		return Location[2]
	}
	function testColl() {
		function checkCollision() {
			var hit = $('.player').objectHitTest({"object": $('#tunnelbackground'),'transparency': true});
			if(hit) {
				window.location = "cave.html";
				console.log('yass')
				$('.player').hide();
				clearInterval(collisionTimer);
				setTimeout(resetPlayer,1000);
		}
	}
		function resetPlayer() {
			$('.player').css({top:170,left: 50}).fadeIn();
			collisionTimer = setInterval(checkCollision, 200);
		}	
		var collisionTimer = setInterval(checkCollision, 200);
	}
function goBack() {
    window.history.back()
}
function setupInventory() {

	//CLEAR ALL LOCALSTORAGE OBJECTS
	localStorage.clear();

	// SET UP LOCALSTORAGE OBJECTS
	localStorage.setItem('Flower', 'false');
	localStorage.setItem('Butterfly', 'false');
	localStorage.setItem('Medicine', 'false');
	localStorage.setItem('Weed', 'false');
	localStorage.setItem('Beans', 'false');
	localStorage.setItem('Magicmushroom', 'false');	
	localStorage.setItem('Acorns', 'false');
	localStorage.setItem('Sunflower', 'false');
	localStorage.setItem('Necklace', 'false');	
}

function checkInventory() {
	if( localStorage.getItem('Flower') == 'true' ) {
		$('#itemgrid #inv-Flower').show();
		$('#Flower').hide();
	}
	if( localStorage.getItem('Butterfly') == 'true' ) {
		$('#itemgrid #inv-Butterfly').show();
		$('#Butterfly').hide();
	}
	if( localStorage.getItem('Medicine') == 'true' ) {
		$('#itemgrid #inv-Medicine').show();
		$('#Medicine').hide();
	}
	if( localStorage.getItem('Weed') == 'true' ) {
		$('#itemgrid #inv-Weed').show();
		$('#Weed').hide();
	}
	if( localStorage.getItem('Beanstalk') == 'true' ) {
		$('#itemgrid #inv-Beans').show();
		$('#Beanstalk').hide();
	}
	if( localStorage.getItem('Magicmushroom') == 'true' ) {
		$('#itemgrid #inv-Magicmushroom').show();
		$('#Magicmushroom').hide();
	}	
	if( localStorage.getItem('Acorns') == 'true' ) {
		$('#itemgrid #inv-Acorns').show();
		$('#Acorns').hide();
	}
	if( localStorage.getItem('Sunflower') == 'true' ) {
		$('#itemgrid #inv-Sunflower').show();
		$('#Sunflower').hide();
	}
	if( localStorage.getItem('Necklace') == 'true' ) {
		$('#itemgrid #inv-Necklace').show();
		$('#Necklace').hide();
	}
	
}