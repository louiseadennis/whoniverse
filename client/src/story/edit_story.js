import React, { useState, useEffect } from "react";

export const EditStory = (props) => {
    const [story_name, setStoryName] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');
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
		setStoryName(resJson.name);
                setImageName(resJson.picture);
            }
        } catch (err) {
            console.log(err);
        }
        }

        fetchData()
            .catch(console.error);
    }, [id])


    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    console.log(story_name);
	    let res = await fetch("/stories/edit_story", {
		method: "POST",
		body: JSON.stringify({
		    story_id: id,
		    name: story_name,
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
	    <h2>Edit Story Form</h2>
            {message}
	    </div>
            <form className="add-story-form" onSubmit={handleSubmit}>
                <label htmlfof="story_name">Story Name</label>
            <input value={story_name} onChange={(e) => setStoryName(e.target.value)} name="story_name" id="story_name" required />
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name" required />
            <button>Edit Story</button>
        </form>
        </div>
    );
}
