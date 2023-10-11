import { useState, useContext } from "react";
import {FileContext} from "../context/file";

export default function useSearch() {
  const [photo, setPhoto] = useContext(FileContext);
  const [program, setProgram] = useContext(FileContext);
  const [keyword, setKeyword] = useState("");
  // const [dateRange, setDateRange] = useState([null, null]); // Array for start and end date

  // const filteredTasks = task?.tasks?.filter((t) => t.task.toLowerCase().includes(keyword))
  const filteredData = photo?.photos?.filter((photo) => (
    (photo.info && photo.info.toLowerCase().includes(keyword)) ||
    (photo.program.name && photo.program.name.toLowerCase().includes(keyword))
  ));

  const filteredProgram = program?.albums?.filter((program) => (
    (program.name && program.name.toLowerCase().includes(keyword)) ||
    (program.desc && program.desc.toLowerCase().includes(keyword))
  ));

  return { keyword, setKeyword, filteredData, filteredProgram }
}