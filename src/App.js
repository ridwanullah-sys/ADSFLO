import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [fileterd, setFiltered] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);

  const fetcher = async () => {
    setError(null);
    const response = await fetch(
      "https://nextjs-orpin-omega-98.vercel.app/api/restaurants"
      //"api/restaurants"
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      setError("API Fetching Error");
      return null;
    }
  };

  const Arrange = async () => {
    setLoading(true);
    const fetchresults = await fetcher();
    if (fetchresults) {
      const Array = [];
      const promise = new Promise((res, rej) => {
        fetchresults.forEach((fetchresult, index) => {
          const found = Array.findIndex(
            (arr) => arr.state === fetchresult.state
          );
          if (found >= 0) {
            Array[found].resturants.push(fetchresult.restaurant_name);
          } else {
            Array.push({
              state: fetchresult.state,
              resturants: [fetchresult.restaurant_name],
            });
          }
          if (index === fetchresults.length - 1) {
            setArray(Array);
            res();
          }
        });
      });
      await promise;
    }
    setLoading(false);
  };

  const filter = useCallback(() => {
    if (filterInput.length > 0) {
      const filte = array.filter((val) =>
        val.state.toUpperCase().includes(filterInput.toUpperCase())
      );
      setFiltered(filte);
    } else {
      setFiltered(array);
    }
  }, [array, setFiltered, filterInput]);

  useEffect(() => {
    Arrange();
  }, []);

  useEffect(() => {
    filter();
  }, [filter]);

  return (
    <div className="App">
      <div className="app-header">
        <div id="title">ADSFLO</div>
        <input
          placeholder="Filter State"
          className="filter-state"
          onChange={(e) => {
            setFilterInput(e.target.value);
          }}
        />
      </div>
      <div>
        {loading ? (
          <div className="lderr">Loading...</div>
        ) : err ? (
          <div className="lderr">{err}</div>
        ) : (
          <div id="body">
            {fileterd &&
              fileterd.map((element, index) => (
                <div key={`${element}${index}`} className="state">
                  <div className="state-title">{element.state}</div>
                  <div className="state-rests">
                    {element.resturants.map((resturant, index) => (
                      <div
                        key={`${element.state}${resturant}${index}`}
                        className="rest"
                      >
                        {resturant}
                      </div>
                    ))}
                  </div>
                </div>
              ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
