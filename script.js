document.querySelectorAll('.clickable-image').forEach(image => {
    image.addEventListener('click', function() {
        // Add glow effect
        this.classList.add('glow-effect');
        
        // Remove glow effect after animation
        setTimeout(() => {
            this.classList.remove('glow-effect');
        }, 1000);
        
        // Add light effect
        const light = document.createElement('div');
        light.classList.add('light-effect');
        this.appendChild(light);
        
        // Remove light effect after animation
        setTimeout(() => {
            light.remove();
        }, 500);
    });
});