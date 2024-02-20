import axios from "axios";
import { useEffect, useState } from "react";
import Anime from "./Components/Anime";
import styles from "./home.module.css"
import Header from "./Components/Header";


export default function Home() {
  const [currentSeasonAnimes, setCurrentSeasonAnimes] = useState([])
  const [currentSeasonName, setCurrentSeasonName] = useState("")
  const [search, setSearch] = useState("")
  const [pagination, setPagination] = useState([]);
  
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');

  useEffect(() => {
    let url;

    if(page) {
      url = `https://api.jikan.moe/v4/seasons/now?page=${page}` 
    } else {
      url = 'https://api.jikan.moe/v4/seasons/now'
    }

    axios.get(url).then(response => 
    {
      setCurrentSeasonAnimes(response.data.data)
      setCurrentSeasonName(response.data.data[0].season)
      console.log(response.data.pagination)

      const novoVetor = Array.from({ length: response.data.pagination.last_visible_page }, (_, index) => index + 1);
      setPagination(novoVetor);
    })
  }, [page])
  
  function handleChangeSearchValue(e) {
    setSearch(e.target.value)
  }

  function handleSubmitFormSearch(e) {
    e.preventDefault()

    axios.get(`https://api.jikan.moe/v4/anime?q=${search}`).then(response => 
    {
      setCurrentSeasonAnimes(response.data.data)
      console.log(response.data)
    })    
  }

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.mainContainer}>
        <div className={styles.searchAnime}>
          <h1>
            Aqui no otanime você encontra um enorme acervo de animes, pesquise por um anime do seu interrese e veja mais informações.
          </h1>

          <form className={styles.formSearchAnime} onSubmit={handleSubmitFormSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquise um anime aqui" value={search} onChange={handleChangeSearchValue} />
          </form>
        </div>

        <div className={styles.listAnimes}>
          <h1>Animes da temporada Atual ({currentSeasonName})</h1>

          <div className={styles.currentSeasonAnimes}>
            {currentSeasonAnimes.map(anime => <Anime key={anime.mal_id} anime={anime} />)}
          </div>

          <nav className={styles.pagination}>
            <ul>
              {
                pagination.map(page => {
                  return(
                    <li><a href={`?page=${page}`}>{page}</a></li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
