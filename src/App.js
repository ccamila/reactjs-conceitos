import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [index, setIndex] = useState(1)

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository ${index}`
    })
    const repository = response.data;
    setIndex(prevState => prevState + 1)
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const newRepository = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
        <li key={repository.id}>
          <h1>{repository.title}</h1>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
