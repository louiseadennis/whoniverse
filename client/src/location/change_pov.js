import React, { useState, useEffect } from "react";

export const ChangePov = (props) => {
    const [ char_pov, setChar_pov ] = useState("");
    const [ characters, setCharacters ] = useState([]);
    const [ message, setMessage ] = useState("");

    const user = props.user;
    const change_pov = props.change_pov;

    //    const character_names_locations = (character_list) => character_list.map((d) => <option value={d.location_id}>{d.name}</option>);
    const character_names_locations = (character_list) => character_names_locations_build(character_list).map((d) => <option value={d.location_id}>{d.name}</option>);

    const character_names_locations_build = (character_list) => {
	const loc_map = new Map();
	const options = []
	for (var i = 0; i < character_list.length; i++) {
	    var d = character_list[i];
	    if (loc_map.has(d.location_id)) {
		loc_map.get(d.location_id).push(d.name);
	    } else {
		loc_map.set(d.location_id, [d.name]);
	    }
//	    options.push({"name":d.name, "location_id":d.location_id});
	}

	const locations = loc_map.keys();
	
	locations.forEach((location) => (
//	    options.push(option_build(loc_map.get(location), location))
	    options.push({"name":loc_map.get(location).toString(), "location_id":location})
	))
	return options;
    }

    const handlePOVChangeSubmit = async (e) => {
        e.preventDefault();
        setMessage("Called Char POV Change " + char_pov);
	if (char_pov !== "0") {
            try {
                await fetch("/locations_in_play/change_pov", {
                    method: "POST",
                    body: JSON.stringify({
			location_id: char_pov,
			user_id: user.user_id
                    }),
                    headers: {
			'Content-type': 'application/json; charset=UTF-8',
                    },
		});
		change_pov(char_pov);
	    
            } catch (err) {
		console.log(err);
            }
	} 
    }

    useEffect(() => {
        const fetchData = async () => {
	    try {
	    let res1 = await fetch("/characters_in_play/get_names_locations", {
		method: "POST",
                    body: JSON.stringify({
			user_id: user.user_id
                    }),
                headers: {
		'Content-type': 'application/json; charset=UTF-8',
                   },
	    });
	    let resJson = await res1.json();
		if (res1.status === 200 ) {
//		    setCharacters(JSON.parse(resJson));
		    let chars = [];
		    for (const pair of resJson) {
			chars.push({"name":pair.name, "location_id":JSON.stringify(pair.location_id)});
		    }
		    
//		    chars.push({"id":55});
		    setCharacters(chars);
		    //setMessage(JSON.stringify(chars)); 
		}
	    } catch (err) {
		setMessage("error");
	//	setMessage(err);
	    }
	}

//	setMessage(characters);
	if (characters.length === 0) {
	    fetchData();
	}
    }, []);


    return (
	    <div>
	    <form className="change-pov-form" onSubmit={handlePOVChangeSubmit}><button>Switch To</button><p><select onChange={(e) => setChar_pov(e.target.value)} value={char_pov}>{character_names_locations(characters)}</select></p></form>
	    </div>
    );
}
