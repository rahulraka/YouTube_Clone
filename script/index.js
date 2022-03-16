// appending default most popular items

const popular = async () => {
  try {
    let result = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=AIzaSyDNPg6ZHatmypgpHcpvJ2I34dPvgpKZsHc&maxResults=50&regionCode=in`
    );
    let data = await result.json();
    console.log(data);
    appendPopular(data.items);
  } catch (err) {
    console.error(err);
  }
};

popular()


// appending popular vidoes to
const appendPopular = (data) => {
    let container = document.querySelector("#searchResults");
    container.innerHTML = null;
  
    data.forEach((el) => {
      let main = document.createElement("a");
      main.setAttribute("id", "anc");
      main.addEventListener("click", () => {
        refvid(el.id);
      });
  
      let title = document.createElement("p");
      title.setAttribute("id", "title");
      title.innerText = el.snippet.title;
  
      let thumbnail = document.createElement("img");
      thumbnail.setAttribute("class", "thumbnail");
      thumbnail.src = el.snippet.thumbnails.high.url;
      main.append(thumbnail, title);
      container.append(main);
    });
  };

const searchVideo = async () => {
  try {
    let input = document.querySelector("#search").value;
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=AIzaSyDNPg6ZHatmypgpHcpvJ2I34dPvgpKZsHc&maxResults=20&regionCode=in`
    );

    // 'https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyDNPg6ZHatmypgpHcpvJ2I34dPvgpKZsHc&maxResults=20&regionCode=in'

    let data = await res.json();
    console.log(data.items);
    appendVideo(data.items);
  } catch (err) {
    console.log(err);
  }
};

const appendVideo = (data) => {
  let container = document.querySelector("#searchResults");
  container.innerHTML = null;

  data.forEach((el) => {
    let main = document.createElement("a");
    main.setAttribute("id", "anc");
    main.addEventListener("click", () => {
      refvid(el.id.videoId);
    });

    let title = document.createElement("p");
    title.setAttribute("id", "title");
    title.innerText = el.snippet.title;

    let thumbnail = document.createElement("img");
    thumbnail.setAttribute("class", "thumbnail");
    thumbnail.src = el.snippet.thumbnails.high.url;
    main.append(thumbnail, title);
    container.append(main);
  });
};
let fullvid = document.querySelector("#vid");
function refvid(el) {
  console.log(el,"hii");
  localStorage.setItem("vidId", JSON.stringify(el));
  window.location.href = "/videopage.html";
}
