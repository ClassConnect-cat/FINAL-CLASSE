module.exports = async (db) => {
// MONGODB
console.log("Creating database...");

// Users Collection
await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "profe", "salt", "hash"],
        properties: {
          id: {
            bsonType: "int"
          },
          name: {
            bsonType: "string"
          },
          email: {
            bsonType: "string",
          },
          description: {
            bsonType: "string"
          },
          profe: {
            bsonType: "bool"
          },
          salt: {
            bsonType: "string"
          },
          hash: {
            bsonType: "string"
          },
          classes_dones: {
            bsonType: "array",
            items: {
              bsonType: "object",
              properties: {
                classId: {
                  bsonType: "objectId"
                },
                price: {
                  bsonType: "int"
                },
                TimeId: {
                  bsonType: "objectId"
                }
              }
            }
          },
          classes_rebs: {
            bsonType: "array",
            items: {
              bsonType: "object",
              properties: {
                classId: {
                  bsonType: "objectId"//en algun moment s'hauria de posar les hores
                },
                TimeId: {
                  bsonType: "objectId"
                }
              }
            }
          }
        }
      }
    }
  });
  
  // Idiomes Collection
  db.createCollection("idiomes", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["idioma"],
        properties: {
          idioma: {
            bsonType: "string"
          }
        }
      }
    }
  });
  
  // Horari Collection
  db.createCollection("horari", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["startTime", "endTime"],
        properties: {
          startTime: {
            bsonType: "date"
          },
          endTime: {
            bsonType: "date"
          }
        }
      }
    }
  });

  console.log("Database created successfully.");

};