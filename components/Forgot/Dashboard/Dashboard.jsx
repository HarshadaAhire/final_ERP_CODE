import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBriefcase, FaPlaneDeparture, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState('00:00:00');
  const [punchIn, setPunchIn] = useState(null);
  const [punchOut, setPunchOut] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (punchIn && !punchOut) {
        setTime(calculateWorkingHours(new Date(), punchIn));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [punchIn, punchOut]);

  const handlePunchIn = () => {
    const punchInTime = new Date();
    setPunchIn(punchInTime);
    setPunchOut(null);
  };

  const handlePunchOut = () => {
    const punchOutTime = new Date();
    setPunchOut(punchOutTime);
    setTime(calculateWorkingHours(punchOutTime, punchIn));
  };

  const calculateWorkingHours = (end, start) => {
    const diff = end - start;
    const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, '0');
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, new Date().getFullYear());

  const handleDateClick = (dayNumber) => {
    // Add event handling logic here
    console.log(`Clicked on day ${dayNumber}`);
  };

  return (
    <div className="app">
      <div className="attendance">
        <h2 className="h2">Attendance</h2>
        <div className={`time-circle ${punchOut ? 'black' : ''}`}>
          <p>{time}</p>
          <p>Working Hours</p>
        </div>
        <div className="punch-time-container">
          <button className="punch-time-left" onClick={handlePunchIn}>
            {punchIn ? punchIn.toLocaleTimeString() : 'Punch in'}
          </button>
          <button className="punch-time-right" onClick={handlePunchOut} disabled={!punchIn || punchOut}>
            {punchOut ? punchOut.toLocaleTimeString() : 'Punch out'}
          </button>
        </div>
      </div>
      <div className="main-section">
        <header className="screen-header">
          <p>Hi, Josh</p>
          <h1>Good Morning</h1>
          <p>Have a good day</p>
        </header>
        <h2 className="Quick-header">Quick Status</h2>
        <div className="quick-status">
          <Link to="/project" className="status-item">
            <div className="status-icon-container">
              <FaBriefcase className="status-icon" />
              <h3>Projects</h3>
            </div>
            <div className="status-text-container">
              <h4>Design Web Page</h4>
              <p>Complete design at the end of the day.</p>
              <p>Deadline: 13 June</p>
              <p className="leave-status denied">5 Hrs Left</p>
            </div>
          </Link>
          <Link to="/leave" className="status-item">
            <div className="status-icon-container">
              <FaPlaneDeparture className="status-icon" />
              <h3>Leaves</h3>
            </div>
            <div className="status-text-container">
              <h4>Sick Leave</h4>
              <p>Duration: 2days</p>
              <p>Reason: Not Feeling Good</p>
              <p className="leave-status denied"> Status: Denied</p>
            </div>
          </Link>
          <Link to="/holiday" className="status-item">
            <div className="status-icon-container">
              <FaCalendarAlt className="status-icon" />
              <h3>Holidays</h3>
            </div>
            <div className="status-text-container">
              <h4>15 August</h4>
              <p>Independence Day</p>
            </div>
          </Link>
          <Link to="Meeting" className="status-item">
            <div className="status-icon-container">
              <FaUserFriends className="status-icon" />
              <h3>Meeting</h3>
            </div>
            <div className="status-text-container">
              <h4>HR: GMeet with Josh</h4>
              <p>Time: 10:00 AM</p>
              <p><FaMapMarkerAlt />Baner, Pune</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="calendar-section">
        <div className="calendar">
          <div className="calendar-nav">
            <button onClick={handlePrevMonth}>&lt;</button>
            <span>{months[currentMonth]}</span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(Math.ceil(daysInMonth / 7))].map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {[...Array(7)].map((_, dayIndex) => {
                    const dayNumber = weekIndex * 7 + dayIndex + 1;
                    return (
                      <td key={dayIndex} onClick={() => handleDateClick(dayNumber)}>
                        {dayNumber <= daysInMonth ? (
                          <span className="day-number">{dayNumber}</span>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button>Create a plan</button>
        </div>
        <div className="leave-stats">
          <h3>Leave status</h3>
          <div className="leave-circle">
            <p>16 Days</p>
            <p>16/20</p>
          </div>
          <Link to="/leave" className="b2">Apply for leave</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
