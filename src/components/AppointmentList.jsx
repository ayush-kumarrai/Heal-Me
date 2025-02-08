import { useState, useEffect } from 'react';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="appointment-list">
      <h2>My Appointments</h2>
      <div className="appointments">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <h3>Appointment with {appointment.doctor}</h3>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentList;
