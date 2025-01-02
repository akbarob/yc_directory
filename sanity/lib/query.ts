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
