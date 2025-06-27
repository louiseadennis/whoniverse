import React, { useState, useEffect } from "react";
import { Location } from "./location_class";

export const CreateLocationinPlay = (props) => {
    const [location, setLocation] = useState(new Location("none") );
    const [message, setMessage] = useState('');
    const id = props.id;
    const user_id = props.user_id;

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
                setLocation(location);
            }
        } catch (err) {
            console.log(err);
        }
        }

        fetchData()
            .catch(console.error);
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(location);
            let res = await fetch("/locations_in_play/create", {
                method: "POST",
                body: JSON.stringify({
                    location_id: id,
		    user_id: user_id,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setMessage(resJson.message);
            } else {
                setMessage(resJson.message);
            }
        } catch (err) {
            console.log(err);
	    setMessage(err.toString());
        }
    }

    
    return (
	    <div>
	    <h2>Create Location in Play: {location.name} {id} </h2>
	    <form className="add-character-form" onSubmit={handleSubmit}>
	    <p><button>Create Location in Play {id} for user {user_id}</button></p>
	    <p>Message: {message}</p>
	    </form>
	    </div>
    );
}
