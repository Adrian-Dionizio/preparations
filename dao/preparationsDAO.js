
const fs = require('fs');
const path = require('path');

const preparationsPath = path.join(__dirname, '../arquivos/preparations.json');

function getPreparations() {
    try {
        const data = fs.readFileSync(preparationsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler preparations.json:', err);
        return [];
    }
}


function savePreparations(preparations) {
    try {
        fs.writeFileSync(preparationsPath, JSON.stringify(preparations, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Erro ao salvar preparations.json:', err);
        return false;
    }
}

function addPreparation(newPreparation) {
    const preparations = getPreparations();
    preparations.push(newPreparation);
    return savePreparations(preparations);
}

function removePreparation(preparationToRemove) {
    let preparations = getPreparations();
    preparations = preparations.filter(item => item !== preparationToRemove);
    return savePreparations(preparations);
}

module.exports = { getPreparations, savePreparations, addPreparation, removePreparation };

