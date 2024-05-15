/*
 * File config server
 * 
 */

process.env.PORT = process.env.PORT || 8080;

//Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DB
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = '';
} else {
    urlDB = '';
}

process.env.URLDB = urlDB;