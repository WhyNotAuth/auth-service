const crypto = require('crypto');

const salt = crypto.randomBytes(12)
   .toString('hex');

const password = 'test';

//creating hash object
const hash = crypto.createHash('sha512');
//passing the data to be hashed
const data = hash.update(salt + password, 'utf-8');
//Creating the hash in the required format
const passwordHash = data.digest('hex');
//Printing the output on the console
console.log({
   passwordHash,
   salt
});
