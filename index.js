
        // List of all your images
        const imageFiles = [
             
            '24.JPG', '25.JPG', '26.JPG', '28.JPG', '29.JPG', '30.JPG', 
            '31.JPG', '32.JPG', '33.JPG',  'Onyango.JPG',  
            '37.JPG', '38.JPG', '39.JPG',
         '44.JPG', '45.JPG', '46.JPG', '47.JPG', '48.JPG', 
            '49.JPG', '50.JPG', '52.JPG'
        ];

        // Current image index for lightbox
        let currentImageIndex = 0;
        let images = [];

        // Load gallery images
        function loadGallery() {
            const gallery = document.getElementById('photoGallery');
            
            imageFiles.forEach((filename, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item fade-in';
                galleryItem.style.animationDelay = `${index * 0.05}s`;
                
                const img = document.createElement('img');
                img.src = filename;
                img.alt = `Football moment ${index + 1}`;
                img.loading = 'lazy';
                
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.innerHTML = `<p>Football Moment ${index + 1}</p>`;
                
                galleryItem.appendChild(img);
                galleryItem.appendChild(overlay);
                
                // Add click event to open lightbox
                galleryItem.addEventListener('click', () => {
                    openLightbox(index);
                });
                
                gallery.appendChild(galleryItem);
                images.push(img);
            });
        }

        // Lightbox functions
        function openLightbox(index) {
            currentImageIndex = index;
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            
            lightboxImg.src = images[currentImageIndex].src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            document.getElementById('lightbox-img').src = images[currentImageIndex].src;
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            document.getElementById('lightbox-img').src = images[currentImageIndex].src;
        }

        // Scroll to top functionality
        const scrollTopBtn = document.getElementById('scrollTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }); `  

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            loadGallery();
            
            // Close lightbox when clicking outside image
            document.getElementById('lightbox').addEventListener('click', (e) => {
                if (e.target.id === 'lightbox') {
                    closeLightbox();
                }
            });
            
            // Keyboard navigation for lightbox
            document.addEventListener('keydown', (e) => {
                const lightbox = document.getElementById('lightbox');
                if (lightbox.style.display === 'flex') {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowRight') nextImage();
                    if (e.key === 'ArrowLeft') prevImage();
                }
            });
        });

        // Add fade-in animation to elements when scrolling
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });