// @flow

export type User = {
  name: string,
  img: string,
  location: string,
  bio: string,
  following: number,
  followers: number,
  photos: number,
  days: number,
  trips: Array<string>,
};

export type Place = {
  name: string,
  stars: number,
  rating: number,
  img: string,
  description: string,
};
