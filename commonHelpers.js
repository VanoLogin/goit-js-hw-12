import{a as u,S as p,i as f}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const y="https://pixabay.com",b="42128830-dc9c3845b3d280824a8228556";u.defaults.baseURL=y;u.defaults.params={};u.defaults.params.key=b;function L({queryValue:e,page:t=1,perPage:i}){return u.get("/api/",{params:{q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i}})}function v(e){return e.map(({webformatURL:t,largeImageURL:i,tags:d,likes:o,views:r,comments:c,downloads:g})=>`<div class="photo-card">
     <a class="photo-card__link" href="${i}"> <img src="${t}" alt="${d}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${o}
        </p>
        <p class="info-item">
          <b>Views</b>${r}
        </p>
        <p class="info-item">
          <b>Comments</b>${c}
        </p>
        <p class="info-item">
          <b>Downloads</b>${g}
        </p>
      </div>
    </div>`).join("")}function w(e,t){t.insertAdjacentHTML("beforeend",v(e))}const n=document.querySelector(".load-more"),h="hidden";function P(){n.classList.remove(h)}function S(){n.disabled=!0,n.textContent="Loading..."}function q(){n.classList.add(h)}function C(){n.disabled=!1,n.textContent="Load more"}const l={show:P,hide:q,disable:S,enable:C},s={searchForm:document.querySelector("#search-form"),galleryContainer:document.querySelector(".gallery"),loadBtn:document.querySelector(".load-more"),cssLoading:document.querySelector(".loader-container")},a={page:1,queryValue:"",perPage:15},$=new p(".photo-card a");s.searchForm.addEventListener("submit",E);async function E(e){e.preventDefault(),s.cssLoading.classList.remove("hidden"),s.galleryContainer.innerHTML="",l.hide(),a.page=1,a.queryValue=e.currentTarget.elements.searchQuery.value.trim();try{const t=await m();t&&f.info({position:"topRight",title:"Info",message:`Hooray! We found ${t.totalHits} images.`})}catch(t){console.log(t)}finally{s.cssLoading.classList.add("hidden"),s.loadBtn.addEventListener("click",H),l.show(),s.searchForm.reset()}}function H(){l.disable(),a.page+=1,s.cssLoading.classList.remove("hidden"),m().then(l.enable),s.cssLoading.classList.add("hidden")}async function m(){try{const{data:e}=await L(a),t=Math.ceil(e.totalHits/a.perPage);if(console.log(t),console.log(e),e.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");if(w(e.hits,s.galleryContainer),$.refresh(),x(),e.totalHits<=a.perPage)throw f.info({position:"topRight",title:"Info",message:`Hooray! We found ${e.totalHits} images.`}),s.cssLoading.classList.add("hidden"),new Error("We're sorry, but you've reached the end of search results.");if(a.page>=t)throw new Error("We're sorry, but you've reached the end of search results.");return e}catch(e){return f.error({position:"topRight",title:"Error",message:`${e.message}`}),l.hide(),!1}}function x(){const e=document.querySelectorAll(".photo-card");if(e.length>0){const t=e[0].getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
