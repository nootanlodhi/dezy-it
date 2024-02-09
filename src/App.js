import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetchApi = async (name) => {
    try {
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
      const data = await resp.json();
      console.log(data.moves);
      setData(data.moves);
    } catch (error) {
      console.log(error);
      setData(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name) {
        fetchApi(name.toLowerCase());
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [name]);

  console.log(data);

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      
      <input value={name} onChange={handleName} />
      {data !== null ? (
        data.map((item, index) => {
          return (
            <div key={index}>
              <h1>{item.move.name}</h1>
            </div>
          );
        })
      ) : (
        <h2>No data found</h2>
      )}
    </>
  );
};

export default App;

// bulbasaur
// ivysaur
// venusaur
// charmander
// charmeleon
