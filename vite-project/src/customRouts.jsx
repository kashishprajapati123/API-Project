import {Routes, Route } from "react-router-dom";
import IMG from "./IMG";
import ImagesDtails from "./ImagesDtails";
function CustomRouts() {
    return(
        <Routes>
        <Route exact path="/" element={<IMG />} />
        <Route exact path="/IMG/:id" element={< ImagesDtails/>} />
      </Routes> 
    )
     
}
export default CustomRouts;