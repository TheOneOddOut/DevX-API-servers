const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3000; // You can change this to your desired port

app.use(express.json());

app.get('/points/:discordid', async (req, res) => {
    const discordId = req.params.discordid;

    // Read the pointsusers.json file
    let pointsData;
    try {
        const fileContent = await fs.readFile('pointsusers.json', 'utf-8');
        pointsData = JSON.parse(fileContent);
    } catch (error) {
        // If the file doesn't exist, create an empty object
        pointsData = {};
    }

    // Check if the user exists in the pointsData
    if (!(discordId in pointsData)) {
        // If the user doesn't exist, add a new entry with initial points
        pointsData[discordId] = 0;

        // Save the updated pointsData to pointsusers.json
        await fs.writeFile('pointsusers.json', JSON.stringify(pointsData, null, 2), 'utf-8');
    }

    // Send the response with the current points
    res.json({ discordId, points: pointsData[discordId] });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
