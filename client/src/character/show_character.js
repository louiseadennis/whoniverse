import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Character } from "./character_class";

export const ShowCharacter = (props) => {
    const [character, setCharacter] = useState(new Character("none") );
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	    try {
		console.log(id);
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
		console.log(resJson.name);
		console.log(resJson.char_id);
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

    const picture_string = (string) => {
                console.log(string);
        return "/assets/characters/" + string;
    }

    const icon_pictures = (icon_list) => icon_list.map((d) => <div className="padding:20px; border-radius:10px; background-color:white;"><p><img src={picture_string(d[1])} width="100"/></p>{d[0] ? "default" : ""}</div>);

    return (
         <div>
	    <div>
	    <h2>{character.name} {id} </h2>
	    </div>
	    <div>
	    <p>Gender:{character.gender}</p>
	    <p>Doctor:{character.doctor}</p>
	    <dl>
	    <dt>Combat:</dt><dd>{character.combat}</dd>
	    <dt>Tech:</dt><dd>{character.tech}</dd>
	    <dt>Observation:</dt><dd>{character.observation}</dd>
	    <dt>Empathy:</dt><dd>{character.empathy}</dd>
	    <dt>Willpower:</dt><dd>{character.willpower}</dd>
	    <dt>Running:</dt><dd>{character.running}</dd>
	    <dt>Icons:</dt><dd><div className="thumbnails">{icon_pictures(character.icons)}</div></dd>
	    </dl>
	    </div>
        </div>
    );
}
