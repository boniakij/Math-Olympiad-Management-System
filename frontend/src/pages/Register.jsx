import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    full_name: '',
    father_name: '',
    mother_name: '',
    school_name: '',
    class_name: '',
    phone: '',
    address: '',
    division_id: '',
    district_id: '',
    upazila_id: '',
  });

  const [locations, setLocations] = useState({
    divisions: [],
    districts: [],
    upazilas: [],
  });

  useEffect(() => {
    // Fetch Divisions on mount
    const fetchDivisions = async () => {
      try {
        const response = await api.get('/locations/divisions');
        setLocations(prev => ({ ...prev, divisions: response.data.data }));
      } catch (err) {
        console.error("Failed to load divisions");
      }
    };
    fetchDivisions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'division_id') {
      fetchDistricts(value);
      setFormData(prev => ({ ...prev, district_id: '', upazila_id: '' }));
      setLocations(prev => ({ ...prev, upazilas: [] })); // clear upazilas
    }
    
    if (name === 'district_id') {
      fetchUpazilas(value);
      setFormData(prev => ({ ...prev, upazila_id: '' }));
    }
  };

  const fetchDistricts = async (divisionId) => {
    if (!divisionId) return;
    try {
      const response = await api.get(`/locations/divisions/${divisionId}/districts`);
      setLocations(prev => ({ ...prev, districts: response.data.data }));
    } catch (err) {
      console.error("Failed to load districts");
    }
  };

  const fetchUpazilas = async (districtId) => {
    if (!districtId) return;
    try {
      const response = await api.get(`/locations/districts/${districtId}/upazilas`);
      setLocations(prev => ({ ...prev, upazilas: response.data.data }));
    } catch (err) {
      console.error("Failed to load upazilas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', formData);
      const { token, user } = response.data.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Just take the first validation error message to show
        const firstErrorKey = Object.keys(err.response.data.errors)[0];
        setError(err.response.data.errors[firstErrorKey][0]);
      } else if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h2>Student Registration</h2>
          <p>Join the Math Olympiad! Please fill out all required fields.</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form register-form">
          <div className="form-row">
            <div className="form-group half">
              <label>Username</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group half">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="8" />
            </div>
            <div className="form-group half">
              <label>Confirm Password</label>
              <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required minLength="8" />
            </div>
          </div>

          <hr className="form-divider" />
          
          <div className="form-group">
            <label>Student Full Name</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Father's Name</label>
              <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} required />
            </div>
            <div className="form-group half">
              <label>Mother's Name</label>
              <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>School Name</label>
              <input type="text" name="school_name" value={formData.school_name} onChange={handleChange} required />
            </div>
            <div className="form-group half">
              <label>Class/Grade</label>
              <input type="text" name="class_name" value={formData.class_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group third">
              <label>Division</label>
              <select name="division_id" value={formData.division_id} onChange={handleChange} required>
                <option value="">Select Division</option>
                {locations.divisions.map(div => <option key={div.id} value={div.id}>{div.name}</option>)}
              </select>
            </div>
            <div className="form-group third">
              <label>District</label>
              <select name="district_id" value={formData.district_id} onChange={handleChange} required disabled={!formData.division_id}>
                <option value="">Select District</option>
                {locations.districts.map(dis => <option key={dis.id} value={dis.id}>{dis.name}</option>)}
              </select>
            </div>
            <div className="form-group third">
              <label>Upazila</label>
              <select name="upazila_id" value={formData.upazila_id} onChange={handleChange} required disabled={!formData.district_id}>
                <option value="">Select Upazila</option>
                {locations.upazilas.map(upz => <option key={upz.id} value={upz.id}>{upz.name}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Submitting Registration...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
          <p className="auth-home-link"><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
