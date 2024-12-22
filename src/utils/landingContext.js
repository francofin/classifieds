import React, {useReducer, createContext, useState} from 'react';

const initialState = {
    showLanding:true,
    time:Date.now()
};


const LandingContext = createContext();


//context provider
const LandingProvider = ({children}) => {

    const [showLanding, setShowLanding] = useState(true);

    // const value = {showLanding, setShowLanding};
    return <LandingContext.Provider value={[showLanding, setShowLanding]}>{children}</LandingContext.Provider>
}

//export

export {LandingContext, LandingProvider};