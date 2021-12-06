const getJSON = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

const subtitles = ["Gangsta was here", "OMFG IT'S ROOOT!!!!!!1!1!!1"]

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
};

try {
  var subtitle_element = document.getElementsByClassName("subtitle")[0];

  if (randomNumber(0, subtitles.length) === 10) {
    subtitle_element.innerHTML = subtitles[0];
  } else {
    subtitle_element.innerHTML = subtitles[1]
  }
} catch (err) {
  console.error(err);
}
