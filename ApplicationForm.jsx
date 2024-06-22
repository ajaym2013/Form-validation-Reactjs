import React, { useState, useEffect } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});

  // Validation rules
  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
      isValid = false;
    } else if (isNaN(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
      isValid = false;
    }

    if (['Developer', 'Designer'].includes(formData.applyingFor)) {
      if (!formData.relevantExperience) {
        errors.relevantExperience = 'Relevant Experience is required';
        isValid = false;
      } else if (formData.relevantExperience <= 0) {
        errors.relevantExperience = 'Relevant Experience must be greater than 0';
        isValid = false;
      }
    }

    if (formData.applyingFor === 'Designer' && !formData.portfolioURL.trim()) {
      errors.portfolioURL = 'Portfolio URL is required';
      isValid = false;
    } else if (
      formData.applyingFor === 'Designer' &&
      !/^http(s)?:\/\/\S+\.\S+$/.test(formData.portfolioURL)
    ) {
      errors.portfolioURL = 'Portfolio URL is invalid';
      isValid = false;
    }

    if (formData.applyingFor === 'Manager' && !formData.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
      isValid = false;
    }

    if (formData.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected';
      isValid = false;
    }

    if (!formData.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Process form submission (e.g., send data to server or display summary)
      console.log('Form data:', formData);
      alert('Form submitted successfully!');
    } else {
      alert('Please fill in the required fields correctly.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: [...prevData.additionalSkills, name],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: prevData.additionalSkills.filter((skill) => skill !== name),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    // Reset relevant fields based on applyingFor selection
    if (formData.applyingFor !== 'Developer') {
      setFormData((prevData) => ({
        ...prevData,
        relevantExperience: '',
      }));
    }
    if (formData.applyingFor !== 'Designer') {
      setFormData((prevData) => ({
        ...prevData,
        portfolioURL: '',
      }));
    }
    if (formData.applyingFor !== 'Manager') {
      setFormData((prevData) => ({
        ...prevData,
        managementExperience: '',
      }));
    }
  }, [formData.applyingFor]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className='mt-2'>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder='Enter Name'
        />
        {errors.fullName && <span>{errors.fullName}</span>}
      </div>

      <div className='mt-2'> 
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter Email'
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div className='mt-2'>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='Enter Phone No.'
        />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>

      <div className='mt-2'>
        <label>Applying for Position</label>
        <select name="applyingFor" value={formData.applyingFor} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>

      {['Developer', 'Designer'].includes(formData.applyingFor) && (
        <div className='mt-2'>
          <label>Relevant Experience (years)</label>
          <input
            type="number"
            name="relevantExperience"
            value={formData.relevantExperience}
            onChange={handleChange}
            placeholder='Experience'
          />
          {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
        </div>
      )}

      {formData.applyingFor === 'Designer' && (
        <div className='mt-2'> 
          <label>Portfolio URL</label>
          <input
            type="text"
            name="portfolioURL"
            value={formData.portfolioURL}
            onChange={handleChange}
          />
          {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
        </div>
      )}

      {formData.applyingFor === 'Manager' && (
        <div className='mt-2'>
          <label>Management Experience</label>
          <textarea
            name="managementExperience"
            value={formData.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <span>{errors.managementExperience}</span>}
        </div>
      )}

      <div className='mt-2 checkbox-items'>
        <label >Additional Skills</label>
        <div >
          <label style={{ fontWeight: 400 }}>
            <input
              type="checkbox"
              name="JavaScript"
              checked={formData.additionalSkills.includes('JavaScript')}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label style={{ fontWeight: 400 }}>
            <input
              type="checkbox"
              name="CSS"
              checked={formData.additionalSkills.includes('CSS')}
              onChange={handleChange}
            />
            CSS
          </label>
          <label style={{ fontWeight: 400 }}>
            <input
              type="checkbox"
              name="Python"
              checked={formData.additionalSkills.includes('Python')}
              onChange={handleChange}
            />
            Python
          </label>
          {/* Add more skills as needed */}
        </div>
        {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
      </div>

      <div className='mt-2'>
        <label>Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="preferredInterviewTime"
          value={formData.preferredInterviewTime}
          onChange={handleChange}
        />
        {errors.preferredInterviewTime && <span>{errors.preferredInterviewTime}</span>}
      </div>

      <button type="submit" className='mt-4'>Submit</button>
    </form>
  );
};

export default ApplicationForm;
