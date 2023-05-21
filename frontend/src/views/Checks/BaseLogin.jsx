import { Navigate } from "react-router-dom";

function BaseLogin({children}){
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    
    if(!loggedInUser){
        return children;
    } else {
        switch(loggedInUser.role){
            case "Admin":
                <Navigate to={'/admin'}/>
                break;
                
            case "Admin":
                <Navigate to={'/admin'}/>
                break;

            case "Admin":
                <Navigate to={'/admin'}/>
                break;
        }
    }
}

export default BaseLogin