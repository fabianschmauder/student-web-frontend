import React, {useEffect, useState} from 'react';
import Card from "./components/card/Card";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function loadStudents(query) {
  return fetch("http://localhost:8080/students?query="+query)
      .then(response => {
          if(response.status !== 200){
              throw new Error('Fetch failed');
          }
          return response;
      })
      .then(response => response.json())
}

function App() {

  const [students, setStudents] = useState([]);
  const [fetchState, setFetch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setFetch('LOADING');
    loadStudents(query)
        .then(data => {
          setStudents(data);
          setFetch('SUCCESS')
        }).catch(()=> setFetch('FAILED') );

  },[query]);

  return (
    <div>
        <input onChange={(event) =>  setQuery(event.target.value)}/>

      {students.map((student) => <Card key={student.id} student={student}/>)}
      {fetchState === 'LOADING' && <LoadingSpinner/>}
        {fetchState === 'FAILED' && <div> AHHH!!! </div>}
    </div>
  );
}

export default App;
