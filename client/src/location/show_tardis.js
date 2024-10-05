import React, { useState, useEffect } from "react";
import { User } from "../user.js";
import { ShowCharacterIP } from "../character/show_character_in_play.js";

// const characters_in_tardis = (character_list) => character_list.map((d) => <div><ShowCharacterIP id={d[0]}/></div>);
const characters_in_tardis = (character_list) => character_list.map((d) => <div>{<ShowCharacterIP id = {d[0]}/>}</div>);

export const ShowTardis = (props) => {
    console.log("entered show tardis");
    const user = props.user;
    
    useEffect(() => {
	user.getTardisLocation();
    }, [])

    return (
         <div>
	    <div className="tardis">
	    <h2>Tardis</h2>
	    Tardis ID: {user.tardis_id}
	    <p>Characters In Tardis: {characters_in_tardis(user.characters_in_tardis)}</p>
	    </div>
        </div>
    );
}

//	    <p>Characters In Tardis: {characters_in_tardis(user.characters_in_tardis)}</p>
