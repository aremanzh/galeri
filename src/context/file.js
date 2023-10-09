import { useState, useEffect, createContext } from "react";
import axios from "axios";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [photo, setPhoto] = useState({
    photos: []
  });

  const [video, setVideo] = useState({
    id: null,
    url: "",
  });

  const [program, setProgram] = useState({
   albums: []
  });

  return (
    <FileContext.Provider value={[photo, setPhoto, program, setProgram]}>
      {children}
    </FileContext.Provider>
  )
}

export { FileContext, FileProvider };