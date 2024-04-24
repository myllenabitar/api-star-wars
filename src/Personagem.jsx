import React, { useState, useEffect } from 'react';

const Personagem = ({ dados }) => {
  const [filmsData, setFilmsData] = useState([]);
  const [homeworldData, setHomeworldData] = useState(null);
  const [starshipsData, setStarshipsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [characterImage, setCharacterImage] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      const filmsPromises = dados.films.map(async (filmUrl) => {
        const response = await fetch(filmUrl);
        const filmData = await response.json();
        return filmData;
      });
      const films = await Promise.all(filmsPromises);
      setFilmsData(films);
    };

    const fetchHomeworld = async () => {
      const response = await fetch(dados.homeworld);
      const homeworldData = await response.json();
      setHomeworldData(homeworldData);
    };

    const fetchStarships = async () => {
      const starshipsPromises = dados.starships.map(async (starshipUrl) => {
        const response = await fetch(starshipUrl);
        const starshipData = await response.json();
        return starshipData;
      });
      const starships = await Promise.all(starshipsPromises);
      setStarshipsData(starships);
    };

    const fetchVehicles = async () => {
      const vehiclesPromises = dados.vehicles.map(async (vehicleUrl) => {
        const response = await fetch(vehicleUrl);
        const vehicleData = await response.json();
        return vehicleData;
      });
      const vehicles = await Promise.all(vehiclesPromises);
      setVehiclesData(vehicles);
    };
    
    fetchFilms();
    fetchHomeworld();
    fetchStarships();
    fetchVehicles();
    
  }, [dados && <Personagem dados={dados}/>]);

  return (
    <div>
      <h2>{dados.name}</h2>
      <p>Birth Year: {dados.birth_year}</p>
      <p>Height: {dados.height}</p>
      <p>Mass: {dados.mass}</p>
      
      <p>Films:</p>
      <ul>
        {filmsData.map((film, index) => (
          <li key={index}>{film.title}</li>
        ))}
      </ul>
      
      <p>Homeworld: {homeworldData && homeworldData.name}</p>
      
      <p>Starships:</p>
      <ul>
        {starshipsData.map((starship, index) => (
          <li key={index}>{starship.name}</li>
        ))}
      </ul>
      
      <p>Vehicles:</p>
      <ul>
        {vehiclesData.map((vehicle, index) => (
          <li key={index}>{vehicle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Personagem;
