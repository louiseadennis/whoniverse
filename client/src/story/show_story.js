import React, { useState, useEffect } from "react";
import { Story } from "./story_class";

export const ShowStory = (props) => {
    //console.log("entered show story");
    // This is this story which may or may not be related to the story in play
    const [story, setStory] = useState(new Story("none") );
    const [message, setMessage] = useState("No Message");
    const [state_list, setStateList] = useState([]);

    // This is the ID the story
    const id = props.id;

    const items = state_list.map((d) => 
			   <div>{d.name} {d.type_marker === 1 ? "(Initial State)" : (d.type_marker === 2 ? "(End State)" : "" )}</div>);

    
    useEffect(() => {
	const fetchData = async () => {
	    try {
		// fetching stories that start at this location
		// WARNING: Currently only one is possible
		let res = await fetch("/stories", {
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
		    //console.log(resJson);
		    let story = new Story(resJson);
		    setStory(story);
		}  else {
		    setMessage(resJson.message);
		}
	    } catch (err) {
		console.log(err);
	    }
	}

	const getStoryStates = async () => {
	    try {
		let res = await fetch("/stories/get_states", {
		    method: "POST",
		    body: JSON.stringify({
			story_id: id,
		    }),
		    headers: {
			'Content-type': 'application/json; charset=UTF-8',
		    },
		});
		let resJson = await res.json();
		if (res.status === 200) {
		    setStateList(resJson);
		} else {
		    setMessage(resJson.message);
		}
	    } catch (err) {
		    setMessage(err.toString());
	    }
	}


	fetchData()
	    .catch(console.error);
	getStoryStates();
    }, [id])

    if (story.name) {
	return (
	    <div>
		<h2>{story.name}</h2>
		<img src={story.picture_string} alt="{story.name} banner" />
		<div><h2>States</h2>{items}</div>
		<p>{message}</p>
	    </div> );

    } else {
	return(<div><p>Loading... {props.id}</p></div>);
    }

}
