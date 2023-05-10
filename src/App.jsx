import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [flags, setFlags] = useState([]);
  const [query, setQuery] = useState("");
  const [theme,setTheme] = useState("dark")

  function changeTheme(){

    if(theme==="dark"){
      setTheme("light")
    }else{
      setTheme("dark")
    }
  }

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => setFlags(res));
  }, []);
  return (
    <div className="app" data-theme={theme}>
      <h1>REST COUNTRIES API🏳️</h1>
      <button className="switch" onClick={changeTheme}><i className="fa-regular fa-moon"></i></button>
      <div className="search-div">
        <input type="text" placeholder="Type a country name..." onChange={e => setQuery(e.target.value)}/>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="container">
        {flags.filter((flag) =>
          flag.name.common.toLowerCase().includes(query)
        ).map((flag) => 
           (
            <div className="card" key={flag.flags.png}>
              <img src={flag.flags.png} />
              <div className="info">
                <p className="name">{flag.name.common}</p>
                <div className="info">
                  <b>Population:</b> <span>{flag.population}</span>{" "}
                </div>
                <div className="info">
                  <b>Region:</b> <span>{flag.region}</span>
                </div>
                <div className="info">
                  <b>Capital:</b> <span>{flag.capital}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
