import User from './models/User.js';
import Case from './models/Case.js';

export const dbUtils = {
    // Helper to add a strike
    async addStrike(targetId, moderatorTag, reason) {
        const user = await User.findOneAndUpdate(
            { userId: targetId },
            { $inc: { staffStrikes: 1 } },
            { upsert: true, new: true }
        );
        await Case.create({ userId: targetId, type: 'Staff Strike', reason, moderator: moderatorTag });
        return user.staffStrikes;
    },

    // Helper to add a warning
    async addWarning(targetId, moderatorTag, reason) {
        const user = await User.findOneAndUpdate(
            { userId: targetId },
            { $inc: { offences: 1 } },
            { upsert: true, new: true }
        );
        await Case.create({ userId: targetId, type: 'Warning', reason, moderator: moderatorTag });
        return user.offences;
    }
};
