import DictionaryBuilder from "../Components/dictionaryBuilder";
import { useParams } from "react-router-dom";

const PlaceNames = () => {
  const { id } = useParams();

  return <DictionaryBuilder id={id} dictionaryType={"place_name"} />;
};

export default PlaceNames;
