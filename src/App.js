import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setVisible(!visible);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    dob: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    // Validate Phone Number (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Validate Date of Birth (DOB)
    if (!formData.dob) {
      alert('Invalid Date of Birth. Please enter a valid date.');
      return;
    }

    alert('Form submitted successfully!');
    setVisible(false); // Close modal on successful submission
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="App">
      <div>
        <h1>User Details Modal</h1>
        <button type="button" onClick={toggleModal}>
          Open Form
        </button>

        {visible && (
          <div className="modal">
            <div className="modal-content" ref={modalRef}>
              <form onSubmit={handleSubmit}>
                <h3>Fill Details</h3>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
