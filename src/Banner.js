import React,{useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const [Movie, setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(request.data.results[
            Math.floor(Math.random() * request.data.results.length-1)
        ]
        );
        }
        fetchData();
    },[]);

    console.log(Movie);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." :str;
    }
    return (

        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center"
            }}
            >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {Movie?.title || Movie?.name || Movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__desc">{truncate(Movie?.overview, 150)}</h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
