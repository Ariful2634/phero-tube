let sorted  = false;
let vidId = 1000;
let dataLength=0;

// blog button

const blog = () => {
    window.location.href = "question.html"

}

// category 

const category = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const resp = await res.json();
    const data = resp.data;

    const cat = document.getElementById('category');

    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="vidCat('${element.category_id}')" class="tabs-boxed ml-4 md:ml-6 px-5 hover:bg-red-600 hover:cursor-pointer">${element.category}</a> 
        `
        cat.appendChild(div)

    });


}

category()


// all category

const cats =async (id=1000)=>{
    const vide = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const catego = await vide.json();
    const alll = catego.data;
    dataLength=alll.length;
   hub(alll)
}
    
   

const hub=(alll)=>{
    const alllCategory = document.getElementById('all-cat');
    const drawing = document.getElementById('draw')
    alllCategory.textContent='';
    drawing.textContent='';
    if(sorted){
        alll.sort((a,b)=>{
            const strA=parseInt(a.others.views);
            const strB=parseInt(b.others.views);
            return strB-strA;

        })
    }
   if(dataLength){
    alll.forEach(vido => {
        const time = vido.others.posted_date;
        const toMinute=Math.floor((time%3600)/60);
        const toHour=Math.floor(time/3600);
        const convert = `${toHour} hr ${toMinute} min ago`
        const img=vido.authors.map((im)=>im.profile_picture)
        const pics=vido.authors.map((aut)=>aut.profile_name)
        const div = document.createElement('div');
        const vari = vido.authors.map((tick)=>{
            if(tick.verified===true){
                return `<img src="images/varified.svg"/>`
            }
            else{
                return '';
            }
        })
        div.innerHTML = `
        <div class="card h-96 bg-base-100 ">
  <figure><div class="relative"><img class="h-48 w-[400px] md:w-[350px] lg:w-[400px] rounded-lg" src="${vido.thumbnail}" /></div></figure>
  ${time ? `<div class="absolute top-[145px] md:top-[145px] lg:top-[135px] left-[250px] md:left-48 lg:left-40 bg-[#171717] text-white px-1 md:px-1 lg:px-3 py-1 rounded-lg"><p>${convert}</p></div>`:""}
  <div class="card-body">
   <div class="flex flex-row items-center gap-4"><img class=" w-[40px] h-[40px] rounded-full" src="${img}"/>
   <h2 class="card-title">
     ${vido.title}
   </h2>
   </div>
     <div class="ml-12">
     <div class="flex gap-2">${pics}${vari}</div>
    <p >${vido.others.views} <span>views</span></p>
     </div>
  </div>
</div>
        `
        alllCategory.appendChild(div)
    })
   }
   else{
    const div = document.createElement('div');
    div.innerHTML=`
    
    <div class="flex flex-col justify-center items-center mt-10">
    <img src="images/Icon.png" alt="" />
    <b><h2 class="mt-6 text-4xl">Oops!! Sorry, There is no content here</h2></b>
    </div>
    `
    drawing.appendChild(div)
   }
}

cats()



const vidCat =  (id)=>{
    vidId=id;
    cats(vidId) 
}
vidCat()


// sorting

const sort =async (id)=>{
    console.log('click')
    sorted = true
    const vide = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const catego = await vide.json();
    const alll = catego.data;
    hub(alll)
    cats(vidId)
}
// sort()


