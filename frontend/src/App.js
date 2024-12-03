import React, { useEffect, useState } from 'react';

function App() {
    const [circulationData, setCirculationData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/circulation')
            .then((response) => response.json())
            .then((data) => setCirculationData(data.results))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Circulation Data</h1>
            <ul>
                {circulationData.map((item, index) => (
                    <li key={index}>
                        {item.nom_itin} - {item.libelle_court}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
