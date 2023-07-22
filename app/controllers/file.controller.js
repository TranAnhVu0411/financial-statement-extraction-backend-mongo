const { rmSync, readFile, readFileSync } = require('fs');
const util = require('util');
// const ReadFile = util.promisify(readFile);
require('dotenv').config();

exports.fileSave = (req, res) => {
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({message: 'Please upload a file'});
        }
        res.send(file)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while upload",
        });
    }
}

exports.dirDelete = (req, res) => {
    try {
        const dir = req.body.location;
        rmSync(dir, { recursive: true, force: true });
        res.send('OK')
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message || "Some error occurred while delete directory",
        });
    }
}

exports.indexBackgroundImages = (req, res) => {
    const userid = req.query.userid;
    const id = req.query.id;
    const pagenum = req.query.pagenum;

    // Base 64
    // let filepaths = [];
    // for (let i=0; i<pagenum; i++) {
    //     filepaths.push(`upload/${userid}/${id}/images/${i}/page-${i}-original.jpg`)
    // }

    // const files = filepaths.map(function (filepath) {
    //     return ReadFile(filepath); //updated here
    // });

    // const dataImagePrefix = `data:image/jpeg;base64,`
    // Promise.all(files).then(fileNames => {
    //     // response.data = fileNames;
    //     let results = fileNames.map(buffer => `${dataImagePrefix}${buffer.toString('base64')}`)
    //     res.json(results);
    // }).catch(error => {
    //     res.status(500).json(error);
    // });

    // Server url
    let filepaths = [];
    for (let i=0; i<pagenum; i++) {
        filepaths.push(`${req.protocol}://localhost:${process.env.PORT}/${userid}/${id}/images/${i}/page-${i}-original.jpg`)
    }
    res.json(filepaths);
}

exports.pageInfo = (req, res) => {
    const userid = req.query.userid;
    const id = req.query.id;
    const page = req.query.page;

    // let imagePaths = {original: `upload/${userid}/${id}/images/${page}/page-${page}-original.jpg`, preprocess: `upload/${userid}/${id}/images/${page}/page-${page}-preprocess.jpg`}
    let metadataPath = `upload/${userid}/${id}/metadata/${page}/page-${page}-ocr.json`

    // let image = {}
    // const dataImagePrefix = `data:image/jpeg;base64,`
    // for (const type in imagePaths) {
    //     let buffer = readFileSync(imagePaths[type])
    //     image[type] = `${dataImagePrefix}${buffer.toString('base64')}`
    // }

    let baseUrl = `${req.protocol}://localhost:${process.env.PORT}`
    let image = {original: `${baseUrl}/${userid}/${id}/images/${page}/page-${page}-original.jpg`, preprocess: `${baseUrl}/${userid}/${id}/images/${page}/page-${page}-preprocess.jpg`}
    let rawdata = readFileSync(metadataPath)
    let metadata = JSON.parse(rawdata)
    // if (metadata.table_metadata.length > 0) {
    //     for (let i = 0; i < metadata.table_metadata.length; i++) {
    //         metadata.table_metadata[i].excel_url = `${baseUrl}/${userid}/${id}/metadata/${page}/excel/${metadata.table_metadata[i].table_id}.xlsx`
    //     }
    // }
    res.json({'metadata': metadata, 'pageimages': image})
}