'use strict';

require('dotenv').config();

import fastify, {FastifyInstance, FastifyServerFactory, RouteShorthandOptions} from 'fastify';
import { bootstrap } from 'fastify-decorators';
import { Server, IncomingMessage, ServerResponse } from 'http';
import path, {resolve} from "path";
import twig from "./classes/extendedTwig";
import fastifyStatic from "fastify-static";
import moment from "moment-timezone";
import pointOfView from "point-of-view";

moment().tz('UTC');

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({});

// Include view engine
server.register(pointOfView, {
    engine: {
        twig: twig
    },
    root: path.join(__dirname, 'view'),
    viewExt: 'twig',
});

//set public put
server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
});



server.register(bootstrap, {
    directory: resolve(__dirname, `controllers`),
    mask: /\.(controller)\./
});

server.listen(3000, (err) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    server.log.info(`server listening on ${server.server.address()}`)
});