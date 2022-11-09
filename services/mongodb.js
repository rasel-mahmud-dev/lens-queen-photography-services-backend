const {MongoClient} = require("mongodb")

let mongoClient = new MongoClient(process.env.MONGODB_URL)


let database;

function mongoConnect() {
	return new Promise(async (resolve, reject) => {
		const clientPromise = mongoClient.connect();
		try {
			// we use mongodb client caching
			if(!database) {
				database = (await clientPromise).db("lens-queen");
			}
			resolve(database)
			console.log("database connected...")
		} catch (ex){
			reject(ex)
		}
	})
}

module.exports = mongoConnect