import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleBlog, updateBlog, fetchAllBlogs } from '../../features/blogSlice';
import { selectImagePath } from '../../features/globalpaths';

const EditBlog = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, blogs } = useSelector((state) => state.blogs);
  const { blogId } = useParams();

  const [formData, setFormData] = useState({
    blog_name: '',
    blog_description: '',
    blog_images: [], // Store new uploaded files
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllBlogs());
    if (blogId) {
      dispatch(fetchSingleBlog(blogId));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blogId) {
      const selectedBlog = blogs.find((blog) => blog._id === blogId);
      if (selectedBlog) {
        setFormData({
          blog_name: selectedBlog.blog_name,
          blog_description: selectedBlog.blog_description,
          blog_images: selectedBlog.blog_images || [],
        });
      }
    }
  }, [blogId, blogs]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, blog_images: [...formData.blog_images, ...files] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

      await dispatch(updateBlog({ blogId, formData: blogData }));
      setSuccessMessage('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  // Inline styles for professional, colorful, responsive design
  const containerStyle = {
    maxWidth: 900,
    margin: '30px auto',
    padding: 20,
    borderRadius: 10,
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    textAlign: 'center',
    color: 'rgb(40, 167, 69)',
    fontWeight: '700',
    fontSize: '2.2rem',
    marginBottom: 20,
    letterSpacing: '1px',
  };

  const successMsgStyle = {
    backgroundColor: '#d1e7dd',
    border: '1px solid #badbcc',
    padding: '10px 15px',
    borderRadius: 6,
    color: '#0f5132',
    marginBottom: 20,
    fontWeight: 600,
    textAlign: 'center',
  };

  const formGroupStyle = {
    marginBottom: 20,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 8,
    fontWeight: '600',
    color: '#374151',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 6,
    border: '1.8px solid #9ca3af',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: 120,
    resize: 'vertical',
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '8px 12px',
  };

  const imageListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 15,
    justifyContent: 'flex-start',
  };

  const imageItemStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: 110,
    height: 80,
    objectFit: 'cover',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(40, 167, 69)',
    color: '#fff',
    padding: '12px 28px',
    borderRadius: 8,
    border: 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
    marginTop: 10,
    boxShadow: '0 4px 12px rgb(40, 167, 69)',
    transition: 'background-color 0.3s',
  };

  const errorMsgStyle = {
    color: '#dc2626',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Blog</h2>

      {successMessage && <div style={successMsgStyle}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="blog_name" style={labelStyle}>
            Blog Name
          </label>
          <input
            type="text"
            id="blog_name"
            name="blog_name"
            value={formData.blog_name}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="blog_description" style={labelStyle}>
            Blog Description
          </label>
          <textarea
            id="blog_description"
            name="blog_description"
            value={formData.blog_description}
            onChange={handleChange}
            style={textareaStyle}
            placeholder="Write blog description..."
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="blog_images" style={labelStyle}>
            Upload Images
          </label>
          <input
            type="file"
            id="blog_images"
            name="blog_images"
            onChange={handleImageChange}
            multiple
            style={fileInputStyle}
            accept="image/*"
          />

          <div style={imageListStyle}>
            {blogs
              .filter((blog) => blog._id === blogId)
              .flatMap((blog) =>
                blog.blog_images?.map((image, idx) => (
                  <img
                    key={idx}
                    src={imagePath + image}
                    alt={`Blog Image ${idx + 1}`}
                    style={imageItemStyle}
                  />
                )) || []
              )}
          </div>
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <div style={errorMsgStyle}>{error}</div>}
      </form>
    </div>
  );
};

export default EditBlog;
