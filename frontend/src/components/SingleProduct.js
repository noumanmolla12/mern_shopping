import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleProduct } from '../features/productSlice';
import { addItem } from '../features/cartSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector(state => state.products.singleProduct);
  const imagePath = useSelector(state => state.global.imagePath);

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Description');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct && singleProduct.product_images.length > 0) {
      setMainImage(imagePath + singleProduct.product_images[0]);
    }
  }, [singleProduct, imagePath]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const addToCart = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      _id: formData.get('_id'),
      productName: formData.get('productName'),
      description: formData.get('description'),
      price: formData.get('price'),
      images: Array.from(formData.keys())
        .filter(key => key.startsWith('image-'))
        .map(key => formData.get(key)),
      quantity: parseInt(formData.get('quantity'), 10) || 1
    };
    dispatch(addItem(productData));
    setShowSuccessMessage(true);
  };

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };


   const [selectedRating, setSelectedRating] = useState(0);

  return (
    <>
      {singleProduct ? (
        <section className="container py-5"><br/><br/><br/><br/><br/><br/>
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
  <div
    style={{
      width: '100%',
      height: '400px',
      overflow: 'hidden',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '15px',
      backgroundColor: '#fff',
    }}
  >
    <img
      src={mainImage}
      alt="Main Product"
      className="w-100 h-100"
      style={{
        objectFit: 'cover',
        transition: 'transform 0.3s ease-in-out',
      }}
    />
  </div>

  <div className="d-flex flex-wrap gap-2">
    {singleProduct.product_images.map((image, index) => (
      <div
        key={index}
        onClick={() => handleImageClick(imagePath + image)}
        style={{
          width: '65px',
          height: '65px',
          border: mainImage === imagePath + image ? '2px solid #28a745' : '1px solid #ccc',
          borderRadius: '6px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src={imagePath + image}
          alt={`Product ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ))}
  </div>
</div>


            {/* Product Details */}
            <div className="col-md-6">
              <h3>{singleProduct.productName}</h3>
              <h4 className="text-danger">${singleProduct.price}</h4>
              <div className="mb-2">
                <i className="las la-star text-warning"></i>
                <i className="las la-star text-warning"></i>
                <i className="las la-star text-warning"></i>
                <i className="las la-star text-warning"></i>
                <i className="las la-star text-warning"></i>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star`}
          onClick={() => setSelectedRating(star)}
          style={{
            color: star <= selectedRating ? '#FFD700' : '#ccc',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
        ></i>
      ))}
      <span className="ms-2">{selectedRating > 0 ? `${selectedRating} stars` : 'Click to rate'}</span>
    </div>
              </div>
              <p>{singleProduct.description}</p>

              {/* Color Options */}
              <div className="mb-3">
                <h5>Color</h5>
                <div className="d-flex gap-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => handleColorChange(color)}
                      style={{
                        width: '25px',
                        height: '25px',
                        backgroundColor: color,
                        border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
                        cursor: 'pointer',
                        borderRadius: '50%'
                      }}
                    ></div>
                  ))}
                </div>
                <small className="d-block mt-1 d-flex align-items-center">
  Selected:&nbsp;
  <span style={{
    width: '50px',
    height: '50px',
    backgroundColor: selectedColor,
    display: 'inline-block',
    borderRadius: '50%',
    border: '2px solid #ccc'
  }}></span>
</small>

              </div>

              {/* Size Dropdown */}
              <div className="mb-3">
                <label className="form-label">Select Size</label>
                <select className="form-select" onChange={event => {
                  document.getElementById('selected-value').innerText = `You selected: ${event.target.value}`;
                }}>
                  <option value="" disabled selected>Select an option</option>
                  <option value="XS">Extra Small</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
                <p id="selected-value" className="text-muted mt-1"></p>
              </div>

              {/* Add to Cart Form */}
              <form onSubmit={addToCart}>
                <input type="hidden" name="_id" value={singleProduct._id} />
                <input type="hidden" name="productName" value={singleProduct.productName} />
                <input type="hidden" name="description" value={singleProduct.description} />
                <input type="hidden" name="price" value={singleProduct.price} />
                {singleProduct.product_images.map((image, index) => (
                  <input key={index} type="hidden" name={`image-${index}`} value={imagePath + image} />
                ))}

                <div className="d-flex align-items-center mb-3">
                  <label className="me-2">Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control w-auto"
                  />
                </div>

               <button
  type="submit"
  className="btn btn-success btn-sm w-auto px-3 py-1 mb-2"
  style={{
    fontWeight: 'bold',
    borderRadius: '20px',
    fontSize: '0.9rem'
  }}
>
  Add To Cart
</button>

                {showSuccessMessage && (
                  <p className="text-success">
  Product Added Successfully.{' '}
  <Link to="/cart" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#28a745' }}>
    View Cart
  </Link>
</p>

                )}
              </form>

              <button type="button" className="btn btn-outline-secondary w-100 mb-4">Add To Wishlist</button>

              {/* Tab Section */}
              <div className="mt-4">
                <div className="btn-group mb-2">
                  <button className="btn btn-outline-dark" onClick={() => handleClick('Description')}>Description</button>
                  <button className="btn btn-outline-dark" onClick={() => handleClick('Additional Info')}>Additional Info</button>
                  <button className="btn btn-outline-dark" onClick={() => handleClick('Review')}>Review</button>
                </div>

                <div className="border p-3">
                  {selectedOption === 'Description' && <div>{singleProduct.description}</div>}
                  {selectedOption === 'Additional Info' && <div>No Additional Info.</div>}
                  {selectedOption === 'Review' && (
                    <>
                      {[1, 2].map(i => (
                        <div className="d-flex mb-3" key={i}>
                          <img
                            src={i === 1
                              ? "https://media.istockphoto.com/id/2098882479/photo/photo-of-cute-positive-person-toothy-smile-arm-fingers-demonstrate-v-sign-hello-greetings.jpg?s=2048x2048&w=is&k=20&c=bUFNBqheSRQFMPTHZ1OIdGA6sdcIc18HcsvW2ZCcInw="
                              : "https://media.istockphoto.com/id/1134957092/photo/close-up-portrait-of-handsome-young-caucasian-male-with-a-happy-face-smiling-wearing-smart.jpg?s=2048x2048&w=is&k=20&c=cAJHA1Oc14HkC1pe5x79zYlajnvK8XUbOOu3pOrbX-Y="}
                            alt="Reviewer"
                            className="rounded-circle me-3"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6>James Fread</h6>
                            <p className="mb-1">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div className="text-warning">
                              ★★★★★
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center my-5">Loading...</p>
      )}
    </>
  );
};

export default SingleProduct;
