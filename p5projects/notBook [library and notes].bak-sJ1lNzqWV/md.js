const thingy = () => {
  const converter = new showdown.Converter();

  fetch('./notes.txt')
    .then(response => response.text())
    .then((data) => {
      let html = converter.makeHtml(data);
      let dest = document.getElementById('replaceme');
      dest.innerHTML = html;
    })
}

thingy();