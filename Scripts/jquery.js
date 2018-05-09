
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


	

