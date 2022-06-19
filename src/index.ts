import http from 'http';
import { ENDPOINT_BASE, ERRORS, ENDPOINT_USER, HOSTNAME, PORT } from './constants';
import { UrlDivider } from './utils';
import DB from './in_memory_db/index'
import { validate } from 'uuid';

//init DB
  let dataBase = new DB('users data base');
  dataBase.connect();


const server = http.createServer((req, res) => {
  
  try {
    //response settings
    res.setHeader('Content-type', 'text/plain');
    
    // parse path and query params from url
    const [ path, queryParams ] = UrlDivider(req.url);

    let body: any = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let data = body ? JSON.parse(body) : {};
      if (req.method === 'POST' && ENDPOINT_BASE.test(path)) {
        if (!(data.username && data.age && data.hobbies))
        {
          res.statusCode = 400;
          res.end(ERRORS.badData);
          return;
        }
        dataBase.create(data); 
        res.statusCode = 201;
        res.end('New user has beed added!');
        return;  
      }
      if (req.method === 'PUT' && ENDPOINT_USER.test(path)) {
        let userUnvalidateId = path.match(ENDPOINT_USER);
        if (!(userUnvalidateId && validate(userUnvalidateId[1])))
        {
          res.statusCode = 400;
          res.end(ERRORS.badUUID);
          return;
        }
        let updateResult = dataBase.update(userUnvalidateId[1], data);
        if (updateResult) {
          res.statusCode = 200; 
          res.end('User has been updated!');
          return;
        }
        else { 
          res.statusCode = 404;
          res.end(ERRORS.userNotFound);
          return
        }
      }
      res.statusCode = 404;
      res.end(ERRORS[404]);
      return;
    });
    
    if (req.method === 'GET' && ENDPOINT_USER.test(path))
    {
      let userUnvalidateId = path.match(ENDPOINT_USER);
      if (!(userUnvalidateId && validate(userUnvalidateId[1])))
      { 
        res.statusCode = 400;
        res.end(ERRORS.badUUID);
        return;
      }

      let userData = dataBase.read(userUnvalidateId[1]);
  
      if (userData) {
        res.statusCode = 200;
        res.end(JSON.stringify(dataBase.read(userUnvalidateId[1])));
        return;
      }
      else {
        res.statusCode = 404;
        res.end(ERRORS.userNotFound);
        return
      }

    }
    if (req.method === 'GET' && ENDPOINT_BASE.test(path))
    {
      res.statusCode = 200;
      res.end(JSON.stringify(dataBase.read_as_list()));
      return;
    }

    if (req.method === 'DELETE' && ENDPOINT_USER.test(path))
    {
      let userUnvalidateId = path.match(ENDPOINT_USER);
      if (!(userUnvalidateId && validate(userUnvalidateId[1])))
      {
        res.statusCode = 400;
        res.end(ERRORS.badUUID);
        return;
      }
      let removingResult = dataBase.delete(userUnvalidateId[1]);
      if (removingResult)
      {
        res.statusCode = 204;
        res.end('User has been deleted!');
      }
      else {
        res.statusCode = 404;
        res.end('User with this id not found!');
      }
      return;
    }


    switch (req.method) {
      case 'POST':
      case 'GET':
      case 'PUT':
      case 'DELETE':
    }

  }
  catch (e: any)
  {
      res.statusCode = 500;
      res.end(e.message);
      return;
  }
  
})


server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
