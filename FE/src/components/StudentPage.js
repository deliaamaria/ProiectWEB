import React, { useEffect, useState } from 'react';
import '../css/main.css';
import '../css/request-page.css';
import { useAuth } from '../helpers/authContext';

function StudentPage() {
  const { user } = useAuth();
  const [dissertationTopic, setDissertationTopic] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [teacher, setTeacher] = useState(null);
  
  let teacherId;

    useEffect(() => {
      if (!user) {
        return;
      }

      fetchData().then((result) => {
        console.log('Data fetched successfully:', result);
        const teacherList = document.getElementById('available-teacher-list');
          const teachers = result;
      
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
            sendRequestBtn.classList.add('open-popup-btn');
            sendRequestBtn.dataset.teacher = teacher.id;
            sendRequestBtn.innerHTML = "Trimite Cerere";
            liElement.appendChild(sendRequestBtn);
            if (teacher.student_number === 0) {
              sendRequestBtn.style.visibility = 'hidden';
            }
      
            teacherList.appendChild(liElement);
          });

          const openPopupBtns = document.querySelectorAll('.open-popup-btn');
          console.log(openPopupBtns);
          openPopupBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              
              teacherId = btn.dataset.teacher;
              setTeacher(teacherId);
              openPopup();

              getTeacherSessions().then((result) => {
                console.log(result)
                const dropdown = document.getElementById('session-list');
                dropdown.innerHTML = '';
                const option = document.createElement('option');
                option.text = 'Sesiune';
                dropdown.add(option);

                // Add new options
                result.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.text = item.start_date + ' - ' + item.end_date;
                    dropdown.add(option);
                });

              }).catch((error) => {
                console.error('Error fetching data:', error);
              });
            });
          });
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });

      getAcceptedRequests().then((result) => {
        console.log(result);
        console.log('Data fetched successfully:', result);
        const acceptedList = document.getElementById('first-phase-accepted');
      
          acceptedList.innerHTML = "";
          result.forEach((request) => {
            console.log(request.id);
            const liElement = document.createElement('li');
            
            const spanTitle = document.createElement('span');
            spanTitle.innerHTML = request.title;
            spanTitle.classList.add('teacher-list-span');

            const spanSession = document.createElement('span');
            spanSession.innerHTML = request.session_id;
            spanSession.classList.add('teacher-list-span');
            
            liElement.appendChild(spanTitle);
            liElement.appendChild(spanSession);

            const uploadFileBtn = document.createElement("button");
            uploadFileBtn.innerHTML = "Încarcă fișier";
            uploadFileBtn.classList.add('button-30');
            liElement.appendChild(uploadFileBtn);
      
            acceptedList.appendChild(liElement);

          });
      }).catch((error) => {
        console.error('Error fetching data:', error);
      });
    
      const confirmSendBtn = document.getElementById('send-request-btn');
      confirmSendBtn.addEventListener('click', sendRequest);
      
    }, []);

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

      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/filterUsers?account_type=profesor', {
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

      const getTeacherSessions = async () => {
        try {
          console.log(teacherId);
          const response = await fetch('http://localhost:5000/api/filterSessions?teacher_id=' + teacherId, {
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

      const sendDissertationRequest = async () => {
        try {
              const postData = {
                teacher_id: teacher,
                student_id: user.id,
                title: dissertationTopic,
                session_id: sessionId,
                student_name: user.name,
                status: 'in asteptare'
              };
    
              const response = await fetch('http://localhost:5000/api/newRequest', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(postData), 
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

      const getAcceptedRequests = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/filterRequests?studentId=' + user.id + '&status=acceptata', {
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

      if (!user) {
        return <div>User not authenticated</div>;
      }

    return (
      <div>
        <div className='content-div'>
          <h1>Lista de profesori</h1>
          <ul id='available-teacher-list'>

          </ul>

          <div className="overlay" id="overlay">
            <div className="popup">
              <span className="close-btn" id='close-btn'>X</span>
              <h2>Cerere disertație</h2>
              <p>Introduceți tema dorită mai jos.</p>
              <input 
              type='text' 
              placeholder='Tema' 
              id='dissertation-topic' 
              required
              value={dissertationTopic}
              onChange={(e) => setDissertationTopic(e.target.value)}></input>

            <div>
              <div>Selectează sesiunea dorită: </div>
              <select id='session-list' value={sessionId} onChange={(e) => {setSessionId(e.target.value);console.log(e.target.value)}}>
              </select>
            </div>

              <button className='button-30' id='send-request-btn' onClick={sendDissertationRequest}>Trimite</button>
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

        <div className='content-div'>
          <h1>Cereri acceptate</h1>
          <ul id='first-phase-accepted'>

          </ul>
        </div>
      </div>
    );
  }
  
  export default StudentPage;
  