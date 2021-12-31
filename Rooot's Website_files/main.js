function loadPage(page) {
  if(page == null || page == "") {
    page = window.location.pathname;
  }
  if(page == "/") {
    page = "/home";
    genSubtitle();
  }
  $("#content").load(page + "/page.html");
  if(page == "/home") {
    page = "/";
  }
  window.history.pushState("", page, page);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getJSON = async url => {
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch(error) {
    return error;
  }
}

let current_subtitle = null;

async function genSubtitle() {
  console.log("generating subtitle");
  getJSON("/subtitles.json").then(data => {
    var subtitles = data.subtitles;

    console.log("fetched subtitles, size: "+data.subtitles.length);

    var subtitle_index = Math.floor(Math.random()*subtitles.length);
    var subtitle = subtitles[subtitle_index];

    current_subtitle = subtitle;
    console.log("picked subtitle "+subtitle_index+": "+subtitle.text);
    /*
    var subtitle_element = document.getElementsByClassName("subtitle")[0];

    subtitle_element.innerHTML = subtitle.text;
    if(subtitle.color != null || subtitle.color != undefined) {
      subtitle_element.style.color = subtitle.color;
    }
    */
  }).catch(error => {
    console.error("failed to fetch subtitles: "+error);
  });
}

async function setSubtitle() {
  var subtitle = current_subtitle;
  var subtitle_element = document.getElementsByClassName("subtitle")[0];
  while(subtitle_element == null) {
    subtitle_element = document.getElementsByClassName("subtitle")[0];
    await sleep(1);
  }
  
  while(subtitle == null) {
    subtitle = current_subtitle;
    await sleep(1);
  }

  subtitle_element.innerHTML = subtitle.text;
  if(subtitle.color != null || subtitle.color != undefined) {
    subtitle_element.style.color = subtitle.color;
  }
}
