const express = require('express');
const bodyParser = require('body-parser');
const { helplinereport, igrsreportdb } = require('./dbconfig');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Mofficer Dashboard


app.get('/get-mofficer-dashboard-powerbi', async (req, res) => {

    const requiredHeaderValue = req.headers['apikey']; 
    const { param1, param2 } = req.query;
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }

    try {
        
        const result2 = await igrsreportdb.query('SELECT  * FROM udf_getdashboardcmoofficer_powerbi($1,$2) AS result', [param1, param2]);
        const result3 = await igrsreportdb.query('SELECT  * FROM udf_level_wise_reference_for_mofficer_powerbi() AS result');
        const result4 = await helplinereport.query('SELECT  * FROM udf_level_wise_reference_for_mofficer_powerbi() AS result');
        const antibhumafia = await igrsreportdb.query('SELECT  * FROM usp_get_bhumafia_details_for_cmo_officer_powerbi() AS result');
        const negativefeedback = await igrsreportdb.query('SELECT  * FROM udf_getfeedback_details_powerbi() AS result');
        
        res.status(200).json(
            { 
                result:result2.rows,
                result2:result3.rows,
                result3:result4.rows,
                Antibhumafia:antibhumafia.rows,
                NegativeFeedback:negativefeedback.rows
            }); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-distt-list',async(req,res)=>{
    const requiredHeaderValue = req.headers['apikey'];
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }
    const { param1 } = req.query;
    try {
        
        const result2 = await igrsreportdb.query('SELECT * FROM udf_districtlist($1)', [param1]);
        res.status(200).json({ result:result2.rows}); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-officer-dashboard-drill-powerbi', async (req, res) => {
   
    const requiredHeaderValue = req.headers['apikey']; 
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }

    try {
        const result2 = await igrsreportdb.query('SELECT * FROM udf_dashboard_drill_powerbi()');
        res.status(200).json({ result:result2.rows}); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-officer-dashboard-drill2-powerbi', async (req, res) => {
   
    const requiredHeaderValue = req.headers['apikey']; 
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }

    try {
        const result2 = await igrsreportdb.query('SELECT * FROM udf_getdashboardcmoofficer_levelwise_drill_2_powerbi_fun_22()');
        res.status(200).json({ result:result2.rows}); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-dmsp-dashboard-hepline-officer-wise', async (req, res) => {
    const requiredHeaderValue = req.headers['apikey']; 

    // Validate header value
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }

    try {      
        const result2 = await helplinereport.query('SELECT * FROM udf_level_wise_reference_for_dm_lvl2_java_power_bi()');
        res.status(200).json({ result:result2.rows}); 

    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: err.message });
    }
});

app.get('/get-dmsp-helplinecomplaints', async (req, res) => {
    const { param1, param2,param3, param4,param5 } = req.query;
  
    try {
        const requiredHeaderValue = req.headers['apikey']; 
    if (requiredHeaderValue !== '$2a$10$opvhZUI2k4OmyF1BJjSxb.IGRS6QRQ8UvyDvGDOqdXdqe0ZqzTc4MrHh2') { 
        return res.status(400).json({ error: 'Invalid or missing API key' });
    }
      const result = await helplinereport.query('SELECT  * FROM udf_level_wise_reference_for_dm_drill_java($1,$2,$3, $4,$5) AS result', [param1, param2,param3,param4,param5]);
  
      res.status(200).json({ result:result.rows}); 
  
    } catch (err) {
      console.error('Error executing query', err.stack);
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
