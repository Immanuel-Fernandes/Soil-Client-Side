document.getElementById('cropForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show the spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    // Hide the spinner after 2 minutes (120000 ms)
    const hideSpinnerTimeout = setTimeout(() => {
        spinner.classList.add('hidden');
        document.getElementById('result').textContent = 'Request timed out. Please try again.';
        document.getElementById('result').classList.add('error');
    }, 180000);

    // Fetch form values
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.api_key = "Environmental-Intelligence-59474eabe4b1bce29af462945f2ff41f"; // Pass the API key

    // API URL for the server-side proxy
    const PROXY_URL = "http://soil-enthusiasts.liveblog365.com/CR2.php";

    // Send POST request to the server-side proxy
    fetch(PROXY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(result => {
        clearTimeout(hideSpinnerTimeout); // Clear the timeout if the request completes before 2 minutes

        // Hide the spinner
        spinner.classList.add('hidden');

        if (result.crop) {
            document.getElementById('result').textContent = `The best crop to be cultivated is: ${result.crop}`;
            document.getElementById('result').classList.add('success');
        } else {
            document.getElementById('result').textContent = result.error || 'Sorry, we could not determine the best crop to be cultivated with the provided data.';
            document.getElementById('result').classList.add('error');
        }
    })
    .catch(error => {
        clearTimeout(hideSpinnerTimeout); // Clear the timeout if an error occurs

        // Hide the spinner
        spinner.classList.add('hidden');

        document.getElementById('result').textContent = 'Failed to get a response from the API server.';
        document.getElementById('result').classList.add('error');
    });
});