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



// all

const videos = async () => {
    const video = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const cate = await video.json();
    const all = cate.data;
    // console.log(all);
   

    const allCategory = document.getElementById('all-cat');
    all.forEach(vid => {
        // const author=vid.authors
        pic=vid.authors.map(aut=>`<p>${aut}</p>`).join("")
        // console.log(pic)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-96 bg-base-100 shadow-xl">
  <figure><img class="h-48 w-auto rounded-lg" src="${vid.thumbnail}" /></figure>
  <div class="card-body">
   <img src="${vid.authors.profile_picture}"/>
    <h2 class="card-title">
      ${vid.title}
     
    </h2>
     ${pic.profile_name}
    <p>${vid.others.views} <span>views</span></p>
  </div>
</div>
        `
        allCategory.appendChild(div)
    })

}

videos()

// all category

const cats =async (id)=>{
    const vide = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const catego = await vide.json();
    const alll = catego.data;
    // console.log(all);
   

    const alllCategory = document.getElementById('all-cat');
    alllCategory.textContent='';
    alll.forEach(vido => {
        const img=vido.authors.map((im)=>im.profile_picture)
        const pics=vido.authors.map((aut)=>aut.profile_name)
        
        console.log(pics)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-96 bg-base-100 shadow-xl">
  <figure><img class="h-48 w-auto rounded-lg" src="${vido.thumbnail}" /></figure>
  <div class="card-body">
   <div class="flex flex-row items-center gap-4"><img class=" w-[50px] h-[50px] rounded-full" src="${img}"/>
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
cats()



const vidCat =  (id)=>{
    // console.log(id)
    cats(id)
    
       
    
    
}
vidCat()