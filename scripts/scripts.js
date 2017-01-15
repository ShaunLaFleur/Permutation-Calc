/* A friend mentioned to me that he wondered what all of the possible combinations of a, b and c would be if we used addition, subtraction, division and multiplication on them. */
$("button").click(function(){
	var isBlank = false;  
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
  	var holdResults = [];
  	var found = [];
  	var a = [];
  	var countMatches = 0;
  	var b = ["+", "-", "/", "*"];
  	while(countMatches < 20000) {
	  	a = [];
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

		// If this result has not been discovered yet we will push it to the found array and then perform it's calculation.
		if(found.indexOf(ourString.join("")) === -1) {
			// Push to found
			found.push(ourString.join(""));
			// Copy array
			var c = [];
			for(i=0; i<ourString.length; i++) {
				c[i] = ourString[i];
			}

			//Perform calculations on the copy array
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

			// Push our string to ourResults
			holdResults.push(ourString.join(""));

			// Reset countMatches
			countMatches = 0;
		// Otherwise if it has been found already we will increment the countMatches array and skip running it's calculations.
		} else {
			countMatches += 1;
		}
	}
	// Once we finish the while loop we will populate the page with the results that were found.
	  $("#results-list").empty();
      for(i=0; i<holdResults.length; i++) {
        $("#results-list").append("<li>"+holdResults[i]+"</li>");
      }
      $("#total").html("("+holdResults.length+" total)");
}