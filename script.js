// =====================
        // Simple client-side validation + interactions
        // =====================

        const form = document.getElementById('loginForm');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Show / hide password
        const togglePass = document.getElementById('togglePassword');
        togglePass.addEventListener('click', () => {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePass.textContent = type === 'password' ? 'Show' : 'Hide';
            togglePass.setAttribute('aria-pressed', type === 'text');
        });

        // Theme toggle (dark <-> light)
        const themeBtn = document.getElementById('themeBtn');
        // Load saved theme from localStorage if present
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.setAttribute('aria-pressed', 'true');
        }

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            themeBtn.setAttribute('aria-pressed', String(isLight));
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Small helper: simple email pattern
        function isValidEmail(v) {
            return /\S+@\S+\.\S+/.test(v);
        }

        // Validate on submit
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // prevent actual submission for this demo

            // reset messages
            usernameError.classList.remove('show');
            emailError.classList.remove('show');
            passwordError.classList.remove('show');

            let ok = true;

            if (!username.value.trim()) {
                usernameError.classList.add('show'); ok = false;
            }

            if (!isValidEmail(email.value.trim())) {
                emailError.classList.add('show'); ok = false;
            }

            if (!password.value || password.value.length < 6) {
                passwordError.classList.add('show'); ok = false;
            }

            if (!ok) {
                // focus first invalid element for accessibility
                const firstInvalid = document.querySelector('.error.show');
                if (firstInvalid) {
                    const associated = firstInvalid.previousElementSibling?.querySelector('input') || document.getElementById('username');
                    associated.focus();
                }
                return;
            }

            // If validation passes, simulate login action
            // Replace this with actual authentication flow (fetch/ajax) in real app
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.disabled = true;
            loginBtn.textContent = 'Signing in...';

            // fake delay to show success (do NOT block UI in real code)
            setTimeout(() => {
                loginBtn.textContent = 'Signed in ✓';
                loginBtn.style.background = 'linear-gradient(90deg,var(--success), #18b37a)';
                // you could redirect or call your backend here
            }, 900);

        });

        // Optional: realtime validation as user types
        email.addEventListener('input', () => {
            if (isValidEmail(email.value.trim())) emailError.classList.remove('show');
        });
        username.addEventListener('input', () => usernameError.classList.remove('show'));
        password.addEventListener('input', () => passwordError.classList.remove('show'));

        // Accessibility: allow Enter key from password to submit
        password.addEventListener('keyup', (e) => { if (e.key === 'Enter') form.dispatchEvent(new Event('submit')) });
