const mongoose = require('mongoose');
const User = require('./models/User');
const Case = require('./models/Case');
const data = require('./database.json');

async function migrate() {
    try {
        console.log("Connecting to MongoDB...");
        // Ensure MONGO_URI is set in your environment
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully.");

        // 1. Migrate Users
        const userIds = new Set([
            ...Object.keys(data.offences || {}),
            ...Object.keys(data.staffStrikes || {}),
            ...Object.keys(data.notes || {})
        ]);

        for (const userId of userIds) {
            await User.updateOne(
                { userId },
                {
                    $set: {
                        offences: data.offences[userId] || 0,
                        staffStrikes: data.staffStrikes[userId] || 0,
                        notes: (data.notes[userId] || []).map(n => ({
                            note: n.note || n.text,
                            mod: n.mod
                        }))
                    }
                },
                { upsert: true }
            );
        }
        console.log("User migration complete.");

        // 2. Migrate Cases (Including all archive records)
        if (data.cases && data.cases.length > 0) {
            console.log(`Migrating ${data.cases.length} cases...`);
            for (const caseDoc of data.cases) {
                await Case.updateOne(
                    { id: caseDoc.id },
                    { $set: caseDoc },
                    { upsert: true }
                );
            }
            console.log("Case migration complete.");
        }

        console.log("All migrations finished successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
