import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ArtistList.css";

export const ArtistList = () => {
    const [artists, setArtist] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/artists`)
            .then((response) => response.json())
            .then((artistArray) => {
                setArtist(artistArray);
            });
    }, []);

    return (
        <>
           
            <h2 className="artist_title">ARTIST</h2>
            <div className="button_group_whole">
            <article className="button">
                {artists.map((artist) => {
                    return (
                        <section className="button" key={artist.id}>
                            <button className="button" onClick={() => navigate(`/albums/${artist.id}`)}>
                                {artist.artistName}
                            </button>
                        </section>
                    );
                })}
            </article>
            </div>
        </>
    );
}
