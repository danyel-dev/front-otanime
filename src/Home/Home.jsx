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
  
    axios.get('https://api.jikan.moe/v4/anime?status=complete', config).then(response => 
    {
      setAnimes(response.data.data)
      console.log(response.data.data)
    })
  }, [])
  
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.searchAnime}>
          <h1>
            Aqui no otanime você encontra um enorme acervo de animes, pesquise por um anime do seu interrese e veja mais informações.
          </h1>

          <form className={styles.formSearchAnime}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquise um anime aqui" />
          </form>
        </div>

        <div className={styles.listAnimes}>
          {animes.map(anime => <Anime key={anime.mal_id} anime={anime} />)}
        </div>
      </main>
    </div>
  );
}
