	var time = [];
	function range(start, end) {	
		for (let i = start; i <= end; i++) {
				time.push(i);
			}
			return
	}
		
	function LocKeyGet(Location) {
		var LocDict2 = [['p1','A',500,150],['p2','C',250,600],['p4','D',460,450],['p4','B',375,450],['p5','E',575,575],['p6','F',575,325],['p7','G',375,900]]
		for (let a=0;a<7;a++) {
				if (Location == LocDict2[a][1]) {
					result = [LocDict2[a][0],LocDict2[a][2],LocDict2[a][3]]
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
function test() {
			function checkCollision() {
				var hit = $('.player').objectHitTest({"object": $('#tunnelbackground'),'transparency': true});
				if(hit) {
					console.log("hit");
					$('.player').hide({effect:'explode'});
					clearInterval(collisionTimer);
					setTimeout(resetPlayer,1000);
					}
			}
			function resetPlayer() {
				$('.player').css({top:550,left: 350}).fadeIn();
				collisionTimer = setInterval(checkCollision, 50);
			}	
			var collisionTimer = setInterval(checkCollision, 50);
}
function goBack() {
    window.history.back()
}
function setupInventory() {

	//CLEAR ALL LOCALSTORAGE OBJECTS
	localStorage.clear();

	// SET UP LOCALSTORAGE OBJECTS
	localStorage.setItem('knife', 'false');
	localStorage.setItem('apple', 'false');
	localStorage.setItem('rope', 'false');
}

function checkInventory() {

	if( localStorage.getItem('knife') == 'true' ) {
		$('#itemgrid #inv-knife').show();
	}
	if( localStorage.getItem('apple') == 'true' ) {
		$('#itemgrid #inv-apple').show();
	}
	if( localStorage.getItem('rope') == 'true' ) {
		$('#itemgrid #inv-rope').show();
	}
}


	

