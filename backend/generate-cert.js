const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });

const certDir = path.join(__dirname, '..', 'certs');
if (!fs.existsSync(certDir)){
    fs.mkdirSync(certDir);
}

fs.writeFileSync(path.join(certDir, 'server.crt'), pems.cert);
fs.writeFileSync(path.join(certDir, 'server.key'), pems.private);
console.log('Certificates generated in ' + certDir);
