const usrs = [
  { id: '1', name: 'A', email: 'A@gmail.com', age: 23 },
  { id: '2', name: 'B', email: 'B@gmail.com', age: 30 },
  { id: '3', name: 'C', email: 'C@gmail.com' },
];
const postz = [
  { id: '1', title: 'AA', body: 'ABody', published: true, author: '1' },
  { id: '2', title: 'BB', body: 'BBbody', published: true, author: '2' },
  { id: '3', title: 'CC', body: 'CCbody', published: false, author: '2' },
];
const cmntz = [
  { id: '101', text: 'Good', author: '1', post: '1' },
  { id: '102', text: 'Great', author: '1', post: '2' },
  { id: '103', text: 'Pathetic', author: '2', post: '2' },
  { id: '104', text: 'Horrible', author: '3', post: '3' },
];

const db = { usrs, postz, cmntz };
export default db;
