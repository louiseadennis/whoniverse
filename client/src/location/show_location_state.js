import React, { useState, useEffect } from "react";
import { ShowLocation } from "./show_location";
import { ShowTardis } from "./show_tardis";

export const ShowLocationState = (props) => {
    console.log("entered show location state");
    console.log(props.id);
    const [loading, setLoading ] = useState(1);
    const id = props.id;
    const user = props.user;
    user.getTardis();
    const tardis = user.tardis_location == id;

    // Not sure why I'm doing this...
    useEffect(() => {
	if (id !== 0) {
	    console.log("id not zero");
	    console.log(id);
	    const fetchData = async () => {
		try {
		    let res = await fetch("/locations/get_state", {
			method: "POST",
			body: JSON.stringify({
			    id: id,
			    user_id: user.user_id,
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
	    {loading ? <p>Please Reload</p> : <ShowLocation id={id}/>}
	{tardis ? <ShowTardis user={user}/> : <p>The Tardis is not Here</p>}
	</div>
    );
}
