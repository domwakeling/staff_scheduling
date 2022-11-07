import { Rowing } from "@mui/icons-material";

export const json2csv = (data) => {

    const csvRows = [];
    const headers = Object.keys(data[0]).sort((a,b) => a > b ? 1 : -1 );
    csvRows.push(headers.join(","));

    for (let i = 0; i < data.length; i++) {
        const csvRow = [];
        for (let j = 0; j < headers.length; j++) {
            csvRow.push(data[i][headers[j]]);
        } 
        csvRows.push(csvRow.join(","))
    }

    return csvRows.join("\n");
}

export const csv2json = (data) => {

    const rows = data
        .split("\n")
        .map(row => row.replace(/\r/g, ''))
        .filter(row => !( /^^( ?,)+ ?$/.test(row) ));

    const headers = rows[0].split(",");

    rows = rows
            .filter((row, idx) => idx != 0)
            .map(row => row.split(','))
            .map(row => {
                const newObject = {};
                for(let i = 0; i < headers.length; i++) {
                    newObject[headers[i]] = row[i];                    
                }
                return newObject;
            })
    
    return rows;
}
