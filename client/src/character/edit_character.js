import React, { useState, useEffect } from "react";

export const EditCharacter = (props) => {
    const [character_name, setCharacterName] = useState('');
    const [image_name, setImageName] = useState('');
    const [gender, setGender] = useState('');
    const [combat, setCombat] = useState('');
    const [tech, setTech] = useState('');
    const [observation, setObservation] = useState('');
    const [empathy, setEmpathy] = useState('');
    const [willpower, setWillpower] = useState('');
    const [running, setRunning] = useState('');
    const [doctor, setDoctor] = useState('');
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
		setGender(resJson.gender);
		setCombat(resJson.combat);
		setTech(resJson.tech);
		setObservation(resJson.observation);
		setEmpathy(resJson.empathy);
		setWillpower(resJson.willpower);
		setRunning(resJson.running);
		setDoctor(resJson.doctor);
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
		    combat: combat,
		    gender: gender,
		    tech: tech,
		    observation: observation,
		    empathy: empathy,
		    willpower: willpower,
		    running: running,
		    doctor: doctor,
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
	    <ul>
	    <li>Gender: <input value={gender} onChange={(e) => setGender(e.target.value)} name="gender" id="gender" required /></li>
	    <li>Combat: <input value={combat} onChange={(e) => setCombat(e.target.value)} name="combat" id="combat" required /></li>
	    <li>Tech: <input value={tech} onChange={(e) => setTech(e.target.value)} name="tech" id="tech" required /></li>
	    <li>Observation: <input value={observation} onChange={(e) => setObservation(e.target.value)} name="observation" id="observation" required /></li>
	    <li>Empathy: <input value={empathy} onChange={(e) => setEmpathy(e.target.value)} name="empathy" id="empathy" required /></li>
	    <li>Willpower: <input value={willpower} onChange={(e) => setWillpower(e.target.value)} name="willpower" id="willpower" required /></li>
	    <li>Running: <input value={running} onChange={(e) => setRunning(e.target.value)} name="running" id="running" required /></li>
	    <li>Doctor: <input value={doctor} onChange={(e) => setDoctor(e.target.value)} name="doctor" id="doctor" required /></li>
	    </ul>
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name"/>
            <button>Edit Character</button>
        </form>
        </div>
    );
}
