import React, { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultMovieInfo: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FilledInfo = Partial<Record<keyof Movie, boolean>>;

type Props = {
  key: number;
  onAdd: (movie: Movie) => void;
};

const defaultFilledInfo: FilledInfo = {
  title: false,
  imgUrl: false,
  imdbUrl: false,
  imdbId: false,
};

export const NewMovie: React.FC<Props> = ({ key, onAdd }) => {
  // Increase the count after succe ssful form submission
  // to reset touched status of all the `Field`s

  const [movieInfo, setMovieInfo] = useState<Movie>(defaultMovieInfo);
  const [filledInfo, setFilledInfo] = useState<FilledInfo>(defaultFilledInfo);

  const isFilled: boolean = Object.values(filledInfo).every(
    item => item === true,
  );

  function handleChange(event: React.ChangeEvent<HTMLFormElement>): void {
    const field = event.target;
    const { name, value, required } = field;

    if (required) {
      if (value.trim()) {
        setFilledInfo(currentFilledInfo => ({
          ...currentFilledInfo,
          [name]: true,
        }));
      }
    }

    setMovieInfo(currentMovieInfo => ({
      ...currentMovieInfo,
      [name]: value,
    }));
  }

  function handleBlur(event: React.FocusEvent<HTMLFormElement>): void {
    const field = event.target;
    const { name, value } = field;

    setMovieInfo(currentMovieInfo => ({
      ...currentMovieInfo,
      [name]: value.trim(),
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (isFilled) {
      onAdd(movieInfo);
    }
  }

  return (
    <form
      className="NewMovie"
      key={key}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onBlur={handleBlur}
      noValidate
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        // onChange={() => {}}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
