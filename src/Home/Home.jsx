import axios from "axios";
import { useEffect, useState } from "react";
import Anime from "./Components/Anime";
import styles from "./home.module.css"
import Header from "./Components/Header";


export default function Home() {
  const [animes, setAnimes] = useState([])

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
  
    axios.get('https://api.jikan.moe/v4/top/anime', config).then(response => 
    {
      setAnimes(response.data.data)
      console.log(response.data.data)
    })
  }, [])
  
  return (
    <div className="App">
      <Header />

      <main className={styles.listAnimes}>
        {animes.map(anime => <Anime key={anime.mal_id} anime={anime} />)}
      </main>
    </div>
  );
}
