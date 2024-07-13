import React, { useState, useEffect } from "react";

export const CharacterThumbnails = (props) => {
    const [characters, setCharacters] = useState([]);

    const picture_string = (string) => {
		console.log(string);
	return "/assets/characters/" + string;
    }
    
    const items = characters.map((d) => 
	<div><button class="image-button" onClick={()=>props.revealForm(props.revealed === d.char_id ? 0 : d.char_id)}>
		<p><img src={picture_string(d.picture)} width="100"/></p>{d.char_id}: {d.name}</button></div>);

    useEffect(() => {
	const fetchData = async () => {
	try {
		console.log("trying fetch get_character_thumnails");
	    let res = await fetch("/characters/get_character_thumbnails", {
		method: "POST",
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status === 200) {
			console.log(resJson);
			setCharacters(resJson);
	    }
	} catch (err) {
	    console.log(err);
	}
	}

	fetchData()
	    .catch(console.error);
    }, [])

    

    return (
        <div className="thumbnails">
	  {items}
        </div>
    );
}
