import React, { useState, useEffect } from "react";

export const EditCharacter = (props) => {
    const [character_name, setCharacterName] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');
    const id = props.id;

    
    useEffect(() => {
        const fetchData = async () => {
        try {
            let res = await fetch("/characters", {
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
		setCharacterName(resJson.name);
                setImageName(resJson.picture);
            }
        } catch (err) {
            console.log(err);
        }
        }

        fetchData()
            .catch(console.error);
    }, [])


    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    console.log(character_name);
	    let res = await fetch("/characters/edit_character", {
		method: "POST",
		body: JSON.stringify({
		    character_id: id,
		    name: character_name,
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
            <form className="add-character-form" onSubmit={handleSubmit}>
                <label htmlfof="character_name">Character Name</label>
            <input value={character_name} onChange={(e) => setCharacterName(e.target.value)} name="character_name" id="character_name" required />
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name" required />
            <button>Edit Character</button>
        </form>
        </div>
    );
}
