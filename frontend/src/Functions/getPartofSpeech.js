import meaningKeys from "../assets/meaningKeys";

function getPartofSpeech(word) {

    meaningKeys.forEach((key) => {
        if (word[key.meaning]) {
            return key.abbr;
        }
    })

};

export default getPartofSpeech;