const mongoose = require('mongoose');
const User = require('./models/User');
const Case = require('./models/Case');
const data = require('./database.json'); 

async function migrate() {
    try {
        await mongoose.connect('YOUR_MONGO_URI');
        console.log("Connected to MongoDB.");

        // 1. Migrate Users
        const userIds = new Set([
            ...Object.keys(data.offences),
            ...Object.keys(data.staffStrikes),
            ...Object.keys(data.notes)
        ]);

        for (const userId of userIds) {
            await User.findOneAndUpdate(
                { userId },
                {
                    $set: {
                        offences: data.offences[userId] || 0,
                        staffStrikes: data.staffStrikes[userId] || 0,
                        // Mapping both 'note' and 'text' keys from your legacy data
                        notes: (data.notes[userId] || []).map(n => ({
                            note: n.note || n.text,
                            mod: n.mod
                        }))
                    }
                },
                { upsert: true }
            );
        }
        
        // 2. Migrate Cases (Including all legacy/archive records)
        if (data.cases && data.cases.length > 0) {
            // Simply pass the entire array directly to insertMany
            await Case.insertMany(data.cases);
            console.log(`Migrated ${data.cases.length} cases, including archive records.`);
        }

        console.log("Migration complete!");
        process.exit();
    } catch (err) {
        console.error("Migration error:", err);
    }
}

migrate();
