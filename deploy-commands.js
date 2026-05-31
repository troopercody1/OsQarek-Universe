require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const commands = [
    { name: 'help', description: 'List all available moderator commands' },
    { name: 'ping', description: 'Check the bot\'s latency' },
   // { name: 'test', description: 'Test if all bot systems are operational' },
    //  { name: 'random', description: 'Ping a random person in the server' },
    { name: 'addmod', description: 'Add a role to the moderator list', options: [{ name: 'role', description: 'The role to add', type: 8, required: true }] },
    { name: 'deletemod', description: 'Remove a role from the moderator list', options: [{ name: 'role', description: 'The role to remove', type: 8, required: true }] },
    { name: 'modlog', description: 'Set the moderation log channel', options: [{ name: 'channel', description: 'The channel', type: 7, required: true }] },
    { name: 'setchatlog', description: 'Set the chat log channel', options: [{ name: 'channel', description: 'The channel', type: 7, required: true }] },
    { name: 'ignorechannel', description: 'Toggle ignoring a channel for logs', options: [{ name: 'channel', description: 'The channel', type: 7, required: true }] },
    { name: 'setloachannel', description: 'Set the LOA request channel', options: [{ name: 'channel', description: 'The channel', type: 7, required: true }] },
    { name: 'restart', description: 'Refreshes the bot session (Admin Only)' },
    // { name: 'join', description: 'Join your voice channel' },
    // { name: 'autoplay', description: 'Toggle autoplay mode' },
    //  { name: '247', description: 'Toggle 24/7 mode (stay in VC)' },
    //  { name: 'leave', description: 'Leave the voice channel' },
    //  { name: 'play', description: 'Play music from SoundCloud', options: [{ name: 'query', description: 'The song name or URL', type: 3, required: true }] },
    //  { name: 'skip', description: 'Skip the current song' },
    //  { name: 'queue', description: 'View the music queue' },
    //  { name: 'clearqueue', description: 'Clear the music queue' },
    //  { name: 'pause', description: 'Pause the curent song' },
    // { name: 'resume', description: 'Resume the paused song' },
    //  { name: 'volume', description: 'Set volume (0-100)', options: [{ name: 'level', description: 'The volume level', type: 10, required: true }] },
    {
        name: 'music',
        description: 'OsQarek’s Universe Audio Suite',
        options: [
            { name: 'play', description: 'Play music from SoundCloud', type: 1, options: [{ name: 'query', description: 'The song name or URL', type: 3, required: true }] },
            { name: 'skip', description: 'Skip the current song', type: 1 },
            { name: 'queue', description: 'View the music queue', type: 1 },
            { name: 'pause', description: 'Pause the current song', type: 1 },
            { name: 'resume', description: 'Resume the paused song', type: 1 },
            { name: 'leave', description: 'Stop music and leave the voice channel', type: 1 },
            { name: 'join', description: 'Join the voice channel', type: 1 },
            { name: 'volume', description: 'Set volume (0-100)', type: 1, options: [{ name: 'level', description: 'The volume level', type: 10, required: true }] },
            { name: 'autoplay', description: 'Toggle autoplay mode', type: 1 },
            { name: '247', description: 'Toggle 24/7 mode (stay in VC)', type: 1 },
            { name: 'clear', description: 'Clear the music queue', type: 1 },
            { name: 'nowplaying', description: 'Now playing', type: 1 }
        ]
    },
    { name: 'staffdm', description: 'Send a DM to all staff members', options: [{ name: 'message', description: 'The message to send', type: 3, required: true }] },
    { name: 'nowplaying', description: 'View the current song' },
    { name: 'apply', description: 'Link to apply for staff' },
    { name: 'status', description: 'Set bot status', options: [{ name: 'preset', description: 'The status to set', type: 3, required: true, choices: [{ name: 'Universe', value: 'universe' }, { name: 'Update', value: 'update' }, { name: 'Help', value: 'help' }, { name: 'Expand', value: 'expand' }] }] },
    { name: 'statequiz', description: 'Start 50 States trivia' },
    { name: 'countryquiz', description: 'Start 50 Countries trivia' },
    { name: 'canadaquiz', description: 'Start Canada trivia' },
    { name: 'poll', description: 'Create a poll', options: [{ name: 'question', description: 'The question to ask', type: 3, required: true }] },
    { name: 'quizcreate', description: 'Create quiz', options: [{ name: 'name', description: 'Quiz name', type: 3, required: true }, { name: 'question', description: 'The question', type: 3, required: true }, { name: 'answer', description: 'The answer', type: 3, required: true }] },
    { name: 'quizlist', description: 'View quizzes' },
    { name: 'startquiz', description: 'Start quiz', options: [{ name: 'name', description: 'The quiz name', type: 3, required: true }, { name: 'shuffle', description: 'Shuffle questions?', type: 5, required: false }] },
    { name: 'quizban', description: 'Ban from quizzes', options: [{ name: 'target', description: 'User to ban', type: 6, required: true }, { name: 'status', description: 'True to ban', type: 5, required: true }] },
    { name: 'delquiz', description: 'Delete quiz', options: [{ name: 'name', description: 'Quiz name to delete', type: 3, required: true }] },
    // { name: 'joke', description: 'Random joke' },
    // { name: 'dadjoke', description: 'Dad joke' },
    ///  { name: 'coinflip', description: 'Flip coin' },
    //  { name: 'cat', description: 'Cat image' },
    //{ name: 'dog', description: 'Dog image' },
    //   { name: 'randomfact', description: 'Random fact' }
    //
    {
        name: 'fun',
        description: 'Fun and utility commands for the community',
        options: [
            { name: 'joke', description: 'Get a random joke', type: 1 },
            { name: 'dadjoke', description: 'Get a random dad joke', type: 1 },
            { name: 'coinflip', description: 'Flip a coin (Heads or Tails)', type: 1 },
            { name: 'cat', description: 'Get a random cat image', type: 1 },
            { name: 'dog', description: 'Get a random dog image', type: 1 },
            { name: 'fact', description: 'Get a random interesting fact', type: 1 },
            { name: 'random-user', description: 'Ping a random person in the server', type: 1 },
            { name: 'randomletter', description: 'Get 3 random letters out of the alphebet', type: 1 }
        ]
    },
    {
        name: 'mod',
        description: 'OsQarek’s Universe Moderation Suite',
        options: [
            {
                name: 'warn',
                description: 'Issue a formal warning to a member',
                type: 1,
                options: [
                    { name: 'target', description: 'User to warn', type: 6, required: true },
                    { name: 'reason', description: 'Reason for the warning', type: 3, required: false }
                ]
            },
            {
                name: 'kick',
                description: 'Remove a member from the server',
                type: 1,
                options: [
                    { name: 'target', description: 'User to kick', type: 6, required: true },
                    { name: 'reason', description: 'Reason for the kick', type: 3, required: false }
                ]
            },
            {
                name: 'ban',
                description: 'Permanently ban a member',
                type: 1,
                options: [
                    { name: 'target', description: 'User to ban', type: 6, required: true },
                    { name: 'reason', description: 'Reason for the ban', type: 3, required: false }
                ]
            },
            {
                name: 'unban',
                description: 'Lift a ban using a User ID',
                type: 1,
                options: [
                    { name: 'id', description: 'The Discord User ID', type: 3, required: true }
                ]
            },
            {
                name: 'mute',
                description: 'Timeout a member',
                type: 1,
                options: [
                    { name: 'target', description: 'User to mute', type: 6, required: true },
                    { name: 'minutes', description: 'Duration in minutes', type: 4, required: true }
                ]
            },
            {
                name: 'unmute',
                description: 'Remove a timeout from a member',
                type: 1,
                options: [
                    { name: 'target', description: 'User to unmute', type: 6, required: true }
                ]
            },
            {
                name: 'softban',
                description: 'Ban and immediately unban to clear messages',
                type: 1,
                options: [
                    { name: 'target', description: 'User to softban', type: 6, required: true },
                    { name: 'reason', description: 'Reason', type: 3, required: false }
                ]
            },
            {
                name: 'purge',
                description: 'Mass delete messages from the channel',
                type: 1,
                options: [
                    { name: 'amount', description: 'Number of messages (1-100)', type: 4, required: true }
                ]
            },
            {
                name: 'lockdown',
                description: 'Toggle server lockdown status',
                type: 1,
                options: [
                    { name: 'status', description: 'True to lock, False to unlock', type: 5, required: true }
                ]
            },
            {
                name: 'dm',
                description: 'Send an official staff DM to a member',
                type: 1,
                options: [
                    { name: 'target', description: 'User to message', type: 6, required: true },
                    { name: 'message', description: 'The message content', type: 3, required: true }
                ]
            }
        ]
    },
    //MOD   { name: 'warn', description: 'Warn user', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3, required: false }] },
    //MOD   { name: 'ban', description: 'Ban user', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3, required: false }] },
    //MOD{ name: 'kick', description: 'Kick user', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3, required: false }] },
    //MOD { name: 'unban', description: 'Unban ID', options: [{ name: 'id', description: 'User ID', type: 3, required: true }] },
    //MOD{ name: 'mute', description: 'Timeout user', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'minutes', description: 'Duration', type: 4, required: true }] },
    //MOD { name: 'purge', description: 'Delete messages', options: [{ name: 'amount', description: 'Number (1-100)', type: 4, required: true }] },
    //MOD    { name: 'lockdown', description: 'Lock server', options: [{ name: 'status', description: 'True to lock', type: 5, required: true }] },
    //MOD   { name: 'dm', description: 'DM a user', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'message', description: 'The message', type: 3, required: true }] },
    { name: 'announce', description: 'Announcement', options: [{ name: 'message', description: 'The text', type: 3, required: true }, { name: 'channel', description: 'The channel', type: 7, required: true }] },
    { name: 'globalannounce', description: 'Global Announcement', options: [{ name: 'message', description: 'The text', type: 3, required: true }] },
    { name: 'delwarn', description: 'Remove warning', options: [{ name: 'target', description: 'The user', type: 6, required: true }] },
    { name: 'togglecommand', description: 'Toggle command', options: [{ name: 'command', description: 'Command name', type: 3, required: true }] },
    { name: 'offences', description: 'Check offences', options: [{ name: 'target', description: 'The user', type: 6, required: false }] },
    { name: 'warnings', description: 'Warning history', options: [{ name: 'target', description: 'The user', type: 6, required: true }] },
    { name: 'notes', description: 'User notes', options: [{ name: 'target', description: 'The user', type: 6, required: true }] },
    { name: 'addnote', description: 'Add note', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'note', description: 'The text', type: 3, required: true }] },
    { name: 'deletenote', description: 'Delete note', options: [{ name: 'target', description: 'The user', type: 6, required: true }, { name: 'index', description: 'Note number', type: 4, required: true }] },
    { name: 'case', description: 'View case', options: [{ name: 'id', description: 'Case ID', type: 4, required: true }] },
    { name: 'reason', description: 'Update reason', options: [{ name: 'id', description: 'Case ID', type: 4, required: true }, { name: 'new_reason', description: 'The text', type: 3, required: true }] },
    { name: 'clearwarns', description: 'Clear all warns', options: [{ name: 'target', description: 'The user', type: 6, required: true }] },
    { name: 'allstaffstats', description: 'Staff progress' },
    { name: 'afk', description: 'Set AFK', options: [{ name: 'reason', description: 'Reason for AFK', type: 3, required: false }] },
    { name: 'loa', description: 'Staff LOA', options: [{ name: 'reason', description: 'Reason', type: 3, required: true }, { name: 'duration', description: 'Until [YYYY-MM-DD]', type: 3, required: true }] },
    { name: 'loalist', description: 'Staff on LOA' },
    { name: 'endloa', description: 'End LOA', options: [{ name: 'staff', description: 'The user', type: 6, required: false }] },
    { name: 'slowmode', description: 'Set slowmode', options: [{ name: 'seconds', description: 'Duration', type: 4, required: true }] },
    { name: 'unmute', description: 'Remove timeout', options: [{ name: 'target', description: 'The user', type: 6, required: true }] },
    { name: 'ask-rules', description: 'Ask the AI about rules', options: [{ name: 'question', description: 'Question', type: 3, required: true }] },
    { name: 'summarize', description: 'AI summarizes last 50 messages' },
    { name: 'suggest', description: 'Submit suggestion', options: [{ name: 'idea', description: 'Your idea', type: 3, required: true }] },
    {
        name: 'staff-leaderboard',
        description: 'View the weekly and all-time leadership stats for the staff team'
    },
    {
        name: 'ping-all-staff',
        description: 'Ping all staff members and send them a DM',
        options: [
            {
                name: 'reason',
                description: 'The reason for summoning staff',
                type: 3, // 3 is the integer for STRING type
                required: true
            }
        ]
    },
    { name: 'ship', description: 'Matchmake users', options: [{ name: 'user1', description: 'User 1', type: 6 }, { name: 'user2', description: 'User 2', type: 6 }] },
    { name: 'messagereset', description: 'Wipe message counts' },
    { name: 'latest-update', description: 'Patch notes' },
    { name: 'latest-action', description: 'Last 5 mod actions' },
    { name: 'syncstats', description: 'Fetch stats', options: [{ name: 'audit', description: 'Kick new?', type: 5 }, { name: 'dryrun', description: 'Test?', type: 5 }, { name: 'debug', description: 'Show age?', type: 5 }] },
    { name: 'role', description: 'Modify roles', options: [{ name: 'action', description: 'Add/remove', type: 3, required: true, choices: [{ name: 'add', value: 'add' }, { name: 'remove', value: 'remove' }] }, { name: 'target', description: 'User', type: 6, required: true }, { name: 'role', description: 'Role', type: 8, required: true }] },
    { name: 'banlist', description: 'View bans' },
    { name: 'pfp', description: 'View PFP', options: [{ name: 'target', description: 'User', type: 6 }] },
    { name: 'userignore', description: 'Ignore from AI', options: [{ name: 'target', description: 'User', type: 6, required: true }] },
    { name: 'diceroll', description: 'Roll a die' },
    { name: 'randomletter', description: 'Get a letter' },
    { name: 'osqareksocials', description: 'Official links' },
    { name: 'reactionrole', description: 'Create role button', options: [{ name: 'text', description: 'Text', type: 3, required: true }, { name: 'role', description: 'Role', type: 8, required: true }, { name: 'channel', description: 'Channel', type: 7, required: true }, { name: 'time', description: 'Expiry', type: 4 }] },
    { name: 'aitoggle', description: 'Toggle AI chat', options: [{ name: 'status', description: 'ON/OFF', type: 5, required: true }] },
    { name: 'strike', description: 'Manage strikes', options: [{ name: 'add', description: 'Add strike', type: 1, options: [{ name: 'target', description: 'User', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3, required: true }] }, { name: 'remove', description: 'Remove strike', type: 1, options: [{ name: 'target', description: 'User', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3, required: true }] }] },
    { name: 'strikes', description: 'Check strike count', options: [{ name: 'target', description: 'User', type: 6, required: true }] },
    // { name: 'nuke-server', description: 'April Fools Wipe' }, //ARIIL FOOLS
    // { name: 'ban-prank', description: 'Fake ban notice', options: [{ name: 'target', description: 'Victim', type: 6, required: true }] }, //ARIIL FOOLS
    //{ name: 'keyboard-fix', description: 'Fix typing lag' }, //ARIIL FOOLS
    //{ name: 'reset-levels', description: 'Fake level reset', options: [{ name: 'target', description: 'Victim', type: 6 }] }, //ARIIL FOOLS
    // { name: 'nerd-mode', description: 'AI correction mode', options: [{ name: 'target', description: 'Victim', type: 6, required: true }] }, //ARIIL FOOLS
    //{ name: 'ping-all-staff', description: 'Emergency Ping' },  //APRIL FOOLS
    { name: 'userinfo', description: 'User details', options: [{ name: 'target', description: 'User', type: 6 }] },
    {
        name: 'nickname',
        description: 'Manually change a user\'s nickname or flag them as unpingable',
        options: [
            { name: 'target', description: 'The user to modify', type: 6, required: true },
            { name: 'name', description: 'New nickname (leave blank to reset)', type: 3, required: false },
            { name: 'moderate', description: 'Flag as unpingable? Sets name to ModeratedNickname#XXXX', type: 5, required: false },
            { name: 'reason', description: 'Reason for the nickname change/moderation', type: 3, required: false }
        ]
    },
    {
        name: 'emoji-names',
        description: 'Glitch nicknames or leave blank to restore. Optional: Moderate unpingable names.',
        options: [
            { name: 'prefix', description: 'Emoji for the front', type: 3, required: false },
            { name: 'suffix', description: 'Emoji for the back', type: 3, required: false }
        ]
    },
    { name: 'serverinfo', description: 'Server details' },
    { name: 'staffstats', description: 'View staff stats', options: [{ name: 'staff', description: 'User', type: 6 }] },
    { name: 'softban', description: 'Softban user', options: [{ name: 'target', description: 'User', type: 6, required: true }, { name: 'reason', description: 'Reason', type: 3 }] },
    { name: 'reminder', description: 'Set reminder', options: [{ name: 'time', description: 'When', type: 3, required: true }, { name: 'task', description: 'What', type: 3, required: true }] }
];

(async () => {
    try {
        const appId = '1268166506949120094';
        const guildId = '771423231114084353';

        console.log(`📡 DEPLOYING ${commands.length} COMMANDS TO GUILD: ${guildId}...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(appId, guildId),
            { body: commands }
        );

        console.log(`✨ SUCCESS: Registered ${data.length} commands!`);
        process.exit(0);
    } catch (err) {
        console.error('❌ DEPLOYMENT ERROR:');
        // This line is the magic - it reveals EXACTLY why Discord is unhappy.
        if (err.rawError && err.rawError.errors) {
            console.dir(err.rawError.errors, { depth: null });
        } else {
            console.error(err);
        }
        process.exit(1);
    }
})();

module.exports = { commands };
