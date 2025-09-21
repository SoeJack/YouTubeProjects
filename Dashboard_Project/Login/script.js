const defaultEmail = "admin@example.com";
const defaultPassword = "1234";
// Initialize password if not exist
if (!localStorage.getItem('password')) localStorage.setItem('password', defaultPassword);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const savedPassword = localStorage.getItem('password');
    if (email === defaultEmail && password === savedPassword) {
        window.location.href = 'Admi_Dashboard/index.html';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}