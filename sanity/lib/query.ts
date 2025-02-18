import { defineQuery } from 'next-sanity';

export const STARTUPS_QUERY = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  (
    !defined($search) || 
    title match $search || 
    category match $search || 
    author->name match $search
  )
] | order(_createdAt desc) {
  _id,
  author->{_id, name, image, bio},
  views,
  title,
  description,
  category,
  _createdAt,
  image
}`);

export const STARTUPBYID =
    defineQuery(`*[_type == "startup" && _id == $id ]| order(_createdAt desc) {
    _id,
    author->{_id,name,image,bio,username},
    views,
    title,
    description,
    pitch,
    category,
    _createdAt,
    image}`);

export const STARTUPVIEWSPREVIEW =
    defineQuery(`*[_type == "startup" && _id == $id ]| order(_createdAt desc) {
_id,
views,
}`);

export const AUTHOR_BY_GITHUBID =
    defineQuery(`*[_type == "author" && id == $id][0] {
  _id,id,name,image,bio,username,email
}`);

export const AUTHOR_BY_ID = defineQuery(`*[_type == "author" && _id == $id][0] {
  _id,id,name,image,bio,username,email
}`);

export const STARTUPS_BY_AUTHROR_QUERY =
    defineQuery(`*[_type == "startup" && author._ref == $id]| order(_createdAt desc){
  _id,id,slug, _createdAt,views,
  title, author->{_id,name,image,bio,username},  description,name,image,bio,username,email
}`);
