import React,{createContext, useContext,useState} from "react";


export const UserContext = createContext()

function CurrentUser({children}){

    const [isCurrentUser,setCurrentUser] = useState(false)

    return <UserContext.Provider value={[isCurrentUser,setCurrentUser]}>
    {children}
    </UserContext.Provider>
}
export default CurrentUser;

