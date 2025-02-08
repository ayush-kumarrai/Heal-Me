import { Link } from 'react-router-dom';

function Navbar4() {
  return (
    <nav className="navbar">
      <div className="nav-brand">Doctor Appointment System</div>
      <div className="nav-links">
        <Link to="/book">Book Appointment</Link>
        <Link to="/appointments">My Appointments</Link>
      </div>
    </nav>
  );
}

export default Navbar4;
