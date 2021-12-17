export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERS = 'SET_USERS';
export const SET_UPDATEUSERS = 'SET_UPDATEUSERS';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
    return { type: SET_USERS, value };
  }

  export function setUpdateUsers(value) {
    return { type: SET_UPDATEUSERS, value };
  }