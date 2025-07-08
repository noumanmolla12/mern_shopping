import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, fetchAllBlogs } from '../../features/blogSlice';

const AddBlogs = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    blog_name: '',
    blog_description: '',
    blog_images: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === 'blog_images') {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, blog_images: files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append('blog_name', formData.blog_name);
      blogData.append('blog_description', formData.blog_description);
      formData.blog_images.forEach((file) => {
        blogData.append('blog_images', file);
      });

      await dispatch(addBlog(blogData));
      setSuccessMessage('Blog added successfully!');
      setFormData({
        blog_name: '',
        blog_description: '',
        blog_images: [],
      });
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  // Styles
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg,rgb(234, 252, 249) 0%,rgb(216, 222, 247) 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '720px',
    background: 'white',
    borderRadius: '16px',
    padding: '35px 30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '25px',
    color: 'rgb(40, 167, 69)',
    fontSize: '30px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#2c3e50',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const textAreaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgb(40, 167, 69)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const successStyle = {
    marginBottom: '15px',
    padding: '12px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '6px',
    fontSize: '16px',
  };

  const errorStyle = {
    marginTop: '15px',
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '6px',
    fontSize: '16px',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Add New Blog</h2>

        {successMessage && <div style={successStyle}>{successMessage}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label style={labelStyle} htmlFor="blog_name">Blog Name</label>
          <input
            type="text"
            id="blog_name"
            name="blog_name"
            value={formData.blog_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle} htmlFor="blog_description">Description</label>
          <textarea
            id="blog_description"
            name="blog_description"
            value={formData.blog_description}
            onChange={handleChange}
            style={textAreaStyle}
          ></textarea>

          <label style={labelStyle} htmlFor="blog_images">Upload Images</label>
          <input
            type="file"
            id="blog_images"
            name="blog_images"
            multiple
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={loading ? { ...buttonStyle, backgroundColor: '#bdc3c7' } : buttonStyle}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {error && <div style={errorStyle}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
