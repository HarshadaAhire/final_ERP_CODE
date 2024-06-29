import React, { useState } from 'react';
import './leaves.css';

const leavesData = [
  {
    leaveType: 'Sick Leave',
    icon: '🩺',
    totalLeaves: 10,
    usedLeaves: 3,
    available: true
  },
  {
    leaveType: 'Paid Leave',
    icon: '💵',
    totalLeaves: 12,
    usedLeaves: 5,
    available: true
  },
  {
    leaveType: 'Unpaid Leave',
    icon: '❌',
    totalLeaves: 0,
    usedLeaves: 0,
    available: true
  },
  {
    leaveType: 'Casual Leave',
    icon: '🏖️',
    totalLeaves: 12,
    usedLeaves: 5,
    available: true
  },
  {
    leaveType: 'Annual Leave',
    icon: '📅',
    totalLeaves: 30,
    usedLeaves: 15,
    available: true
  },
  {
    leaveType: 'Maternity Leave',
    icon: '👶',
    totalLeaves: 180,
    usedLeaves: 90,
    available: false
  },
  {
    leaveType: 'Emergency Leave',
    icon: '🚨',
    totalLeaves: 5,
    usedLeaves: 2,
    available: true
  },
  {
    leaveType: 'Loss of Pay Leave',
    icon: '💼',
    totalLeaves: 0,
    usedLeaves: 0,
    available: true
  }
];

const pendingLeaves = [
  {
    leaveType: 'Pending Leave 1',
    startDate: '2024-07-01',
    endDate: '2024-07-03',
    days: 3,
    description: 'Pending leave description 1'
  },
  {
    leaveType: 'Pending Leave 2',
    startDate: '2024-07-10',
    endDate: '2024-07-12',
    days: 3,
    description: 'Pending leave description 2'
  }
];

const approvedLeaves = [
  {
    leaveType: 'Approved Leave 1',
    startDate: '2024-06-15',
    endDate: '2024-06-17',
    days: 3,
    description: 'Approved leave description 1'
  },
  {
    leaveType: 'Approved Leave 2',
    startDate: '2024-06-25',
    endDate: '2024-06-27',
    days: 3,
    description: 'Approved leave description 2'
  },
  {
    leaveType: 'Approved Leave 3',
    startDate: '2024-07-05',
    endDate: '2024-07-07',
    days: 3,
    description: 'Approved leave description 3'
  }
];

const Leave = () => {
  const [activeTab, setActiveTab] = useState('applyLeave');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    description: '',
    days: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const getLeaveCardClassName = (leave) => {
    return leave.available ? 'leave-card available' : 'leave-card not-available';
  };

  return (
    <div className="leave-management">
      <div className="top-section">
        <h2>Leave</h2>
        <p>Manage your leaves efficiently</p>
      </div>
      <div className="leave-grid">
        {leavesData.map((leave, index) => (
          <div className={getLeaveCardClassName(leave)} key={index}>
            <div className="leave-header">
              <div className="leave-icon">
                <span role="img" aria-label={leave.leaveType}>{leave.icon}</span>
              </div>
              <div className="leave-name">
                <h3>{leave.leaveType}</h3>
              </div>
            </div>
            <div className="leave-details">
              <p>{leave.usedLeaves} / {leave.totalLeaves}</p>
              <p>{leave.available ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tabs">
        <button className={activeTab === 'applyLeave' ? 'active' : ''} onClick={() => handleTabChange('applyLeave')}>Apply Leave</button>
        <button className={activeTab === 'leaveBalance' ? 'active' : ''} onClick={() => handleTabChange('leaveBalance')}>Leave Balance</button>
        <button className={activeTab === 'approvedLeave' ? 'active' : ''} onClick={() => handleTabChange('approvedLeave')}>Approved Leave</button>
        <button className={activeTab === 'pendingLeave' ? 'active' : ''} onClick={() => handleTabChange('pendingLeave')}>Pending Leave</button>
      </div>
      <div className="tab-content">
        {activeTab === 'applyLeave' && (
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Start Date:</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
            </div>
            <div>
              <label>Days:</label>
              <input type="number" name="days" value={formData.days} onChange={handleInputChange} required />
            </div>
            <button type="submit">Apply</button>
          </form>
        )}
        {activeTab === 'leaveBalance' && (
          <div className="leave-boxes">
            {leavesData.map((leave, index) => (
              <div key={index} className="leave-box">
                <h3>{leave.leaveType}</h3>
                <p>{leave.totalLeaves - leave.usedLeaves} days remaining</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'approvedLeave' && (
          <div className="leave-boxes">
            {approvedLeaves.length > 0 ? (
              approvedLeaves.map((leave, index) => (
                <div key={index} className="leave-card approved-leave">
                  <div className="leave-header">
                    <div className="leave-icon">
                      <span role="img" aria-label={leave.leaveType}>{leave.icon}</span>
                    </div>
                    <div className="leave-name">
                      <h3>{leave.leaveType}</h3>
                    </div>
                  </div>
                  <div className="leave-details">
                    <p>Start Date: {leave.startDate}</p>
                    <p>End Date: {leave.endDate}</p>
                    <p>Days: {leave.days}</p>
                    <p>{leave.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No approved leaves</p>
            )}
          </div>
        )}
        {activeTab === 'pendingLeave' && (
          <div className="leave-boxes">
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map((leave, index) => (
                <div key={index} className="leave-card pending-leave">
                  <div className="leave-header">
                    <div className="leave-icon">
                      <span role="img" aria-label={leave.leaveType}>{leave.icon}</span>
                    </div>
                    <div className="leave-name">
                      <h3>{leave.leaveType}</h3>
                    </div>
                  </div>
                  <div className="leave-details">
                    <p>Start Date: {leave.startDate}</p>
                    <p>End Date: {leave.endDate}</p>
                    <p>Days: {leave.days}</p>
                    <p>{leave.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending leaves</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leave;
