document.addEventListener('DOMContentLoaded', function() {
    // Get all edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const toast = document.getElementById('toast');
    
    // Add event listeners to edit buttons
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Task deleted successfully!');
        });
    });
    
    // Add event listeners to delete buttons
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Find the parent assignment item and remove it
            const assignmentItem = this.closest('.grid');
            if (assignmentItem) {
                assignmentItem.style.opacity = '0';
                assignmentItem.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    assignmentItem.remove();
                    showToast('Task deleted successfully!');
                }, 300);
            }
        });
    });
    
    // Function to show toast notification
    function showToast(message) {
        const toastMessage = document.getElementById('toast-message');
        toastMessage.textContent = message;
        
        // Show the toast
        toast.classList.remove('toast-hide');
        toast.classList.add('toast-show');
        toast.style.transform = 'translateX(0)';
        
        // Hide the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('toast-show');
            toast.classList.add('toast-hide');
            
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                toast.classList.remove('toast-hide');
            }, 300);
        }, 3000);
    }
    
    // Navigation functionality
    const dashboardLinks = document.querySelectorAll('a[href="student.html"]');
    const coursesLinks = document.querySelectorAll('a[href="courses.html"]');
    
    dashboardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'student.html';
        });
    });
    
    coursesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'courses.html';
        });
    });
});