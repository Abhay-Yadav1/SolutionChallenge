import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
	useEffect(() => {
		// Chart.js Default Configuration
		Chart.defaults.color = '#e0e0e0'; // var(--light-gray)
		Chart.defaults.borderColor = 'rgba(18, 18, 18, 0.5)'; // var(--medium-gray) with opacity
		Chart.defaults.font.family = "'Poppins', sans-serif"; // var(--modern-font)
		Chart.defaults.plugins.tooltip.backgroundColor = '#1a001a'; // var(--dark-bg)
		Chart.defaults.plugins.tooltip.borderColor = '#66ffff'; // var(--neon-cyan)
		Chart.defaults.plugins.tooltip.borderWidth = 1;
		Chart.defaults.plugins.tooltip.titleColor = '#66ffff'; // var(--neon-cyan)
		Chart.defaults.plugins.tooltip.bodyColor = '#e0e0e0'; // var(--light-gray)
		Chart.defaults.plugins.tooltip.padding = 10;
		Chart.defaults.plugins.legend.labels.color = '#e0e0e0'; // var(--light-gray)

		// Search Functionality
		const initializeSearch = () => {
			const searchInput = document.getElementById('content-search');
			const searchButton = document.getElementById('search-trigger');
			const contentType = document.getElementById('content-type');
			const timeRange = document.getElementById('time-range');
			const similarity = document.getElementById('similarity');

			const performSearch = () => {
				const searchQuery = searchInput.value.trim();
				if (!searchQuery) return;

				// Show loading state
				searchButton.innerHTML =
					'<i class="fas fa-spinner fa-spin"></i> Searching...';
				searchButton.disabled = true;

				// Simulate API call with setTimeout
				setTimeout(() => {
					// Reset button state
					searchButton.innerHTML = 'Search';
					searchButton.disabled = false;

					// Show results (to be implemented with actual API)
					console.log('Search Parameters:', {
						query: searchQuery,
						type: contentType.value,
						timeRange: timeRange.value,
						similarityThreshold: similarity.value,
					});
				}, 2000);
			};

			if (searchInput && searchButton) {
				searchButton.addEventListener('click', performSearch);
				searchInput.addEventListener('keypress', (e) => {
					if (e.key === 'Enter') performSearch();
				});
			}
		};

		// Report Modal
		const initializeReportModal = () => {
			const modal = document.getElementById('report-modal');
			const reportBtn = document.getElementById('report-violation');
			const closeBtn = document.querySelector('.close-modal');
			const cancelBtn = document.getElementById('cancel-report');
			const form = document.getElementById('violation-report-form');

			const toggleModal = (show = true) => {
				modal.style.display = show ? 'flex' : 'none';
				if (show) {
					modal.classList.add('show');
					document.body.style.overflow = 'hidden';
				} else {
					modal.classList.remove('show');
					document.body.style.overflow = '';
				}
			};

			if (reportBtn) {
				reportBtn.addEventListener('click', () => toggleModal(true));
			}

			if (closeBtn) {
				closeBtn.addEventListener('click', () => toggleModal(false));
			}

			if (cancelBtn) {
				cancelBtn.addEventListener('click', () => toggleModal(false));
			}

			if (form) {
				form.addEventListener('submit', (e) => {
					e.preventDefault();
					// Simulate form submission
					const formData = new FormData(form);
					const data = Object.fromEntries(formData.entries());
					console.log('Report Data:', data);

					// Show success message
					alert('Report submitted successfully!');
					toggleModal(false);
					form.reset();
				});
			}

			// Close modal when clicking outside
			window.addEventListener('click', (e) => {
				if (e.target === modal) {
					toggleModal(false);
				}
			});
		};

		// Dashboard Controls
		const initializeDashboard = () => {
			const refreshBtn = document.getElementById('refresh-dashboard');
			const timeframeSelect = document.getElementById('dashboard-timeframe');

			if (refreshBtn) {
				refreshBtn.addEventListener('click', () => {
					refreshBtn.innerHTML =
						'<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
					refreshBtn.disabled = true;

					// Simulate data refresh
					setTimeout(() => {
						refreshBtn.innerHTML =
							'<i class="fas fa-sync-alt"></i> Refresh Data';
						refreshBtn.disabled = false;
						initializeCharts(); // Refresh charts
					}, 1500);
				});
			}

			if (timeframeSelect) {
				timeframeSelect.addEventListener('change', () => {
					initializeCharts(); // Update charts based on new timeframe
				});
			}
		};

		// Initialize Charts
		const initializeCharts = () => {
			// Detection Trends Chart
			const detectionTrends = document.getElementById('detection-trends');
			if (detectionTrends) {
				const ctx = detectionTrends.getContext('2d');
				new Chart(ctx, {
					type: 'line',
					data: {
						labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
						datasets: [
							{
								label: 'Piracy Detections',
								data: [65, 59, 80, 81, 56, 55],
								borderColor: '#66ffff', // var(--neon-cyan)
								backgroundColor: 'rgba(102, 255, 255, 0.1)',
								borderWidth: 2,
								tension: 0.4,
								fill: true,
								pointBackgroundColor: '#66ffff',
								pointBorderColor: '#1a001a',
								pointHoverBackgroundColor: '#1a001a',
								pointHoverBorderColor: '#66ffff',
								pointRadius: 4,
								pointHoverRadius: 6,
							},
						],
					},
					options: {
						responsive: true,
						interaction: {
							intersect: false,
							mode: 'index',
						},
						plugins: {
							legend: {
								position: 'top',
								labels: {
									boxWidth: 20,
									usePointStyle: true,
									pointStyle: 'circle',
								},
							},
							title: {
								display: true,
								text: 'Detection Trends Over Time',
								color: '#66ffff', // var(--neon-cyan)
								font: {
									size: 16,
									weight: 'bold',
								},
							},
						},
						scales: {
							x: {
								grid: {
									color: 'rgba(224, 224, 224, 0.1)',
									borderColor: 'rgba(224, 224, 224, 0.2)',
								},
							},
							y: {
								grid: {
									color: 'rgba(224, 224, 224, 0.1)',
									borderColor: 'rgba(224, 224, 224, 0.2)',
								},
							},
						},
					},
				});
			}

			// Platform Distribution Chart
			const platformDistribution = document.getElementById(
				'platform-distribution'
			);
			if (platformDistribution) {
				const ctx = platformDistribution.getContext('2d');
				new Chart(ctx, {
					type: 'doughnut',
					data: {
						labels: ['Websites', 'Social Media', 'File Sharing', 'Other'],
						datasets: [
							{
								data: [35, 25, 20, 20],
								backgroundColor: [
									'#66ffff', // var(--neon-cyan)
									'#ff66ff', // var(--magenta)
									'#b9f2b9', // var(--seafoam)
									'#121212', // var(--medium-gray)
								],
								borderColor: '#1a001a', // var(--dark-bg)
								borderWidth: 2,
								hoverOffset: 4,
							},
						],
					},
					options: {
						responsive: true,
						cutout: '70%',
						plugins: {
							legend: {
								position: 'top',
								labels: {
									padding: 15,
									usePointStyle: true,
									pointStyle: 'circle',
								},
							},
							title: {
								display: true,
								text: 'Platform Distribution',
								color: '#66ffff', // var(--neon-cyan)
								font: {
									size: 16,
									weight: 'bold',
								},
							},
						},
					},
				});
			}
		};

		// Initialize everything when DOM is loaded
		initializeSearch();
		initializeReportModal();
		initializeDashboard();
		initializeCharts();
	}, []);
	return (
		<>
			<div className='hero-section'>
				<div className='cyber-grid'></div>
				<div className='hero-content'>
					<h1 className='glitch-text'>Protect Your Digital Assets</h1>
					<p className='typing-text'>
						Advanced AI-powered intellectual property protection platform
					</p>
					<div className='hero-stats'>
						<div className='stat'>
							<span className='stat-number'>99.9%</span>
							<span className='stat-label'>Detection Rate</span>
						</div>
						<div className='stat'>
							<span className='stat-number'>24/7</span>
							<span className='stat-label'>Active Monitoring</span>
						</div>
						<div className='stat'>
							<span className='stat-number'>100K+</span>
							<span className='stat-label'>Protected Assets</span>
						</div>
					</div>
					<div className='hero-buttons'>
						<Link
							to='#features'
							className='button primary'
						>
							<span className='button-text'>Explore Features</span>
							<i className='fas fa-arrow-right'></i>
						</Link>
						<Link
							to='#demo'
							className='button secondary'
						>
							<span className='button-text'>Request Demo</span>
							<i className='fas fa-play'></i>
						</Link>
					</div>
				</div>
				<div className='hero-animation'>
					<div className='shield-icon'>
						<i className='fas fa-shield-alt'></i>
					</div>
					<div className='security-rings'>
						<div className='ring ring1'></div>
						<div className='ring ring2'></div>
						<div className='ring ring3'></div>
					</div>
					<div className='floating-icons'>
						<i className='fas fa-lock security-icon'></i>
						<i className='fas fa-code security-icon'></i>
						<i className='fas fa-database security-icon'></i>
					</div>
				</div>
			</div>

			<div className='section-divider'></div>

			<section
				id='features'
				className='features-section fade-in'
			>
				<h2>Key Features</h2>
				<div className='features-grid'>
					<div className='feature-card'>
						<i className='fas fa-search'></i>
						<h3>Internet Scanning</h3>
						<p>Continuous monitoring for unauthorized content across the web</p>
					</div>
					<div className='feature-card'>
						<i className='fas fa-bell'></i>
						<h3>Instant Alerts</h3>
						<p>Real-time notifications of potential IP infringements</p>
					</div>
					<div className='feature-card'>
						<i className='fas fa-robot'></i>
						<h3>AI-Powered Analysis</h3>
						<p>Smart detection of modified or reused content</p>
					</div>
					<div className='feature-card'>
						<i className='fas fa-file-alt'></i>
						<h3>Automated Takedowns</h3>
						<p>AI-generated DMCA takedown requests</p>
					</div>
				</div>
			</section>

			<div className='section-divider'></div>

			<div id='main-container'>
				<main id='content'>
					<div className='search-container'>
						<div className='search-header'>
							<h2>Search for Pirated Content</h2>
							<p>
								Enter keywords or URLs to scan across the internet for potential
								IP violations
							</p>
						</div>
						<div className='search-box'>
							<div className='search-input-wrapper'>
								<i className='fas fa-search'></i>
								<input
									type='text'
									id='content-search'
									placeholder='Enter keywords, titles, or URLs to search...'
								/>
								<button
									className='search-button'
									id='search-trigger'
								>
									Search
								</button>
							</div>
							<div className='search-filters'>
								<select id='content-type'>
									<option value='all'>All Types</option>
									<option value='text'>Text Content</option>
									<option value='image'>Images</option>
									<option value='video'>Videos</option>
									<option value='audio'>Audio</option>
								</select>
								<select id='time-range'>
									<option value='all'>Any Time</option>
									<option value='day'>Past 24 Hours</option>
									<option value='week'>Past Week</option>
									<option value='month'>Past Month</option>
								</select>
								<select id='similarity'>
									<option value='75'>75%+ Similar</option>
									<option value='85'>85%+ Similar</option>
									<option value='95'>95%+ Similar</option>
								</select>
							</div>
						</div>
					</div>

					<div className='dashboard-container'>
						<div className='dashboard-header'>
							<h2>Real-Time Dashboard</h2>
							<div className='dashboard-controls'>
								<button
									className='refresh-btn'
									id='refresh-dashboard'
								>
									<i className='fas fa-sync-alt'></i> Refresh Data
								</button>
								<select id='dashboard-timeframe'>
									<option value='1h'>Last Hour</option>
									<option value='24h'>Last 24 Hours</option>
									<option value='7d'>Last 7 Days</option>
									<option value='30d'>Last 30 Days</option>
								</select>
							</div>
						</div>

						<div className='stats'>
							<div
								className='stat-card'
								data-tooltip='Total number of reports received'
							>
								<i className='fas fa-flag'></i>
								<h3>Total Piracy Reports</h3>
								<p id='piracy-reports-count'>120</p>
								<span className='trend up'>+12% this month</span>
							</div>
							<div
								className='stat-card'
								data-tooltip='Total matches found across platforms'
							>
								<i className='fas fa-search'></i>
								<h3>Matches Found</h3>
								<p id='matches-count'>30</p>
								<span className='trend neutral'>Same as last month</span>
							</div>
							<div
								className='stat-card'
								data-tooltip='Successfully completed takedowns'
							>
								<i className='fas fa-check-circle'></i>
								<h3>Successful Takedowns</h3>
								<p id='successful-takedowns-count'>90</p>
								<span className='trend up'>+5% this month</span>
							</div>
						</div>

						<div className='data-visualization'>
							<div className='chart-container'>
								<canvas id='detection-trends'></canvas>
							</div>
							<div className='chart-container'>
								<canvas id='platform-distribution'></canvas>
							</div>
						</div>

						<div className='section-divider'></div>

						<div className='alerts'>
							<div className='section-header'>
								<h2>Recent Security Alerts</h2>
								<p>
									Real-time notifications of potential IP violations and system
									activities
								</p>
							</div>
							<div className='alerts-header'>
								<span>Latest Updates</span>
								<div className='alerts-filter'>
									<button
										className='active'
										data-filter='all'
									>
										All
									</button>
									<button data-filter='high'>High Priority</button>
									<button data-filter='normal'>Normal</button>
								</div>
							</div>
							<ul id='alerts-list'>
								<li className='high-priority'>
									<i className='fas fa-exclamation-triangle'></i>
									<div className='alert-content'>
										<div className='alert-header'>
											<span className='alert-title'>
												New piracy report detected
											</span>
											<span className='alert-time'>2 minutes ago</span>
										</div>
										<p>File: "example.pdf" found on multiple platforms</p>
										<div className='alert-actions'>
											<button
												className='button'
												id='report-violation'
											>
												Report Violation
											</button>
											<button className='button'>View Details</button>
										</div>
									</div>
								</li>
								<li className='normal-priority'>
									<i className='fas fa-bell'></i>
									<div className='alert-content'>
										<div className='alert-header'>
											<span className='alert-title'>Takedown request sent</span>
											<span className='alert-time'>15 minutes ago</span>
										</div>
										<p>File: "another-example.mp4" - Awaiting response</p>
										<div className='alert-actions'>
											<button className='button'>Track Progress</button>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div
						id='report-modal'
						className='modal'
					>
						<div className='modal-content'>
							<div className='modal-header'>
								<h2>Report Copyright Violation</h2>
								<button className='close-modal'>&times;</button>
							</div>
							<div className='modal-body'>
								<form id='violation-report-form'>
									<div className='form-group'>
										<label htmlFor='content-title'>Content Title</label>
										<input
											type='text'
											id='content-title'
											required
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='violation-type'>Type of Violation</label>
										<select
											id='violation-type'
											required
										>
											<option value=''>Select type...</option>
											<option value='copyright'>Copyright Infringement</option>
											<option value='trademark'>Trademark Violation</option>
											<option value='patent'>Patent Infringement</option>
										</select>
									</div>
									<div className='form-group'>
										<label htmlFor='violation-url'>URL of Violation</label>
										<input
											type='url'
											id='violation-url'
											required
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='evidence-upload'>Upload Evidence</label>
										<input
											type='file'
											id='evidence-upload'
											multiple
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='description'>Description</label>
										<textarea
											id='description'
											rows='4'
											required
										></textarea>
									</div>
									<div className='form-actions'>
										<button
											type='button'
											className='button secondary'
											id='cancel-report'
										>
											Cancel
										</button>
										<button
											type='submit'
											className='button primary'
										>
											Submit Report
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</main>
			</div>

			<div className='section-divider'></div>

			<footer className='main-footer fade-in'>
				<div className='footer-grid'>
					<div className='footer-section'>
						<h3>Project Shield</h3>
						<p>Protecting intellectual property in the digital age</p>
					</div>
					<div className='footer-section'>
						<h4>Quick Links</h4>
						<ul>
							<li>
								<Link to='#features'>Features</Link>
							</li>
							<li>
								<Link to='#pricing'>Pricing</Link>
							</li>
							<li>
								<Link to='#about'>About Us</Link>
							</li>
							<li>
								<Link to='#contact'>Contact</Link>
							</li>
						</ul>
					</div>
					<div className='footer-section'>
						<h4>Legal</h4>
						<ul>
							<li>
								<Link to='#privacy'>Privacy Policy</Link>
							</li>
							<li>
								<Link to='#terms'>Terms of Service</Link>
							</li>
							<li>
								<Link to='#compliance'>Compliance</Link>
							</li>
						</ul>
					</div>
					<div className='footer-section'>
						<h4>Connect</h4>
						<div className='social-links'>
							<Link to='#'>
								<i className='fab fa-twitter'></i>
							</Link>
							<Link to='#'>
								<i className='fab fa-linkedin'></i>
							</Link>
							<Link to='#'>
								<i className='fab fa-github'></i>
							</Link>
						</div>
					</div>
				</div>
				<div className='footer-bottom'>
					<p>&copy; 2025 Project Shield. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}

export default Home;
