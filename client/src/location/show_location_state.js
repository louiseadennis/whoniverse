import React, { useState, useEffect } from "react";
import { ShowLocation } from "./show_location";

export const ShowLocationState = (props) => {
    console.log("entered show location state");
    console.log(props.id);
    const [location, setLocation] = useState('0');
    const [loading, setLoading ] = useState('true');
    const id = props.id;

    useEffect(() => {
	console.log("lsid:");
	console.log(id);
	if (id != 0) {
	    console.log("id not zero");
	    const fetchData = async () => {
		try {
		    let res = await fetch("/get_location_state", {
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
		console.log("got location state");
		console.log(resJson);
		let location_id = resJson.location_id;
		setLocation(location_id);
		setLoading(false);
	    }
	} catch (err) {
	    console.log(err);
	}
	    }

	fetchData()
		.catch(console.error);
	}
    }, [])

    return (
	<div>
	    {loading ? <p>Please Reload</p> : <ShowLocation id={location}/>}
	</div>
    );
}
