import React, {useState} from "react";

export const AddStoryState = (props) => {
    const [state_name, setStateName] = useState('');
    // type 0 = nothing special
    // 1 = starting state
    // 2 = ending state
    const [type, setType] = useState(0);
    const [message, setMessage] = useState('');
    const story_id = props.story_id;

    const handleSubmit = async (e) => {
	e.preventDefault();
	try {
	    let res = await fetch("/stories/add_story_state", {
		method: "POST",
		body: JSON.stringify({
		    name: state_name,
		    story_id: story_id,
		    type_marker: type,
		}),
		headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		},
	    });
	    let resJson = await res.json();
	    if (res.status === 200) {
		setStateName("");
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
	    <h2>Add Story State Form</h2>
            {message}
	    </div>
            <form className="add-story-state-form" onSubmit={handleSubmit}>
                <label htmlfof="story_state_name">Story State Name</label>
            <input value={state_name} onChange={(e) => setStateName(e.target.value)} name="state_name" id="state_name" required />
	    <select onChange={(e) => setType(e.target.value)}><option value="0">Default</option><option value="1">Starting State</option><option value="2">End State</option></select>
            <button>Add Story State</button>
        </form>
        </div>
    );
}
