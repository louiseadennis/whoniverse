import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Location } from "./location_class";

export const ShowLocation = (props) => {
    console.log("entered show location");
    const [location, setLocation] = useState(new Location("none") );
    const [message, setMessage] = useState("No Message");
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	    try {
		let res = await fetch("/locations", {
		    method: "POST",
		    body: JSON.stringify({
			id: id,
		    }),
		    headers: {
			'Content-type': 'application/json; charset=UTF-8',
		    },
		});
		let resJson = await res.json();
		if (res.status === 200) {
		    console.log(resJson);
		    let location = new Location(resJson);
		    location.debug = 1;
		    console.log(resJson.picture);
		    setLocation(location);
		    console.log(location.picture_string);
		}  else {
		    console.log("wrong status");
		    setMessage(resJson.message);
		}
	    } catch (err) {
		console.log(err);
	    }
	}

	//console.log("fetching data in show location");

	fetchData()
	    .catch(console.error);
   }, [id])

    if (location.name) {
	return (
	    <div>
	    <h2>{location.name}</h2>
		<img src={location.picture_string} alt="Location (Sorry!)" />
		<p>{message}</p>
		{HTMLReactParser ( location.description )}
		</div> );

    } else {
	return(<div><p>Loading...</p></div>);
    }

}
