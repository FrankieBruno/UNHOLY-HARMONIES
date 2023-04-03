import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AlbumReview = () => {
    const [albums, setAlbum] = useState([])
    const [review, update] = useState({
        userId:0,
        review:"",
        albumId:0,
        artistId:""
    })
    const navigate = useNavigate()
    const {artistId} = useParams() //extracts a very specific value 

    useEffect(() => {
        fetch(`http://localhost:8088/albums?_expand=artist&artistId=${artistId}`)
            .then((response) => response.json())
            .then((albumArray) => {
                setAlbum(albumArray);
            });
    }, [artistId]);

    const localUnholyUser = localStorage.getItem("unholy_user");
    const UnholyUserObject = JSON.parse(localUnholyUser);
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault();
    
        const reviewToSendToApi = {
          userId: UnholyUserObject.id,
          review: review.review,
          albumId: parseInt(review.albumId),
          artistId: parseInt(artistId)
        };

        return fetch(`http://localhost:8088/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewToSendToApi),
          })
            .then((response) => response.json())
            .then(() => {
              navigate("/albums");
            });
        };

return (
    <>
        <form className="productForm">
      <h2 className="prductForm__title">Write Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Name Unholy"
            value={review.review}
            onChange={(evt) => {
              const copy = { ...review};
              copy.review = evt.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
  <div className="form-group">
    <label htmlFor="productTypeId">Select Album</label>
    <select 
      onChange={(evt) => {
        const copy = { ...review};
        copy.albumId = evt.target.value;
        update(copy);
      }}
    > 
      <option value="0">Select a category</option>
    {albums.map((album) => 
    {
      return <option key={album.id} value={album.id}>{album.albumName}</option>
    })
    }
    </select>
  
  </div>
</fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
      
      
        Submit Review
      </button>
    </form>
    </>
            
);
        }     