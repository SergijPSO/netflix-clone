import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type RowProps = {
  title: string;
  fetchURL: string;
  rowID: string;
};

const Row = ({ title, fetchURL, rowID }: RowProps) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 500;
    }
  };

  return (
    <>
      <h2 className='text-white font-biold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block group-hover:z-10'
          size={40}
        />
        <div
          ref={sliderRef}
          id={"slider" + rowID}
          className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block group-hover:z-10'
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
