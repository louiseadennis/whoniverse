import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Character } from "./character_class";

export const ShowCharacter = (props) => {
    const [character, setCharacter] = useState(new Character("none") );
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	try {
	    let res = await fetch("/get_character", {
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
		console.log(resJson.name);
		console.log(resJson.char_id);
		let character = new Character(resJson.name);
		setCharacter(character);
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
	    <h2>{character.state.name}</h2>
	    </div>
        </div>
    );
}
