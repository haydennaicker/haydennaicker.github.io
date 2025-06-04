    // Create a new XMLHttpRequest object
    var request = new XMLHttpRequest();

    // Set up the request
    request.open("GET", "https://api.countapi.xyz/hit/haydennaicker.github.io/visits", true);

    // Define the function to run when the response is received
    request.onload = function() {
      // Check if the request was successful
      if (request.status >= 200 && request.status < 400) {
        // Parse the JSON response
        var responseData = JSON.parse(request.responseText);

        // Get the count value
        var count = responseData.value;

        // Find the element with the ID "count" and update its text
        console.log("Count value:", count);
      } else {
        // If the server returned an error status
        console.log("Error");
      }
    };

    // Handle network errors
    request.onerror = function() {
        console.log("Error");
    };

    // Send the request
    request.send();