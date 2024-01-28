// Importa le funzioni CRUD dal modulo
const { createObject, readObjects, updateObject, deleteObject } = require('../../MongoDB/CRUDnegozio');

export default async function handler(req, res) {
  console.log("req.method")
  console.log(req.method)
try {
  switch (req.method) {
    case 'POST':
      // Esegui la creazione di un documento
      const createData = req.body; // Assumi che i dati siano passati nel corpo della richiesta
      await createObject(createData, res);
      break;
    
    case 'GET':
      // Esegui la lettura di tutti i documenti
      const readResult = await readObjects(res);
      res.status(readResult.statusCode).json(JSON.parse(readResult.body));
      break;
    
    case 'PUT':
      // Esegui l'aggiornamento di un documento
      const updateData = req.body;
      await updateObject(updateData, res);
      break;
    
    case 'DELETE':
      // Esegui l'eliminazione di un documento
      const deleteId = req.query.id; // Assumi che l'ID sia passato come parametro nella richiesta
      await deleteObject(deleteId, res);
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
} catch (error) {
  console.error("Error handling request:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
}
