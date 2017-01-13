/* A friend mentioned to me that he wondered what all of the possible combinations of a, b and c would be if we used addition, subtraction, division and multiplication on them. 

To do: fix order of operations. This may require making the calculation non-flexible and only have it work for this specific case (3 number calculations).
*/
var a = [];
var b = ["+", "-", "/", "*"];
var holdResults = [];
var isMatch = true;
var isBlank = false;
	/* 
	The countMatches variable below will increase by one each time an outcome has already been discovered so that we can stop the loop when it would be (assumed) statistically impossible to find that many consecutive matches. Example: If we find 20,000 matches in a row, odds are we have found every single possible outcome and can stop looking for more.
	*/
$("button").click(function(){
  $("input").each(function(){
  	if(!$(this).val()) {
  		isBlank = true;
  	}
  });
  if(isBlank === false) {
      runCalc();
      $("#results-list").empty();
      for(i=0; i<holdResults.length; i++) {
        $("#results-list").append("<li>"+holdResults[i]+"</li>");
      }
      $("#total").html("("+holdResults.length+" total)");
   } else if(isBlank) {
   	alert("Please make sure do do not leave an input field empty.");
   }
   isBlank = false;
});

function runCalc() {
  holdResults = [];
  a = [];
  a.push($("#num1").val());
  a.push($("#num2").val());
  a.push($("#num3").val());
  var countMatches = 0;
  while(countMatches < 20000) {
	  var ourString = [];
	  for(n=0; n<a.length; n++) {
		  // Generate letter.
			do {
			  	i = Math.round(Math.random()*(a.length-1 - 0)+0);
			  	var numLimit = 0;
			  	$("input").each(function(){
			  		if($(this).val() === a[i]) {
			  			numLimit += 1;
			  		} 
			  	});
			  	var x = ourString.join(""); //ourString.split(a[i]).length-1;
				if(x.split(a[i]).length-1 < numLimit) {
					ourString.push(a[i]);
					isMatch = false;
				} else {
				  isMatch = true;
				}
			}while(isMatch);

		  // Generate operator(+, -, *, /)
		  if(n !== a.length-1) {
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
}

/* Uneeded now
function calculate(num1, op, num2) {
	switch(op) {
		case "+":
			return num1 + num2;
		case "-":
			return num1 - num2;
		case "*":
			return num1 * num2;
		case "/":
			return num1 / num2;
		default: 
			break;
	}
}
*/