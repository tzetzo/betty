import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import Carousel from "./components/Carousel";
import Menu from "./components/Menu";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [input, setInput] = useState({ page: 1, limit: 10, scale: 5 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://picsum.photos/v2/list?page=${input.page}&limit=${input.limit}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [input.page, input.limit]);

  return (
    <div className="App">
      <header>
        <Menu input={input} setInput={setInput} />
        <h3>Infinite Image Carousel</h3>
      </header>

      <main>
        {loading && <div>Loading data...</div>}
        {!loading && (
          <div>
            <Carousel data={data} scale={input.scale} />
          </div>
        )}
      </main>

      <footer>betty</footer>
    </div>
  );
}

export default App;
