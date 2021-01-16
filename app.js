const express = require('express');
const app = express();
const data  = require('./data.json');

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
    res.status(err.status);
    res.render('error');
  });
  

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


