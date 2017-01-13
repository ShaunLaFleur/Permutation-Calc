/* A friend mentioned to me that he wondered what all of the possible combinations of a, b and c would be if we used addition, subtraction, division and multiplication on them. 

To do: fix order of operations. This may require making the calculation non-flexible and only have it work for this specific case (3 number calculations).
*/
var a = [];
var b = ["+", "-", "/", "*"];
var holdResults = [];
var isMatch = true;
	/* 
	The countMatches variable below will increase by one each time an outcome has already been discovered so that we can stop the loop when it would be (assumed) statistically impossible to find that many consecutive matches. Example: If we find 20,000 matches in a row, odds are we have found every single possible outcome and can stop looking for more.
	*/
$("button").click(function(){
  if($("#num1").val() === "" || $("#num2").val() === "" || $("#num3").val() === "") {
    alert("Please do not leave a field blank.");
  }
  if($("#num1").val() != $("#num2").val() && $("#num1").val() != $("#num3").val() && $("#num2").val() != $("#num3").val()) {
      runCalc();
      $("#results-list").empty();
      for(i=0; i<holdResults.length; i++) {
        $("#results-list").append("<li>"+holdResults[i]+"</li>");
      }
      $("#total").html("("+holdResults.length+" total)");
   } else {
     alert("Please make sure you do not use duplicate numbers.");
    }
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
				if(ourString.indexOf(a[i]) === -1) {
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

	  // Perform calculations using proper order of operations.
	  if((ourString[1] === "+" || ourString[1] === "-") && (ourString[3] === "/" || ourString[3] === "*")) {
	  	var num1 = calculate(parseInt(ourString[2]), ourString[3], parseInt(ourString[4]));
	  	num1 = calculate(parseInt(ourString[0]), ourString[1], num1);
	  } else {
	  	for(n=0; n<a.length; n += 2) {
		  		if(n === 0) {
		  			var num1 = calculate(parseInt(ourString[0]), ourString[0+1], parseInt(ourString[0+2]));
		  		} else {
		  			var num1 = calculate(num1, ourString[n+1], parseInt(ourString[n+2]));
		  		}
		  	}
	  }

	// Push the result to ourString. ie: " = 32".
  	ourString.push(" = ");
  	ourString.push(num1);


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