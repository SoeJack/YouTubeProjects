const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const mainSite = document.getElementById('mainSite');
const themeToggle = document.getElementById('themeToggle');
const logoutBtn = document.getElementById('logoutBtn');

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    loginScreen.style.display = 'none';
    mainSite.style.display = 'block';
});
themeToggle.addEventListener('click',()=>{
    document.body.classList.toggle('light');
});
logoutBtn.addEventListener('click',()=>{
    mainSite.style.display = 'none';
    loginScreen.style.display = 'flex';
    document.body.classList.remove('light');
});

document.getElementById('contactForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('Message sent! Please Check Console.log for details.Thank You!');
    console.log("Name:", document.getElementById('name').value);
    console.log("Email:",document.getElementById('contactEmail').value);
    console.log('Comment:', document.getElementById('comment').value);
});
