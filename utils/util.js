const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { Console } = require('console');
module.exports = {
   makeid, uploadFile, deletDiskFile, toDate, priceString, deleteFolder
}

function priceString(p) {
   return parseFloat(p).toFixed(2)
} 

function uploadFile(req, filename, res) {
    let uploadPath;
   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 
   uploadPath = path.resolve(__dirname, '../assets/' + filename);
console.log(uploadPath)
  
   // Use the mv() method to place the file somewhere on your server
   req.files.file.mv(uploadPath, function (err) {
      if (err){
         console.log(err)
      }
         return res.status(500).send(err);
      // res.send('File uploaded!');
      return uploadPath
   });

}

function deletDiskFile(filePath) {

   fs.exists(filePath, function (exists) {
      if (exists) {
         console.log('File exists. Deleting now ...');
         fs.unlinkSync(filePath);
      } else {
         console.log('File not found, so not deleting.');
      }
   });
}
function deleteFolder(dir){
   uploadPath = path.resolve(__dirname, '../../assets/' + dir);
   if (fs.existsSync(uploadPath)) {
      fs.rmdirSync(uploadPath, {recursive: true})
    }
    
       
    
    
}

function makeid(length) {
   var result           = '';
   var characters       = '923456781';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return parseInt(result);
}
function toDate(d) {
   
   return moment(d).format('MMM Do YYYY');
}