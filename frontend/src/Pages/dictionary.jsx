import DictionaryBuilder from "../Components/dictionaryBuilder";
import { useParams } from "react-router-dom";

const Dictionary = () => {
  const { id } = useParams();

  return <DictionaryBuilder id={id} dictionaryType={"dictionary"} />;
};

export default Dictionary;
