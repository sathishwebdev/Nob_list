fetch("https://masterdataapi.nobelprize.org/2.1/nobelPrizes?offset=0&limit=1000")
.then(data=> data.json())
.then(data =>{ 
    console.log(data.nobelPrizes)
    display(data.nobelPrizes)
})

const display = (data=null) =>{
    let root = document.getElementById("root")
    root.innerHTML = ''    
  data.map(({awardYear, categoryFullName, laureates  })=>{
        let div = document.createElement("div")
        div.setAttribute("class", "container")
        let p = document.createElement("div")
        p.setAttribute('style','width: 100%;')
        p.innerHTML = `<p class="year" >${awardYear}</p><p style="text-align: center;" >${categoryFullName.en}</p>`
        let motive = document.createElement('p')
        let button = document.createElement('button')
        button.innerText="SHARE"
        laureates.map(({motivation, knownName})=>{
         motive.innerHTML = `<p class="case">${motivation.en}<p style="text-align: right; font-size: small;"> ~ ${knownName.en} </p></p>`
       })

       button.setAttribute('class','btn')
    button.addEventListener('click', ()=>{share(`${awardYear}`, `${categoryFullName.en} - ${motive.value} `)})
       
        div.append(p, motive, button)
        root.append(div)
    })
    
}


function share(en, author) {
  console.log("share")
      if (navigator.canShare) {
        navigator
          .share({
            text: `${en} \n \n\n ~${author} \n `,
            url: "",
            title: `Pro Quote | ${author}`,
          })
          .then(() => console.log("Share was successful."))
          .catch((error) => alert("Sharing failed", error));
      } else {
        try { //if location is http its change to https
          if (navigator.share === undefined) {
            if (window.location.protocol === "http:") {
              window.location.replace(
                window.location.href.replace(/^http:/, "https:")
              );
            }
          }
        } catch (error) {
          alert("Sharing failed", error);
        }
      }
  }

