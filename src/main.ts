import express from 'express';
import { envConfig } from './env/env';
var app = express();

const PORT = envConfig.get('API_PORT');