var TVal = 216;
var CurrentLoc = 'A';
var time = [];

function drawDayLines() {
	$('#map').css({
		'filter':'brightness(1) saturate(100%) hue-rotate(0deg)',
		'webkitFilter':'brightness(1) saturate(100%) hue-rotate(0deg)',
		'transition':'all 0.2s ease-out',
		'-webkit-transition':'all 0.2s ease-out',
	});
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var locationp1 = $('#p1').position();
	var locationp2 = $('#p2').position();
	var locationp3 = $('#p3').position();
	var locationp4 = $('#p4').position();
	var locationp5 = $('#p5').position();
	var locationp6 = $('#p6').position();
	var locationp7 = $('#p7').position();
	ctx.clearRect(0,0,1000,600);
	ctx.beginPath();
	ctx.moveTo(locationp1.left,locationp1.top);
	ctx.lineTo(locationp4.left,locationp4.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp4.left,locationp4.top);
	ctx.lineTo(locationp2.left,locationp2.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp4.left,locationp4.top);
	ctx.lineTo(locationp3.left,locationp3.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp5.left,locationp5.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp6.left,locationp6.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp2.left,locationp2.top);
	ctx.lineTo(locationp7.left,locationp7.top);
	ctx.stroke();
}
function drawNightLines() {
	$('#map').css({
		'filter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
		'webkitFilter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
		'transition':'all 0.2s ease-out',
		'-webkit-transition':'all 0.2s ease-out',
	});
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var locationp1 = $('#p1').position();
	var locationp2 = $('#p2').position();
	var locationp3 = $('#p3').position();
	var locationp4 = $('#p4').position();
	var locationp5 = $('#p5').position();
	var locationp6 = $('#p6').position();
	var locationp7 = $('#p7').position();
	ctx.clearRect(0,0,1000,600);
	ctx.beginPath();
	ctx.moveTo(locationp1.left,locationp1.top);
	ctx.lineTo(locationp4.left,locationp4.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp4.left,locationp4.top);
	ctx.lineTo(locationp2.left,locationp2.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp5.left,locationp5.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(locationp3.left,locationp3.top);
	ctx.lineTo(locationp6.left,locationp6.top);
	ctx.stroke();
}

function CheckTime() {
	if (localStorage.getItem("Time") != "undefined" && localStorage.getItem("Time") != null) {
		TVal = localStorage.getItem("Time");
		console.log(TVal);
		$('#map').css({
			'filter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
			'webkitFilter':'brightness(0.30) saturate(50%) hue-rotate(29deg)',
			'transition':'all 0.0s ease-out',
			'-webkit-transition':'all 0.0s ease-out',
		});
	} else {
		TVal = 216;
		$('#map').css({
			'filter':'brightness(1) saturate(100%) hue-rotate(0deg)',
			'webkitFilter':'brightness(1) saturate(100%) hue-rotate(0deg)',
			'transition':'all 0.0s ease-out',
			'-webkit-transition':'all 0.0s ease-out',
		});
	}
}

function EnterCheck(DestLoc, Xcoord, Ycoord) {
	Ycoord = Ycoord + 20;
	Xcoord = Xcoord - 30;
	if (LocKeyGet(DestLoc)[3] == true) {
		$('#EnterButton').css({
			'left': Xcoord,
			'top': Ycoord,
			'filter':'brightness(1) saturate(100%)',
			'webkitFilter':'brightness(1) saturate(100%)',
			'animation': 'pulsate 2s linear infinite',
			'-webkit-animation': 'pulsate 2s linear infinite'
		}).show();
		return true
	} else {
		$('#EnterButton').css({
			'left': Xcoord,
			'top': Ycoord,
			'filter':'brightness(0.50) saturate(50%)',
			'webkitFilter':'brightness(0.5) saturate(50%)',
			'animation': 'pulsate 0s',
			'-webkit-animation': 'pulsate 0s',
		})
	}
}
function CheckLoc() {
	if (localStorage.getItem("SavedLoc") != "undefined" && localStorage.getItem("SavedLoc") != null) {
		CurrentLoc = localStorage.getItem("SavedLoc");
		$( "#char" ).css({left: LocExtractorX(LocKeyGet(CurrentLoc)),top: LocExtractorY(LocKeyGet(CurrentLoc))}, 0, function() {});
	} else {
		CurrentLoc = 'A';
		$('#char').css({top:500,left:150});
	}
}
	function range(start, end) {	
		for (let i = start; i <= end; i++) {
			time.push(i);
		}
		return
	}
	function HoverColor() {
		$("#inventorybutton, #p1,#p2,#p3,#p4,#p5,#p6,#p7").hover(function(){
			$(this).css('background-color','#e54444');
		}, function(){
			$(this).css('background-color','#b40000');
		});
	}
	function LocKeyGet(Location) {
		var LocDict2 = [['p1','A',500,150,true,'testlocation1.html'],['p2','C',250,600,false],['p4','D',460,450, true,'testlocation2.html'],['p4','B',375,450,false],['p5','E',575,575,false],['p6','F',575,325,false],['p7','G',375,900,true,'testlocation3.html']]
		for (let a=0;a<7;a++) {
				if (Location == LocDict2[a][1]) {
					result = [LocDict2[a][0],LocDict2[a][2],LocDict2[a][3],LocDict2[a][4],LocDict2[a][5]]
					return result
			}
		}
	}
	function LocExtractorX(Location) {
		return Location[2]
	}
	function LocExtractorY(Location) {
		return Location[1]
	}
	function testColl() {
		function checkCollision() {
			var hit = $('.player').objectHitTest({"object": $('#tunnelbackground'),'transparency': true});
			if(hit) {
				$('.player').hide({effect:'explode'});
				clearInterval(collisionTimer);
				setTimeout(resetPlayer,1000);
		}
	}
		function resetPlayer() {
			$('.player').css({top:550,left: 350}).fadeIn();
			collisionTimer = setInterval(checkCollision, 150);
		}	
		var collisionTimer = setInterval(checkCollision, 150);
	}
function goBack() {
    window.history.back()
}
function setupInventory() {

	//CLEAR ALL LOCALSTORAGE OBJECTS
	localStorage.clear();

	// SET UP LOCALSTORAGE OBJECTS
	localStorage.setItem('Knife', 'false');
	localStorage.setItem('Apple', 'false');
	localStorage.setItem('Rope', 'false');
}

function checkInventory() {
	if( localStorage.getItem('Knife') == 'true' ) {
		$('#itemgrid #inv-Knife').show();
		$('#Knife').hide();
	}
	if( localStorage.getItem('Apple') == 'true' ) {
		$('#itemgrid #inv-Apple').show();
		$('#Apple').hide();
	}
	if( localStorage.getItem('Rope') == 'true' ) {
		$('#itemgrid #inv-Rope').show();
		$('#Rope').hide();
	}
}


	

