import React, { useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import CourseCard from "../components/course-card/course-card.jsx";
import Container from "../components/container/container.jsx";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    offerPrice: "",
    discount: "",
    image: "",
  });
  const [videoForms, setVideoForms] = useState({});
  const [imagekitAuth, setImagekitAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userData = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("Admin courses data:", data);
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || userData?.role !== "admin") {
      window.location.href = "/login";
      return;
    }

    const fetchImageKitAuth = async () => {
      try {
        const res = await fetch("/api/auth/imagekit-auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const auth = await res.json();
          setImagekitAuth(auth);
        } else {
          console.error("Failed to fetch ImageKit auth parameters");
        }
      } catch (error) {
        console.error("Error fetching ImageKit auth:", error);
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
      const res = await fetch("/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Course created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          offerPrice: "",
          discount: "",
          image: "",
        });
        setShowCreateForm(false);
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || "Error creating course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course");
    }
  };

  const handleAddVideo = async (courseId) => {
    const videoData = videoForms[courseId];
    if (!videoData.title || !videoData.url)
      return alert("Please fill title and upload a video");
    try {
      const res = await fetch(`/api/courses/${courseId}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          video: {
            title: videoData.title,
            url: videoData.url,
            duration: videoData.duration,
          },
        }),
      });
      if (res.ok) {
        alert("Video added successfully!");
        setVideoForms({
          ...videoForms,
          [courseId]: { title: "", url: "", duration: "", uploading: false },
        });
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || "Error adding video");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Error adding video");
    }
  };

  const handleDeleteVideo = async (courseId, videoIndex) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`/api/courses/${courseId}/videos/${videoIndex}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Video deleted successfully!");
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting video");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting video");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (
      !confirm(
        "Are you sure you want to delete this course? This action cannot be undone.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Course deleted successfully!");
        fetchCourses();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course");
    }
  };

  const updateVideoForm = (courseId, field, value) => {
    setVideoForms((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], [field]: value },
    }));
  };

  const onUploadSuccess = (courseId, result) => {
    console.log("Upload success", result);
    updateVideoForm(courseId, "url", result.url);
    updateVideoForm(courseId, "uploading", false);
  };

  const onUploadError = (courseId, err) => {
    console.error("Upload error", err);
    updateVideoForm(courseId, "uploading", false);
    alert("Video upload failed. Please try again.");
  };

  const onUploadStart = (courseId) => {
    updateVideoForm(courseId, "uploading", true);
  };

  return (
    <div className="admin-dashboard">
      <Container title="Admin Dashboard - Manage Courses">
        <div className="admin-header-actions">
          <button
            className={`btn-toggle-form ${showCreateForm ? "active" : ""}`}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <i className={`fas ${showCreateForm ? "fa-times" : "fa-plus"}`}></i>
            {showCreateForm ? "Cancel" : "Create New Course"}
          </button>
        </div>

        {showCreateForm && (
          <form className="create-course-form" onSubmit={handleCreateCourse}>
            <h3>
              <i className="fas fa-book"></i> Create New Course
            </h3>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group full">
              <label>Description</label>
              <textarea
                placeholder="Course Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="form-row three-col">
              <div className="form-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  placeholder="999"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Offer Price (₹)</label>
                <input
                  type="number"
                  placeholder="499"
                  value={formData.offerPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, offerPrice: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Discount</label>
                <input
                  placeholder="e.g. 50%"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn-submit-course">
              <i className="fas fa-check"></i> Create Course
            </button>
          </form>
        )}

        <div className="admin-section-header">
          <h3>
            <i className="fas fa-layer-group"></i> Your Courses
          </h3>
          <span className="course-count">
            {courses.length} course{courses.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin fa-2x"></i>
            <p>Loading courses...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{error}</p>
            <button onClick={fetchCourses} className="btn-retry">
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-book fa-3x"></i>
            <p>No courses yet. Create your first course!</p>
          </div>
        ) : (
          <div className="admin-courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="admin-course-item">
<CourseCard
                  isAdmin={true}
                  id={course._id}
                  title={course.title}
                  description={course.description}
                  offerprice={course.offerPrice || course.price}
                  price={course.price}
                  discount={course.discount || "0%"}
                  image={
                    course.image ||
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60"
                  }
                  className="animate-in"
                />
                <button
                  className="btn-delete-course"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  <i className="fas fa-trash-alt"></i> Delete Course
                </button>

                <div className="video-section">
                  <h4>
                    <i className="fas fa-video"></i> Add Video
                  </h4>
                  <div className="video-form">
                    <input
                      placeholder="Video Title"
                      value={videoForms[course._id]?.title || ""}
                      onChange={(e) =>
                        updateVideoForm(course._id, "title", e.target.value)
                      }
                    />
                    {imagekitAuth ? (
                      <IKContext
                        publicKey={imagekitAuth.publicKey}
                        urlEndpoint={imagekitAuth.urlEndpoint}
                        authenticator={() => Promise.resolve(imagekitAuth)}
                      >
                        <label className="upload-label">
                          <i
                            className={`fas ${videoForms[course._id]?.uploading ? "fa-spinner fa-spin" : videoForms[course._id]?.url ? "fa-check" : "fa-cloud-upload-alt"}`}
                          ></i>
                          {videoForms[course._id]?.uploading
                            ? "Uploading..."
                            : videoForms[course._id]?.url
                              ? "Change Video"
                              : "Upload Video"}
                          <IKUpload
                            fileName={`video-${course._id}`}
                            tags={["video", "course"]}
                            useUniqueFileName={true}
                            folder="/course-videos"
                            isPrivateFile={false}
                            onUploadStart={() => onUploadStart(course._id)}
                            onSuccess={(result) =>
                              onUploadSuccess(course._id, result)
                            }
                            onError={(err) => onUploadError(course._id, err)}
                            style={{ display: "none" }}
                          />
                        </label>
                      </IKContext>
                    ) : (
                      <p className="upload-loading">
                        Loading upload service...
                      </p>
                    )}
                    {videoForms[course._id]?.url && (
                      <p className="upload-success">
                        <i className="fas fa-check-circle"></i> Uploaded
                        successfully
                      </p>
                    )}
                    <input
                      placeholder="Duration (e.g. 10:30)"
                      value={videoForms[course._id]?.duration || ""}
                      onChange={(e) =>
                        updateVideoForm(course._id, "duration", e.target.value)
                      }
                    />
                    <button
                      className="btn-add-video"
                      onClick={() => handleAddVideo(course._id)}
                    >
                      <i className="fas fa-plus"></i> Add Video
                    </button>
                  </div>

                  <div className="videos-list">
                    <h5>
                      <i className="fas fa-list"></i> Videos (
                      {course.videos?.length || 0})
                    </h5>
                    {course.videos?.length > 0 ? (
                      <ul>
                        {course.videos.map((v, i) => (
                          <li key={i}>
                            <div className="video-info-row">
                              <span className="video-number">{i + 1}</span>
                              <span className="video-title-text">
                                {v.title}
                              </span>
                              {v.duration && (
                                <span className="video-duration-text">
                                  {v.duration}
                                </span>
                              )}
                            </div>
                            <button
                              className="btn-delete-video"
                              onClick={() => handleDeleteVideo(course._id, i)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-videos-msg">No videos added yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
        }
      </Container>
    </div>
  );
};

export default AdminDashboard;
