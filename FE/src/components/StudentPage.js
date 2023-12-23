import React, { useEffect } from 'react';
import '../css/main.css';
import '../css/request-page.css';
import { useAuth } from '../helpers/authContext';

function StudentPage() {
  const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        return;
      }
        const teacherList = document.getElementById('available-teacher-list');
        const teachers = [
          {
            name: 'Ion',
            student_number: 35,
          },
          {
            name: 'IONEL',
            student_number: 0,
          },
          {
            name: 'Gigel',
            student_number: 14,
          },
        ];
    
        teacherList.innerHTML = "";
        teachers.forEach((teacher) => {
          const liElement = document.createElement('li');

          const spanName = document.createElement('span');
          spanName.innerHTML = teacher.name;
          spanName.classList.add('teacher-list-span');
          
          const spanNumber = document.createElement('span');
          spanNumber.innerHTML = teacher.student_number + ' locuri disponibile';
          spanNumber.classList.add('teacher-list-span');

          liElement.appendChild(spanName);
          liElement.appendChild(spanNumber);

          const sendRequestBtn = document.createElement("button");
          sendRequestBtn.classList.add('button-30');
          sendRequestBtn.innerHTML = "Trimite Cerere";
          sendRequestBtn.addEventListener('click', openPopup);
          liElement.appendChild(sendRequestBtn);
          if (teacher.student_number === 0) {
            sendRequestBtn.style.visibility = 'hidden';
          }
    
          teacherList.appendChild(liElement);
        });

        const confirmSendBtn = document.getElementById('send-request-btn');
        confirmSendBtn.addEventListener('click', sendRequest);
      }, [])

      function openPopup() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('#close-btn').addEventListener('click', closePopup);
      }

      function sendRequest() {
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
        <h1>Lista de profesori</h1>
        <ul id='available-teacher-list'>

        </ul>

        <div className="overlay" id="overlay">
          <div className="popup">
            <span className="close-btn" id='close-btn'>X</span>
            <h2>Cerere disertație</h2>
            <p>Introduceți tema dorită mai jos.</p>
            <input type='text' placeholder='Tema'></input>
            <button className='button-30' id='send-request-btn'>Trimite</button>
          </div>
        </div>

        <div className="overlay" id="overlay-success">
          <div className="popup">
            <span className="close-btn" id='close-success-popup-btn'>X</span>
            <h2>Cererea a fost trimisa cu succes</h2>
            <p>Așteptați răspunsul profesorului selectat.</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default StudentPage;
  