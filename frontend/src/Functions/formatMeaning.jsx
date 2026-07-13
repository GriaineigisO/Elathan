const formatMeaning = (entry) => {
    let meaningArr = [];

    entry.noun_meaning ? meaningArr.push(entry.noun_meaning.join(", ")) : "";
    entry.num_meaning ? meaningArr.push(entry.num_meaning.join(", ")) : "";
    entry.adj_meaning ? meaningArr.push(entry.adj_meaning.join(", ")) : "";
    entry.adv_meaning ? meaningArr.push(entry.adv_meaning.join(", ")) : "";
    entry.adp_meaning ? meaningArr.push(entry.adp_meaning.join(", ")) : "";
    entry.interj_meaning
      ? meaningArr.push(entry.interj_meaning.join(", "))
      : "";
    entry.conj_meaning ? meaningArr.push(entry.conj_meaning.join(", ")) : "";
    entry.part_meaning ? meaningArr.push(entry.part_meaning.join(", ")) : "";
    entry.pron_meaning ? meaningArr.push(entry.pron_meaning.join(", ")) : "";
    entry.affix_meaning ? meaningArr.push(entry.affix_meaning.join(", ")) : "";
    // entry.verb_meaning ? meaningArr.push(entry.verb_meaning.join(", ")) : "";

    if (entry.verb_meaning) {
      const fixedVerbMeanings = entry.verb_meaning.map((meaning) => {
   
        if (meaning[0] !== "(") {
          return `to ${meaning}`;
        } else {
          return `${meaning}`;
        }
        
      });


      meaningArr.push(fixedVerbMeanings.join(", "));
    }

    
    return meaningArr.join(", ");
  };

  export default formatMeaning;