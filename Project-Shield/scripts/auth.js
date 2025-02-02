document.addEventListener('DOMContentLoaded', () => {
    // Toggle between login and signup forms
    const loginForm = document.getElementById('login-form');
    const signupFormContainer = document.getElementById('signup-form');
    const toggleLinks = document.querySelectorAll('#login-signup-toggle');

    toggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.toggle('d-none');
            signupFormContainer.classList.toggle('d-none');
        });
    });

    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle-button');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling || toggle.parentElement.querySelector('input[type="password"]');
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = 'Hide';
            } else {
                input.type = 'password';
                toggle.textContent = 'Show';
            }
        });
    });

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        
        // Show modal for password reset
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>Reset Password</h2>
                <p>Enter your email address to receive password reset instructions.</p>
                <form id="reset-password-form">
                    <div class="form-group">
                        <label for="reset-email">Email</label>
                        <input type="email" id="reset-email" value="${email}" required>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="button">Send Reset Link</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Show modal with animation
        setTimeout(() => modal.classList.add('show'), 10);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-button');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Handle reset password form submission
        const resetForm = document.getElementById('reset-password-form');
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const resetEmail = document.getElementById('reset-email').value;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                modal.querySelector('.modal-content').innerHTML = `
                    <div style="text-align: center">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--seafoam); margin-bottom: 1rem;"></i>
                        <h2>Reset Link Sent</h2>
                        <p>Check your email for instructions to reset your password.</p>
                        <div class="modal-actions">
                            <button type="button" class="button" onclick="this.closest('.modal').classList.remove('show'); setTimeout(() => this.closest('.modal').remove(), 300)">Close</button>
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error sending reset link:', error);
            }
        });
    });

    // Form validation and submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validate email
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.textContent = 'Please enter a valid email address';
            return;
        }

        // Validate password
        if (password.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirect to dashboard (demo purposes)
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login error:', error);
        }
    });

    // Sign up form validation and submission
    const signupForm = document.querySelector('#signup-form form');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email');
        const password = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('confirm-password');

        // Validate email
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate password
        if (password.value.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        // Validate password match
        if (password.value !== confirmPassword.value) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message and switch to login
            alert('Account created successfully! Please log in.');
            toggleLinks[0].click();
        } catch (error) {
            console.error('Signup error:', error);
        }
    });
});