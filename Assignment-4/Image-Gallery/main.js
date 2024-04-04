const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArray = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg']

/* Declaring the alternative text for each image file */
const altText = {
  'pic1.jpg' : 'Closeup of a human eye',
  'pic2.jpg' : 'Rock that has a wave-like pattern',
  'pic3.jpg' : 'white and purple flowers',
  'pic4.jpg' : 'wall with egyptian hieroglyphs',
  'pic5.jpg' : 'A moth on a leaf'
}

/* Looping through images */
for (const image of imageArray){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', altText[image]);
    thumbBar.appendChild(newImage);
}


/* Wiring up the Darken/Lighten button */
