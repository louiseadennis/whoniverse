import React, {useState} from "react";
import { NavBar} from "./navbar";
import { Location } from "./location";
import { Profile } from "./profile";
import { Develop } from "./develop";

export const Home = (props) => {
    const [currentPage, setCurrentPage] = useState('current_page');
    const [key, setKey] = useState('0');
    console.log("home page");
    
    const changePage = (pageName, key='0') => {
	console.log("calling change page");
	    setKey(key);
	    console.log(key);
	    setCurrentPage(pageName);
    }

    return (
	<div className="home">
	  <NavBar onPageChange={changePage} handleLogoutClick={props.handleLogoutClick}/>
	  {
        {
          'location': <Location user={props.user} pov={props.pov} />,
          'profile': <Profile user={props.user} />,
          'develop': <Develop changePage = {changePage}/>
        }[currentPage] || < Location  user={props.user} pov={props.pov} />
      }
	</div>
    )
}
