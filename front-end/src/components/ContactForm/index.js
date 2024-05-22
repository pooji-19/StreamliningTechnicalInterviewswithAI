import React, { useState } from 'react';
import './style.css';
import { Link } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwvWxdMveDa2ts5uooy7ACG_AGNgtXVohxnMBNVFcRv7R3DhZmEavQRC-X1GRSBTQZJUw/exec';
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    fetch(scriptURL, {
      method: 'POST',
      body: data
    })
      .then(response => {
        if (response.ok) {
          alert('Form submitted successfully!');
          setFormData({
            fname: '',
            lname: '',
            mobile: '',
            email: '',
            message: ''
          });
        } else {
          alert('Form submission failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again later.');
      });
  };

  return (
    <div>
      <Link to="/"><button className='backcontactform'>Back</button></Link>
      <form onSubmit={handleSubmit} className="contactform">
        <div className="input-box1">
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} className="fname" placeholder="First Name" required />
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} className="lname" placeholder="Last Name" required />
        </div>
        <br></br>
        <div className="input-box2">
          <input type="number" name="mobile" value={formData.mobile} onChange={handleChange} className="mobile" placeholder="Mobile Number" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="email" placeholder="Email" required />
        </div>
        <br></br>
        <div className="textarea-field">
          <textarea name="message" value={formData.message} onChange={handleChange} className="message" cols="45" rows="5" placeholder="Any Suggestions or Feedback"></textarea>
        </div>
        <div className="btn-box btns">
          <button type="submit" className="submitcontact">Submit</button>
        </div>
      </form>
    </div>
  );
};

const Index = () => {
  return (
    <div>
      <section className="contact" id="contact">
        <h2 className="headingcontact">Contact <span className='contactme'>Me!</span></h2>
        <ContactForm />
      </section>
    </div>
  );
};

export default Index;
