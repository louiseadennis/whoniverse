import React, { useState, useEffect } from "react";
import { ShowCharacterIP } from "../character/show_character_in_play.js";
import { MoveCharacter } from "../character/show_move_character.js";

export const ShowTardis = (props) => {
    const [charactersInTardis, setCharactersInTardis] = useState(props.characters);
    const [count, setCount ] = useState(0);

    const user = props.user;
    const location_update = props.location_update;

    const characters_in_tardis = (character_list) => character_list.map((d) => <div>
				{<div><ShowCharacterIP id = {d[0]}/>
				     <MoveCharacter accessible_from_this_location = {accessible_from_this_location}
						     character={d[0]}
						     user = {user}
						     set_characters = {set_characters}
				 side_effect = {move_side_effects} />
				 </div>}
						</div>);

    const set_characters = async () => {
	await user.getTardisLocation();
	setCharactersInTardis(user.characters_in_tardis);
	setCount(count + 1);
    }

    const move_side_effects = (location_id) => {
	location_update();
    }

    const accessible_from_this_location = (character_id) => {
	const accessible_list = [];
	accessible_list.push(<option value="-1">No Move</option>);
        accessible_list.push(<option value={user.tardis_location}>Leave Tardis {character_id}</option>);
        return accessible_list;
    }

    useEffect(() => {
	const fetchData = async () => {
	    await user.getTardisLocation();
	    setCharactersInTardis(user.characters_in_tardis);
	}

	fetchData();
    }, [user, count, charactersInTardis])

    return (
         <div>
	    <div className="tardis">
	    <h2>Tardis</h2>
	    Tardis ID: {user.tardis_id} {count}
	    <p>Characters In Tardis: <div className="thumbnails-center">{characters_in_tardis(charactersInTardis)}</div></p>
	    </div>
        </div>
    );
}


