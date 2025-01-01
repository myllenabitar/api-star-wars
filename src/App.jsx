import React from 'react';
import Personagem from './Personagem';

const App = () => {
  const [dados, setDados] = React.useState(null);

  async function handleClick(event, characterNumber) {
    const response = await fetch(
      `https://swapi.py4e.com/api/people/${characterNumber}`,
    );
    const json = await response.json();
    setDados(json);
  }

  return (
    <>
      <div>
        <div className="app-content">
          <h1 style={{ color: "#FFC107" }}>Explore o Espaço</h1>
          <p style={{ color: "white" }}>Bem-vindo ao universo Star Wars!</p>
        </div>
      </div>
      <div>

        <button style={{ margin: '.5rem' }} onClick={(event) => handleClick(event, 1)}>Luke Skywalker</button>
        <button style={{ margin: '.5rem' }} onClick={(event) => handleClick(event, 2)}>C-3PO</button>
        <button style={{ margin: '.5rem' }} onClick={(event) => handleClick(event, 3)}>R2-D2</button>
        <button style={{ margin: '.5rem' }} onClick={(event) => handleClick(event, 4)}>Darth Vader</button>
        {dados && <Personagem dados={dados} />}
      </div>
    </>
  );
};

export default App;
