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

// Initialize Details Page
const initializeDetailsPage = () => {
    console.log('Initializing details page...'); // Debug log
    const detailsContainer = document.querySelector('.details-container');
    if (detailsContainer) {
        console.log('Details container found'); // Debug log
        // Add page transition effect
        detailsContainer.classList.add('page-transition');
        detailsContainer.classList.add('active');

        // Initialize AI Takedown Modal
        const aiTakedownBtn = document.getElementById('generate-ai-takedown-btn');
        const aiTakedownModal = document.getElementById('ai-takedown-modal');
        const closeBtn = document.getElementById('cancel-ai-takedown-btn-modal');
        const cancelBtn = document.getElementById('cancel-ai-takedown-btn-modal2');
        const confirmBtn = document.getElementById('confirm-ai-takedown-btn');

        if (aiTakedownBtn && aiTakedownModal) {
            console.log('AI Takedown elements found'); // Debug log
            aiTakedownBtn.addEventListener('click', () => {
                aiTakedownModal.classList.remove('d-none');
            });

            closeBtn.addEventListener('click', () => {
                aiTakedownModal.classList.add('d-none');
            });

            cancelBtn.addEventListener('click', () => {
                aiTakedownModal.classList.add('d-none');
            });

            confirmBtn.addEventListener('click', () => {
                // Handle AI takedown generation
                console.log('Generating AI takedown...');
                aiTakedownModal.classList.add('d-none');
                // Add your AI takedown generation logic here
            });
        } else {
            console.log('AI Takedown elements not found'); // Debug log
        }
    } else {
        console.log('Details container not found'); // Debug log
    }
};

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
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
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
                similarityThreshold: similarity.value
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
        if (!modal) return;
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
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
            refreshBtn.disabled = true;

            // Simulate data refresh
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
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
                datasets: [{
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
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Detection Trends Over Time',
                        color: '#66ffff', // var(--neon-cyan)
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(224, 224, 224, 0.1)',
                            borderColor: 'rgba(224, 224, 224, 0.2)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(224, 224, 224, 0.1)',
                            borderColor: 'rgba(224, 224, 224, 0.2)'
                        }
                    }
                }
            }
        });
    }

    // Platform Distribution Chart
    const platformDistribution = document.getElementById('platform-distribution');
    if (platformDistribution) {
        const ctx = platformDistribution.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Websites', 'Social Media', 'File Sharing', 'Other'],
                datasets: [{
                    data: [35, 25, 20, 20],
                    backgroundColor: [
                        '#66ffff', // var(--neon-cyan)
                        '#ff66ff', // var(--magenta)
                        '#b9f2b9', // var(--seafoam)
                        '#121212'  // var(--medium-gray)
                    ],
                    borderColor: '#1a001a', // var(--dark-bg)
                    borderWidth: 2,
                    hoverOffset: 4
                }]
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
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Platform Distribution',
                        color: '#66ffff', // var(--neon-cyan)
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Run page-specific initializations first
    initializeDetailsPage();
    
    // Then run common initializations
    initializeSearch();
    initializeReportModal();
    initializeDashboard();
    initializeCharts();
});
