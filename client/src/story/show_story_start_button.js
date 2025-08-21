import React, { useState, useEffect } from "react";
import { Story } from "./story_class";

export const ShowStoryStartButton = (props) => {
    //console.log("entered show story");
    // This is this story which may or may not be related to the story in play
    const [story, setStory] = useState(new Story("none") );
    const [message, setMessage] = useState("No Message");

    // This is sthe ID of any story that starts here
    const id = props.id;
    
    // This is the ID for the current story in play
    const [story_id, setStoryID ] = useState(props.story_id);
    const [button_message, setButtonMessage] = useState("No Message");
    const user_id = props.user.user_id;
    const set_story_fn = props.set_story_fn;

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
		    console.log(resJson);
		    let story = new Story(resJson);
		    //story.debug = 1;
		    //console.log(resJson.picture);
		    setStory(story);
		    //console.log(story.picture_string);
		}  else {
		    //console.log("wrong status");
		    setMessage(resJson.message);
		}
	    } catch (err) {
		console.log(err);
	    }
	}

	//console.log("fetching data in show story");

	fetchData()
	    .catch(console.error);
	if (story_id === 0) {
	    setButtonMessage("Start Adventure");
	} else {
	    setButtonMessage("Stop Adventure");
	}
    }, [id, story, button_message, story_id])

    const StartStopStory = async (e) => {
	e.preventDefault();
//	setMessage("Clicked Start Stop Story");
	try {

	    if (story_id === 0) {
		let res = await fetch("/stories/create_story_state", {
		    method: "POST",
		    body: JSON.stringify({
			story_id: id,
			user_id: user_id,
		    }),
		    headers: {
			'Content-type': 'application/json; charset=UTF-8',
		    },		    
		});
		let resJson = await res.json();
		if (res.status === 200) {
		    setStory(new Story(resJson));
		    setMessage(resJson.story_id);
		    setStoryID(resJson.story_id);
		    set_story_fn(resJson.name);
		    setButtonMessage("Stop Adventure");
		} else {
		    setMessage("res status not 200");
		}
	    } else {
		if (id === story_id) {			 
		    let res = await fetch("/stories/delete_story_state", {
			method: "POST",
			body: JSON.stringify({
			    user_id: user_id
			}),
			headers: {
			    'Content-type': 'application/json; charset=UTF-8',
			},		    
		    });
		    await res.json();
		    if (res.status === 200) {
			setStory(new Story("none"));
			setStoryID(0);
			setMessage("story deleted");
			set_story_fn("No Current Adventure");
			setButtonMessage("Start Adventure");
		    } else {
			setMessage("res delete status not 200");
		    }
		} else {
		    setMessage("Can't stop this story");
		}
				
	    }
	} catch (err) {
	    setMessage(err);
	}
    }


    if (story.name) {
	return (
	    <div>
		<h2>{story.name}</h2>
		<form className="start-stop-story-form" onSubmit={StartStopStory}>
		<button><img src={story.picture_string} alt="{story.name} banner" /><p>{button_message}</p></button>
		</form>
		<br/>
		</div> );

    } else {
	return(<div><p>Loading... {props.id}</p></div>);
    }

}
