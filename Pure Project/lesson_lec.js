document.addEventListener('DOMContentLoaded', function() {
    // Video elements
    const video = document.getElementById('lessonVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    
    // Navigation elements
    const secondInsight = document.getElementById('secondInsight');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update video progress
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTime.textContent = formatTime(video.currentTime);
    }
    
    // Set video duration when metadata is loaded
    video.addEventListener('loadedmetadata', function() {
        duration.textContent = formatTime(video.duration);
    });
    
    // Update progress as video plays
    video.addEventListener('timeupdate', updateProgress);
    
    // Play/pause video functionality
    function togglePlay() {
        if (video.paused) {
            video.play();
            videoOverlay.style.display = 'none';
        } else {
            video.pause();
            videoOverlay.style.display = 'flex';
        }
    }
    
    // Play button click
    playButton.addEventListener('click', togglePlay);
    
    // Video click to toggle play/pause
    video.addEventListener('click', togglePlay);
    
    // Progress bar click to seek
    progressBarContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });
    
    // Show overlay when video ends
    video.addEventListener('ended', function() {
        videoOverlay.style.display = 'flex';
    });
    
    // Navigation functions
    function navigateToConceptLesson() {
        window.location.href = 'concept_lesson.html';
    }
    
    function navigateToLectures() {
        window.location.href = 'lectures.html';
    }
    
    // Event listeners for navigation
    secondInsight.addEventListener('click', navigateToConceptLesson);
    nextButton.addEventListener('click', navigateToConceptLesson);
    prevButton.addEventListener('click', navigateToLectures);
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        // Space bar to play/pause
        if (e.code === 'Space' && document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault();
            togglePlay();
        }
        
        // Arrow keys for navigation
        if (e.code === 'ArrowRight') {
            navigateToConceptLesson();
        } else if (e.code === 'ArrowLeft') {
            navigateToLectures();
        }
    });
    
    // Initialize video duration display
    video.addEventListener('canplay', function() {
        if (video.duration) {
            duration.textContent = formatTime(video.duration);
        }
    });
});