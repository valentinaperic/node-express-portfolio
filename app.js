const express = require('express');
const app = express();
const data  = require('./data.json');
let port = process.env.PORT || 1337

app.use('/static', express.static('public'));

app.engine('pug', require('pug').__express) 

// view engine setup
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {data});
});
  
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => { 
    const { id } = req.params;

    const projectTemplateData = { 
        project_name, 
        description,  
        technologies, 
        live_link, 
        github_link, 
        image_urls 
    } = data.projects[id];

    res.render('project', projectTemplateData); 
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error middleware 
app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    console.log(`whoops, a ${status} error!`); 
    res.render('error');
  });
  
app.listen(port, () => {
    console.log('The application is running on: ' + port);
});