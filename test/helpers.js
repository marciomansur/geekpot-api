import chai from 'chai';
import config from 'config';
import server from '../';
import db from '../app/models';

global.db = db;
global.config = config;
global.server = server;
global.expect = chai.expect;
