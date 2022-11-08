const imgbbUploader = require("imgbb-uploader");

function upload(file) {
	return imgbbUploader(process.env.IMGBB_API, file)
}


module.exports = upload