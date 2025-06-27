import React, { useState, useEffect } from "react";
import { ShowCharacterIP } from "./character/show_character_in_play.js";

export const Profile = (props) => {
    const user = props.user;
    const username = user.username;
    const pov = user.POV;
    const location_name = user.location_name;
    // user.getTardisLocation();
    const [tardis, setTardis ] = useState(user.tardis_location);
    const [charactersInPlay, setCharactersInPlay] = useState([]);
    const [message, setMessage] = useState("");
    const pending = "pending";
   
    //user.getCharactersInPlay();

    useEffect(() => {
      const get_tardis_location = async () => {
        if (user.tardis_location) {
          setTardis(user.tardis_location);
        } else {
          const res = await user.getTardisLocation();
          setTardis(res);
        }
      } 

      const get_characters_in_play = async () => {
        //user.rationalise_characters_in_play();
        if (user.characters_in_play !== undefined && user.characters_in_play.length !== 0) {
          //user.rationalise_characters_in_play();
          setCharactersInPlay(user.characters_in_play);
          //try {
          //  const res = user.rationalise_characters_in_play();
           // setMessage(res);
          //} catch (err) {
          //  setMessage(err.message);
          //}
          // setMessage(user.rationalise_characters_in_play());
        } else {
          const res =  await user.getCharactersInPlay();
          setMessage(res);
          setCharactersInPlay(user.characters_in_play);
        }
      }

      get_tardis_location();
      get_characters_in_play();
    }, []);

  

    const characters_in_play = (character_list) => character_list.map((d) => <div>{<ShowCharacterIP id = {d[0]}/>} <p>{d[3]}</p></div>);
    // const characters_in_play = (character_list) => character_list.map((d) => <div>{d[0].char_id}</div>);

    
    return (
		<div className="Page">
	  		<h1>Profile</h1>
			<p>Username: {username}</p>
			<p>User ID: {user.user_id}</p>
			<p>POV Location: {pov} -- {user.location_name}</p> 
      <p>Tardis Location: {tardis ? tardis : pending} -- {user.tardis_location_name}</p>
      <p>Characters in Play: <div className="thumbnails-center">{characters_in_play(charactersInPlay)}</div> </p>
      <p>{user.characters_in_play.length} {message}</p>
		  </div>
    )

//		<p>Tardis Location: {tardis ? tardis : get_tardis_location()} TN: {user.tardis_location_name}</p>
 //     <p>Characters in Play: <div className="thumbnails-center">{characters_in_play(get_characters_in_play())}</div> </p>
}
