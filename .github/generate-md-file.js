const fs = require('fs');
const path = require('path');

const dbFolderPath = path.join(__dirname, '../source-web/src/assets/db')
const outputFilePath = path.join(__dirname, 'output.md')

fs.readdir(dbFolderPath, (err, files) => {
	if (err) return console.error('Error reading folder: ', err)
	const links = []

	files.forEach(file => {
		const filePath = path.join(dbFolderPath, file);
		const jsonData = require(filePath);

		jsonData.forEach(item => {
			links.push(`[${item.name}](${item.link}) ${item.licenseLink ? `- [License](${item.licenseLink})` : ""}`)
		})
	})

	fs.writeFile(outputFilePath, links.join('\n'), err => {
		if (err) return console.error('Error writing Markdown file: ', err)
		console.log('Markdown file generated successfully.')
	})
})
