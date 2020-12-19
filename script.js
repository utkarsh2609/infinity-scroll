const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadMoreImages = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loadMoreImages = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Creat elements for Links,photos and add it to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach(photo => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.urls.regular,
            title: photo.urls.regular
        });
        //  Event listener, check when each photo is loaded
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// Unsplash API
const imageCount = 10;
const apiKey = 'bxXDhORxZaTw0lwTuLHVk1jo4Ee0LqayovwRqNlLocY';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// Get photos from Unsplash API
async function getPhotosFromAPI() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log('Oops! an error occured', error);        
    }
}

// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && loadMoreImages) {
        loadMoreImages = false;
        getPhotosFromAPI();
    }
});

// On Load
getPhotosFromAPI();
