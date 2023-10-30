import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});


const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code

app.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('/top-fossils'); // Redirect to /top-fossils if the user's name is in the session.
  } else {
    res.render('homepage.html.njk');
  }
});



app.post('/get-name', (req, res) => {
  const { name } = req.body;
  req.session.username = name; // Store the user's name in the session
  res.redirect('/top-fossils'); // Redirect to the top-fossils page
});


app.get('/top-fossils', (req, res) => {
  if (req.session.username) {
    res.render('top-fossils.html.njk', { fossils: MOST_LIKED_FOSSILS, username: req.session.username });
  } else {
    res.redirect('/'); // Redirect to the homepage if the user's name is not in the session.
  }
});


app.post('/like-fossil', (req, res) => {
  
  const fossilId = req.body.fossilId;
  
  if (MOST_LIKED_FOSSILS[fossilId]) {
    
    MOST_LIKED_FOSSILS[fossilId].num_likes++;
    
    res.render('thank-you.html.njk', { username: req.session.username });

    
  } else {
    
    res.status(400).send('Invalid fossil ID');
  }
});


app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
