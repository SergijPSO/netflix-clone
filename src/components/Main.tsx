import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";

type TruncateStringProps = {
  str: string;
  num: number;
};

type Movie = {
  title?: string;
  backdrop_path?: string;
  release_date?: string;
  overview: string;
};

const Main: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const truncateString = ({ str, num }: TruncateStringProps) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  if (movies.length === 0 || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-[600px] text-white mt-[-26px]'>
      <div className='w-full h-full'>
        <div className='w-full h-[600px] absolute bg-gradient-to-r from-black'></div>
        <img
          className='h-full w-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie.title}</h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
              Play
            </button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
              Watch later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released: {movie.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-2-[35%] text-gray-200'>
            {truncateString({ str: movie.overview, num: 150 })}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
