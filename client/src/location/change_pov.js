import React, { useState } from "react";

export const ChangePov = (props) => {
    const [char_pov, setChar_pov ] = useState("");
    const [characters, setCharacters ] = useState([]);

    const user = props.user;
    const change_pov props.change_pov;

    const handlePOVChangeSubmit = async (e) => {
        e.preventDefault();
        // setMessage("Called Char Location Change");
	if (location_to_move !== "-1") {
            try {
                await fetch("/locations_in_play/change_pov", {
                    method: "POST",
                    body: JSON.stringify({
			location_id: char_pov
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
			user_id: user.id
                    }),
                headers: {
		'Content-type': 'application/json; charset=UTF-8',
                   },
	    });
	    let resJson = await res1.json();
	    if (res1.status === 200 ) {
		setCharacters(resJson);
	    }
	    } catch (err) {
		setMessage(err);
	    }
	}

	if (characters.length == 0) {
	    fetchData();
	}
    }, [setCharacters]);


    return (
	<div>
	    <form className="change-pov-form" onSubmit={handlePOVChangeSubmit}><button>Switch To</button><p><select onChange={(e) => setChar_pov(e.target.value)} value={char_pov}>{character_names_location(characters)}</select></p></form>
	    </div>
    );
}
