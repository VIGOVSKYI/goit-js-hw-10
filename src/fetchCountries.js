
export function fetchCountries(inputValue) {

const URL = `https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`
   
        return fetch(URL).
            then(response => {

                if (!response.ok) {
                    throw new Error(response.status);
                }

                return response.json();
            })
        };
        
