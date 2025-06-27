import React, { useState } from "react";

export const MoveCharacter = (props) => {
    const [char_to_move, setChar_to_move ] = useState("");
    const [location_to_move, setLocation_to_move ] = useState("");

    const accessible_from_this_location = props.accessible_from_this_location;
    const character = props.character;
//    const user = props.user;
    const set_characters = props.set_characters;
    const side_effects = props.side_effect;

    const move_character = (char_id, location_id) => {
        setChar_to_move(char_id);
        setLocation_to_move(location_id);
    }

    const handleCharLocationChangeSubmit = async (e) => {
        e.preventDefault();
        // setMessage("Called Char Location Change");
        try {
                await fetch("/characters_in_play/change_location", {
                method: "POST",
                body: JSON.stringify({
                    char_id: char_to_move,
                    location_id: location_to_move
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            // await res.json();
	    set_characters();
	    side_effects(location_to_move);
	    setLocation_to_move("-1");
	    
        } catch (err) {
            console.log(err);
        }
    }


    return (
	<div>
	    <form className="move-character-form" onSubmit={handleCharLocationChangeSubmit}><button>Move</button><p><select onChange={(e) => move_character(character, e.target.value)} value={location_to_move}>{accessible_from_this_location(character)}</select></p></form>
	    </div>
    );
}
