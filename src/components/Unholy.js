import { Route, Routes } from "react-router-dom"
import { Authorized } from "./auth/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Unholy.css"

export const Unholy = () => {
	return (
		<div className="video-background_div">
			<video className="video-background" autoPlay muted loop id="myVideo" src="http://localhost:3000/lavavideo.mp4" type="video/mp4">
			</video>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route
					path="*"
					element={
						<Authorized>
							<>
								<NavBar />
								<ApplicationViews />
							</>
						</Authorized>
					}
				/>
			</Routes>
		</div>
	)
}





