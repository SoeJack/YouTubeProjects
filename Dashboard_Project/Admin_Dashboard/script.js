// Password
const defaultEmail = "admin@example.com";
const defaultPassword = "1234";
if (!localStorage.getItem('password')) localStorage.setItem('password', defaultPassword);

// Dark/Light Mode
function toggleDarkMode() { document.body.classList.toggle('dark-mode'); document.getElementById('notif-panel').classList.toggle('dark-mode'); }

// Logout
function logout() { window.location.href = 'index.html'; }

// Sidebar collapse
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('collapsed'); }

// Notifications
let notifications = [];
function toggleNotificationPanel() {
    const panel = document.getElementById('notif-panel');
    panel.style.display = (panel.style.display === 'flex') ? 'none' : 'flex';
    if (panel.style.display === 'flex') { document.getElementById('notif-count').style.display = 'none'; }
}
function addNotification(message) {
    notifications.push(message);
    const li = document.createElement('li'); li.textContent = message;
    document.getElementById('notif-list').prepend(li);
    document.getElementById('notif-count').textContent = notifications.length;
    document.getElementById('notif-count').style.display = 'flex';
}
// Real-time notifications
setInterval(() => {
    const msgs = ["New user registered", "Sales reached $42,000", "Project Mini App completed", "Server backup completed", "New comment on project"];
    addNotification(msgs[Math.floor(Math.random() * msgs.length)]);
}, 8000);

// Content & charts
let salesChart = null, usersChart = null;
function showContent(section) {
    const content = document.getElementById('content-area'); let html = '';
    if (section === 'dashboard') {
        html = `<div class="card users"><h3>Users</h3><p>Active Users: 1230</p></div>
  <div class="card sales"><h3>Sales</h3><p>Total Revenue: $41,500</p></div>
  <div class="card projects"><h3>Projects</h3><p>Active Projects: 5</p></div>`;
    } else if (section === 'sales') {
        html = `<div class="card sales"><h3>&#128202; Sales Report</h3><canvas id="salesChart"></canvas></div>`;
    } else if (section === 'users') {
        html = `<div class="card users"><h3>&#128101; Users</h3><canvas id="usersChart"></canvas></div>`;
    } else if (section === 'projects') {
        html = `<div class="card projects"><h3>&#128193; Projects</h3>
  <ul><li>Mini Project 1: Login System</li><li>Mini Project 2: To-Do List App</li><li>Mini Project 3: Portfolio Website</li></ul></div>`;
    } else if (section === 'settings') {
        html = `<div class="card"><h3>&#9881; Settings</h3>
  <p>Change your password:</p>
  <input type="password" id="new-password" placeholder="New Password">
  <input type="password" id="confirm-password" placeholder="Confirm Password">
  <button class="action-btn" id="change-pass-btn">Change Password</button></div>`;
    }
    content.innerHTML = html;

    // Charts
    if (section === 'sales') {
        const ctx = document.getElementById('salesChart').getContext('2d');
        salesChart = new Chart(ctx, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ label: 'Revenue ($)', data: [12000, 15000, 14500, 17000, 16000], backgroundColor: 'rgba(46,204,113,0.2)', borderColor: 'rgba(46,204,113,1)', borderWidth: 2, fill: true, tension: 0.4 }] }, options: { responsive: true } });
    }
    if (section === 'users') {
        const ctx = document.getElementById('usersChart').getContext('2d');
        usersChart = new Chart(ctx, { type: 'bar', data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Active Users', data: [120, 150, 130, 170, 160, 140, 180], backgroundColor: 'rgba(52,152,219,0.7)' }] }, options: { responsive: true } });
    }

    // Password change
    if (section === 'settings') {
        document.getElementById('change-pass-btn').addEventListener('click', function () {
            const newPass = document.getElementById('new-password').value;
            const confirmPass = document.getElementById('confirm-password').value;
            if (!newPass || !confirmPass) { alert('Fill both fields!'); return; }
            if (newPass !== confirmPass) { alert('Passwords do not match!'); return; }
            localStorage.setItem('password', newPass);
            alert('Password changed successfully! Next login use the new password.');
            document.getElementById('new-password').value = ''; document.getElementById('confirm-password').value = '';
        });
    }
}

// Real-time chart updates
setInterval(() => {
    if (salesChart) {
        const newVal = Math.floor(Math.random() * 5000) + 12000;
        salesChart.data.datasets[0].data.push(newVal);
        salesChart.data.labels.push('Next');
        if (salesChart.data.labels.length > 10) { salesChart.data.labels.shift(); salesChart.data.datasets[0].data.shift(); }
        salesChart.update();
    }
    if (usersChart) {
        const newVal = Math.floor(Math.random() * 100) + 120;
        usersChart.data.datasets[0].data.push(newVal);
        usersChart.data.labels.push('Next');
        if (usersChart.data.labels.length > 7) { usersChart.data.labels.shift(); usersChart.data.datasets[0].data.shift(); }
        usersChart.update();
    }
}, 5000);