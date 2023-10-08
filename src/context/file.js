import { useState, useEffect, createContext } from "react";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [photo, setPhoto] = useState({
    id: null,
    url: "",
  });

  const [video, setVideo] = useState({
    id: null,
    url: "",
  });

  const [program, setProgram] = useState({
    id: null,
    name: "",
  });

  return (
    <FileContext.Provider value={[photo, setPhoto, program, setProgram]}>
      {children}
    </FileContext.Provider>
  )
}

export { FileContext, FileProvider };