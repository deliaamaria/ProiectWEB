import { useEffect } from 'react';
import '../css/main.css';
import '../css/student-page.css';

function StudentPage() {
    useEffect(() => {
        const teacherList = document.getElementById('available-teacher-list');
        const teachers = [
          {
            name: 'Ion',
            student_number: 35,
          },
          {
            name: 'IONEL',
            student_number: 23,
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
    
          teacherList.appendChild(liElement);
        });
      }, [])

      function openPopup() {
        document.getElementById('overlay').style.display = 'flex';
        document.querySelector('#close-btn').addEventListener('click', closePopup);
      }
  
      function closePopup() {
        document.getElementById('overlay').style.display = 'none';
      }

    return (
      <div className='content-div'>
        <h1>Lista de profesori</h1>
        <ul id='available-teacher-list'>

        </ul>

        <div class="overlay" id="overlay">
          <div class="popup">
            <span class="close-btn" id='close-btn' onclick="closePopup()">X</span>
            <h2>Cerere dizertație</h2>
            <p>Introduceți tema dorită mai jos.</p>
            <input type='text' placeholder='Tema'></input>
            <button className='button-30' id='send-request-btn'>Trimite</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default StudentPage;
  