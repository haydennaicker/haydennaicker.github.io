const projects = document.querySelectorAll('.project');
const popup = document.getElementById('gallery-popup');
const popupImg = document.getElementById('popup-image');
const closePopup = document.getElementById('close-popup');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentImages = [];
let currentIndex = 0;

projects.forEach(project => {
    project.addEventListener('click', () => {
        const images = JSON.parse(project.getAttribute('data-images'));
        if (images && images.length > 0) {
            currentImages = images;
            currentIndex = 0;
            showImage();
            popup.classList.remove('hidden');
        }
    });
});

function showImage() {
    popupImg.src = currentImages[currentIndex];
}

closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
});
