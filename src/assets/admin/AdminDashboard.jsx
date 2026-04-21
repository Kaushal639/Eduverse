import React, { useState, useEffect } from 'react';
import CourseCard from '../components/course-card/course-card.jsx';
import Container from '../components/container/container.jsx';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    offerPrice: '',
    discount: '',
    image: ''
  });
  const [videoForms, setVideoForms] = useState({}); // { courseId: {title: '', url: '', duration: ''} }

  const token = localStorage.getItem('token');
  const userData = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    if (!token || userData?.role !== 'admin') {
      window.location.href = '/login';
      return;
    }
    fetchCourses();
  }, []); 

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/courses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Course created successfully!');
        setFormData({ title: '', description: '', price: '', offerPrice: '', discount: '', image: '' });
        setShowCreateForm(false);
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || 'Error creating course');
      }
    } catch (error) {
      alert('Error creating course');
    }
  }; 

  const handleAddVideo = async (courseId) => {
    const videoData = videoForms[courseId];
    if (!videoData.title || !videoData.url) return alert('Please fill title and URL');
    try {
      const res = await fetch(`http://localhost:3000/api/courses/${courseId}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ video: videoData })
      });
      if (res.ok) {
        alert('Video added successfully!');
        setVideoForms({ ...videoForms, [courseId]: { title: '', url: '', duration: '' } });
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || 'Error adding video');
      }
    } catch (error) {
      alert('Error adding video');
    }
  }; 

  const updateVideoForm = (courseId, field, value) => {
    setVideoForms(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], [field]: value }
    }));
  };

  return (
    <div className="admin-dashboard">
      <Container title="Admin Dashboard - Manage Courses">
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Course'}
        </button>

        {showCreateForm && (
          <form onSubmit={handleCreateCourse} style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
            <h3>Create Course</h3>
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            /><br/><br/>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            /><br/><br/>
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            /><br/><br/>
            <input
              type="number"
              placeholder="Offer Price (optional)"
              value={formData.offerPrice}
              onChange={(e) => setFormData({...formData, offerPrice: e.target.value})}
            /><br/><br/>
            <input
              placeholder="Discount (e.g. 20%)"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: e.target.value})}
            /><br/><br/>
            <input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            /><br/><br/>
            <button type="submit">Create Course</button>
          </form>
        )}

        <h3>Your Courses</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {courses.map(course => (
            <div key={course._id} style={{ margin: '10px', width: '300px', border: '1px solid #ddd', padding: '10px' }}>
              <CourseCard
                id={course._id}
                title={course.title}
                description={course.description}
                offerprice={course.offerPrice || course.price}
                price={course.price}
                discount={course.discount || '0%'}
                image={course.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60'}
              />
              <h4>Add Video</h4>
              <input
                placeholder="Video Title"
                value={videoForms[course._id]?.title || ''}
                onChange={(e) => updateVideoForm(course._id, 'title', e.target.value)}
              /><br/>
              <input
                placeholder="YouTube Embed URL"
                value={videoForms[course._id]?.url || ''}
                onChange={(e) => updateVideoForm(course._id, 'url', e.target.value)}
              /><br/>
              <input
                placeholder="Duration (e.g. 10:30)"
                value={videoForms[course._id]?.duration || ''}
                onChange={(e) => updateVideoForm(course._id, 'duration', e.target.value)}
              /><br/>
              <button onClick={() => handleAddVideo(course._id)}>Add Video</button>
              <h5>Videos ({course.videos?.length || 0}):</h5>
              <ul>
                {course.videos?.map((v, i) => (
                  <li key={i}>{v.title} - {v.url} ({v.duration})</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;

