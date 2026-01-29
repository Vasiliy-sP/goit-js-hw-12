import{S as v,a as L,i as c}from"./assets/vendor-P1Bz7PaC.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p=document.querySelector(".gallery"),y=document.querySelector(".loader"),g=document.querySelector(".load-more-button"),b=new v(".gallery a");function S(t){const a=t.map(({largeImageURL:o,webformatURL:i,tags:e,likes:r,views:s,comments:h,downloads:w})=>`<li class="gallery-item">
            <a class="gallery-link" href="${o}">
            <img class="gallery-image" src="${i}" alt="${e}" loading="lazy"> 
            </a>
            <div class="gallery-bottom-wrapper">
                <div class="gallery-inner-wrapper">
                    <p class="gallery-wrapper-title">Likes</p>
                    <p class="gallery-wrapper-value">${r}</p>
                    </div>
                    <div class="gallery-inner-wrapper">
                        <p class="gallery-wrapper-title">Views</p>
                        <p class="gallery-wrapper-value">${s}</p>
                        </div>
                        <div class="gallery-inner-wrapper">
                            <p class="gallery-wrapper-title">Comments</p>
                            <p class="gallery-wrapper-value">${h}</p>
                            </div>
                            <div class="gallery-inner-wrapper">
                                <p class="gallery-wrapper-title">Downloads</p>
                                <p class="gallery-wrapper-value">${w}</p>
                                </div>
                                </div>
                                </li>`).join("");p.insertAdjacentHTML("beforeend",a),b.refresh()}function q(){p.innerHTML=""}function P(){y.classList.remove("hiden")}function B(){y.classList.add("hiden")}function $(){g.classList.remove("hiden")}function d(){g.classList.add("hiden")}const M="https://pixabay.com/api/",E="54348219-a06ea9de282acf79dc86455ae",f=15;async function H(t,a){const{data:o}=await L.get(M,{params:{key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:f}});return o}const O=document.querySelector("form"),A=document.querySelector("input"),I=document.querySelector(".load-more-button");let n,u="",x=0,l;O.addEventListener("submit",G);I.addEventListener("click",z);async function G(t){t.preventDefault(),n=1,u=A.value.trim(),u!==""&&(q(),d(),m())}function z(){n+=1,d(),m()}async function m(){P();try{if(l=await H(u,n),x=l.totalHits,l.hits.length===0){c.warning({message:"Sorry, there are no images matching your search query. Please try again!"});return}S(l.hits),n>1&&N(),f*n>=l.totalHits?(d(),c.warning({message:"We're sorry, but you've reached the end of search results."})):$()}catch(t){if(!t.response){c.warning({message:"Please, try again later"});return}c.warning({message:`${t.response.status}`})}finally{B()}}function N(){const t=document.querySelector(".gallery-item");if(!t)return;const a=t.getBoundingClientRect().height;window.scrollBy({top:2*a,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
