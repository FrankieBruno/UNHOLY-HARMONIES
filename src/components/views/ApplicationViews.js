import { Outlet, Route, Routes } from "react-router-dom"
import { ArtistList } from "./ArtistList"
import { Albums } from "../albums/Albums"
import { AlbumPage } from "../albums/AlbumPage"
import { AlbumReview } from "../review/AlbumReview"
import { WishList } from "../albums/WishList"






export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    

                    <Outlet />
                </>
            }>
            
		    <Route path="artists" element={<ArtistList />} />
            <Route path="albums/:artistId" element={ <Albums /> } />
            <Route path="album/:albumId" element={ <AlbumPage /> } />
            <Route path="review/:artistId" element={ <AlbumReview /> } />
            <Route path="/wishlist" element={ <WishList /> } />    
            
            

           

                
            </Route>
        </Routes>
    )
}