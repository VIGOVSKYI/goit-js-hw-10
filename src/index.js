import './css/styles.css';

import { fetchCountries }  from './fetchCountries.js';

import Notiflix from 'notiflix';

import debounce from 'lodash.debounce';

const inputRef = document.querySelector("#search-box");

const listRef = document.querySelector(".country-list");

const vraperRef = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

inputRef.addEventListener("input", debounce(renderCountries, DEBOUNCE_DELAY));


function renderCountries() {
  
const inputValue = inputRef.value.trim();
 
if (inputValue !== "") {
       
   fetchCountries(inputValue).then(name => {
   
               if (name.length > 10) {
    
                 resetInputValue();
   
                    Notiflix.Notify.success(
             "Too many matches found. Please enter a more specific name.",
             {
               fontSize: '15px',
               timeout: 1500,
             }
           )
               }
   
              if (name.length >= 2 && name.length <= 10) {
                 
                resetInputValue();
                   
                   const markup = name.map((key) =>
                   
                   `<li class="item-flags"><img class="picture-flags" src=${key.flags.svg} width="60" height="40">${key.name.official}</li>`)
                   .join("");
                  
                   listRef.insertAdjacentHTML("beforeend", markup);
               }
                   
              if (name.length === 1) {
                 
                 resetInputValue();
   
                   const markup = name.map((key) =>
                       
                   `<li class="country-list__item__name"><img class="picture-flags" src=${key.flags.svg} width="60" height="40"> <span class="name-official">${key.name.official}</span></li>
                    <li class="country-list__item"><span class="list-item-type">Capital:      </span>${key.capital}</li>
                    <li class="country-list__item"><span class="list-item-type">languages:    </span>${Object.values(key.languages)}</li>
                    <li class="country-list__item"><span class="list-item-type">Population:   </span>${key.population}</li>`)
                    .join("");
   
                   vraperRef.insertAdjacentHTML("beforeend", markup);
               }
           })
           .catch(error => {
   
               Notiflix.Notify.failure(
             "Oops, there is no country with that name",
             {
               fontSize: '15px',
               timeout: 1500,
             }
               )
             
             resetInputValue();

           });
       }
};


function resetInputValue() {

  listRef.innerHTML = "";

  vraperRef.innerHTML = "";
};