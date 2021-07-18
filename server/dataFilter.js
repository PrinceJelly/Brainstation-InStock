const fs = require('fs');

// const invData = JSON.parse(fs.readFileSync(__dirname + '/data/inventories.json'));
// const whData = JSON.parse(fs.readFileSync(__dirname + '/data/warehouses.json'));

// const filterKey = "name"; //key that you want to filter from the data
// const fileName = "wh-locations"; //File name that you want for the JSON file


function filterData(data, key, name){
    const result = [];
    data.forEach(obj => {
        result.indexOf(obj[key]) < 0 ? result.push(obj[key]) : "";
    });

    fs.writeFileSync(`${__dirname}/data/${name}.json`, JSON.stringify(result));
};

module.exports={
    filterData,
}


// filterData(whData,filterKey,fileName);