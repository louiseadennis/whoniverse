import React, { useState, useEffect } from "react";

export const StoryThumbnails = (props) => {
    const [stories, setStories] = useState([]);

    const picture_string = (string) => {
		return "/assets/stories/" + string;
    }
    
    const items = stories.map((d) => 
	<div><button class="image-button" onClick={()=>props.revealForm(props.revealed === d.id ? 0 : d.id)}><p><img src={picture_string(d.picture)} width="100"/></p> {d.id}: {d.name}</button></div>);

    useEffect(() => {
	const fetchData = async () => {
	try {
	    let res = await fetch("/stories/get_story_thumbnails", {
		method: "POST",
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status === 200) {
			console.log(resJson);
			setStories(resJson);
	    }
	} catch (err) {
	    console.log(err);
	}
	}

	fetchData()
	    .catch(console.error);
    }, [])

    

    return (
        <div className="thumbnails">
	  {items}
        </div>
    );
}
