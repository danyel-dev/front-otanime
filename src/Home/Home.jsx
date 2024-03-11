import axios from "axios";
import { useEffect, useState } from "react";
import Anime from "./Components/Anime";
import styles from "./home.module.css"
import Header from "./Components/Header";


export default function Home() {
  const [seasonAnimes, setSeasonAnimes] = useState([])
  const [pagination, setPagination] = useState([])

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
 
  useEffect(() => {
    let url = 'https://api.jikan.moe/v4/seasons/now'
    
    if(page)
      url = url + `?page=${page}`

    axios.get(url).then(response => 
    {
      setSeasonAnimes(response.data.data)
      console.log(response.data)

      const novoVetor = Array.from({ length: response.data.pagination.last_visible_page }, (_, index) => index + 1);
      setPagination(novoVetor);
    })
  }, [page])
  
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.searchAnime}>
          <h1>
            Aqui no otanime você encontra um enorme acervo de animes, pesquise por um anime do seu interrese e veja mais informações.
          </h1>

          <form className={styles.formSearchAnime}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquise um anime aqui" />
          </form>
        </div>

        <div className={styles.listAnimes}>
          <h1>Animes da temporada Atual</h1>

          <div className={styles.seasonAnimes}>
            {seasonAnimes.map(anime => <Anime key={anime.mal_id} anime={anime} />)}
          </div>
        </div>

        <nav className={styles.pagination}>
          <ul>
            {pagination.map(page => <li><a href={`/?page=${page}`}>{page}</a></li> )}
          </ul>
        </nav>
      </main>
    </div>
  );
}
