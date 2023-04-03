import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const WhiteChapel = () => {
    const [albums, setAlbum] = useState([])
    const [artist, setArtist] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/albums?_expand=artist&artistId=1`)
            .then((response) => response.json())
            .then((albumArray) => {
                setAlbum(albumArray);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8088/artists/1`)
            .then((response) => response.json())
            .then((data) => {
                setArtist(data);
            });
    }, []);
    
    

return (
    <>
        <h2 className="artist_title">WHITECHAPEL ALBUMS</h2>
        <article className="artist_list">
            <section className="artist_list" key={artist.id}>
            {albums.map((album) => {
                return (
                        <button >
                            {album.albumName}
                        </button>
                );
            })}
            </section>
        </article>
    </>
);

}