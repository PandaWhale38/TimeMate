import React, { Component, useState, useEffect, Fragment } from 'react';
import ClockIn from '../Components/ClockIn.jsx';
import ClockOut from '../Components/ClockOut.jsx';
import LogOutButton from '../Components/logOutButton.jsx';

const EmployeePage = ({ user, logOut }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentAction, setCurrentAction] = useState('');
  const [message, setMessage] = useState('');
  const [entry_id, setEntry_id] = useState('');
  const [totalHours, setTotalHours] = useState('35');

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    try {
      const response = await fetch('http://localhost:8080/currentemphours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ emp_id: user.emp_id }),
      });
      const json = await response.json();
      setTotalHours(json.total);
    } catch (err) {
      console.log(err);
    }
  };

  const getTime = () => {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const seconds =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const time = `${hours}:${minutes}:${seconds}`;
    return { time, date };
  };

  const toggleClockIn = (e) => {
    let action;
    let message;
    const { time, date } = getTime();
    if (e.target.id === 'clockInButton') {
      if (currentAction === 'clocked in') {
        message = 'You already clocked in!';
      } else {
        action = 'clocked in';
        clockInOut(time, date, action);
        message = `You clocked in at ${time}`;
      }
    } else {
      if (currentAction === 'clocked out') {
        message = 'You already clocked out';
      } else {
        action = 'clocked out';
        //send post request
        clockInOut(time, date, action);
        message = `You clocked out at ${time}`;
      }
    }
    revealClockProof('block');
    setTimeout(revealClockProof, 2000);
    setCurrentAction(currentAction);
    setCurrentTime(currentTime);
    setMessage(message);
  };

  const revealClockProof = (display = 'none') => {
    const clockProof = document.getElementById('clockProof');
    clockProof.style.display = display;
    return;
  };

  const clockInOut = async (time, date, action) => {
    //secret message
    if (action === 'clocked in') {
      console.log('sending fetch request');
      try {
        const response = await fetch('http://localhost:8080/clockin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            time: time,
            date: date,
            emp_id: user.emp_id,
          }),
        });
        const json = await response.json();

        if(!response.ok){
          throw new Error(json.message.err);
        }

        setEntry_id(json);
      } catch (err) {
        console.log(err);
      }
    } else if (action === 'clocked out') {
      try {
        const response = await fetch('http://localhost:8080/clockout', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            time,
            date,
            entry_id,
          }),
        });
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message.err);
        }

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  //return
  return (
    <section id="employeePageBox">
      <section id="welcomeMessage">Hello, {user.first_name}</section>
      <section id="hoursWorked">
        You've worked {totalHours} hours this week
      </section>
      <section id="clockProofContainer">
        {/* <section id='clockProof'>You {this.state.currentAction} at {this.state.currentTime}</section> */}
        <section id="clockProof">{message}</section>
      </section>
      <section id="timeButtonParent">
        <ClockIn toggleClockIn={toggleClockIn} />
        <ClockOut toggleClockIn={toggleClockIn} />
      </section>
      <section>
        <LogOutButton logOut={logOut} />
      </section>
    </section>
  );
};

export default EmployeePage;
