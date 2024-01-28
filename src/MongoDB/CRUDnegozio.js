const { connect, close, client } = require('./dbClient');
const db = client.db("negozio");
const collection = db.collection("acquari");

async function createObject(res) {
    await connect();
    // const document = {
    //   id: 1,
    //   name: "frullino",
    //   descrizione: "è un bel frullino",
    //   componenti: ["manico", "basetta", "lama"],
    //   prezzo: 25
    // };
    const newItem = {
      image: 'https://res.cloudinary.com/dakts9ect/image/upload/v1683835731/fcc-family-guys/stewie/stewie-family-guy-fox-1085482_qxxhmu.jpg',
      link: 'https://www.puntotropicale.com/549-nuovo-prodotto',
      price: 49.99,
      description: 'Dolor sit amet, consectetur adipiscing elit.',
      name: 'Nuovo Prodotto',
      components: ['Componente7', 'Componente8', 'Componente9'],
    };

    const result = await collection.insertOne(newItem);
    console.log("Document created:", result.insertedId);
    await close();
  }
  
  async function readObjects() {
    try {
      await connect();
      const documents = await collection.find().toArray();
      
      await close();
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, data: documents }),
      };
    } catch (error) {
      console.error("Error reading documents:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: "Internal Server Error" }),
      };
    }
  }
  
  async function updateObject(res) {
    await connect();
    const filter = { name: "Nuovo Prodotto" };
    const update = {
      $set: {
        name: "nuovo frullino",
        prezzo: 30
      }
    };
    const result = await collection.updateOne(filter, update);
    console.log("Document updated:", result.modifiedCount);
    await close();
  }
  
  async function deleteObject(res) {
    await connect();
  
    const filter = { id: 1 };;
  
    const result = await collection.deleteOne(filter);
    console.log("Document deleted:", result.deletedCount);
    await close();
  }

  module.exports = { createObject,readObjects,updateObject,deleteObject};