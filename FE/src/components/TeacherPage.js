import React, { useEffect } from 'react';
import '../css/main.css';
import '../css/request-page.css';
import { useAuth } from '../helpers/authContext';

function TeacherPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    const requestList = document.getElementById('requests-list');
    const students = [
      {
        name: 'Ion',
        title: 'Platforma pentru incarcarea lucrarilor de disertatie',
        session_id: 1
      },
      {
        name: 'IONEL',
        title: 'Aplicatie web pentru shopping online',
        session_id: 1
      },
      {
        name: 'Gigel',
        title: 'title3',
        session_id: 2
      },
    ];

    requestList.innerHTML = "";
    students.forEach((student) => {
      const liElement = document.createElement('li');

      const spanName = document.createElement('span');
      spanName.innerHTML = student.name;
      spanName.classList.add('student-list-span');
    
      liElement.appendChild(spanName);

      const spanTitle = document.createElement('span');
      spanTitle.innerHTML = student.title;
      spanTitle.classList.add('student-list-span');
    
      liElement.appendChild(spanTitle);

      const acceptRequestBtn = document.createElement("button");
      acceptRequestBtn.innerHTML = 'Acceptă';
      acceptRequestBtn.classList.add('button-30');
      const declineRequestBtn = document.createElement("button");
      declineRequestBtn.innerHTML = 'Respinge';
      declineRequestBtn.classList.add('button-30');
      liElement.appendChild(acceptRequestBtn);
      liElement.appendChild(declineRequestBtn);

      let sessionDiv = document.getElementById('session-' + student.session_id);
      if (!sessionDiv) {
        sessionDiv = document.createElement('div');
        sessionDiv.id = 'session-' + student.session_id;
        sessionDiv.innerHTML += 'session-' + student.session_id;

        requestList.appendChild(sessionDiv);
      }
      
      sessionDiv.appendChild(liElement);

      
    });
  }, []);

  function openPopup() {
    document.getElementById('overlay').style.display = 'flex';
    document.querySelector('#close-btn').addEventListener('click', closePopup);
  }

  function saveSession() {
    document.getElementById('overlay-success').style.display = 'flex';
    document.querySelector('#close-success-popup-btn').addEventListener('click', closePopup);
  }

  function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay-success').style.display = 'none';
  }

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
              <input type="datetime-local" />
            </div>
            <div>
              <div>Dată sfârșit: </div>
              <input type="datetime-local" />
            </div>
            <button className='button-30' id='send-request-btn' onClick={saveSession}>Salvează</button>
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
  