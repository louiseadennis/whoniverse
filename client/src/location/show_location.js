import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Location } from "./location_class";

export const ShowLocation = (props) => {
    const [location, setLocation] = useState(new Location("none") );
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	try {
	    let res = await fetch("/get_location", {
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
		let location = new Location(resJson.location_name);
		location.description = resJson.description;
		location.picture = resJson.image_name;
		setLocation(location);
	    }
	} catch (err) {
	    console.log(err);
	}
	}

	fetchData()
	    .catch(console.error);
    }, [])

    return (
         <div>
	    <div>
	    <h2>{location.state.name}</h2>
	    </div>
	    <div>
	    <img src={location.picture} />
	    </div>
	    <div>
	    {HTMLReactParser ( location.description )}
	    </div>
        </div>
    );
}
