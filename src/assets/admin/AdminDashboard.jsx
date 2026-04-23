import React, { useState, useEffect } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import CourseCard from '../components/course-card/course-card.jsx';
import Container from '../components/container/container.jsx';
import './AdminDashboard.css';

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
  const [videoForms, setVideoForms] = useState({}); // { courseId: {title: '', url: '', duration: '', uploading: false} }
  const [imagekitAuth, setImagekitAuth] = useState(null);

  const token = localStorage.getItem('token');
  const userData = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      console.log('Admin courses data:', data);
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch ImageKit authentication parameters
  useEffect(() => {
    if (!token || userData?.role !== 'admin') {
      window.location.href = '/login';
      return;
    }

    const fetchImageKitAuth = async () => {
      try {
        const res = await fetch('/api/auth/imagekit-auth', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const auth = await res.json();
          setImagekitAuth(auth);
        } else {
          console.error('Failed to fetch ImageKit auth parameters');
        }
      } catch (error) {
        console.error('Error fetching ImageKit auth:', error);
      }
    };

    fetchImageKitAuth();
  }, [token, userData]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCourses();
  }, []);



  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses/create', {
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
      console.error('Error creating course:', error);
      alert('Error creating course');
    }
  }; 

  const handleAddVideo = async (courseId) => {
    const videoData = videoForms[courseId];
    if (!videoData.title || !videoData.url) return alert('Please fill title and upload a video');
    try {
      const res = await fetch(`/api/courses/${courseId}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ video: { title: videoData.title, url: videoData.url, duration: videoData.duration } })
      });
      if (res.ok) {
        alert('Video added successfully!');
        setVideoForms({ ...videoForms, [courseId]: { title: '', url: '', duration: '', uploading: false } });
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || 'Error adding video');
      }
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Error adding video');
    }
  };

  const handleDeleteVideo = async (courseId, videoIndex) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`/api/courses/${courseId}/videos/${videoIndex}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Video deleted successfully!');
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting video');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        alert('Course deleted successfully!');
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  const updateVideoForm = (courseId, field, value) => {
    setVideoForms(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], [field]: value }
    }));
  };

  const onUploadSuccess = (courseId, result) => {
    console.log('Upload success', result);
    updateVideoForm(courseId, 'url', result.url);
    updateVideoForm(courseId, 'uploading', false);
  };

  const onUploadError = (courseId, err) => {
    console.error('Upload error', err);
    updateVideoForm(courseId, 'uploading', false);
    alert('Video upload failed. Please try again.');
  };

  const onUploadStart = (courseId) => {
    updateVideoForm(courseId, 'uploading', true);
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
        <div className="admin-courses-grid">
          {courses.map(course => (
            <div key={course._id} className="admin-course-item">
              <CourseCard
                id={course._id}
                title={course.title}
                description={course.description}
                offerprice={course.offerPrice || course.price}
                price={course.price}
                discount={course.discount || '0%'}
                image={course.image || 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60'}
              />
              <button
                onClick={() => handleDeleteCourse(course._id)}
                style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '12px', marginTop: '8px' }}
              >
                Delete Course
              </button>
              <h4>Add Video</h4>
              <input
                placeholder="Video Title"
                value={videoForms[course._id]?.title || ''}
                onChange={(e) => updateVideoForm(course._id, 'title', e.target.value)}
              />
              {imagekitAuth ? (
                <IKContext
                  publicKey={imagekitAuth.publicKey}
                  urlEndpoint={imagekitAuth.urlEndpoint}
                  authenticator={() => Promise.resolve(imagekitAuth)}
                >
                  <label style={{ cursor: 'pointer', display: 'inline-block', padding: '6px 12px', background: '#007bff', color: '#fff', borderRadius: '4px', margin: '8px 0' }}>
                    {videoForms[course._id]?.uploading ? 'Uploading...' : (videoForms[course._id]?.url ? 'Change Video' : 'Upload Video')}
                    <IKUpload
                      fileName={`video-${course._id}`}
                      tags={['video', 'course']}
                      useUniqueFileName={true}
                      folder="/course-videos"
                      isPrivateFile={false}
                      onUploadStart={() => onUploadStart(course._id)}
                      onSuccess={(result) => onUploadSuccess(course._id, result)}
                      onError={(err) => onUploadError(course._id, err)}
                      style={{ display: 'none' }}
                    />
                  </label>
                </IKContext>
              ) : (
                <p style={{ color: '#888' }}>Loading upload service...</p>
              )}
              {videoForms[course._id]?.url && (
                <p style={{ fontSize: '12px', color: 'green' }}>
                  Uploaded: <a href={videoForms[course._id].url} target="_blank" rel="noopener noreferrer">Preview</a>
                </p>
              )}
              <input
                placeholder="Duration (e.g. 10:30)"
                value={videoForms[course._id]?.duration || ''}
                onChange={(e) => updateVideoForm(course._id, 'duration', e.target.value)}
              />
              <button onClick={() => handleAddVideo(course._id)}>Add Video</button>
              <h5>Videos ({course.videos?.length || 0}):</h5>
              <ul>
                {course.videos?.map((v, i) => (
                  <li key={i}>
                    {v.title} - {v.url} ({v.duration}){' '}
                    <button
                      onClick={() => handleDeleteVideo(course._id, i)}
                      style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer', fontSize: '11px' }}
                    >
                      Delete
                    </button>
                  </li>
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

