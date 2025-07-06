import React, { useState, useEffect } from "react";
import { ShowLocation } from "./show_location";
import { ShowTardis } from "./show_tardis";
import { ShowCharacterIP } from "../character/show_character_in_play.js";
import { MoveCharacter } from "../character/show_move_character.js";
import { ChangePov } from "../location/change_pov.js";
import { ShowStory } from "../story/show_story";

export const ShowLocationState = (props) => {
    const [loading, setLoading ] = useState(1);
    const [message, setMessage ] = useState("");
    const [charactersInPlay, setCharactersInPlay] = useState([]);
    const [tardis, setTardis ] = useState(0);
    const [story_starts_here, setStoryStartsHere ] = useState(0);

    const id = props.id;
    const user = props.user;
    const changePov = props.changePov;

    const characters_in_play = (character_list) => character_list.map((d) => <div>
		              {d[2] === id ? <div><ShowCharacterIP id = {d[0]}/>
			       <MoveCharacter accessible_from_this_location = {accessible_from_this_location}
			       character={d[0]}
			       user = {user}
			       set_characters = {set_characters}
			       side_effect = {move_side_effect} />
			       </div>: <div></div>}
								      </div>);

    const accessible_from_this_location = (character_id) => {
	const accessible_list = [];
	accessible_list.push(<option value="-1">No Move</option>);
	if (tardis === id) {
	    accessible_list.push(<option value="0">Enter Tardis</option>);
	}
	return accessible_list;
    }

    const move_side_effect = (location_id) => {
	if (location_id === "0") {
//	    setMessage("entered tardis");
	}
    }

    const set_characters = async () => {
	await user.getCharactersInPlay();
	setCharactersInPlay(user.characters_in_play);
    }

    useEffect(() => {
	if (id !== 0) {
	   const fetchData = async () => {
		try {
		    let res = await fetch("/locations/get_state", {
			method: "POST",
			body: JSON.stringify({
			    id: id,
			    user_id: user.user_id,
			}),
			headers: {
			    'Content-type': 'application/json; charset=UTF-8',
			},
		    });
		    let resJson = await res.json();
		    if (res.status === 200) {
			setLoading(0);
		    }
		    setMessage(resJson.message);
		} catch (err) {
		    //console.log(err);
		    setMessage(err.toString());
		}
	    }

	    const get_characters_in_play = async () => {
		await user.getCharactersInPlay();
		setCharactersInPlay(user.characters_in_play);
	    }

	    const get_tardis_location = async () => {
		const res = await user.getTardisLocation();
		setTardis(res);
	    }

	    const get_stories = async () => {
		let res = await fetch("/stories/get_starts", {
		    method: "POST",
		    body: JSON.stringify({
			location_id: id,
		    }),
		    headers: {
			    'Content-type': 'application/json; charset=UTF-8',
			},
		    });
		    let resJson = await res.json();
		    if (res.status === 200) {
			setStoryStartsHere(resJson.story_id);
		    }
		    
	    }
	    
	    fetchData();
	    get_characters_in_play();
	    get_tardis_location();
	    get_stories();
	}
    }, [id,user]);

    if (loading) {
	return (
		<div>
		<p>Loading Show Location State... </p>
		<p>{id}</p>
		<p>{user.user_id}</p>
		<p>{message}</p>
		</div>
	);
    } else {
	return (
		<div>
		<ShowLocation id={id} /> {story_starts_here !== 0 ? <ShowStory id={story_starts_here}/>: <p>No Story Starts Here</p>}
		<div className="character-panel"><div className="panel-row"><div className="thumbnails-center"><p>{characters_in_play(charactersInPlay)}</p></div>	<ChangePov user={user} change_pov={changePov} /></div></div>
		{ tardis === id ? <ShowTardis user={user} characters={user.characters_in_tardis} location_update={set_characters} move={changePov}/> : <p>The Tardis is not Here</p>}
	   </div>
	);
    }

}
