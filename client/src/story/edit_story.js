import React, { useState, useEffect } from "react";
import { AddStoryState } from "./add_state";

export const EditStory = (props) => {
    const [story_name, setStoryName] = useState('');
    const [image_name, setImageName] = useState('');
    const [message, setMessage] = useState('');
    const [showAddState, setShowAddState] = useState(0);
    const [state_list, setStateList] = useState([]);

    const id = props.id;

    const EditStoryState = ({name, type_marker}) => {
	const [state_name, setStateName] = useState(name);
	const [state_type, setStateType] = useState(type_marker);

	return (
		<form>
		<input value={state_name} onChange={(e) => setStateName(e.target.value)} name="state_name" id="state_name" required />
		<select defaultValue={state_type} onChange={(e) => setStateType(e.target.value)}><option value="0">Default</option><option value="1">Starting State</option><option value="2">End State</option></select>
		<button>Edit</button>
		<button>Delete</button></form>);
    }

    const items = state_list.map((d) => <div><li>Item:<EditStoryState name={d.name} type_marker={d.type_marker} /></li></div>);
			   
    
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
	getStoryStates()
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
	    if (res.status === 200) {
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
            <p><button>Edit Story</button></p>
            </form>
	    <h2>States</h2>
	    <ul>
	    {items}
	</ul>
	    <li><button onClick={() => {showAddState ? setShowAddState(0): setShowAddState(1)}}>+Add Story State</button></li>
	    {showAddState? <AddStoryState story_id={id} /> : <p></p>}
        </div>
    );
}
