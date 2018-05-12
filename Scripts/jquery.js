var TVal = 210;
var CurrentLoc = 'A';
function CheckTime() {
	if (localStorage.getItem("Time") != "undefined" && localStorage.getItem("Time") != null) {
		TVal = localStorage.getItem("Time");
	} else {
		TVal = 210;
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

var a = {
    path: [10, 10, 300, 10, 300, 300],
    isVisible: false,
}

// create an object containing the left-bottom lines
// the object contains its path points & if it is visible or not
var b = {
    path: [10, 10, 10, 300, 300, 300],
    isVisible: false,
}

// an array containing all the line-path objects
var myObjects = [a, b];

// clear the entire canvas 
// redraw any line-paths that are visible
function redrawAll(myObjects) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < myObjects.length; i++) {
        if (myObjects[i].isVisible) {
            drawLinePath(myObjects[i]);
        }
    }
}

// redraw 1 line-path
function drawLinePath(theObject) {
    var points = theObject.path;
    // save the current untranslated context state
    context.save();

    // draw lines through each point in the objects path
    context.translate(0.5, 0.5);
    context.beginPath();
    context.setLineDash([2, 10]);
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length; i += 2) {
        context.lineTo(points[i], points[i + 1]);
    }
    context.stroke();

    // restore the context to its untranslated state
    context.restore();
}
	
	function HoverColor() {
		$("#inventorybutton, #p1,#p2,#p3,#p4,#p5,#p6,#p7").hover(function(){
			$(this).css('background-color','#e54444');
			
		}, function(){
			$(this).css('background-color','#b40000');
		});
	}
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
	localStorage.setItem('knife', 'false');
	localStorage.setItem('apple', 'false');
	localStorage.setItem('rope', 'false');
}

function checkInventory() {
	if( localStorage.getItem('knife') == 'true' ) {
		$('#itemgrid #inv-knife').show();
		$('#knife').hide();
	}
	if( localStorage.getItem('apple') == 'true' ) {
		$('#itemgrid #inv-apple').show();
		$('#apple').hide();
	}
	if( localStorage.getItem('rope') == 'true' ) {
		$('#itemgrid #inv-rope').show();
		$('#rope').hide();
	}
}


	

