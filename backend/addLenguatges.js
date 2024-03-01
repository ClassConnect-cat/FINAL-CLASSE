// addIdiomes.js

module.exports = async (db) => {
    try {
      console.log("Adding idiomes to database...");
      
      const idiomes = [
        { "idioma": "Catalan" },
        { "idioma": "Ingles" },
        { "idioma": "Espanyol" },
        { "idioma": "Frances" },
        { "idioma": "Alemany" },
        { "idioma": "Italiano" },
        { "idioma": "Portugues" }
      ];
      
      const result = await db.collection("idiomes").insertMany(idiomes);
      
      console.log(`${result.insertedCount} idiomes added successfully.`);
    } catch (error) {
      console.error("Error adding idiomes:", error);
    }
  };
  