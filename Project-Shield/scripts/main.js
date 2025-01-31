document.addEventListener('DOMContentLoaded', function() {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const content = document.getElementById('content');

    sidebarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const page = this.getAttribute('href'); // Use href attribute for page URL
            fetch(page)
                .then(response => response.text())
                .then(html => {
                    content.innerHTML = html;
                    highlightActiveButton(); // Update active button highlight
                });
        });
    });

    function highlightActiveButton() {
        const currentPath = window.location.pathname.split('/').pop();
        sidebarButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href') === currentPath) {
                button.classList.add('active');
            }
        });
    }

    // Initialize active button on page load
    highlightActiveButton();
    // Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
        });
    }

    // --- Authentication Page Enhancements ---
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSignupToggle = document.getElementById('login-signup-toggle');
    const passwordToggleButtons = document.querySelectorAll('.password-toggle-button');

    // Form field glow effect
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('input-glow');
        });
        input.addEventListener('blur', function() {
            this.classList.remove('input-glow');
        });
    });

    // Smooth transition between login/signup forms (if toggle exists)
    if (loginSignupToggle && loginForm && signupForm) {
        loginSignupToggle.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.toggle('fade-out');
            signupForm.classList.toggle('fade-in');
            setTimeout(() => {
                loginForm.classList.toggle('d-none');
                signupForm.classList.toggle('d-none');
                loginForm.classList.remove('fade-out', 'fade-in');
                signupForm.classList.remove('fade-out', 'fade-in');
            }, 500); // Match transition duration
        });
    }

    // "Show Password" toggle
    passwordToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    });

    // Basic form validation (example for login form)
    if (loginForm) {
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');


        // Function to handle validation and display errors
        function validateForm() {
            let isValid = true;

            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email cannot be empty';
                emailInput.classList.add('invalid');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                emailError.textContent = 'Invalid email format';
                emailInput.classList.add('invalid');
                isValid = false;
            } else {
                emailError.textContent = ''; // Clear error message
                emailInput.classList.remove('invalid');
            }


            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Password cannot be empty';
                passwordInput.classList.add('invalid');
                isValid = false;
            } else {
                passwordError.textContent = ''; // Clear error message
                passwordInput.classList.remove('invalid');
            }

            return isValid;
        }


        // Real-time validation on input blur
        emailInput.addEventListener('blur', validateForm);
        passwordInput.addEventListener('blur', validateForm);


        loginForm.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    // Example email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --- Dashboard Page Enhancements ---
    // Stats cards hover effect (example - you can expand this to all stat cards)
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseover', function() {
            this.classList.add('stat-card-hover');
        });
        card.addEventListener('mouseout', function() {
            this.classList.remove('stat-card-hover');
        });
    });

    // Live counter animations for stats (example - needs actual data fetching and update logic)
    const piracyReportsCounter = document.getElementById('piracy-reports-count');
    const matchesCounter = document.getElementById('matches-count');

    if (piracyReportsCounter) {
        animateCounter(piracyReportsCounter, 500); // Example target value
    }
    if (matchesCounter) {
        animateCounter(matchesCounter, 1200); // Example target value
    }

    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 10); // Interval increment

        function updateCounter() {
            count += increment;
            element.textContent = Math.ceil(count); // Update displayed count
            if (count < target) {
                setTimeout(updateCounter, 10);
            } else {
                element.textContent = target; // Ensure final value is точно target
            }
        }
        updateCounter();
    }

    // --- Listings Page Enhancements ---
    const piracyTable = document.getElementById('piracy-table');
    if (piracyTable) {
        piracyTable.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('click', function() {
                // Example: Redirect to details page - replace 'details.html?id=...' with your actual details page URL
                const listingId = this.getAttribute('data-id'); // Assuming you have a data-id attribute on each row
                if (listingId) {
                    window.location.href = `details.html?id=${listingId}`;
                } else {
                    console.log('No listing ID found for details page redirect.');
                }
            });
            row.addEventListener('mouseover', function() {
                this.classList.add('row-hover');
            });
            row.addEventListener('mouseout', function() {
                this.classList.remove('row-hover');
            });
        });

        // Sample listing data (replace with actual data source)
        const piracyListings = [
            { id: 1, fileName: 'example.pdf', matchPercentage: 95, website: 'piratebay.com', dateFound: '2024-01-20' },
            { id: 2, fileName: 'another-example.mp4', matchPercentage: 88, website: 'torrentz.eu', dateFound: '2024-01-25' },
            { id: 3, fileName: 'copyrighted-image.png', matchPercentage: 75, website: 'example-forum.net', dateFound: '2024-01-28' }
        ];

        function displayListings(listings) {
            const tbody = piracyTable.querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing rows
            listings.forEach(listing => {
                const row = tbody.insertRow();
                row.setAttribute('data-id', listing.id);
                row.innerHTML = `
                    <td>${listing.fileName}</td>
                    <td>${listing.matchPercentage}%</td>
                    <td>${listing.website}</td>
                    <td>${listing.dateFound}</td>
                    <td>
                        <button class="button tooltip">View<span class="tooltiptext">View report details</span></button>
                        <button class="button generate-takedown-btn">Generate Takedown</button>
                    </td>
                `;
            });
             attachRowClickListeners(); // Re-attach listeners for new rows
             attachGenerateTakedownListeners(); // Re-attach listeners for new buttons
        }


        // Sorting functionality
        piracyTable.querySelectorAll('th[data-sortable]').forEach(header => {
            header.addEventListener('click', function() {
                const column = this.getAttribute('data-sortable');
                const sortDirection = header.classList.contains('asc') ? 'desc' : 'asc'; // Toggle direction
                sortTable(column, sortDirection);
                // Update header classes to reflect sort direction
                piracyTable.querySelectorAll('th[data-sortable]').forEach(th => th.classList.remove('asc', 'desc')); // Clear other headers
                header.classList.add(sortDirection); // Add class to current header
            });
        });

        function sortTable(column, direction) {
            piracyListings.sort((a, b) => {
                let aValue = a[column];
                let bValue = b[column];

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }


                if (direction === 'asc') {
                    return (aValue < bValue) ? -1 : (aValue > bValue) ? 1 : 0;
                } else { // desc
                    return (bValue < aValue) ? -1 : (bValue > aValue) ? 1 : 0;
                }
            });
            displayListings(piracyListings); // Re-render table with sorted data
        }


        // Search bar filtering
        const searchInput = document.getElementById('listings-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const filteredListings = piracyListings.filter(listing => {
                    return listing.fileName.toLowerCase().includes(searchTerm) ||
                           listing.website.toLowerCase().includes(searchTerm) ||
                           listing.dateFound.includes(searchTerm);
                });
                displayListings(filteredListings); // Re-render table with filtered listings
            });
        }
         displayListings(piracyListings); // Initial display of listings
    }

    // "Generate Takedown" button (example modal - needs modal implementation in HTML)
    const takedownButton = document.getElementById('generate-takedown-btn');
    const takedownModal = document.getElementById('takedown-modal');
    const confirmTakedownButton = document.getElementById('confirm-takedown-btn');
    const cancelTakedownButton = document.getElementById('cancel-takedown-btn');

    if (takedownButton && takedownModal && confirmTakedownButton && cancelTakedownButton) {
        takedownButton.addEventListener('click', function() {
            takedownModal.classList.remove('d-none'); // Show modal
        });

        cancelTakedownButton.addEventListener('click', function() {
            takedownModal.classList.add('d-none'); // Hide modal
        });

        confirmTakedownButton.addEventListener('click', function() {
            alert('Takedown generated! (Placeholder)');
            takedownModal.classList.add('d-none'); // Hide modal after action
        });
    }


    // --- Listing Details Page Enhancements ---
    const matchScoreProgressBar = document.querySelector('.progress-bar');
    if (matchScoreProgressBar) {
        // Example: Animate progress bar on page load
        animateProgressBar(matchScoreProgressBar, 75, 'moderate-risk'); // Example: 75%, moderate risk
    }

    function animateProgressBar(progressBar, percentage, riskLevel) {
        progressBar.style.width = `${percentage}%`;
        progressBar.classList.add(riskLevel); // Add risk level class for color change
    }

    const aiTakedownButton = document.getElementById('generate-ai-takedown-btn');
    if (aiTakedownButton) {
        // Glitch effect on hover (example - needs CSS glitch effect)
        aiTakedownButton.addEventListener('mouseover', function() {
            this.classList.add('glitch-hover');
        });
        aiTakedownButton.addEventListener('mouseout', function() {
            this.classList.remove('glitch-hover');
        });

        // Modal for AI takedown (example - needs modal implementation in HTML)
        const aiTakedownModal = document.getElementById('ai-takedown-modal');
        const confirmAiTakedownButton = document.getElementById('confirm-ai-takedown-btn');
        const cancelAiTakedownButton = document.getElementById('cancel-ai-takedown-btn');


        if (aiTakedownModal && confirmAiTakedownButton && cancelAiTakedownButton) {
            aiTakedownButton.addEventListener('click', function() {
                aiTakedownModal.classList.remove('d-none'); // Show modal
            });

            cancelAiTakedownButton.addEventListener('click', function() {
                aiTakedownModal.classList.add('d-none'); // Hide modal
            });

            confirmAiTakedownButton.addEventListener('click', function() {
                alert('AI Takedown request submitted! (Placeholder)');
                aiTakedownModal.classList.add('d-none'); // Hide modal after action
            });
        }
    }


    // --- Threat Updates Page Enhancements ---
    const threatUpdatesContainer = document.getElementById('threat-updates-list'); // Assuming a container for threat updates
    const threatUpdatesHeader = document.querySelector('.threat-updates-header h2');
    if (threatUpdatesHeader) {
        setInterval(() => {
            threatUpdatesHeader.classList.toggle('glitch'); // Toggle glitch effect class every few seconds
        }, 4000); // Glitch effect interval
    }


    // Example: Function to fetch and display latest piracy threats dynamically (placeholder)
    function fetchThreatUpdates() {
        // Simulate fetching data (replace with actual API call)
        setTimeout(() => {
            const mockThreats = [
                { id: 1, title: 'New Phishing Campaign Detected', description: 'A large-scale phishing campaign targeting user credentials...' },
                { id: 2, title: 'Zero-Day Exploit in Popular Software', description: 'A critical zero-day exploit has been discovered...' }
            ];
            displayThreatUpdates(mockThreats);
        }, 1500); // Simulate loading time
    }

    function displayThreatUpdates(threats) {
        if (!threatUpdatesContainer) return;
        threatUpdatesContainer.innerHTML = ''; // Clear existing threats
        threats.forEach(threat => {
            const threatCard = document.createElement('div');
            threatCard.classList.add('threat-card', 'fade-in'); // Add fade-in animation
            threatCard.innerHTML = `
                <h3>${threat.title}</h3>
                <p>${threat.description}</p>
                <button class="mark-reviewed-btn button" data-threat-id="${threat.id}">Mark as Reviewed</button>
            `;
            threatUpdatesContainer.appendChild(threatCard);
        });
        attachReviewButtonListeners(); // Attach event listeners to new buttons
    }

    function attachReviewButtonListeners() {
        document.querySelectorAll('.mark-reviewed-btn').forEach(button => {
            button.addEventListener('click', function() {
                const threatCard = this.closest('.threat-card');
                threatCard.classList.add('fade-out'); // Fade out animation
                setTimeout(() => {
                    threatCard.remove(); // Remove threat card after fade out
                }, 500); // Match fade-out duration
            });
        });
    }


    // Initial fetch of threat updates on page load (if on threat updates page)
    if (document.getElementById('threat-updates-page')) { // Example ID for threat updates page container
        fetchThreatUpdates();
        setInterval(fetchThreatUpdates, 10000); // Auto-refresh every 10 seconds
    }


    // --- Additional Touches ---
    // Page transitions (fade-in on page load)
    const pageContent = document.querySelector('#content'); // Or your main content container
    if (pageContent) {
        pageContent.classList.add('page-transition');
        setTimeout(() => {
            pageContent.classList.add('active');
        }, 100); // Delay to ensure class is added
    }


    // Back to top button
    const backToTopButton = document.getElementById('back-to-top-btn');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Interactive tooltips (example - needs tooltip implementation in HTML with 'tooltip' class and 'tooltiptext' span)
    document.querySelectorAll('.tooltip').forEach(tooltipElement => {
        const tooltipText = tooltipElement.querySelector('.tooltiptext');
        tooltipElement.addEventListener('mouseover', () => {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        });
        tooltipElement.addEventListener('mouseout', () => {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.opacity = '0';
        });
    });


});
