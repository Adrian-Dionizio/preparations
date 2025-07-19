

const { getPreparations, addPreparation, removePreparation } = require('../dao/preparationsDAO');


function listarPreparations(req, res) {
  const preparations = getPreparations();
  res.json(preparations);
}

function adicionarPreparation(req, res) {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(400).json({ error: 'Preparation é obrigatório.' });
  }
  const ok = addPreparation(preparation);
  if (ok) {
    res.status(201).json({ message: 'Preparation adicionada com sucesso.' });
  } else {
    res.status(500).json({ error: 'Erro ao adicionar preparation.' });
  }
}

function removerPreparationController(req, res) {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(400).json({ error: 'Preparation é obrigatório.' });
  }
  const ok = removePreparation(preparation);
  if (ok) {
    res.json({ message: 'Preparation removida com sucesso.' });
  } else {
    res.status(500).json({ error: 'Erro ao remover preparation.' });
  }
}

module.exports = { listarPreparations, adicionarPreparation, removerPreparationController };
