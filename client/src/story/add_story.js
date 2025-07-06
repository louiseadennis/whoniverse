import React, {useState} from "react";

export const AddStory = () => {
    const [story_name, setStoryName] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');    

    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    console.log(story_name);
	    let res = await fetch("/stories/add_story", {
		method: "POST",
		body: JSON.stringify({
		    name: story_name,
		    picture: image_name,
		}),
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status === 200) {
		setStoryName("");
		setImageName("");
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
	    <h2>Add Story Form</h2>
            {message}
	    </div>
            <form className="add-story-form" onSubmit={handleSubmit}>
                <label htmlfof="story_name">Story Name</label>
            <input value={story_name} onChange={(e) => setStoryName(e.target.value)} name="story_name" id="story_name" required />
            <label htmlfof="image_name">Image File Name</label>
            <input value={image_name} onChange={(e) => setImageName(e.target.value)} name="image_name" id="image_name" required />
            <button>Add Story</button>
        </form>
        </div>
    );
}
