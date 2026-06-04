import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import your data and models
const data = require('./database.json');
const User = require('./models/User.js');
const Case = require('./models/Case.js');

async function migrate() {
    try {
        const dbUri = process.env.MONGODB_URI;
        if (!dbUri) {
            throw new Error("MONGODB_URI is not defined in environment variables!");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(dbUri.trim());
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

       // 2. Migrate Cases
        if (data.cases && data.cases.length > 0) {
            console.log(`Migrating ${data.cases.length} cases...`);
            for (let i = 0; i < data.cases.length; i++) {
                try {
                    await Case.updateOne(
                        { id: data.cases[i].id },
                        { $set: data.cases[i] },
                        { upsert: true }
                    );
                } catch (caseErr) {
                    // Log the EXACT case and the EXACT error
                    console.error(`ERROR on case index ${i} (ID: ${data.cases[i].id}):`, caseErr);
                    throw caseErr; // This will trigger the main catch block and exit
                }
            }
        }

        console.log("Migration complete!");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
