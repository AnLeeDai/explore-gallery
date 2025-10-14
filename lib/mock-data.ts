import { User } from '@/types/gallery'

export const users: User[] = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    category: "photography",
    tags: ["portrait", "professional", "studio"],
    author: "George Bluth",
    likes: 43,
    description: "Professional photographer specializing in portrait and studio photography. With over 10 years of experience, George creates stunning visual narratives that capture the essence of his subjects."
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
    category: "nature",
    tags: ["landscape", "nature", "outdoor"],
    author: "Janet Weaver",
    likes: 38,
    description: "Nature enthusiast and landscape photographer. Janet travels the world to capture breathtaking natural scenes and wildlife in their pristine environments."
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
    category: "art",
    tags: ["abstract", "creative", "modern"],
    author: "Emma Wong",
    likes: 56,
    description: "Contemporary artist focusing on abstract and modern art forms. Emma's work explores the intersection between traditional techniques and digital innovation."
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
    category: "photography",
    tags: ["street", "urban", "documentary"],
    author: "Eve Holt",
    likes: 29,
    description: "Street photographer capturing the essence of urban life. Eve's work documents the human condition in metropolitan environments around the globe."
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
    category: "design",
    tags: ["graphic", "branding", "minimalist"],
    author: "Charles Morris",
    likes: 67,
    description: "Graphic designer specializing in minimalist branding and corporate identity. Charles creates clean, impactful designs that communicate brand values effectively."
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
    category: "art",
    tags: ["sculpture", "mixed-media", "contemporary"],
    author: "Tracey Ramos",
    likes: 44,
    description: "Mixed-media artist working with sculpture and installation pieces. Tracey's work challenges conventional boundaries between different artistic mediums."
  },
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
    category: "photography",
    tags: ["wedding", "events", "portrait"],
    author: "Michael Lawson",
    likes: 35,
    description: "Wedding and event photographer with a passion for capturing life's most precious moments. Michael's warm approach puts clients at ease, resulting in natural, beautiful photographs."
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg",
    category: "design",
    tags: ["ui", "ux", "digital"],
    author: "Lindsay Ferguson",
    likes: 58,
    description: "UI/UX designer focused on creating intuitive digital experiences. Lindsay's user-centered approach ensures that every design serves both aesthetic and functional purposes."
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
    avatar: "https://reqres.in/img/faces/9-image.jpg",
    category: "nature",
    tags: ["wildlife", "conservation", "macro"],
    author: "Tobias Funke",
    likes: 73,
    description: "Wildlife photographer and conservationist. Tobias uses his camera to raise awareness about endangered species and environmental conservation through stunning imagery."
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
    avatar: "https://reqres.in/img/faces/10-image.jpg",
    category: "art",
    tags: ["painting", "oil", "classical"],
    author: "Byron Fields",
    likes: 41,
    description: "Classical painter working primarily in oil on canvas. Byron's technique draws inspiration from the old masters while incorporating contemporary themes and subjects."
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
    avatar: "https://reqres.in/img/faces/11-image.jpg",
    category: "design",
    tags: ["architecture", "interior", "sustainable"],
    author: "George Edwards",
    likes: 52,
    description: "Architect and interior designer specializing in sustainable design solutions. George creates spaces that are both beautiful and environmentally responsible."
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
    avatar: "https://reqres.in/img/faces/12-image.jpg",
    category: "photography",
    tags: ["fashion", "editorial", "commercial"],
    author: "Rachel Howell",
    likes: 66,
    description: "Fashion and editorial photographer working with top brands and magazines. Rachel's bold vision and technical expertise create striking images that capture the essence of contemporary fashion."
  }
]

export function getUsers() {
  return users
}

export function getUserById(id: number) {
  return users.find(user => user.id === id)
}

export function getCategories() {
  return [...new Set(users.map(user => user.category).filter(Boolean))] as string[]
}