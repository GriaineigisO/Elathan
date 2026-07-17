import DictionaryBuilder from "../Components/dictionaryBuilder";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Dictionary = () => {
  const { id } = useParams();


  return <DictionaryBuilder id={id} dictionaryType={"dictionary"} />;
};

export default Dictionary;
