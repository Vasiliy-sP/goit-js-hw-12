import{S as v,a as L,i as c}from"./assets/vendor-P1Bz7PaC.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const p=document.querySelector(".gallery"),f=document.querySelector(".loader"),y=document.querySelector(".load-more-button"),b=new v(".gallery a");function S(t){const e=t.map(({largeImageURL:a,webformatURL:i,tags:r,likes:o,views:l,comments:h,downloads:w})=>`<li class="gallery-item">
            <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${i}" alt="${r}" loading="lazy"> 
            </a>
            <div class="gallery-bottom-wrapper">
                <div class="gallery-inner-wrapper">
                    <p class="gallery-wrapper-title">Likes</p>
                    <p class="gallery-wrapper-value">${o}</p>
                    </div>
                    <div class="gallery-inner-wrapper">
                        <p class="gallery-wrapper-title">Views</p>
                        <p class="gallery-wrapper-value">${l}</p>
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
                                </li>`).join("");p.insertAdjacentHTML("beforeend",e),b.refresh()}function q(){p.innerHTML=""}function P(){f.classList.remove("hiden")}function B(){f.classList.add("hiden")}function E(){y.classList.remove("hiden")}function n(){y.classList.add("hiden")}const M="https://pixabay.com/api/",$="54348219-a06ea9de282acf79dc86455ae",m=15;async function A(t,e){const{data:a}=await L.get(M,{params:{key:$,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:m}});return a}const I=document.querySelector("form"),O=document.querySelector("input"),x=document.querySelector(".load-more-button");let s=1,u="",d=!1;I.addEventListener("submit",G);x.addEventListener("click",H);async function G(t){t.preventDefault();const e=O.value.trim();if(!e){c.info({message:"Введіть запит для пошуку зображень"});return}e!==u&&(u=e,s=1,d=!1,q(),n(),await g())}async function H(){s+=1,n(),await g()}async function g(){P();try{const t=await A(u,s),{hits:e,totalHits:a}=t;if(e.length===0){s===1&&c.warning({message:"За вашим запитом нічого не знайдено. Спробуйте інший запит."}),d=!0,n();return}S(e),s>1&&z(),m*s>=a?(d=!0,n(),c.info({message:"Ви дійшли до кінця результатів пошуку."})):E()}catch(t){console.error(t);let e="Щось пішло не так. Спробуйте ще раз пізніше.";if(t.response){const a=t.response.status;a===400?e="Некоректний запит":a===401||a===403?e="Помилка авторизації (перевірте API ключ)":a===429?e="Забагато запитів. Зачекайте трохи":a>=500&&(e="Проблема на стороні Pixabay")}else t.request&&(e="Немає відповіді від сервера. Перевірте інтернет-з’єднання.");c.error({message:e,timeout:4e3}),n()}finally{B()}}function z(){const t=document.querySelector(".gallery-item");if(!t)return;const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
