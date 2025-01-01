import React, { useState, useEffect } from "react";

const Personagem = ({ dados }) => {
  const [filmsData, setFilmsData] = useState([]);
  const [homeworldData, setHomeworldData] = useState(null);
  const [starshipsData, setStarshipsData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const fetchData = async (urls) => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));
        return data;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
      }
    };

    const loadDetails = async () => {
      if (!dados) return;
      try {
        const films = await fetchData(dados.films);
        setFilmsData(films);

        const homeworldResponse = await fetch(dados.homeworld);
        const homeworld = await homeworldResponse.json();
        setHomeworldData(homeworld);

        const starships = await fetchData(dados.starships);
        setStarshipsData(starships);

        const vehicles = await fetchData(dados.vehicles);
        setVehiclesData(vehicles);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      }
    };

    loadDetails();
  }, [dados]);

  return (
    <div>
      <h2>{dados.name}</h2>
      <p>Birth Year: {dados.birth_year}</p>
      <p>Height: {dados.height} cm</p>
      <p>Mass: {dados.mass} kg</p>

      <p>Films:</p>
      {filmsData.length > 0 ? (
        <ul>
          {filmsData.map((film, index) => (
            <li key={index}>{film.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading films...</p>
      )}

      <p>Homeworld: {homeworldData ? homeworldData.name : "Loading..."}</p>

      <p>Starships:</p>
      {starshipsData.length > 0 ? (
        <ul>
          {starshipsData.map((starship, index) => (
            <li key={index}>{starship.name}</li>
          ))}
        </ul>
      ) : (
        <p>No starships found.</p>
      )}

      <p>Vehicles:</p>
      {vehiclesData.length > 0 ? (
        <ul>
          {vehiclesData.map((vehicle, index) => (
            <li key={index}>{vehicle.name}</li>
          ))}
        </ul>
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
  );
};

export default Personagem;
