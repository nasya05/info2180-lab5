// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the button and result div elements
    const lookupButton = document.getElementById('lookup');
    const cityButton = document.getElementById('lookup cities');
    const resultDiv = document.getElementById('result');
    const countryInput = document.getElementById('country');

    // Add an event listener for the button click
    cityButton.addEventListener('click', function(){

        const country = encodeURIComponent(countryInput.value.trim());

        // Check if the country input is not empty
        if (country) {
            // Fetch data from world.php
            fetch(`world.php?country=${country}&lookup=cities`)
            .then(response => {
                // Check if the response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Get the response as text
            })
            .then(data => {
                // Print the data into the result div
                resultDiv.innerHTML = data;
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                resultDiv.innerHTML = 'Error fetching data: ' + error.message;
            });
        } else {
        // If the input is empty, show a message
            fetch(`world.php?country`)

         .then(response =>{
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })

            .then(data => {
                resultDiv.innerHTML = data;

            })
        
        }
});

    

    lookupButton.addEventListener('click', function() {
        // Get the country name from the input field
        const country = encodeURIComponent(countryInput.value.trim());

        // Check if the country input is not empty
        if (country) {
            // Fetch data from world.php
            fetch(`world.php?country=${country}`)
                .then(response => {
                    // Check if the response is ok (status in the range 200-299)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // Get the response as text
                })
                .then(data => {
                    // Print the data into the result div
                    resultDiv.innerHTML = data;
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    resultDiv.innerHTML = 'Error fetching data: ' + error.message;
                });
        } else {
            // If the input is empty, show a message
            fetch(`world.php?country`)

            .then(response =>{
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })

            .then(data => {
                resultDiv.innerHTML = data;

            })
            
        }
    });
});