import { useState , useEffect} from "react";

export default function SearchBar ({position}) {
    
    
    const [query, setQuery] = useState("");
    const [allitems, setItems] = useState([]);
    useEffect(()=> {
        setTimeout(()=>{
            fetch(`http://127.0.0.1:8000/airports/${query}`).
            then(response => response.json())
            .then(json => {
            const results = JSON.parse(json);
            console.log(results)
            setItems(results);
        }).catch(error => console.error(error));},2000)
        
        

    },[query]);


    function handleShowMap(item) {
        console.log(item)
        position([item['latitude'],item['longitude']])
        setItems([])
    }

    return (
        <div   className="searchBox">
            
            <input type="text" className = "input" placeholder="Search.." name="search" onChange={(e)=> {setQuery(e.target.value)}} />
            <ul className ="searchResults">
                {allitems.map((item)=> 
                    <li key={item.icao} onClick={(e) => handleShowMap(item)}>
                        <div className="listItemLabel">
                            <span>
                                <div class="top">
                                    <span class="city">{item.region_name}</span>
                                    <span class="code">{item.iata}</span>
                                </div>
                                <div id="name">
                                    {item.airport}
                                </div>
                            </span>
                        </div>
                    </li>
                    
                )}
            </ul>
        </div>  
            
    )

}
