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
