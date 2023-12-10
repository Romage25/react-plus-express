import "./App.css";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
  }, [])

  return (
    <div>
      <h1>Grades of Students</h1>
      <div className="grade-container">
        {users && users.map((user, i) => (
          <div className="grades-container" key={i}>
            <h3>Name: {user.name}</h3>
            <h4>Grade: {user.grade}</h4>
            <h5>
              <Link to={'/edit/' + user.id}>Edit</Link>
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
