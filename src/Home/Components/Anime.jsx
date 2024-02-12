export default function Anime({anime}) {
    return(
        <img src={anime.images.jpg.image_url} alt={`imagem do anime ${anime.title}`} />
    );
}