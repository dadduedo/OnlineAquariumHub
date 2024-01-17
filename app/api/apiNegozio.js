const { createObject,readObjects,updateObject,deleteObject } = require('../MongoDB/CRUDnegozio');
export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            // Esegui la creazione di un documento
            await createObject(res);
        } else if (req.method === 'GET') {
            // Esegui la lettura di tutti i documenti
            const result = await readObjects(res);
            res.status(result.statusCode).json(JSON.parse(result.body));
        } else if (req.method === 'PUT') {
            // Esegui l'aggiornamento di un documento
            await updateObject(res);
        } else if (req.method === 'DELETE') {
            // Esegui l'eliminazione di un documento
            await deleteObject(res);
        }  
    } catch (error) {
      console.error("Error handling request:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


