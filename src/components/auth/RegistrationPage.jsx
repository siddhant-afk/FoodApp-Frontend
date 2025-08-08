import { useNavigate, Link } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import { useState } from "react";
import ApiService from "../../services/ApiService";

const RegistrationPage = () => {
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("In handleSubmit");
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNumber ||
      !formData.confirmPassword ||
      !formData.address
    ) {
      console.log("In first if block");
      showError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };

    try {
      const response = await ApiService.registerUser(registrationData);

      if (response.statusCode === 200) {
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          confirmPassword: "",
        });

        navigate("/login");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="register-page-food">
      <div className="register-card-food">
        <div className="register-header-food">
          <h2 className="register-title-food">Register</h2>
          <p className="register-description-food">
            Create an account to order delicious food.
          </p>
        </div>
        <div className="register-content-food">
          <form
            action=""
            className="register-form-food"
            onSubmit={handleSubmit}
          >
            <div className="register-form-group">
              <label htmlFor="name" className="register-label-food">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="register-input-food"
                placeholder="Your Full Name"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="email" className="register-label-food">
                Email{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Here"
                className="register-input-food"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="password" className="register-label-food">
                Password{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password Here"
                className="register-input-food"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="confirmPassword" className="register-label-food">
                Password{" "}
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password."
                className="register-input-food"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="phoneNumber" className="register-label-food">
                Phone Number{" "}
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="register-input-food"
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="address" className="register-label-food">
                Address{" "}
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your Address here"
                className="register-input-food"
              />
            </div>

            <div>
              <button type="submit" className="register-button-food">
                Register
              </button>
            </div>

            <div>
              <Link to="/login" className="register-link-food">
                Already have an account? Login.
              </Link>
            </div>
          </form>
          <ErrorDisplay />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
