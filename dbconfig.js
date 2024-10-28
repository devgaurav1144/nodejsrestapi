const { Pool } = require('pg');

const helplinereport = new Pool({
    user: 'enterprisedb',
    host: '10.135.70.226',
    database: 'Helpline_Report',
    password: 'IGRS@123',
    port: 5444,
});

const igrsreportdb = new Pool({
    user: 'enterprisedb',
    host: '10.135.70.226',
    database: 'IGRS_Report',
    password: 'IGRS@123',
    port: 5444,
});

module.exports = { helplinereport, igrsreportdb };
