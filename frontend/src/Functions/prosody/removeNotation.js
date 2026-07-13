const removeNotation = (arr) => {
    let sounds = [];

    for (let i = 0; i < arr.length; i++) {
      sounds.push(arr[i]);
    }

    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].charAt(0) !== "(") {
        continue;
      } else {
        // Extract the content inside parentheses
        const match = sounds[i].match(/^\(([^=]+)=([^)]+)\)$/);

        if (match) {
          const beforeEquals = match[1]; // e.g. "yː"

          sounds[i] = beforeEquals;
        } else {
          console.warn(`Invalid spelling format: ${sounds[i]}`);
        }
      }
    }

    return sounds;
  };

  export default removeNotation;