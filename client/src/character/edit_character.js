import React, { useState, useEffect } from "react";
import { Character } from "./character_class";

export const EditCharacter = (props) => {
    const [character, setCharacter] = useState(new Character("none") );
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
		let character = new Character(resJson);
		setCharacter(character);
            }
        } catch (err) {
            console.log(err);
        }
        }

        fetchData()
            .catch(console.error);
    }, [props.id])

    const icon_names = (icon_list) => icon_list.map((d) => <option value={d[2]} selected={d[0]}>{d[1]}{d[0] ? " (default) " : ""}</option>);

    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    console.log(character);
	    let res = await fetch("/characters/edit_character", {
		method: "POST",
		body: JSON.stringify({
		    character_id: id,
		    name: character.name,
		    combat: character.combat,
		    gender: character.gender,
		    tech: character.tech,
		    observation: character.observation,
		    empathy: character.empathy,
		    willpower: character.willpower,
		    running: character.running,
		    doctor: character.doctor,
		    icons: character.icons,
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

    const update_character = (key, value) => {
	setCharacter({name: (key === "name" ? value :  character.name),
		      combat: (key === "combat" ? value : character.combat),
		      gender: (key === "gender" ? value: character.gender),
		      tech: (key === "tech" ? value: character.tech),
		      observation: (key === "observation" ? value: character.observation),
		      empathy: (key === "empathy" ? value: character.empathy),
		      willpower: (key === "willpower" ? value: character.willpower),
		      running: (key === "running" ? value: character.running),
		      doctor: (key === "doctor" ? value: character.doctor),
		      icons: character.icons})
    }

    const update_default_icon = (value) => {
	var icon_list = [];
	for (var i in character.icons) {
	    var icon = character.icons[i];
	    if (icon[2] === parseInt(value)) {
		icon_list.push([1, icon[1], icon[2]])
	    } else {
		icon_list.push([0, icon[1], icon[2]])
	    }
	}
	setCharacter({name: character.name,
		      combat: character.combat,
		      gender: character.gender,
		      tech: character.tech,
		      observation: character.observation,
		      empathy: character.empathy,
		      willpower:  character.willpower,
		      running: character.running,
		      doctor: character.doctor,
		      icons: icon_list})
    }

    return (
         <div>
	    <div>
	    <h2>Edit Location Form</h2>
            {message}
	    </div>
            <form className="add-character-form" onSubmit={handleSubmit}>
                <label htmlfof="character_name">Character Name</label>
            <input value={character.name} onChange={(e) => update_character("name", e.target.value)} name="character_name" id="character_name" required />
	    <ul>
	    <li style={{display:`inline-block`}}>Gender: <input value={character.gender} onChange={(e) => update_character("gender", e.target.value)} name="gender" id="gender" required /></li>
	    <li style={{display:`inline-block`}}>Combat: <input value={character.combat} onChange={(e) => update_character("combat", e.target.value)} name="combat" id="combat" required /></li>
	    <li style={{display:`inline-block`}}>Tech: <input value={character.tech} onChange={(e) => update_character("tech", e.target.value)} name="tech" id="tech" required /></li>
	    <li style={{display:`inline-block`}}>Observation: <input value={character.observation} onChange={(e) => update_character("observation", e.target.value)} name="observation" id="observation" required /></li>
	    <li style={{display:`inline-block`}}>Empathy: <input value={character.empathy} onChange={(e) => update_character("empathy", e.target.value)} name="empathy" id="empathy" required /></li>
	    <li style={{display:`inline-block`}}>Willpower: <input value={character.willpower} onChange={(e) => update_character("willpower", e.target.value)}  name="willpower" id="willpower" required /></li>
	    <li style={{display:`inline-block`}}>Running: <input value={character.running} onChange={(e) => update_character("running", e.target.value)} name="running" id="running" required /></li>
	    <li style={{display:`inline-block`}}>Doctor: <input value={character.doctor} onChange={(e) => update_character("doctor", e.target.value)} name="doctor" id="doctor" required /></li>
	    </ul> 
            <label htmlfof="default_image">Default Image</label><div><select onChange={(e) => update_default_icon(e.target.value)} id="icon" name="icon">{icon_names(character.icons)}</select></div>
            <p><button>Edit Character</button></p>
        </form>
            Add Icon: <input value="File Name"  name="icon" id="icon" />
        </div>
    );
}
