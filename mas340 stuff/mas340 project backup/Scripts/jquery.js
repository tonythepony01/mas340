
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
/* var change = {
  37: {
    left: "-=1"
  },

  38: {
    top: "-=1"
  },

  39: {
    left: "+=1"
  },

  40: {
    top: "+=1"
  },
}

$(document).one("keydown", keyDown)

var going;

function keyDown(e) {
  console.log("down")
  $(document).one("keyup", keyup)
  var animation = change[e.which];
  going = setInterval(keepGoing, 1);
  function keepGoing() {
    $("#char").css(animation)
  }
}

function keyup(e) {
  console.log("up")
  clearInterval(going)
  $(document).one("keydown", keyDown)
} */

	

