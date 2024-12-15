function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission to handle validation

    // Hide all error messages initially and reset styles
    const errorMessages = document.querySelectorAll('.N');
    errorMessages.forEach((msg) => {
        msg.style.display = 'none';
        const relatedInput = msg.previousElementSibling || msg.parentElement; 
        if (relatedInput) relatedInput.style.border = ''; // Reset border style
    });

    // Get the form elements
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const queryType = document.querySelector('input[name="queryType"]:checked');
    const queryTypeWrapper = document.getElementById('querry'); // Adjust to your form structure
    const message = document.getElementById('message');
    const terms = document.getElementById('terms');

    let isValid = true;

    // Check if First Name is empty
    if (!firstName.value.trim()) {
        const error = document.querySelector('#firstName + .N');
        error.style.display = 'block';
        firstName.style.border = '1px solid red';
        isValid = false;
    }

    // Check if Last Name is empty
    if (!lastName.value.trim()) {
        const error = document.querySelector('#lastName + .N');
        error.style.display = 'block';
        lastName.style.border = '1px solid red';
        isValid = false;
    }

    // Check if Email is empty or invalid
    if (!email.value.trim() || !validateEmail(email.value)) {
        const error = document.querySelector('#email + .N');
        error.style.display = 'block';
        email.style.border = '1px solid red';
        isValid = false;
    }

    // Check if Query Type is selected
    if (!queryType) {
        const error = document.querySelector('#querry + .N');
        error.style.display = 'block';
        isValid = false;
    }

    // Check if Message is empty
    if (!message.value.trim()) {
        const error = document.querySelector('#message + .N');
        error.style.display = 'block';
        message.style.border = '1px solid red';
        isValid = false;
    }

    // Check if Terms are accepted
    if (!terms.checked) {
        const error = document.querySelector('#term + .N');
        error.style.display = 'block';
        isValid = false;
    }

    // If all fields are valid, show the custom alert box
    if (isValid) {
        const customAlert = document.getElementById('customAlert');
        customAlert.style.display = 'flex'; // Show the alert box

        // Hide the alert box after 3 seconds
        setTimeout(() => {
            customAlert.style.display = 'none'; // Hide the alert box
            location.reload(); // Refresh the page after the alert disappears
        }, 3000); // 3000ms = 3 seconds
    }
}

// Simple email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
function addDynamicValidation() {
    const inputs = document.querySelectorAll('#firstName, #lastName, #email, #message');
    const queryTypeRadios = document.querySelectorAll('input[name="queryType"]');
    const terms = document.getElementById('terms');

    // For text inputs
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            const error = input.nextElementSibling;
            if (input.value.trim()) {
                error.style.display = 'none';
                input.style.border = ''; // Reset border
            }
        });
    });

    // For query type radio buttons
    queryTypeRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            const error = document.querySelector('#querry + .N');
            if (error) {
                error.style.display = 'none';
                const queryTypeWrapper = document.getElementById('querry');
                if (queryTypeWrapper) queryTypeWrapper.style.border = ''; // Reset border
            }
        });
    });

    // For terms checkbox
    terms.addEventListener('change', () => {
        const error = document.querySelector('#term + .N');
        if (terms.checked) {
            error.style.display = 'none';
            terms.parentElement.style.border = ''; // Reset border
        }
    });
}

// Call the dynamic validation setup when the script loads
addDynamicValidation();