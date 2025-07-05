import { useState, useEffect } from "react";
import { ShowLocationState } from "./location/show_location_state";

export const Location = (props) => {
	const [loading, setLoading] = useState(1);
	const [pov, setPov] = useState(0);
	const [message, setMessage] = useState("");
	const user = props.user;

	useEffect(() => {
		const getPOV = async () => {
			const res = await user.getPOV();
			setPov(res);
			setLoading(0);
			return res;
		}
		
		if (user.username !== undefined) {
			getPOV();			
		} else {
			setLoading(1);
			setMessage("no username");
		}
	}, [user, pov]);

	return (
		<div className="Page">
		<h2>Location</h2>
		{ loading ? <span>Loading ... </span> :
			<ShowLocationState id={pov} user={user} changePov={setPov}/>
		}
		<h2>Debug Info</h2>
		<div>{message}</div><div>{pov}</div>
		</div>
	);	
}