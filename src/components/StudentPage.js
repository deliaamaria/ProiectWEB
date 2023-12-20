import { useEffect } from 'react';
import '../css/main.css';

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
          liElement.innerHTML = teacher.name + " - " + teacher.student_number;

          const sendRequestBtn = document.createElement("button");
          sendRequestBtn.innerHTML = "Trimite Cerere";
          liElement.appendChild(sendRequestBtn);
    
          teacherList.appendChild(liElement);
        });
      }, [])

    return (
      <div className='content-div'>
        <h1>Lista de profesori</h1>
        <ul id='available-teacher-list'>

        </ul>
      </div>
    );
  }
  
  export default StudentPage;
  