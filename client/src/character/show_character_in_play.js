import React, { useState, useEffect } from "react";
import { CharacterIP } from "./character_in_play_class";

export const ShowCharacterIP = (props) => {
    console.log("Entered Show Character in Play");
    const [character, setCharacter] = useState(new CharacterIP("none") );
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	    try {
		console.log("use effect in characters in play running");
		let res = await fetch("/characters_in_play/get_char", {
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
		    console.log(resJson.picture);
		    let character = new CharacterIP(resJson);
		    console.log("setting character");
		    setCharacter(character);
		}
	    } catch (err) {
		console.log(err);
	    }
	}

	fetchData()
	    .catch(console.error);
    }, [id])

    const picture_string = (string) => {
                console.log(string);
        return "/assets/characters/" + string;
    }


    return (
         <div>
	    <div>
	    <h2>{character.name}</h2>
	    </div>
	    <div>
	    <img src={picture_string(character.picture)} width="100"/>
	    </div>
        </div>
    );
}
