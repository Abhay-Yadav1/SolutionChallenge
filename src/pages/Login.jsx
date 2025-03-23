import { useEffect } from 'react';

function Login() {
	useEffect(() => {
		const loginForm = document.getElementById('login-form');
		const signupFormContainer = document.getElementById('signup-form');
		const toggleLinks = document.querySelectorAll('#login-signup-toggle');

		toggleLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				if (loginForm.classList.contains('d-none')) {
					loginForm.classList.remove('d-none');
					signupFormContainer.classList.add('d-none');
				} else {
					loginForm.classList.add('d-none');
					signupFormContainer.classList.remove('d-none');
				}
			});
		});

		// Password toggle functionality
		const passwordToggles = document.querySelectorAll(
			'.password-toggle-button'
		);
		passwordToggles.forEach((toggle) => {
			toggle.addEventListener('click', () => {
				const input =
					toggle.previousElementSibling ||
					toggle.parentElement.querySelector('input[type="password"]');
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
                        <label htmlFor="reset-email">Email</label>
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
					await new Promise((resolve) => setTimeout(resolve, 1500));

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
				await new Promise((resolve) => setTimeout(resolve, 1000));
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
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Show success message and switch to login
				alert('Account created successfully! Please log in.');
				toggleLinks[0].click();
			} catch (error) {
				console.error('Signup error:', error);
			}
		});
	});
	return (
		<div id='main-container'>
			<main id='content'>
				<div className='login-container'>
					<h2>Login</h2>
					<form id='login-form'>
						<div className='form-group'>
							<label htmlFor='login-email'>Email</label>
							<input
								type='email'
								id='login-email'
								required
							/>
							<div
								className='error-message'
								id='email-error'
							></div>
						</div>
						<div className='form-group password-input-container'>
							<label htmlFor='login-password'>Password</label>
							<input
								type='password'
								id='login-password'
								required
							/>
							<button
								type='button'
								className='password-toggle-button'
							>
								Show
							</button>
							<div
								className='error-message'
								id='password-error'
							></div>
						</div>
						<button
							type='submit'
							className='btn-primary'
						>
							Login
						</button>
						<a
							href='#'
							className='forgot-password'
						>
							Forgot Password?
						</a>
						<p>
							Don't have an account?{' '}
							<a
								href='#'
								id='login-signup-toggle'
							>
								Sign Up
							</a>
						</p>
					</form>

					<div
						id='signup-form'
						className='d-none'
					>
						<h2>Sign Up</h2>
						<form id='signup-form'>
							<div className='form-group'>
								<label htmlFor='signup-email'>Email</label>
								<input
									type='email'
									id='signup-email'
									required
								/>
								<div
									className='error-message'
									id='signup-email-error'
								></div>
							</div>
							<div className='form-group'>
								<label htmlFor='signup-password'>Password</label>
								<div className='password-input-container'>
									<input
										type='password'
										id='signup-password'
										required
									/>
									<button
										type='button'
										className='password-toggle-button'
									>
										Show
									</button>
									<div
										className='error-message'
										id='signup-password-error'
									></div>
								</div>
							</div>
							<div className='form-group'>
								<label htmlFor='confirm-password'>Confirm Password</label>
								<div className='password-input-container'>
									<input
										type='password'
										id='confirm-password'
										required
									/>
									<button
										type='button'
										className='password-toggle-button'
									>
										Show
									</button>
									<div
										className='error-message'
										id='confirm-password-error'
									></div>
								</div>
							</div>
							<button
								type='submit'
								className='btn-primary'
							>
								Sign Up
							</button>
							<p>
								Already have an account?{' '}
								<a
									href='#'
									id='login-signup-toggle'
								>
									Login
								</a>
							</p>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Login;
