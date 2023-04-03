import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WishList.css";

export const WishList = () => {
 const [wishes, setWishes] = useState([])

const localUnholyUser = localStorage.getItem("unholy_user");
const UnholyUserObject = JSON.parse(localUnholyUser);
const userId = UnholyUserObject.id


 useEffect(() => {
  fetch(`http://localhost:8088/wishlist?_expand=album&userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
   setWishes(data)
    });
}, [userId]); 


const deleteButton = (wish) => {
  fetch(`http://localhost:8088/wishlist/${wish.id}`, {
    method: "DELETE",
  }).then(() => {
    // After successfully deleting the review, update the state to remove the deleted review
    fetch(`http://localhost:8088/wishlist?_expand=album&userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
   setWishes(data)
    });
  });
};

  return (
    <>
    <h2 className="navbar__home2">WISHLIST</h2>
              <ol className="wishlist"> 
    {wishes.map((wish) => {
            return (
             <>
              <li>{wish.album.albumName}
               <button onClick={()=> deleteButton(wish)}>DELETE</button>
               </li>
             </>
             
             
            )})} </ol>
  
    </>
  );
};
