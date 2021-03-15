import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentContextData {
  genres: GenreResponseProps[];
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentContext = createContext({} as ContentContextData);

export function ContentProvider({ children }: ContentProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <ContentContext.Provider
      value={{
        genres,
        selectedGenre,
        movies,
        selectedGenreId,
        handleClickButton
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}