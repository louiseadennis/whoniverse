import React, { useState, useEffect } from "react";

export const EditLocation = (props) => {
    const [location_name, setLocationName] = useState('');
    const [description, setDescription] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');
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
		setLocationName(resJson.name);
                setDescription(resJson.description);
                setImageName(resJson.picture);
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
	    console.log(location_name);
	    let res = await fetch("/locations/edit_location", {
		method: "POST",
		body: JSON.stringify({
		    location_id: id,
		    name: location_name,
		    description: description,
		    picture: image_name,
		}),
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status == 200) {
		setMessage(resJson.message);
	    } else {
		setMessage(resJson.message);
	    }
	} catch (err) {
	    console.log(err);
	}
    }

    return (
         <div>
	    <div>
	    <h2>Edit Location Form</h2>
            {message}
	    </div>
            <form className="add-location-form" onSubmit={handleSubmit}>
                <label htmlfof="location_name">Location Name</label>
            <input value={location_name} onChange={(e) => setLocationName(e.target.value)} name="location_name" id="location_name" required />
            <label htmlfof="description">Location Description</label>
            <textarea rows="10" value={description} onChange={(e) => setDescription(e.target.value)} name="decription" id="description" required />
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name" required />
            <button>Edit Location</button>
        </form>
        </div>
    );
}
