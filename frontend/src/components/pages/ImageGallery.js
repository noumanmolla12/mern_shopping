import React from 'react'



const images = [
    'https://media.istockphoto.com/id/174998631/photo/fresh-blueberries.jpg?s=1024x1024&w=is&k=20&c=fD8HXu_09ad388Gnu26Wny39j9owM3tSC7B15A5hGzo=',
    'https://media.istockphoto.com/id/946464980/photo/arrangement-of-fresh-fruits-from-market-and-isolated-over-white-background.jpg?s=2048x2048&w=is&k=20&c=3VttrvGSmVkSDJ8ZEzm_hHXRfDW5wn8YpzHWzxjFV-c=',
    'https://media.istockphoto.com/id/650129594/photo/fruit-collection-isolated-on-a-white.jpg?s=2048x2048&w=is&k=20&c=px0IiIHOoSaiWMT-pt5b6MBfPTCwtu__TTB7QX8k4BI=',
    'https://media.istockphoto.com/id/649685082/photo/fruit-collection-isolated-on-a-white.jpg?s=2048x2048&w=is&k=20&c=wkS7CzGmC4PRf8swN63lkkEXJ5op7yIa_nPxKUetxzo=',
    'https://media.istockphoto.com/id/1368023962/photo/pomelo-or-grapefruit-on-the-tree-in-the-garden.jpg?s=2048x2048&w=is&k=20&c=iLDlDU-19DiwhTXMEjH7S8ml4ozL6QtEkooIf_KW5M0=',
    'https://media.istockphoto.com/id/147767745/photo/salad-with-fruits-and-berries.jpg?s=2048x2048&w=is&k=20&c=EjLgSzJNVe1R9S3fJxisAtfgV4JieEUgQv1cXLHjBs8=',
  ];
const ImageGallery = () => {
  return (
    <div className="gallery">
      {images.map((src, index) => (
        <div key={index} className="gallery-item">
          <img src={src} alt={`Gallery ${index}`} />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
