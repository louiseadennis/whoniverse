import React, { useState, useEffect } from "react";
import HTMLReactParser from 'html-react-parser'; 
import { Story } from "./story_class";

export const ShowStory = (props) => {
    console.log("entered show story");
    const [story, setStory] = useState(new Story("none") );
    const [message, setMessage] = useState("No Message");
    const id = props.id;

    useEffect(() => {
	const fetchData = async () => {
	    try {
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
		    story.debug = 1;
		    console.log(resJson.picture);
		    setStory(story);
		    console.log(story.picture_string);
		}  else {
		    console.log("wrong status");
		    setMessage(resJson.message);
		}
	    } catch (err) {
		console.log(err);
	    }
	}

	//console.log("fetching data in show story");

	fetchData()
	    .catch(console.error);
    }, [id])

    const StartStopStory = async (e) => {
	e.preventDefault();
	setMessage("Clicked Start Stop Story");
    }


    if (story.name) {
	return (
	    <div>
		<h2>{story.name}</h2>
		<form className="start-stop-story-form" onSubmit={StartStopStory}>
		<button><img src={story.picture_string} alt="Story (Sorry!)" /></button>
		</form>
		<p>{message}</p>
		</div> );

    } else {
	return(<div><p>Loading... {props.id}</p></div>);
    }

}
