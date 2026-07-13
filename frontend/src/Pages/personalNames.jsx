import DictionaryBuilder from "../Components/dictionaryBuilder";
import { useParams } from "react-router-dom";

const PersonalNames = () => {
  const { id } = useParams();

  return <DictionaryBuilder id={id} dictionaryType={"personal_name"} />;
};

export default PersonalNames;
