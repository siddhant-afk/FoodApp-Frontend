import React from "react";
import ApiService from "../../services/ApiService";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = ApiService.isAuthenticated();

  const isAdmin = ApiService.isAdmin();
  const isCustomer = ApiService.isCustomer();
  const isDeliveryPerson = ApiService.isDeliveryPerson();
  const navigate = useNavigate();

  function handleLogout() {
    const isLogout = window.confirm("Are you sure you want to logout?");

    if (isLogout) {
      ApiService.logout();
      navigate("/login");
    }
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/" className="logo-link">
          Zafto{" "}
        </Link>
      </div>

      <div className="desktop-nav">
        <div className="nav-center">
          <Link to="/home" className="nav-link">
            Home
          </Link>

          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
        </div>

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              {isCustomer && (
                <>
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>

                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </>
              )}

              {isDeliveryPerson && (
                <Link to="/orders" className="nav-link">
                  Deliveries
                </Link>
              )}

              {isAdmin && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}

              <Link to="/profile" className="nav-link">
                Profile
              </Link>

              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-button  bg-green-100 text-green-600 px-4 py-2 hover:bg-green-200 rounded">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="nav-button px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded hover:text-black">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
