
let search =async ()=>{
    let query = document.getElementById("query").value
    let data = await getData(query)
    append(data);
}




let getData =async (query)=> {
    let apikey = "AIzaSyDyxOrWLFB3rFhsEWs6RDeOZPnMtxBNfYs"
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apikey}`
    let res = await fetch(url);
    let data = await res.json();
    return data.items
    

};

// most popular page
let showdata =async ()=>{
    let url2 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=in&key=AIzaSyDyxOrWLFB3rFhsEWs6RDeOZPnMtxBNfYs`
    let res2 = await fetch(url2)
    let data2 = await res2.json()
    append(data2.items)
}
showdata()


let append  = (data)=>{
    console.log(data)
    let container = document.getElementById("container");
    container.innerHTML = null
    data.forEach(element => {
        //snippet --> title
        //snippet --> thubnails --> medium --> url
        
        let img = document.createElement("img");
        img.style.width = "250px"
        img.src = element.snippet.thumbnails.medium.url;

        let h3 = document.createElement("h4");
        h3.style.fontFamily = "arial"

        h3.style.fontSize = "16px"
        h3.innerText = element.snippet.title;

        let div = document.createElement("div")
        div.setAttribute("class", "video")
        div.onclick = ()=>{
            saveVideo(element);
        };
        div.append(img,h3)
        container.append(div)

    });
};

let saveVideo = (data) =>{
    localStorage.setItem("video", JSON.stringify(data) )
    window.location.href = "video.html"
}

// filter based of channel Id
let filter = async ()=>{
    let q= document.querySelector("#query").value
    let data = await getData(q);
    console.log(data);
    data = data.filter((el)=>{
        return el.snippet.publishTime.includes("2022")
    })
    append(data);
}



