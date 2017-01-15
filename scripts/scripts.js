/* A friend mentioned to me that he wondered what all of the possible combinations of a, b and c would be if we used addition, subtraction, division and multiplication on them. 
*/
var holdResults = [];
var isBlank = false;

$("button").click(function(){
  $("input").each(function(){
  	if(!$(this).val()) {
  		isBlank = true;
  	}
  });
  if(isBlank === false) {
      runCalc();
   } else if(isBlank) {
   	alert("Please make sure do do not leave an input field empty.");
   }
   isBlank = false;
});

function runCalc() {
  	holdResults = [];
  	var countMatches = 0;
  	var b = ["+", "-", "/", "*"];
  	while(countMatches < 20000) {
	  	var a = [];
		a.push($("#num1").val());
		a.push($("#num2").val());
		a.push($("#num3").val());
		var limit = a.length;
		var ourString = [];
		for(n=0; n<limit; n++) {
		  	// Generate letter.
		  	var x = Math.round(Math.random()*(a.length-1 - 0)+0);
		  	ourString.push(a[x]);
		  	a.splice(x, 1);

			// Generate operator(+, -, *, /)
			if(n !== limit-1) {
		    	i = Math.round(Math.random()*(3 - 0)+0);
		    	ourString.push(b[i]);
			}
		  }

		var c = [];
		// Copy array
		for(i=0; i<ourString.length; i++) {
		  c[i] = ourString[i];
		}

		// Left to Right Multiplication and Division
		for(i=0; i<c.length; i++) {
		  if(c[i] === "*" || c[i] === "/") {
  		    if(c[i] === "*"){
	  		    c[i] = parseFloat(c[i-1])*parseFloat(c[i+1]);
	  		    c.splice(i-1,1);
	  		    c.splice(i,1);
	  		    i = 0;
		    } else if(c[i] === "/"){
			    c[i] = parseFloat(c[i-1])/parseFloat(c[i+1]);
	  		    c.splice(i-1,1);
	  		    c.splice(i,1);
	  		    i = 0;
		    }
		  }
		}

		// Left to Right Addition and Subtraction
		for(i=0; i<c.length; i++) {
		  if(c[i] === "+" || c[i] === "-") {
		    if(c[i] === "+") {
	  		    c[i] = parseFloat(c[i-1])+parseFloat(c[i+1]);
	  		    c.splice(i-1,1);
	  		    c.splice(i,1);
	  		    i -=1;
		    } else if(c[i] === "-") {
			    c[i] = parseFloat(c[i-1])-parseFloat(c[i+1]);
	  		    c.splice(i-1,1);
	  		    c.splice(i,1);
	  		    i = 0;
		    }
		  }
		}

		// Add the outcome to ourString
		ourString.push(" = ");
		ourString.push(c[0]);



		// Once string is complete, we will make sure that it can't be in the holdResults array.
		if(holdResults.indexOf(ourString.join("")) === -1 ) {
			// Since ourString checks out we push it to the results array.
			holdResults.push(ourString.join("")); 
			// Rest the countMatches variable.
			countMatches = 0;
			// Reset ourString
		} else {
			countMatches += 1;
		}
	}
	$("#results-list").empty();
	for(i=0; i<holdResults.length; i++) {
        $("#results-list").append("<li>"+holdResults[i]+"</li>");
      }
      $("#total").html("("+holdResults.length+" total)");
}