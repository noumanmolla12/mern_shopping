import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, updateProduct } from '../../features/productSlice';
import { fetchAllCategories } from '../../features/categorySlice';
import { selectImagePath } from '../../features/globalpaths';

const EditProduct = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    price: '',
    product_images: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (productId) {
      const selectedProduct = products.find((product) => product._id === productId);
      if (selectedProduct) {
        setFormData({
          category: selectedProduct.category,
          productName: selectedProduct.productName,
          description: selectedProduct.description,
          price: selectedProduct.price,
          product_images: selectedProduct.product_images || [],
        });
      }
    }
  }, [productId, products]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, product_images: [...formData.product_images, ...files] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('category', formData.category);
    productData.append('productName', formData.productName);
    productData.append('description', formData.description);
    productData.append('price', formData.price);

    formData.product_images.forEach((file) => {
      productData.append('product_images', file);
    });

    try {
      await dispatch(updateProduct({ productId, formData: productData }));
      setSuccessMessage('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      backgroundColor: '#fefefe',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', color: 'rgb(40, 167, 69)', marginBottom: '30px' }}>Edit Product</h2>

      {successMessage && (
        <div style={{
          padding: '10px 15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '5px',
          marginBottom: '15px',
        }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Category</label>
          <select
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Images */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Images</label>
          <input
            type="file"
            name="product_images"
            onChange={handleImageChange}
            multiple
            style={{ display: 'block' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px' }}>
            {products.map(product =>
              product._id === productId &&
              product.product_images.map((image, index) => (
                <img
                  key={index}
                  src={imagePath + image}
                  alt={`Product ${index + 1}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    marginRight: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ccc'
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Submitting...' : 'Update Product'}
        </button>

        {/* Error Message */}
        {error && (
          <div style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
