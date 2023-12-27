import React, { useEffect, useState } from 'react';
import '../css/main.css';
import '../css/request-page.css';
import { useAuth } from '../helpers/authContext';

function TeacherPage() {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (!user) {
      return;
    }
    const requestList = document.getElementById('requests-list');

    getTeacherRequests().then((result) => {
      console.log('Data fetched successfully:', result);
      let students = result;

      console.log(students);
      requestList.innerHTML = "";
      students.forEach((student) => {
        const liElement = document.createElement('li');
        liElement.id = student.id;

        const spanName = document.createElement('span');
        spanName.innerHTML = student.student_name;
        spanName.classList.add('student-list-span');
      
        liElement.appendChild(spanName);

        const spanTitle = document.createElement('span');
        spanTitle.innerHTML = student.title;
        spanTitle.classList.add('student-list-span');
      
        liElement.appendChild(spanTitle);

        const acceptRequestBtn = document.createElement("button");
        acceptRequestBtn.innerHTML = 'Acceptă';
        acceptRequestBtn.value = 'acceptata';
        acceptRequestBtn.dataset.requestId = student.id;
        acceptRequestBtn.classList.add('button-30');
        const declineRequestBtn = document.createElement("button");
        declineRequestBtn.innerHTML = 'Respinge';
        declineRequestBtn.value = 'respinsa';
        declineRequestBtn.dataset.requestId = student.id;
        declineRequestBtn.classList.add('button-30');
        liElement.appendChild(acceptRequestBtn);
        liElement.appendChild(declineRequestBtn);

        acceptRequestBtn.addEventListener('click', acceptOrDeclineRequest);
        declineRequestBtn.addEventListener('click', acceptOrDeclineRequest);

        let sessionDiv = document.getElementById('session-' + student.session_id);
        if (!sessionDiv) {
          sessionDiv = document.createElement('div');
          sessionDiv.id = 'session-' + student.session_id;
          sessionDiv.innerHTML += 'session-' + student.session_id;

          requestList.appendChild(sessionDiv);
        }
        
        sessionDiv.appendChild(liElement);

        
      });
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  function openPopup() {
    document.getElementById('overlay').style.display = 'flex';
    document.querySelector('#close-btn').addEventListener('click', closePopup);
  }

  function saveSession() {
    addSession();
    document.getElementById('overlay-success').style.display = 'flex';
    document.querySelector('#close-success-popup-btn').addEventListener('click', closePopup);
  }

  function acceptOrDeclineRequest(e) {
    const status = e.target.value;
    const requestId = e.target.dataset.requestId;

    updateRequest(status, requestId);
    document.getElementById(requestId).style.display = 'none';
  }

  function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay-success').style.display = 'none';
  }

  const getTeacherRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/filterRequests?teacherId=' + user.id + '&status=in asteptare', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
          } 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  const addSession = async () => {
    try {
      const postData = {
        teacher_id: user.id,
        start_date: startDate,
        end_date: endDate,
      };
      console.log(postData);
      const response = await fetch('http://localhost:5000/api/NewSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(postData) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  const updateRequest = async (status, requestId) => {
    try {
      const postData = {
        status : status
      };
      console.log(postData);
      const response = await fetch('http://localhost:5000/api/dissertation_requests/' + requestId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(postData) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      return result;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  if (!user) {
    return <div>User not authenticated</div>;
  }

    return (
      <div className='content-div'>
        <button id='add-session-btn' className='button-30' style={{display:'block'}} onClick={openPopup}>Adaugă sesiune</button>
        <h1>Lista de cereri</h1>
        <ul id='requests-list'>

        </ul>

        <div className="overlay" id="overlay">
          <div className="popup">
            <span className="close-btn" id='close-btn'>X</span>
            <h2>Sesiune nouă</h2>
            <p>Introduceți data de început și cea de final.</p>
            <div>
              <div>Dată început: </div>
              <input 
              type="datetime-local" 
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <div>Dată sfârșit: </div>
              <input 
              type="datetime-local" 
              id='end-date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button className='button-30' id='add-session-btn' onClick={saveSession}>Salvează</button>
          </div>
        </div>

        <div className="overlay" id="overlay-success">
          <div className="popup">
            <span className="close-btn" id='close-success-popup-btn'>X</span>
            <h2>Sesiunea a fost salvată cu succes</h2>
          </div>
        </div>
      </div>
    );
  }
  
  export default TeacherPage;
  