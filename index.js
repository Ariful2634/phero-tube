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
    alllCategory.textContent='';
    if(sorted){
        alll.sort((a,b)=>{
            const strA=parseInt(a.others.views);
            const strB=parseInt(b.others.views);
            return strB-strA;

        })
    }
   if(dataLength){
    alll.forEach(vido => {
        const img=vido.authors.map((im)=>im.profile_picture)
        const pics=vido.authors.map((aut)=>aut.profile_name)
        // const badge=vido.authors.map((bad)=>bad?.verified icon:)
        // ${vido?'<img class="w-[]"src="images/svg.png">':''}
        
        
        console.log(pics)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-96 bg-base-100 ">
  <figure><img class="h-48 w-auto rounded-lg" src="${vido.thumbnail}" /></figure>
  <div class="card-body">
   <div class="flex flex-row items-center gap-4"><img class=" w-[40px] h-[40px] rounded-full" src="${img}"/>
   <h2 class="card-title">
     ${vido.title}
    
   </h2></div>
     <p class="ml-16">${pics}</p>
     
    <p class="ml-16">${vido.others.views} <span>views</span></p>
  </div>
</div>
        `
        alllCategory.appendChild(div)
    })
   }
   else{
    const div = document.createElement('div');
    div.innerHTML=`
    <h2>No data found</h2>
    `
    alllCategory.appendChild(div)
   }
}

cats()



const vidCat =  (id)=>{
    // console.log(id)
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
