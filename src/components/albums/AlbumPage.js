import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Albums.css";

export const AlbumPage = () => {
  const [album, setAlbum] = useState({});
  const [trackList, setTrackList] = useState([]);
  const { albumId } = useParams(); //allows you to grab a specific id from an album//
  const navigate = useNavigate();

  //fetch album data
  useEffect(() => {
    fetch(`http://localhost:8088/albums?id=${albumId}`)
      .then((response) => response.json())
      .then((albumObj) => {
        setAlbum(albumObj[0]);
      });
  }, []);

  //fetch tracklist data with album and artist information
  useEffect(() => {
    fetch(`http://localhost:8088/tracks?_expand=album&_expand=artist&albumId=${albumId}`)
      .then((response) => response.json())
      .then((trackListObj) => {
        const filteredTrackList = trackListObj.filter(
          (track) => track.albumId === parseInt(albumId) && track.artistId === track.album.artistId
        );
        setTrackList(filteredTrackList);
      });
  }, [albumId]);

  const localUnholyUser = localStorage.getItem("unholy_user");
  const UnholyUserObject = JSON.parse(localUnholyUser);

  const handleSaveAlbumClick = () => {
    const albumToSave = {
      userId: UnholyUserObject.id,
      albumId: parseInt(albumId)
    };

    return fetch(`http://localhost:8088/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumToSave),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/wishlist");
      });
  };


  //display artwork for album and display filtered tracklist with album and artist information
  return (
    <>
    <div className="save_album">
      <button
      onClick={handleSaveAlbumClick}  
      >
        Save Album
      </button>
      </div>
      <img className="album-image" src={album.image} alt={album.albumName} />
     
      <ul className="track_list">
        {trackList.map((track) => (
          <li key={track.id}>
            {track.track}
          </li>
        ))}
      </ul>
    </>
  );
};
