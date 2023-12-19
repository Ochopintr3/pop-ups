function openSignInPopup() {
    document.getElementById('signin-popup').style.display = 'flex';
}

function closeSignInPopup() {
    document.getElementById('signin-popup').style.display = 'none';
}

function openSignUpPopup() {
    closeSignInPopup();
    document.getElementById('signup-popup').style.display = 'flex';
}

function closeSignUpPopup() {
    document.getElementById('signup-popup').style.display = 'none';
}

function validateSignInForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    return true;
}

function validateSignUpForm(event) {
    event.preventDefault(); 

    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('signup-email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var signupPassword = document.getElementById('signup-password').value;
    var agreeTerms = document.getElementById('agreeTerms').checked;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.trim() === '') {
        alert('Please enter your full name.');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address for sign-up.');
        return false;
    }

    if (phoneNumber.trim() === '') {
        alert('Please enter your phone number.');
        return false;
    }

    if (signupPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (!agreeTerms) {
        alert('Please agree to the terms of use.');
        return false;
    }

    saveSignUpInfo(); 
    return true; 
}



document.querySelector('.signupd').addEventListener('click', function (event) {
    event.preventDefault(); 
    openSignUpPopup(); 
});

document.querySelector('.signin-link').addEventListener('click', function (event) {
    event.preventDefault();
    closeSignUpPopup();
    openSignInPopup();
});

function saveSignUpInfo() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('signup-email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var signupPassword = document.getElementById('signup-password').value;

    var userData = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: signupPassword
    };

    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);

    localStorage.setItem('users', JSON.stringify(users));

    closeSignUpPopup(); 

}

function validateSignInForm(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];

    var user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) {
        alert('Invalid email or password. Please try again.');
        return false;
    }

    signedInUser = user;

    

    closeSignInPopup();

    isLoggedIn = true;
    updateSignInButton();

    return true;
}



function openForgotPasswordPopup() {
    closeSignInPopup();
    document.getElementById('forgot-password-popup').style.display = 'block';
}

function closeForgotPasswordPopup() {
    document.getElementById('forgot-password-popup').style.display = 'none';
}

function sendResetLink() {
    var resetEmail = document.getElementById('reset-email').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
        alert('Please enter a valid email address.');
        return false;
    }

    openSuccessPopup();
    closeForgotPasswordPopup();

    return false;
}

function openSuccessPopup() {
    document.getElementById('success-popup').style.display = 'flex';
}

function closeSuccessPopup() {
    document.getElementById('success-popup').style.display = 'none';
}

document.querySelector('.forgotpa').addEventListener('click', function (event) {
    event.preventDefault(); 
    openForgotPasswordPopup(); 
});

document.querySelector('.signin-link').addEventListener('click', function (event) {
    event.preventDefault();
    closeSuccessPopup();
    closeSignUpPopup();
    openSignInPopup();
});

document.getElementById('success-popup').addEventListener('click', function (event) {
    if (event.target === this) {
        closeSuccessPopup();
    }
});

function backToHome() {
    closeSuccessPopup();
}

var isLoggedIn = false;

function updateSignInButton() {
    var signInButton = document.querySelector('.singin');
    if (isLoggedIn) {
        signInButton.textContent = signedInUser.fullName;
        signInButton.onclick = function () {
            isLoggedIn = false;
            signedInUser = null;  
            updateSignInButton();
        };
    } else {
        signInButton.textContent = 'Sign In';
        signInButton.onclick = function () {
            openSignInPopup();
        };
    }
}

var signedInUser = null;


updateSignInButton();