import { useState, useEffect } from "react";
import { ShowLocationState } from "./location/show_location_state";

export const Location = (props) => {
	const [loading, setLoading] = useState(1);
	const [pov, setPov] = useState(0);
	const [message, setMessage] = useState("");
	const [story, setStory ] = useState("No Current Adventure");

	const user = props.user;

	useEffect(() => {
		const getPOV = async () => {
			const res = await user.getPOV();
			setPov(res);
			setLoading(0);
			return res;
		}

		const getStory = async (username) => {
			try {
				let res = await fetch("/stories/get_state", {
					method: "POST",
					body: JSON.stringify(
						{
						 user_name: username,
						}
					),
					headers: {
						'Content-type': 'application/json; charset=UTF-8'
					}
				});
				let resJson = await res.json();
				if (resJson.status === 200) {
						setMessage("res sucess");
				} else {
					setMessage(resJson.message.toString());
					if (resJson.message.toString() === "no story") {
						setStory("No Current Adventure");
					}
				}
			//	setMessage("setting message")

			} catch (err) {
				setMessage(err.toString());
			}
		}
		
		if (user.username !== undefined) {
			getPOV();
			const username = user.username;
			if (username !== undefined) {
				if (loading === 0) {
					getStory(username);	
				}
			}		
		} else {
			setLoading(1);
			setMessage("no username");
		}
	}, [user, pov, loading]);

	return (
		<div className="Page">
		<div>{story}</div>
		<h2>Location</h2>
		{ loading ? <span>Loading ... </span> :
			<ShowLocationState id={pov} user={user} changePov={setPov}/>
		}
		<h2>Debug Info</h2>
		<div>{message}</div><div>{pov}</div>
		</div>
	);	
}