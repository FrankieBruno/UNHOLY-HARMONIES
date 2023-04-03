import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Albums.css";

export const Albums = () => {
  const [albums, setAlbum] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const { artistId } = useParams(); //extracts a very specific value



  useEffect(() => {
    fetch(`http://localhost:8088/albums?_expand=artist&artistId=${artistId}`)
      .then((response) => response.json())
      .then((reviewArray) => {
        setAlbum(reviewArray);
      });
  }, [artistId]);

  useEffect(() => {
    fetch(`http://localhost:8088/reviews?artistId=${artistId}`)
      .then((response) => response.json())
      .then((albumArray) => {
        setReviews(albumArray);
      });
  }, []);


  const localUnholyUser = localStorage.getItem("unholy_user");
  const UnholyUserObject = JSON.parse(localUnholyUser);


  //First, I added a DELETE request to the function using the fetch function. The DELETE request takes the URL of the review we want to delete, which is constructed by appending (add somthing to) the review ID to the base API URL using template literals
  const deleteButton = (reviewId) => {
    fetch(`http://localhost:8088/reviews/${reviewId}`, {
      method: "DELETE",
    }).then(() => {
      // After successfully deleting the review, update the state to remove the deleted review
      setReviews(reviews.filter((review) => review.id !== reviewId));
    });
  };

  return (
    <>
      <h2 className="artist_title">WHITECHAPEL ALBUMS</h2>
      <article className="artist_list">
        <section className="artist_list">
          {albums.map((album) => {
            return (
              <div className="button_group_whole" key={album.id}>
                 <button className="button" onClick={() => navigate(`/album/${album.id}`)}>
                  {album.albumName}  
                </button>
              </div>
            );
          })}
        </section>
      </article>
      <button onClick={() => navigate(`/review/${artistId}`)}>
        Leave a Review
      </button>
      <h2 className="review_list">Reviews</h2>
      <article className="review_article">
        {reviews.map((review) => {
          return (
            <section className="review_section" key={review.id}>
              <header className="review_section">{review.rating}</header>
              <footer>{review.review}</footer>
             {UnholyUserObject.id === review.userId?<button onClick={() => deleteButton(review.id)}>Delete</button>
             :""}
            </section>
          );
        })}
      </article>
    </>
  );
};
