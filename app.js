const express = require('express');
const inertia = require('inertia-node');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
const port = 8080;
const ASSET_VERSION = 1;
const environment = process.env.ENV || 'development';
console.log(`Running in ${environment}`);

// In development, fetch the index built by vite on localhost:3000.
// In production, read it from dist.
const html = (pageString, viewData) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <!-- Custom data -->
    <title>${viewData.title}</title>

    <!-- Assets -->
 
    ${mainScriptTag()}
  </head>

  <!-- The Inertia page object -->
  <body id="app" data-page='${pageString}'></body>
</html>
`;

// function viteClientTag() {
//   if (environment === 'production') return '';
//   return `<script defer type="module" src="http://localhost:3000/@vite/client"></script>`;
// }

function mainScriptTag() {
  if (environment === 'production') {
    // Read the manifest file and get it's import path
    const raw = fs.readFileSync('dist/manifest.json', 'utf8')
    const manifest = JSON.parse(raw);
    return `<script defer type="module" src="${manifest['src/main.js']['file']}"></script>`
  } else {
    return `<script defer type="module" src="http://localhost:8080/src/main.js"></script>`;
  }
}


// Yes I want to see request bodies }:|
app.use(bodyParser.json());

// Setup inertia middleware
app.use(inertia(html, ASSET_VERSION));

// Serve static assets
if (environment === 'production') {
  app.use(express.static('dist'));
} else {
  app.use(express.static('dist'));
}

// Setup catalog and cart
global.bikes = [
  {
    id: 1,
    brand: 'Specialized',
    name: 'Allez',
    ebike: false,
    image: 'allez.png',
    price_display: '$1,000',
    price_int: 1000
  },
  {
    id: 2,
    brand: 'Trek',
    name: 'Checkpoint ALR4',
    ebike: false,
    image: 'checkpoint.webp',
    price_display: '$1,699',
    price_int: 1699
  },
  {
    id: 3,
    brand: 'Van Moof',
    name: 'S3',
    ebike: true,
    image: 's3.webp',
    price_display: '$2,298',
    price_int: 2490
  },
  {
    id: 4,
    brand: 'Cowboy',
    name: '4',
    ebike: true,
    image: '4.png',
    price_display: '$2,490',
    price_int: 2490
  },
]

global.cart = [

]

app.use(({ Inertia }, _, next) => {
  Inertia.shareProps({ username: "Mark Cavendish" })
  next();
});

// GET /home
app.get('/', (req, res) => {
  req.Inertia.setViewData({ title: "Home Page" }).render({
    component: "root/home",
    props: {},
  });
});

// GET /bikes
app.get('/bikes', (req, res) => {
  req.Inertia.setViewData({ title: "Bikes Page" }).render({
    component: "root/bikes",
    props: {
      bikes: bikes,
      cart: cart,
    },
  });
});

// POST /bikes (add to cart)
app.post('/bikes', (req, res) => {
  let bike = bikes.find(b => b.id == req.body.id);
  
  if (bike) { 
    bike = Object.assign(bike, {});
    bike.cart_id = crypto.randomBytes(10).toString('hex'); 
    cart.push(bike);
  }

  req.Inertia.setViewData({ title: "Bikes Page" }).render({
    component: "root/bikes",
    props: {
      bikes: bikes,
      cart: cart,
      confirm_message: bike ? 'Added to cart' : "That didn't work."
    },
  });
});

// GET /cart
app.get('/cart', (req, res) => {
  console.log(cart);
  req.Inertia.setViewData({ title: "Cart" }).render({
    component: "root/cart",
    props: {
      cart: cart,
    },
  });
});

// DELETE /cart (remove from cart)
app.delete('/cart', (req, res) => {
  cart = cart.filter(i => i.cart_id != req.body.cart_id);
  req.Inertia.redirect('/cart');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
