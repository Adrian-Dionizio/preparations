const fs = require('fs');
const path = require('path');

const filesPrep = path.join(__dirname, "..", "arquivos");

fs.readdir(filesPrep, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta:', err);
    return;
  }

  // Filtrar apenas arquivos (ignora pastas)
  const onlyfiles = files.filter(file => {
    return fs.statSync(path.join(filesPrep, file)).isFile();
  });

  console.log(onlyfiles);
});

