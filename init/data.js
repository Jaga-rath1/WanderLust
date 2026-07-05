
const sampleListings = [
  {
  name: "Royal Heritage Haveli",
  description:
    "Experience the royal charm of Rajasthan in this beautifully restored haveli with traditional interiors and modern comforts.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60",
  },
  price: 3200,
  location: "Jaipur",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [75.7873, 26.9124],
  },
},
{
  name: "Houseboat on Dal Lake",
  description:
    "Wake up to breathtaking views of Dal Lake and enjoy the peaceful beauty of Kashmir in this luxurious houseboat.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=60",
  },
  price: 2800,
  location: "Srinagar",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [74.7973, 34.0837],
  },
},
{
  name: "Goa Beachside Villa",
  description:
    "Relax in this beautiful villa just minutes from the beach. Perfect for families and groups looking for a tropical escape.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
  },
  price: 4500,
  location: "Goa",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [73.8278, 15.4909],
  },
},
{
  name: "Tea Garden Cottage",
  description:
    "Stay amidst lush green tea plantations with stunning mountain views and refreshing weather all year round.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
  },
  price: 2200,
  location: "Munnar",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [77.0595, 10.0889],
  },
},
{
  name: "Himalayan Wooden Cabin",
  description:
    "Escape into nature with this cozy wooden cabin surrounded by pine forests and snow-capped mountains.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=60",
  },
  price: 2600,
  location: "Manali",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [77.1892, 32.2432],
  },
},
{
  name: "Backwater Riverside Resort",
  description:
    "Enjoy a peaceful stay by Kerala's famous backwaters with traditional hospitality and authentic local cuisine.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
  },
  price: 3400,
  location: "Alleppey",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [76.3388, 9.4981],
  },
},
{
  name: "Luxury Stay Near Taj Mahal",
  description:
    "A premium hotel offering elegant rooms and breathtaking views of the iconic Taj Mahal.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=60",
  },
  price: 3800,
  location: "Agra",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [78.0081, 27.1767],
  },
},
{
  name: "Lake View Palace Stay",
  description:
    "Enjoy a luxurious stay overlooking the beautiful lakes of Udaipur with stunning sunset views.",
  img: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
  },
  price: 4200,
  location: "Udaipur",
  country: "India",
  geometry: {
    type: "Point",
    coordinates: [73.7125, 24.5854],
  },
},
];

module.exports = { data: sampleListings };