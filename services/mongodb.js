const {MongoClient} = require("mongodb")

let mongoClient = new MongoClient(process.env.MONGODB_URL)



function mongoConnect() {
	return new Promise(async (resolve, reject) => {
		const clientPromise = mongoClient.connect();
		try {
			let database  = (await clientPromise).db("lens-queen");
			resolve(database)
			console.log("database connected...")
		} catch (ex){
			reject(ex)
		}
	})
}

module.exports = mongoConnect