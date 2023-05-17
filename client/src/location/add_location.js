import React, {useState} from "react";

export const AddLocation = () => {
    const [location_name, setLocationName] = useState('');
    const [description, setDescription] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');    

    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    console.log(location_name);
	    let res = await fetch("/add_location", {
		method: "POST",
		body: JSON.stringify({
		    location_name: location_name,
		    description: description,
		    image_name: image_name,
		}),
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status == 200) {
		setLocationName("");
		setDescription("");
		setImageName("");
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
	    <h2>Add Location Form</h2>
            {message}
	    </div>
            <form className="add-location-form" onSubmit={handleSubmit}>
                <label htmlfof="location_name">Location Name</label>
            <input value={location_name} onChange={(e) => setLocationName(e.target.value)} name="location_name" id="location_name" required />
            <label htmlfof="description">Location Description</label>
            <textarea rows="10" value={description} onChange={(e) => setDescription(e.target.value)} name="decription" id="description" required />
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name" required />
            <button>Add Location</button>
        </form>
        </div>
    );
}
