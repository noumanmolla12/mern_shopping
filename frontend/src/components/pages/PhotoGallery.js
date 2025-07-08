import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const imageList = [
  { id: 1, src: "https://html.themexriver.com/organio/assets/img/gallery/gl1.jpg", alt: 'Image 1' },
  { id: 2, src: "https://html.themexriver.com/organio/assets/img/gallery/gl2.jpg", alt: 'Image 2' },
  { id: 3, src: "https://html.themexriver.com/organio/assets/img/gallery/gl3.jpg", alt: 'Image 3' },
  { id: 4, src: "https://html.themexriver.com/organio/assets/img/gallery/gl4.jpg", alt: 'Image 4' },
   { id: 5, src: "https://html.themexriver.com/organio/assets/img/gallery/gl5.jpg", alt: 'Image 5' },
  { id: 6, src: "https://html.themexriver.com/organio/assets/img/gallery/gl6.jpg", alt: 'Image 6' },
  // Add more images as needed
];

const PhotoGallery = () => {
  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
    gap: '15px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    objectFit: 'cover',
  };

  return (
    <div className="photo-gallery" style={galleryStyle}>
      {imageList.map((image) => (
        <div key={image.id} className="photo-item">
          <Zoom>
            <img src={image.src} alt={image.alt} style={imageStyle} />
          </Zoom>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
