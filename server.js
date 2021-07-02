const express = require('express');
const next = require('next');
const cacheableResponse = require('cacheable-response');

const isDevEnvironment = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dev: isDevEnvironment, dir: './src',
});

const defaultRequestHandler = nextApp.getRequestHandler();

const cacheManager = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => {
        try {
            return {
                data: await nextApp.renderToHTML(req, res, pagePath, queryParams),
            };
        } catch (e) {
            return {
                data: `error: ${e}`,
            };
        }
    },
    send: ({ data, res }) => {
        res.send(data);
    },
});

nextApp.prepare()
    .then(() => {
        const server = express();

        // Serving next data directly without the cache
        server.get('/_next/*', (req, res) => {
            defaultRequestHandler(req, res);
        });

        server.get('*', (req, res) => {
            if (isDevEnvironment || req.query.noCache) {
                res.setHeader('X-Cache-Status', 'DISABLED');
                defaultRequestHandler(req, res);
            } else {
                cacheManager({
                    req, res, pagePath: req.path, queryParams: req.query,
                });
            }
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
