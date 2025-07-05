import React, { useState, useEffect } from "react";

export const FlyTardis = (props) => {
    const [ locations, setLocations ] = useState([]);
    const [ message, setMessage ] = useState('no message');
    const move = props.move;
    const user = props.user;
    const tardis_location = user.tardis_location;

    const calculate_next_tardis_location = () => {
	setMessage("c");
	return random_location(tardis_location);
    }

    const random_location = (current_location) => {
	setMessage(current_location);
	let valid_locations = [];
	for (const location of locations) {
	    if (location.id !== current_location) {
		valid_locations.push(location.id);
	    }
	}
	let i = Math.floor(Math.random() * valid_locations.length);
	return valid_locations[i];
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
	try {
	    const new_location = calculate_next_tardis_location();
	    setMessage("new_location");
	    let res = await fetch("/tardis/change_location", {
                    method: "POST",
                    body: JSON.stringify({
			location_id: new_location,
			tardis_id: user.tardis_id
                    }),
                    headers: {
			'Content-type': 'application/json; charset=UTF-8',
                    },
		});
		if (res.status === 200) {
		    setMessage(new_location);
		    move(new_location);
		}
        } catch (err) {
	    setMessage(err);
	}
    }

    useEffect(() => {
        const fetchData = async () => {
	    try {
	    let res1 = await fetch("/locations/get_ids", {
		method: "POST",
                headers: {
		'Content-type': 'application/json; charset=UTF-8',
                   },
	    });
	    let resJson = await res1.json();
	    if (res1.status === 200 ) {
		setLocations(resJson);
	    }
	    } catch (err) {
		setMessage(err);
	    }
	}

	fetchData();
    }, []);


    return (
	<div>
	    <form className="fly-tadis-form" onSubmit={handleSubmit}><button>TakeOff</button> {message} {user.tardis_id} {user.tardis_location}</form>
	    </div>
    );
}
