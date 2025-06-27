import React, {useState} from "react";
import { CharacterThumbnails } from "./character/character-thumbnails";
import { DevelopItem } from "./develop";
import { CreateCharacterinPlay } from "./character/create_character_in_play";
import { LocationThumbnails } from "./location/location-thumbnails";
import { CreateLocationinPlay } from "./location/create_location_in_play";


export const Test = (props) => {
	const user = props.user;

    const [charactersActive, setCharactersActive] = useState(0);
	const [showShowCharacter, setShowShowCharacter] = useState(0);
	const [locationsActive, setLocationsActive] = useState(0);
	const [showShowLocation, setShowShowLocation] = useState(0);
	

    return (
	<div className="Page">
	  <h2>Test</h2>
	  <DevelopItem
	    title="Locations"
	    setActiveItem={setLocationsActive}
	    activeItem={locationsActive}
	    description="Test Creating new Locations in Play"
	    ><ul>
			<li><LocationThumbnails revealForm = {setShowShowLocation} revealed={showShowLocation}/>
			  {showShowLocation ? <CreateLocationinPlay id={showShowLocation} user_id={user.user_id}/> : <p></p>}
						
					
			</li>
		</ul>
	  </DevelopItem>


	  <DevelopItem
	    title="Characters"
	    setActiveItem={setCharactersActive}
	    activeItem={charactersActive}
	    description="Test Creating new Characters in Play"
	    ><ul>
			<li><CharacterThumbnails revealForm = {setShowShowCharacter} revealed={showShowCharacter}/>
			  {showShowCharacter ? <CreateCharacterinPlay id={showShowCharacter} user_id={user.user_id}/> : <p></p>}
						
					
			</li>
		</ul>
	  </DevelopItem>
	</div>
    )
}
