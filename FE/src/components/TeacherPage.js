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
      },
      {
        name: 'IONEL',
        title: 'Aplicatie web pentru shopping online',
      },
      {
        name: 'Gigel',
        title: 'title3',
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

      requestList.appendChild(liElement);
    });
  }, []);

  if (!user) {
    return <div>User not authenticated</div>;
  }

    return (
      <div className='content-div'>
        <h1>Lista de cereri</h1>
        <ul id='requests-list'>

        </ul>
      </div>
    );
  }
  
  export default TeacherPage;
  