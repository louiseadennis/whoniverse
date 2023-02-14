import React, {useState} from "react";
import { NavBar} from "./navbar";
import { Location } from "./location";
import { Profile } from "./profile";
import { Develop } from "./develop";

export const Home = () => {
    const [currentPage, setCurrentPage] = useState('current_page');
    
    const changePage = (pageName) => {
	setCurrentPage(pageName);
    }

    return (
	<div>
	  <NavBar onPageChange={changePage}/>
	  {
        {
          'location': <Location />,
           'profile': <Profile />,
          'develop': <Develop />
        }[currentPage] || < Location />
      }
	</div>
    )
}
