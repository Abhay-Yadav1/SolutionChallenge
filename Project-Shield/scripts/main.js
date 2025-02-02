// Sidebar Initialization
const initializeSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        // Remove sidebar toggle button from navbar
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.remove();
        }
        
        // Handle content margin adjustments on hover for larger screens
        const content = document.getElementById('content');
        if (content && window.innerWidth > 768) {
            content.style.marginLeft = 'var(--sidebar-collapsed-width)';
            sidebar.addEventListener('mouseenter', () => {
                content.style.marginLeft = 'var(--sidebar-width)';
            });
            sidebar.addEventListener('mouseleave', () => {
                content.style.marginLeft = 'var(--sidebar-collapsed-width)';
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (content) {
                if (window.innerWidth <= 768) {
                    content.style.marginLeft = 'var(--sidebar-collapsed-width)';
                } else {
                    content.style.marginLeft = sidebar.matches(':hover') ?
                        'var(--sidebar-width)' :
                        'var(--sidebar-collapsed-width)';
                }
            }
        });
    }
};

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
    initializeSidebar();
    initializeSearch();
    initializeReportModal();
    initializeDashboard();
    initializeCharts();
});
