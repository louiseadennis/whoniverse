import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Character } from "./character_class";

export const CreateCharacterinPlay = (props) => {
    const [character, setCharacter] = useState(new Character("none") );
    const [message, setMessage] = useState('');
    const id = props.id;
    const user_id = props.user_id;

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
                let character = new Character(resJson);
                setCharacter(character);
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
            console.log(character);
            let res = await fetch("/characters_in_play/create", {
                method: "POST",
                body: JSON.stringify({
                    character_id: id,
		    user_id: user_id,
		    location_id: 0,
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
        }
    }

    
    return (
	    <div>
	    <h2>Create Character in Play: {character.name} {id} </h2>
	    <form className="add-character-form" onSubmit={handleSubmit}>
	    <p><button>Create Character in Play {id} for user {user_id}</button></p>
	    <p>Message: {message}</p>
	    </form>
	    </div>
    );
}
