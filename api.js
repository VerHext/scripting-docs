/**
 * @description
 * This is the first and only top-level function that should be called in your script,
 * everything else will be done in the function that is passed to it.
 * @example
 * registerPlugin({
 *     name: 'Demo Script',
 *     version: '1.0',
 *     description: 'This example actually does nothing',
 *     author: 'Author <author@example.com>',
 *     vars: []
 * }, function(sinusbot, config) {
 *     // your code goes here
 * });
 * @param {Manifest} manifest
 * The manifest determines which features are available to the script and
 * contains metadata and variables that will be shown in the web interface.
 * @param {mainFunction} mainFunction
 * If the script is activated this function is called when the scripts are loaded.
 * The function receives three parameters, the first one (`sinusbot`) is deprecated and should **not** be used anymore.
 */
function registerPlugin(manifest, mainFunction) { }

/**
 * @class
 * @mixin
 * @see registerPlugin
 * @param {string} name - Short name of your script
 * @param {string} author - Your name and your email address in the form of: `your name <your-email@example.com>`
 * @param {string} description - A longer description - tell the user what exactly your script does
 * @param {string} version - Start with something like 1.0 and increase it with every release
 * @param {boolean} [autorun] - Set to true, if you want the script to be run on every instance, without the option to disable it.
 * @param {string[]} [backends]
 * Per default scripts will only be available on TS3 instances.
 * If your script supports Discord (or in the future maybe other backends) as well, you have to specify this explicitly by setting this variable to an array containing all backends: `backends: ["ts3", "discord"]`
 * @param {boolean} [enableWeb]
 * If your script required own web content, you can set enableWeb to true and put files into the ./scripts/scriptname/html directory.
 * After restart, the script title will be clickable and lead to an index.html inside that html-directory you just created.
 * 
 * From there you have access to the localStorage variables containing the login and may communicate with the bot api from your own pages.
 * @param {string} [engine] - Sets the required engine version (bot version). This uses [Semantic Versioning](https://semver.org). Example: `engine: ">= 0.9.16"`
 * @param {boolean} [hidden]
 * Hides the script from the settings page. Should be used together with autorun.
 * 
 * Hidden scripts can not have variables (vars), since they'd never be shown and thus not configurable.
 * @param {string[]} [requiredModules]
 * Using this, you can define which restricted modules the script wants to use. If it's not allowed via the config, the script will not load at all but instead return an error on startup.
 * If you only optionally use features from restricted modules, don't use this but provide a fallback in your script.
 * @param {object[]} [vars] - More information about the usage of variables can be found [here](https://wiki.sinusbot.com/en:guides:features:scripts:variables).
 * @param {string[]} [voiceCommands]
 * This parameter is only used for the speech recognition feature and may contain one or more strings that are to be detected for the given script.
 * You can find more details on how to use it here: [Speech Recognition](https://wiki.sinusbot.com/en:guides:features:speechrecognition)
 */
class Manifest { }

/**
 * @callback mainFunction
 * @see registerPlugin
 * @param {object} [sinusbot] - This is **deprecated** and should **not** be used anymore.
 * @param {object} config - Configuration of the plugin that the user set from within the web interface
 * (given you have added anything to the vars field of your script manifest).
 * @param {object} manifest - Manifest as specified in registerPlugin.
 */
function mainFunction(sinusbot, config, manifest) {}

/**
 * @class
 * @mixin
 * @example
 * var engine = require('engine');
 * engine.log('Hello from a script!');
 */
class Engine {
    /**
     * @returns {string} Current instances' unique identifier
     */
    getInstanceID() { }
    /**
     * @returns {string} Current bots' unique identifier
     */
    getBotID() { }
    /**
     * Returns the name of the used backend (e.g. "ts3" or "discord")
     * @returns {string} Backend
     */
    getBackend() { }
    /**
     * @description
     * sets the log level of the instance
     * ```
     * level | what gets logged
     * ---|---
     * 0 | no log messages
     * 1 | errors only
     * 2 | errors and warnings
     * 3 | errors, warnings, information
     * 4 | ...
     * 10 | most verbose
     * 11 | most verbose + external backends
     * ```
     * @param {number} level - Log level to set
     * @returns {boolean}
     * 
     */
    setInstanceLogLevel(level) { }
    /**
     * @description
     * Sets the log level of the bot
     * ```
     * level | what gets logged
     * ---|---
     * 0 | no log messages
     * 1 | errors only
     * 2 | errors and warnings
     * 3 | errors, warnings, information
     * 4 | ...
     * 10 | most verbose
     * 11 | most verbose + external backends
     * ```
     * @param {number} level - Log level to set
     * @returns {boolean}
     */
    setBotLogLevel(level) { }
    /**
     * Returns the log level of the instance
     * @returns {number} The set loglevel
     */
    getInstanceLogLevel() { }
    /**
     * Returns the log level of the bot
     * @returns {number} The set loglevel
     */
    getBotLogLevel() { }
    /**
     * Reloads all scripts; requires the corresponding setting in the config.ini to be enabled
     * @returns {boolean}
     */
    reloadScripts() { }
    /**
     * Returns the configured nickname - to get the actual nickname, use the backend module
     * @returns {string}
     */
    getNick() { }
    /**
     * Sets the nick to a new value and updates it on the server
     * @param {string} nick - New nick
     * @returns {boolean}
     */
    setNick(nick) { }
    /**
     * Sets the default channel by its ID
     * @param {string} channelID
     * @returns {boolean}
     */
    setDefaultChannelID(channelID) { }
    /**
     * Returns true if the backend of this instance has been started
     * @returns {boolean}
     */
    isRunning() { }
    /**
     * Sends a notification to all users that are currently using the webinterface; use this for startup errors
     * @param {string} message - Message to send
     */
    notify(message) { }
    /**
     * Stores the given object as configuration for the current script
     * @param {object} config
     * @returns {boolean}
     */
    saveConfig() { }
    /**
     * Logs to stdout / instance log
     * @param {any} log
     */
    log(log) { }
    /**
     * Exports an object, so other Scripts are able to use functions or values of the Script
     * @param {object} obj - object which should get exported
     * @example
     * // scriptname: exportscript.js
     * var engine = require('engine');
     * var publicvariable = 'I get exportet!';
     * engine.export({
     *     // returns the value of 'publicvariable'
     *     get: function get() {
     *         return publicvariable;
     *     },
     *     // modifies the value of 'publicvariable'
     *     set: function get(value) {
     *         publicvariable = value;
     *     }
     * })
     * @example
     * var event = require('event');
     * var engine = require('engine');
     * event.on('load', function() {
     *     // must always be loaded AFTER the 'load' event
     *     var script = require('exportscript.js');
     *     engine.log(script.get()); // logs 'I get exportet!'
     *     script.set('New Value');
     *     engine.log(script.get()); // logs 'New Value'
     * });
     */
    export(obj) { }
    /**
     * @description
     * removes the current avatar image
     * @returns {boolean}
     */
    removeAvatar() { }
    /**
     * @description
     * sets the avatar image to the album art of a given track
     * @param {Track} track - Track to extract the album art from
     * @returns {boolean}
     */
    setAvatarFromTrack(track) { }
    /**
     * @description
     * sets the avatar image to the manually uploaded image
     * @returns {boolean}
     */
    setDefaultAvatar() { }
    /**
     * @description
     * sets the avatar to the rendered output of a banner template
     * @param {string} bannerName - banner template to use
     * @returns {boolean}
     * @version 0.12.0
     */
    setAvatarFromBanner(bannerName) { }
    /**
     * @description
     * sets the avatar to the given image as URL
     * @param {string} url - image url
     * @returns {boolean}
     * @version 0.14.0
     */
    setAvatarFromURL(url) { }
    /**
     * @description Gets the users of the SinusBot
     * @version 0.13.37
     * @returns {User[]}
     */
    getUsers() { }
    /**
     * @description Gets a SinusBot user by his ID
     * @version 0.13.37
     * @param {string} id - ID of the SinusBot user
     * @returns {?User}
     */
    getUserById(id) { }
    /**
     * @description Gets a Sinusbot user by his name.
     * @version 0.13.37
     * @param {string} name - Name of the user
     * @returns {?User}
     */
    getUserByName(name) { }
    /**
     * @description Sets the command prefix.
     * @version 0.14.0
     * @param {string} prefix - Command prefix
     */
    setCommandPrefix(prefix) { }
    /**
     * @description Gets the command prefix.
     * @version 0.14.0
     * @returns {string} Command prefix
     */
    getCommandPrefix() { }
}


/**
 * @class
 * @mixin
 * @example
 * var store = require('store');
 * store.set('foo', 'bar');
 */
class Store {
    /**
     * Stores a variable under the given key
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean}
     * @example
     * var store = require('store');
     * store.set('foo', 'bar');
     */
    set(key, value) { }
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found
     * @example
     * var store = require('store');
     * var foo = store.get('foo');
     */
    get(key) { }
    /**
     * Deletes a stored variable by its key
     * the values stored are only available for the current script, but shared between instances of it
     * @param {string} key
     */
    unset(key) { }
    /**
     * Returns an array of all set keys
     * the values stored are only available for the current script, but shared between instances of it
     * @returns {string[]} Array of all stored keys
     */
    getKeys() { }
    /**
     * Returns all stored items
     * the values stored are only available for the current script, but shared between instances of it
     * @returns {object} Keys of this object are the keys of each entry
     */
    getAll() { }
    /**
     * Stores a variable under the given key
     * the values stored are available for every script of every instance
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean} 
     */
    setGlobal(key, value) { }
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are available for every script of every instance
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found 
     */
    getGlobal(key) { }
    /**
     * Deletes a stored variable by its key
     * the values stored are available for every script of every instance
     * @param {string} key
     */
    unsetGlobal(key) { }
    /**
     * Returns an array of all set keys
     * the values stored are available for every script of every instance
     * @returns {string[]} Array of all stored keys
     */
    getKeysGlobal() { }
    /**
     * Returns all stored items
     * the values stored are available for every script of every instance
     * @returns {object} Keys of this object are the keys of each entry
     */
    getAllGlobal() { }
    /**
     * Stores a variable under the given key
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     * @param {any} value - Value to be stored; must be JSON.stringify()-able
     * @returns {boolean} 
     */
    setInstance(key, value) { }
    /**
     * Gets a variable that has been stored previously by set()
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     * @returns {any} Stored value - or undefined, if not found 
     */
    getInstance(key) { }
    /**
     * Deletes a stored variable by its key
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @param {string} key
     */
    unsetInstance(key) { }
    /**
     * Returns an array of all set keys
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @returns {string[]} Array of all stored keys
     */
    getKeysInstance() { }
    /**
     * Returns all stored items
     * the values stored are available only for the current instance of the script (not shared between instances and / or other scripts)
     * @returns {object} Keys of this object are the keys of each entry
     */
    getAllInstance() { }
}

/**
 * @class
 * @mixin
 */
class Backend {
    /**
     * @description Connects to the server
     * @returns {boolean}
     */
    connect() { }
    /**
     * @description Disconnects from the server
     * @returns {boolean}
     */
    disconnect() { }
    /**
     * Returns true if the backend is connected to a server
     * @returns {boolean}
     */
    isConnected() { }
    /**
     * @returns {string} Current bots' unique identifier
     */
    getBotClientID() { }
    /**
     * @returns {Client} Client of the bot
     */
    getBotClient() { }
    /**
     * Returns the actual nickname; To get the configured nickname, use engine.getNick() instead.
     * @returns {string}
     */
    getNick() { }
    /**
     * Returns a channel if found
     * @param {string} id
     * @returns {Channel}
     * @example
     * var backend = require('backend');
     * var channel = backend.getChannelByID('6');
     */
    getChannelByID(id) { }
    /**
     * Returns the (primary) channel the bot is in
     * @returns {Channel}
     * @example
     * var backend = require('backend');
     * var channel = backend.getCurrentChannel();
     */
    getCurrentChannel() { }
    /**
     * Returns the matching channel if found
     * @param {string} name
     * @returns {Channel?}
     * @see Backend#getChannelsByName()
     * @example
     * var backend = require('backend');
     * var channel = backend.getChannelByName('Welcome Channel');
     */
    getChannelByName(name) { }
    /**
     * Returns an array of channels matching the name
     * @param {string} name
     * @returns {Channel[]}
     * @version 0.14.0
     * @example
     * var backend = require('backend');
     * var channels = backend.getChannelsByName('foobar');
     */
    getChannelsByName(name) { }
    /**
     * Returns the total number of channels
     * @returns {number}
     * @example
     * var backend = require('backend');
     * var count = backend.getChannelCount();
     */
    getChannelCount() { }
    /**
     * Returns all channels
     * @returns {Channel[]}
     * @example
     * // Logs the name of all channels
     * 
     * var backend = require('backend');
     * var engine = require('engine');
     * var channels = backend.getChannels();
     * 
     * channels.forEach(function(channel) {
     *     engine.log(channel.name());
     * });
     */
    getChannels() { }
    /**
     * Returns all clients
     * @returns {Client[]}
     * @example
     * // Gets a list of all clients and sends them a message
     * 
     * var backend = require('backend');
     * var clients = backend.getClients();
     * 
     * clients.forEach(function(client) {
     *     client.chat('Hello ', + client.name() + '. I\'m a SinusBot!');
     * });
     */
    getClients() { }
    /**
     * Returns a client by its temporary ID (changes when the client reconnects)
     * @param {string} id
     * @returns {Client}
     */
    getClientByID(id) { }
    /**
     * Returns a client by its name/nickname
     * @param {string} name
     * @returns {Client}
     */
    getClientByName(name) { }
    /**
     * Alias of getClientByName
     * @param {string} name
     * @returns {Client}
     */
    getClientByNick(name) { }
    /**
     * Returns an (online) client by its permanent id
     * @param {string} uniqueID
     * @returns {Client}
     */
    getClientByUniqueID(uniqueID) { }
    /**
     * Alias of getClientByUniqueID
     * @param {string} uniqueID
     * @returns {Client}
     */
    getClientByUID(uniqueID) { }
    /**
     * @description Sends a message to the server
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * backend.chat('Hello from SinusBot!');
     */
    chat(msg) { }
    /**
     * @description Creates a new channel
     * @version 0.9.16.3
     * @param {ChannelParams} channelParams
     * @returns {Channel} - Channel which was created
     */
    createChannel(channelParams) { }
    // TODO: change ID to Id; Support for both versions!
    /**
     * Returns a servergroup by its ID
     * @param {string} id ServerGroup ID
     * @returns {ServerGroup}
     */
    getServerGroupByID(id) { }
    // TODO: change ID to Id; Support for both versions!
    /**
     * Returns a channelgroup by its ID
     * @param {string} id - ChannelGroup ID
     * @returns {ChannelGroup}
     */
    getChannelGroupByID(id) { }
    /**
     * Returns an array of all known server groups
     * @returns {ServerGroup[]}
     */
    getServerGroups() { }
    /**
     * Returns an array of all known channel groups
     * @returns {ChannelGroup[]}
     */
    getChannelGroups() { }
}

/**
 * @class
 * @mixin
 */
class Media {
    /**
     * @description Plays a track via internal url
     * @param {string} url - Internal url (like track://...)
     * @returns {boolean}
     */
    playURL(url) { }
    /**
     * Returns the current track
     * @returns {Track}
     */
    getCurrentTrack() { }
    /**
     * Returns the track with the given ID (or null if none was found)
     * @returns {?Track}
     */
    getTrackByID(id) { }
    /**
     * @description Searches for tracks matching the search term, returns 20 entries at most
     * @param {string} searchString
     * @returns {Track[]}
     * @example
     * var event = require('event');
     * var media = require('media');
     * 
     * event.on('chat', function(ev) {
     *     var params = ev.text.split(' ');
     *     if (params.length == 1) {
     *         ev.client.chat('Please enter a searchterm after .play - like .play november rain');
     *         return;
     *     }
     *     if (params[0] == '.play') {
     *         params.shift();
     *         var results = media.search(params.join(' '));
     *         if (results.length > 0) {
     *             results[0].play();
     *             ev.client.chat('Playing - just for you: ' + results[0].artist() + ' - ' + results[0].title());
     *         } else {
     *             ev.client.chat('Sorry, I could not find anything that matched your search.');
     *         }
     *     }
     * });
     */
    search(searchString) { }
    /**
     * @description Adds the given url to the queue
     * @param {string} url
     * @returns {boolean}
     */
    enqueue(url) { }
    /**
     * @description Adds the given url as the first entry in the queue
     * @param {string} url
     * @returns {boolean}
     * @version 0.12.0
     */
    playAsNext(url) { }
    /**
     * @description Plays the next track of the queue / playlist
     */
    playNext() { }
    /**
     * @description Plays the next previous of the queue / playlist
     */
    playPrevious() { }
    /**
     * @description Stops playback completely
     * @param {string} trackID - (optional) the track to stop; if not present, all tracks will be stopped
     * @returns {boolean}
     */
    stop(trackID) { }
    /**
     * Returns all tracks of the queue
     * @returns {Track[]}
     */
    getQueue() { }
    /**
     * Returns all playlists
     * @returns {Playlist[]}
     */
    getPlaylists() { }
    /**
     * Returns the playlists with the given id
     * @returns {Playlist}
     */
    getPlaylistByID(id) { }
    /**
     * Returns the currently active playlist
     * @returns {Playlist}
     */
    getActivePlaylist(id) { }
    /**
     * @description Removes the track at a given position from the queue
     * @param {number} index - Index of the track that should be removed from the queue (0 being the first entry)
     * @returns {boolean}
     */
    removeFromQueue(index) { }
    /**
     * @description Removes all entries from the queue
     * @returns {boolean}
     */
    clearQueue() { }
    /**
     * @description Clears the current playlist (if set) so that playback won't continue inside that playlist
     * @returns {boolean}
     */
    clearPlaylist() { }
    /**
     * @description Streams a file via youtube-dl
     * @param {string} url - Url that youtube-dl supports
     */
    yt(url) { }
    /**
     * @description Downloads a file via youtube-dl, optionally plays it
     * @param {string} url - Url that youtube-dl supports
     * @param {boolean} play - Set to true to play after download
     */
    ytdl(url, play) { }
    /**
     * @description Enqueues a stream via youtube-dl
     * @param {string} url - Url that youtube-dl supports
     */
    enqueueYt(url) { }
    /**
     * @description Downloads a file via youtube-dl, then enqueues it
     * @param {string} url - Url that youtube-dl supports
     */
    enqueueYtdl(url) { }
}

/**
 * @class
 * @mixin
 */
class Audio {
    /**
     * @description Applies an audiofilter to the audio output
     * @param {string} filter - ffmpeg compatible filter string
     * @returns {boolean}
     */
    setAudioFilter(filter) { }
    /**
     * @description Enables or disables audio return channel; required for speech recognition engine / recording
     * @param {number} flags - bitmask; use 0x01 for general audio return (recording) or 0x02 for separated audio (for speech recognition) - 0x03 for both
     * @returns {boolean}
     * @version 0.13.37
     */
    setAudioReturnChannel(flags) { }
    /**
     * @description Starts recording to a file
     * @returns {boolean}
     */
    startRecording() { }
    /**
     * @description Stops recording to a file
     * @returns {boolean}
     */
    stopRecording() { }
    /**
     * @description Streams audio output to an icecast-server
     * @param {string} url - Endpoint to stream to
     * @param {string} username - Username used for authentication
     * @param {string} password - Password
     * @returns {boolean}
     */
    streamToServer(url, username, password) { }
    /**
     * @description Stops streaming started with streamToServer 
     * @returns {boolean}
     */
    stopStream() { }
    /**
     * Returns the state of repeat-mode
     * @returns {boolean}
     */
    isRepeat() { }
    /**
     * @description Sets the state of repeat-mode
     * @param {boolean} val
     */
    setRepeat(val) { }
    /**
     * Returns the state of shuffle-mode
     * @returns {boolean}
     */
    isShuffle() { }
    /**
     * @description Sets the state of shuffle-mode
     * @param {boolean} val
     */
    setShuffle(val) { }
    /**
     * Returns the current volume (0-100)
     * @returns {number} volume
     */
    getVolume() { }
    /**
     * @description Sets the volume (0-100)
     * @param {number} volume
     * @returns {boolean}
     */
    setVolume(volume) { }
    /**
     * Returns the position of the current track
     * @returns {number} position (in seconds)
     */
    getTrackPosition() { }
    /**
     * @description Seeks to a specific position
     * @param {number} pos - New position (in seconds)
     */
    seek(pos) { }
    /**
     * Returns if the audio output has been muted
     * @returns {boolean}
     */
    isMute() { }
    /**
     * @description Enables/disables mute
     * @param {boolean} mute
     * @returns {boolean}
     */
    setMute() { }
    /**
     * @returns {boolean} Whether the bot is playing music
     */
    isPlaying() { }
    /**
     * @description Plays audio returned from the text-to-speech engine
     * @param {string} text - Text to say
     * @param {string} [locale] - Locale to use
     */
    say(text, locale) { }
    /**
     * @description Returns the client count of the connected server
     * @returns {number} client count
     */
    getClientCount() { }
    /**
     * @description Sets the volume of a specific stream (0-100)
     * @param {string} streamID - name or alias of the stream(s) to modify
     * @param {number} volume
     * @returns {boolean}
     */
    setStreamVolume(streamID, volume) { }
}

/**
 * @class
 * @mixin
 */
class Format {
    /**
     * @description Apply color if the backend supports it
     * @param {string} text - Text that should be colored
     * @param {string} color - Hex value of color to apply
     * @returns {string} Formatted string
     * @example
     * // Sends a red-colored message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('This is SinusBot writing in ' + format.formatColor('red', '#aa0000'));
     */
    color(text, color) { }
    /**
     * @description Apply italic formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formattes message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.italic('italic')); 
     */
    italic(text) { }
    /**
     * @description Apply bold formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formattes message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.bold('bold')); 
     */
    bold(text) { }
    /**
     * @description Apply underlined formatting to text
     * @param {string} text
     * @returns {string} Formatted string
     * @example
     * // Sends a formatted message to the server chat (requires permission to do so)
     * var backend = require('backend');
     * var format = require('format');
     * backend.chat('Part of this message is ' + format.underline('underlined')); 
     */
    underline(text) { }
    /**
     * @description Formats text as code
     * @param {string} text
     * @returns {string} Formatted string
     */
    code(text) { }
}

/**
 * @class
 * @mixin
 */
class Helpers {
    /**
     * @description Returns a random integer between zero and <max>
     * @param {number} max
     * @returns {number} Random integer
     */
    getRandom(max) { }
    /**
     * @description Gets the string representation of an object
     * @param {object} input
     * @returns {string}
     */
    toString(input) { }
    /**
     * @description Encodes a string to base64
     * @param {string} input
     * @returns {string}
     */
    base64Encode(input) { }
    /**
     * @description Decodes a string from base64
     * @param {string} input
     * @returns {string}
     */
    base64Decode(input) { }
    /**
     * @description Encodes a string to hex
     * @param {string} input
     * @returns {string}
     */
    hexEncode(input) { }
    /**
     * @description Decodes a string from hex
     * @param {string} input
     * @returns {string}
     */
    hexDecode(input) { }
    /**
     * @description Generate a hex-encoded MD5 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    MD5Sum(input) { }
    /**
     * @description Generate a hex-encoded SHA1 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    SHA1Sum(input) { }
    /**
     * @description Generate a hex-encoded SHA256 checksum of the given input
     * @param {string} input
     * @returns {string}
     */
    SHA256Sum(input) { }
}

/**
 * @class
 * @mixin
 * @fires api:eventName
 * @fires discord:eventName
 * @fires chat
 * @fires poke
 * @fires typing
 * @fires track
 * @fires trackInfo
 * @fires trackEnd
 * @fires ytdl.success
 * @fires ytdl.error
 * @fires connect
 * @fires connectionFailed
 * @fires disconnect
 * @fires clientMove
 * @fires clientNick
 * @fires clientVisible
 * @fires clientInvisible
 * @fires clientKicked
 * @fires clientKickedFromChannel
 * @fires clientIPAddress
 * @fires clientAway
 * @fires clientBack
 * @fires clientRecord
 * @fires clientRecordStop
 * @fires clientMute
 * @fires clientUnmute
 * @fires clientDeaf
 * @fires clientUndeaf
 * @fires serverGroupAdded
 * @fires serverGroupRemoved
 * @fires channelCreate
 * @fires channelUpdate
 * @fires channelDelete
 * @fires speech
 * @fires talkerCount
 * @fires unload
 * @fires load
 * @example
 * var event = require('event');
 * var engine = require('engine');
 * 
 * event.on('chat', function(ev) {
 *     engine.log('Got message "'+ev.text +'" from '+ ev.client.name());
 * })
 */
class Event {
    /**
     * @description Registers an event listener
     * @param {string} eventName - Event to listen to
     * @param {function} callback - Gets called when the given event is triggered
     */
    on(eventName, callback) { }
    /**
     * @description Emits an event to the current instance
     * @param {string} eventName - Name of the event to be emitted
     * @param {object} data - A data object to be sent with the event
     */
    emit(eventName, data) { }
    /**
     * @description Emits an event to all instances
     * @param {string} eventName - Name of the event to be emitted
     * @param {object} data - A data object to be sent with the event
     */
    broadcast(eventName, data) { }
}

/**
 * @class
 * @mixin
 * @description This type is passed to the `api:$eventName`-event, see {@link Event.api:eventName} for more.
 */
class APIEvent {
    /**
     * @returns {string} Name of the event
     */
    name() { }
    /**
     * @returns {object} Json body
     */
    data() { }
    /**
     * @returns {User} User that called the event (or null, if unset)
     */
    user() { }
    /**
     * @returns {string} Remote address that triggered the call
     */
    remoteAddr() { }
}

/**
 * @event api:$eventName
 * @memberof Event
 * @param {APIEvent}
 * @description Gets fired whenever api:$eventName is triggered by via the web api
 */
/**
 * @event chat
 * @memberof Event
 * @param {Message} msg - Message
 * @description
 * This event gets triggered whenever a chat message has been received.
 * This also counts for messages from the bot itself, so make sure to check.
 * @example
 * var event = require('event');
 * var engine = require('engine');
 * 
 * event.on('chat', function(ev) {
 *     engine.log('Got message "'+ev.text +'" from '+ ev.client.name());
 * });
 */
/**
 * @event poke
 * @memberof Event
 * @param {Message} msg - Message
 * @description Gets fired whenever the bot is poked
 * @example
 * var event = require('event');
 * var engine = require('engine');
 * 
 * event.on('poke', function(ev) {
 *     engine.log('Got poke message "'+ev.text +'" from '+ ev.client.name());
 * });
 */
/**
 * @event typing
 * @memberof Event
 * @param {Client} client - Client that started typing
 * @description Gets fired whenever a client starts typing in a chat with the bot
 */
/**
 * @event track
 * @memberof Event
 * @param {Track} track
 * @description Gets fired whenever a new track starts
 */
/**
 * @event trackInfo
 * @memberof Event
 * @param {Track} track
 * @description Gets fired whenever a track changes its information (like radio stations)
 */
/**
 * @event trackEnd
 * @memberof Event
 * @param {Track} track
 * @param {string} callback - Callback string
 * @description Gets fired whenever a track has stopped playing
 */
/**
 * @event ytdl.success
 * @memberof Event
 * @param {string} url
 * @param {string} jobId
 * @param {string} trackId
 * @description Gets fired whenever a track was successfully downloaded via ytdl
 */
/**
 * @event ytdl.error
 * @memberof Event
 * @param {string} url
 * @param {string} jobId
 * @param {string} trackId
 * @description Gets fired whenever a download via ytdl fails
 */
/**
 * @event connect
 * @memberof Event
 * @description Gets fired whenever a connection with the server has been established
 */
/**
 * @event connectionFailed
 * @memberof Event
 * @param {string} reason
 * @description Gets fired whenever the client is unable to connect to a server
 */
/**
 * @event disconnect
 * @memberof Event
 * @description Gets fired whenever the bots connection to the server is closed
 */
/**
 * @event clientMove
 * @memberof Event
 * @param {MoveInfo} moveInfo
 * @description Gets fired whenever a client moves, joins or disconnects
 */
/**
 * @event clientNick
 * @memberof Event
 * @param {Client} client
 * @param {string} oldNick
 * @description Gets fired whenever a clients nickname is changed
 */
/**
 * @event clientVisible
 * @memberof Event
 * @param {MoveInfo} moveInfo
 * @description Gets fired whenever a client becomes visible to the bot
 */
/**
 * @event clientInvisible
 * @memberof Event
 * @param {MoveInfo} moveInfo
 * @description Gets fired whenever a client becomes invisible to the bot
 */
/**
 * @event clientKicked
 * @memberof Event
 * @param {MoveInfo} moveInfo
 * @description Gets fired whenever a client gets kicked from the server
 */
/**
 * @event clientKickedFromChannel
 * @memberof Event
 * @param {MoveInfo} moveInfo
 * @description Gets fired whenever a client gets kicked from a channel
 */
/**
 * @event clientIPAddress
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a clients IP address changes or has initially been fetched
 */
/**
 * @event clientAway
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client sets himself as away
 */
/**
 * @event clientBack
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client removes himself as away
 */
/**
 * @event clientRecord
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client starts recording
 */
/**
 * @event clientRecordStop
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client stops recording
 */
/**
 * @event clientMute
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client mutes his microphone
 */
/**
 * @event clientUnmute
 * @memberof Event
 * @param {Client} client
 * @description Gets fired whenever a client unmutes his microphone
 */
/**
 * @event clientDeaf
 * @memberof Event
 * @version 0.9.18
 * @param {Client} client
 * @description Gets fired whenever a client mutes his sound
 */
/**
 * @event clientUndeaf
 * @memberof Event
 * @version 0.9.18
 * @param {Client} client
 * @description Gets fired whenever a client unmutes his sound
 */
/**
 * @event serverGroupAdded
 * @memberof Event
 * @param {ClientServerGroupEvent} event
 * @description Gets fired whenever a client got added to a server group
 */
/**
 * @event serverGroupRemoved
 * @memberof Event
 * @param {ClientServerGroupEvent} event
 * @description Gets fired whenever a client got removed from a server group
 */
/**
 * @event channelCreate
 * @memberof Event
 * @param {Channel} channel - Channel that got created
 * @param {Client} invoker - Client that created the channel
 * @description Gets fired whenever a channel is created
 */
/**
 * @event channelUpdate
 * @memberof Event
 * @param {Channel} channel - Channel that got updated
 * @param {Client} invoker - Client that updated the channel
 * @description Gets fired whenever a channel is updated
 */
/**
 * @event channelDelete
 * @memberof Event
 * @param {Channel} channel - Channel that got deleted
 * @param {Client} invoker - Client that deleted the channel
 * @description Gets fired whenever a channel is deleted
 */
/**
 * @event speech
 * @memberof Event
 * @param {object} ev - Event data
 * @param {Client} ev.client - Client
 * @param {string} ev.text - Recognized text
 * @version 0.13.37
 * @description
 * This event gets triggered whenever the bot recognizes a voice command that the script registered, assuming:
 * 1) SpeechRecognition was installed
 * 2) SpeechRecognition is enabled in the config.ini
 * 3) The voice command was registered by the script in registerPlugin
 * 4) AudioReturnChannel is set to 2
 * 
 * Check out [the wiki article](https://wiki.sinusbot.com/en:guides:features:speechrecognition) for more the complete list of reqirements and instructions on how to install it.
 * @example
 * var event = require('event');
 * var engine = require('engine');
 * var audio = require('audio');
 * 
 * audio.setAudioReturnChannel(2)
 * 
 * event.on('speech', function(ev) {
 *     engine.log('Got speech command "' + ev.text + '" from ' + ev.client.name());
 * });
 */
/**
 * @event talkerCount
 * @memberof Event
 * @param {number} number - Number of users that are currently talking in the channel
 * @description Gets fired whenever the number of users that are currently talking in the channel changes
 */
/**
 * @event unload
 * @memberof Event
 * @description Gets fired whenever the script is going to be unloaded or reloaded; use this to clean up or save stuff
 */
/**
 * @event load
 * @memberof Event
 * @description Gets fired when all scripts have been loaded
 */
/**
 * @event discord:$eventName
 * @memberof Event
 * @param {object} ev - Discord event data
 * @description
 * This event gets triggered whenever a discord event got received.
 * Every event will be emitted in uppercase and the spaces will be replaced by underscores.
 * All available discord events are documentated here: https://discordapp.com/developers/docs/topics/gateway#events
 * @example
 * var event = require('event');
 * var engine = require('engine');
 * 
 * event.on('discord:GUILD_CREATE', function (ev) {
 *   engine.log('GUILD_CREATE' + JSON.stringify(ev));
 * });
 */
/**
 * @event ws.connect
 * @memberof Event
 * @version 0.9.20
 * @see WS
 * @param {string} id - ID of the new connection
 */
/**
 * @event ws.close
 * @memberof Event
 * @version 0.9.20
 * @see WS
 * @param {string} id - ID of the closed connection
 */
/**
 * @event ws.error
 * @memberof Event
 * @version 0.9.20
 * @see WS
 * @param {string} id - ID of the connection
 * @param {string} error - Error
 */
/**
 * @event ws.data
 * @memberof Event
 * @version 0.9.20
 * @see WS
 * @param {string} id - ID of the connection
 * @param {number} type - Type of the message
 * @param {Bytes} data - Data object
 */

/**
 * @class
 * @mixin
 * @property {string} text - Text of the message
 * @property {Channel} channel - Channel (if given) this message has been sent on
 * @property {Client} client - Client that sent the message
 * @property {number} mode - Number representing the way this message has been sent
 * (1 = private, 2 = channel, 3 = server)
 */
class Message { }

/**
 * @class
 * @mixin
 * @property {?Channel} fromChannel - Old channel (or null if the client just got online / changed visibility)
 * @property {?Channel} toChannel - New channel (or null if the client just went offline / changed visibility)
 * @property {Client} client - Client that was moved
 * @property {Client} invoker - Client that invoked the move
 */
class MoveInfo { }

/**
 * @class
 * @mixin
 * @description Note: if the client is inivisible to the bot, some fields might not be available.
 */
class Client {
    /**
     * @returns {string} Name/nickname of the client
     */
    name() { }
    /**
     * Alias of name()
     * @returns {string} Name/nickname of the client
     */
    nick() { }
    /**
     * @returns {string} Phonetic name of the client; useful for tts
     */
    phoneticName() { }
    /**
     * @returns {string} Temporary ID of the client
     */
    id() { }
    /**
     * Alias of uniqueId()
     * @returns {string} Unique ID of the client
     */
    uid() { }
    /**
     * @returns {string} Unique ID of the client
     */
    uniqueId() { }
    // TODO: change ID to Id; Support for both versions!
    /**
     * @returns {string} TeamSpeak database ID of the client
     */
    databaseID() { }
    /**
     * @returns {string} Country of the client
     */
    country() { }
    /**
     * @returns {string} Description of the client
     */
    description() { }
    /**
     * @param {string} description
     * @version 0.9.19
     */
    setDescription(description) { }
    /**
     * @returns {number} Number of times the client has connected
     */
    getTotalConnectionsCount() { }
    /**
     * Returns true when this client is the bot itself
     * @returns {boolean}
     */
    isSelf() { }
    /**
     * Returns if the client is recording the conversation
     * @returns {string}
     */
    isRecording() { }
    /**
     * Returns if the client is muted (has its microphone disabled)
     * @returns {boolean}
     */
    isMuted() { }
    /**
     * Returns if the client is deaf (has its loudspeakers disabled)
     * @returns {boolean}
     */
    isDeaf() { }
    /**
     * Returns if the client is away
     * @returns {boolean}
     */
    isAway() { }
    /**
     * Returns the clients' servergroups
     * @returns {ServerGroup[]}
     */
    getServerGroups() { }
    /**
     * Returns the clients' channelgroup
     * @returns {ChannelGroup}
     */
    getChannelGroup() { }
    /**
     * Returns the clients' away message (if set)
     * @returns {string}
     */
    getAwayMessage() { }
    /**
     * Returns the clients' last ping time (latency)
     * @returns {number}
     */
    getPing() { }
    /**
     * Returns the clients' ip address (if available)
     * @returns {string}
     */
    getIPAddress() { }
    /**
     * Returns the clients' online time (requires special permissions)
     * @returns {number} in milliseconds
     */
    getOnlineTime() { }
    /**
     * Returns the clients' current idle time (requires special permissions)
     * @returns {number} in milliseconds
     */
    getIdleTime() { }
    /**
     * Returns the clients' packet loss percentage (requires special permissions)
     * @returns {number}
     */
    getPacketLoss() { }
    /**
     * Returns the clients' amount of received data (requires special permissions)
     * @returns {number}
     */
    getBytesReceived() { }
    /**
     * Returns the clients' amount of sent data (requires special permissions)
     * @returns {number}
     */
    getBytesSent() { }
    /**
     * Returns the total number of connections from that client
     * On TS3, this information has to be actively requested from the server. If the bot is unable to get it or hasn't received an answer in time, it will return <= 0 here.
     * @returns {number}
     */
    getTotalConnections() { }
    /**
     * Returns the time the client has been created / was first seen by the server
     * On TS3, this information has to be actively requested from the server. If the bot is unable to get it or hasn't received an answer in time, it will return <= 0 here.
     * @returns {number}
     */
    getCreationTime() { }
    /**
     * Returns an array of all channels the client is in; even if TS only uses one channel for a client at a time, other backends might provide several
     * @returns {Channel[]} Array of channels
     */
    getChannels() { }
    /**
     * @returns {Channel} Current audio channel the client is in
     */
    getAudioChannel() { }
    /**
     * Returns the TS3 client URL in the format `client://0/uid~nickname`
     * @returns {string} Client URL
     */
    getURL() { }
    /**
     * @description Compares two clients
     * @param {Client} otherClient
     * @returns {boolean} true, if both clients are the same
     */
    equals(otherClient) { }
    /**
     * @description Sends a message to the client
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.chat('Hello, ' + client.name());
     */
    chat(msg) { }
    /**
     * @description Pokes the client with a message
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.chat('Pokeypoke, ' + client.name() + '!');
     */
    poke(msg) { }
    /**
     * @description Bans a client
     * @param {number} time - Amount of time the ban should last
     * @param {string} msg - Message to send
     * @example
     * var backend = require('backend');
     * var client = backend.getClientByName('Bob');
     * client.ban(100, 'See you in 100 seconds, ' + client.name() + '!');
     */
    ban(time, msg) { }
    /**
     * @description Kicks the client from the server 
     * @param {string} msg - Message to send
     */
    kick(msg) { }
    /**
     * @description Kicks the client from the server
     * @param {string} msg - Message to send
     */
    kickFromServer(msg) { }
    /**
     * @description Kicks the client from the channel
     * @param {string} msg - Message to send
     */
    kickFromChannel(msg) { }
    /**
     * @description Adds a client to a specific ServerGroup
     * @param {(ServerGroup|string|number)} group - Servergroup the client should be added to
     */
    addToServerGroup(group) { }
    /**
     * @description Removes a client from a specific ServerGroup
     * @param {(ServerGroup|string|number)} group - Servergroup the client should be removed from
     */
    removeFromServerGroup(id) { }
    /**
     * @description Moves a client to another channel
     * @param {Channel} target - Channel the client should be moved to
     * @param {string} [password] - Password for the target channel, if required
     */
    moveTo(target, password) { }
    /**
     * @description Enables / disables subscription for this client; requires subscription mode
     * @param {boolean} val
     */
    setSubscription(val) { }
    /**
     * @description Returns the platform of the client (Windows, Linux, MacOS)
     * @returns {string} platform
     */
    getPlatform() { }
    /**
     * @description Returns the version of the client
     * @returns {string} version
     */
    getVersion() { }
    /**
     * @description Returns the client type (Query=0; Normal=1)
     * @returns {string} client type
     */
    type() { }
}

/**
 * @class
 * @mixin
 * @property {client} client - Client that has been added / removed
 * @property {client} invoker - Client that added client to the group
 * @property {serverGroup} serverGroup - Server Group
 */
class ClientServergroupEvent { }

/**
 * @class
 * @mixin
 */
class Channel {
    /**
     * @returns {string} ID
     */
    id() { }
    /**
     * @returns {string} Name
     */
    name() { }
    /**
     * @returns {?Channel} Parent of channel or null if none is set
     */
    parent() { }
    /**
     * @version 0.9.16.3
     * @returns {number} Order / position of this channel.
     * For ts3 this is a numeric value determining the order in which channels are displayed below their parent. To set a new value, please use moveTo.
     */
    position() { }
    /**
     * @description delete the current channel
     * @version 0.9.17
     * @returns {boolean}
     */
    delete() { }
    /**
     * @description Moves the channel to a new parent with a new position value
     * @version 0.9.16.3
     * @param {(string|Channel)} parent - New parent channel
     * @param {number} order - New order value
     */
    moveTo(parent, order) { }
    /**
     * @param {string} name
     * @version 0.9.16
     */
    setName(name) { }
    /**
     * @returns {number} Type (0 = voice, 1 = text)
     */
    type() { }
    /**
     * @returns {string} Topic
     */
    topic() { }
    /**
     * @param {string} topic
     * @version 0.9.16
     */
    setTopic(topic) { }
    /**
     * @version 0.9.19
     * @returns {string} Description
     */
    description() { }
    /**
     * @param {string} description
     * @version 0.9.16
     */
    setDescription(description) { }
    /**
     * @returns {number} Codec
     */
    codec() { }
    /**
     * @param {number} codec
     * @version 0.9.16
     */
    setCodec(codec) { }
    /**
     * @returns {number} Codec quality
     */
    codecQuality() { }
    /**
     * @param {number} quality
     * @version 0.9.16
     */
    setCodecQuality(quality) { }
    /**
     * @returns {number} Configured number of clients the channel can hold (-1 if unlimited)
     */
    maxClients() { }
    /**
     * @param {boolean} maxClients Set to -1 for unlimited clients
     * @version 0.9.16
     */
    setMaxClients(maxClients) { }
    /**
     * @returns {number}
     */
    maxFamilyClients() { }
    /**
     * @param {boolean} maxFamilyClients
     * @version 0.9.16
     */
    setMaxFamilyClients(maxFamilyClients) { }
    /**
     * @returns {boolean} Whether channel is permanent or not
     */
    isPermanent() { }
    /**
     * @param {boolean} permanent
     * @version 0.9.16
     */
    setPermanent(permanent) { }
    /**
     * @returns {boolean} Whether channel is semi-permanent or not
     */
    isSemiPermanent() { }
    /**
     * @param {boolean} permanent
     * @version 0.9.16
     */
    setSemiPermanent(permanent) { }
    /**
     * @returns {boolean} Whether channel is the default one
     */
    isDefault() { }
    /**
     * @returns {boolean} Whether channel is password-protected or not
     */
    isPassworded() { }
    /**
     * @returns {boolean} Whether channel is encrypted or not
     */
    isEncrypted() { }
    /**
     * @param {boolean} encrypted
     * @version 0.9.16
     */
    setEncrypted(encrypted) { }
    /**
     * @description Compares two channels
     * @param {Channel} otherChannel
     * @returns {boolean} True, if both channels are the same
     */
    equals(otherChannel) { }
    /**
     * @description Sends a chat message to the channel
     * @param {string} msg - Message to send
     */
    chat(msg) { }
    /**
     * @returns {Client[]} Clients that are in this channel
     */
    getClients() { }
    /**
     * @returns {number} Number of clients that are in the channel 
     */
    getClientCount() { }
    /**
     * @description enables / disables subscription for this channel; requires subscription mode
     * @param {boolean} val
     */
    setSubscription(val) { }
    /**
     * @description Updates multiple channel parameters at once
     * @version 0.9.16.3
     * @param {ChannelParams} channelParams
     */
    update(channelParams) { }
    /**
     * @description Assigns a client to a channel group
     * @version 0.9.18
     * @param {Client} client
     * @param {ChannelGroup} channelGroup
     */
    setChannelGroup(client, channelGroup) { }
    /**
     * @description Gets the permissions for the channel from the server - this is an expensive call as the permissions are _not_ cached
     * @version 0.13.37
     * @returns {Permission[]}
     */
    getPermissions() { }
    /**
     * @description Adds/sets a new permission on the channel; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @version 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id) { }
}

/**
 * @class
 * @mixin
 * @property {string} name - Displayname of the channel; mandatory on create
 * @property {(Channel|number|string)} parent - Parent channel (you can also use the channelId); ignored on update, mandatory on create
 * @property {string} description
 * @property {string} topic
 * @property {string} password
 * @property {number} codec - See codec types for explanation
 * @property {number} codecQuality
 * @property {boolean} encrypted - True by default
 * @property {boolean} permanent
 * @property {boolean} semiPermanent
 * @property {number} position
 * @property {number} maxClients - Set to -1 for unlimited clients
 * @property {number} maxFamilyClients
 * @property {boolean} default - Whether the channel is the default channel 
 * @property {number} neededTalkPower - TS only; 0.9.19+
 * @property {number} deleteDelay - TS only; 0.9.19+
 * @property {number} icon - TS only; 0.9.19+
 * @description
 * Used to update or create a channel;
 * When creating a channel parent and name are mandatory for TS3;
 * When updating a channel parent will be ignored (use moveTo instead)
 */
class ChannelParams { }

/**
 * @class
 * @mixin
 */
class ServerGroup {
    /**
     * @returns {string} ID of the server group
     */
    id() { }
    /**
     * @returns {string} Name of the server group
     */
    name() { }
    /**
     * @returns {string} ID of the icon used for the channel group
     * @version 0.12.0
     */
    icon() { }
    /**
     * @description Adds a client by database ID to the servergroup
     * @returns {boolean} status if the request was successful
     * @version 0.13.37
     * @param {(Client|string|number)} client - The client can be a client object, string or number
     */
    addClientByDatabaseId(client) { }
    /**
     * @description Gets the permissions for the servergroup from the server - this is an expensive call as the permissions are _not_ cached
     * @version 0.13.37
     * @returns {Permission[]}
     */
    getPermissions() { }
    /**
     * @description Adds/sets a new permission to the servergroup; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @version 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id) { }
}

/**
 * @class
 * @mixin
 */
class ChannelGroup {
    /**
     * @returns {string} ID of the channel group
     */
    id() { }
    /**
     * @returns {string} Name of the channel group
     */
    name() { }
    /**
     * @returns {string} ID of the icon used for the channel group
     * @version 0.12.0
     */
    icon() { }
    /**
     * @description Gets the permissions for the channelgroup from the server - this is an expensive call as the permissions are _not_ cached
     * @version 0.13.37
     * @returns {Permission[]}
     */
    getPermissions() { }
    /**
     * @description Adds/sets a new permission to the channelgroup; you need to use the setters and then call save() to apply - can also be used to remove a permission by delete() afterwards
     * @version 0.13.37
     * @param {string} id - id of the permission to add; can also be supplied as name like i_channel_needed_join_power
     * @returns {Permission}
     */
    addPermission(id) { }
}

/**
 * @class
 * @mixin
 */
class User {
    /**
     * @description Returns the ID of the user
     * @returns {string} ID of the User
     * @version 0.13.37
     */
    id() { }
    /**
     * @description Returns the name of the user
     * @returns {string} Name of the User
     * @version 0.13.37
     */
    name() { }
    /**
     * @description Returns the privileges of the user
     * @returns {number} Privileges of the user 
     * @version 0.13.37
     */
    privileges() { }
    /**
     * @description Returns the teamspeak unique ID of the bind client
     * @returns {string} teamspeak unique ID of the bind ts client 
     * @version 0.13.37
     */
    tsUid() { }
    /**
     * @description Returns the teamspeak group ID
     * @returns {string} ID of the bind teamspeak group
     * @version 0.13.37
     */
    tsGroupId() { }
    /**
     * @description Checks if an user is an admin
     * @returns {boolean} Admin status of the user 
     * @version 0.13.37
     */
    isAdmin() { }
    /**
     * @description Sets a new password to the user
     * @returns {boolean} Success or not 
     * @param {string} password - new password of the user
     * @version 0.13.37
     */
    setPassword(password) { }
    /**
     * @description Sets the teamspeak unique ID to the user
     * @returns {boolean} Success or not
     * @param {string} tsUid - teamspeak unique ID of the client 
     * @version 0.13.37
     */
    setTSUid(tsUid) { }
    /**
     * @description Sets the privileges to an user
     * @returns {boolean} Success or not
     * @param {number} privileges - New privileges of the user
     * @version 0.13.37
     */
    setPrivileges(privileges) { }
    /**
     * @description Adds an privilege to an user
     * @returns {boolean} Success or not 
     * @param {number} privilege - New privilege which should be added
     * @version 0.13.37
     */
    addPrivilege(privilege) { }
    /**
     * @description Removes an privilege from an user
     * @returns {boolean} Success or not 
     * @param {number} privilege - Privilege which should be removed
     * @version 0.13.37
     */
    removePrivilege(privilege) { }
    /**
     * @description Deletes an user
     * @returns {boolean} Success or not 
     * @version 0.13.37
     */
    delete() { }
}

/**
 * @class
 * @mixin
 * @description handles channel, channelgroup and servergroup permissions; mainly for TS3
 * @version 0.13.37
 */
class Permission {
    /**
     * @version 0.13.37
     * @returns {string} ID of the permission
     */
    id() { }
    /**
     * @version 0.13.37
     * @returns {string} Name of the permission
     */
    name() { }
    /**
     * @version 0.13.37
     * @returns {number} permission value
     */
    value() { }
    /**
     * @version 0.13.37
     * @returns {boolean} true, if skip flag has been set - only applicable for ServerGroups
     */
    skip() { }
    /**
     * @version 0.13.37
     * @returns {boolean} true, if negated flag has been set - only applicable for ServerGroups
     */
    negated() { }
    /**
     * @description sets the value of the permission; you need to call save() to apply changes
     * @version 0.13.37
     * @param {boolean} value - true, if permission should be negated, false otherwise
     * @returns {boolean}
     */
    setNegated(value) { }
    /**
     * @description sets the skip flag - only applicable for ServerGroups; you need to call save() to apply changes
     * @version 0.13.37
     * @param {boolean} value - true, if permission should be skipped, false otherwise
     * @returns {boolean}
     */
    setSkip(value) { }
    /**
     * @description sets the negated flag - only applicable for ServerGroups; you need to call save() to apply changes
     * @version 0.13.37
     * @param {number} value - new value for the permission
     * @returns {boolean}
     */
    setValue(value) { }
    /**
     * @description applies the changed settings
     * @version 0.13.37
     * @returns {boolean}
     */
    save() { }
    /**
     * @description delete the current permission
     * @version 0.13.37
     * @returns {boolean}
     */
    delete() { }
}

/**
 * @class
 * @mixin
 */
class Track {
    /**
     * @returns {string} Unique ID of the track
     */
    id() { }
    /**
     * @returns {string} Unique url for the track
     */
    url() { }
    /**
     * @returns {string} Type of the file
     */
    type() { }
    /**
     * @returns {string} Title of the track
     */
    title() { }
    /**
     * @returns {string} Artist of the track
     */
    artist() { }
    /**
     * @returns {string} Temporary title of the track; e.g. when playing radio stations
     */
    tempTitle() { }
    /**
     * @returns {string} Temporary artist of the track; e.g. when playing radio stations
     */
    tempArtist() { }
    /**
     * @returns {string} Album of the track
     */
    album() { }
    /**
     * @returns {string} Genre of the track
     * @version 0.9.16
     */
    genre() { }
    /**
     * @returns {number} Duration of the track
     * @version 0.9.16
     */
    duration() { }
    /**
     * @returns {number} Tracknumber of the track
     * @version 0.9.16
     */
    trackNumber() { }
    /**
     * @returns {string} Path to the thumbnail, if any
     */
    thumbnail() { }
    /**
     * @returns {string} Original filename
     */
    filename() { }
    /**
     * @description Starts playback of the track
     * @returns {boolean}
     */
    play() { }
    /**
     * @description Adds the track to the queue
     * @returns {boolean}
     */
    enqueue() { }
    // /**
    //  * @description Adds the track as the first entry in the queue
    //  * @returns {boolean}
    //  */
    // playNext: function() {},
    /**
     * @description Downloads a thumbnail from the internet and stores it for the given track
     * @param {string} url - Url to download the thumbnail from (limited to X MB)
     */
    setThumbnailFromURL(url) { }
    /**
     * @description Removes the thumbnail of a track
     */
    removeThumbnail() { }
}

/**
 * @class
 * @mixin
 */
class Playlist {
    /**
     * @returns {string} Unique identifier of the playlist
     */
    id() { }
    /**
     * @returns {string} Name of the playlist
     */
    name() { }
    /**
     * @returns {PlaylistTrack[]} List of all tracks inside the given playlist
     */
    getTracks() { }
    /**
     * @description Sets the playlist to active; will continue playing songs from this playlist
     * @returns {boolean}
     */
    setActive() { }
}

/**
 * @class
 * @mixin
 * @description Track in a Playlist
 */
class PlaylistTrack {
    /**
     * @returns {string} Title of the track
     */
    title() { }
    /**
     * @returns {string} Artist of the track
     */
    artist() { }
    /**
     * @returns {string} Album of the track
     */
    album() { }
    /**
     * @returns {string} Url of the track (internal or external)
     */
    url() { }
    /**
     * @description Starts playback of the track
     * @returns {boolean} success
     */
    play() { }
    // /**
    //  * adds the track to the queue
    //  * @returns {boolean}
    //  */
    // enqueue: function() {},
    // /**
    //  * adds the track as the first entry in the queue
    //  * @returns {boolean}
    //  */
    // playNext: function() {}
}

/**
 * @class
 * @mixin
 * @version 0.9.16
 */
class Bytes {
    /**
     * @returns {string} String representation of the bytes
     */
    toString() { }
}

/**
 * @class
 * @mixin
 */
class Http {
    /**
     * @version 0.14.2
     * @description Creates an http request
     * @param {object} config - http configuration object
     * @param {string} [config.method] - Request Method to use (eg GET, POST, PUT, ...)
     * @param {string} config.url - The URL endpoint which should be called
     * @param {number} [config.timeout] - timeout in milliseconds
     * @param {string} [config.body] - request body
     * @param {object} [config.headers] - request header
     * @param {Http#SimpleRequestCallback} callback - Callback function with error and response
     * @example
     * var engine = require('engine');
     * var http = require('http');
     * 
     * http.simpleRequest({
     *     method: 'GET',
     *     url: 'https://example.com',
     *     timeout: 10 * 1000
     * }, function(error, response) {
     *     if (error) {
     *         engine.log("Error: " + error);
     *         return;
     *     }
     * 
     *     if (response.statusCode != 200) {
     *         engine.log("HTTP Error: " + response.status);
     *         return;
     *     }
     * 
     *     // success!
     *     engine.log("Response: " + response.data.toString());
     * });
     */
    simpleRequest(config, callback) { }
}
/**
 * @callback simpleRequestCallback
 * @memberof Http
 * @instance
 * @see Http#simpleRequest
 * @version 0.14.2
 * @param {string} [error]
 * @param {object} [response]
 * @param {Bytes} response.data - Data; Needs to be converted to a string first, e.g. `response.data.toString()`.
 * @param {object} response.headers - Headers
 * @param {string} response.status - Status
 * @param {number} response.statusCode - Status Code
 */

/**
 * @class
 * @mixin
 * @version 0.9.16
 * @property {string} [host] - Host to connect to; required for mysql / postgres
 * @property {number} [port] - Port to use
 * @property {string} [url] - WebSocket URL to use
 * @property {string} [protocol=tcp] - can be udp, tcp or ws (websocket)
 */
class ConnectParams { }

/**
 * @class
 * @mixin
 * @version 0.9.16
 * @fires error
 * @fires close
 * @fires data
 */
class NetClient {
    /**
     * @description Sends data over the connection
     * @param {(string|number[])} bytes - Data that should be sent over the socket; one can also send an array of ints / bytes like [0, 255, 1, 1]
     * @param {string} [format] - Optional, if given bytes will be decoded prior to sending; Can be either "hex" or "base64".
     */
    write(bytes, format) { }
    /**
     * @description Registers a new event handler
     * @param {string} event - Name of the event to listen to
     * @param {function} callback
     */
    on(event, callback) { }
    /**
     * @description Closes the current connection
     */
    close() { }
}

/**
 * @class
 * @mixin
 * @version 0.9.16
 * @example
 * var net = require('net');
 * var engine = require('engine');
 * var conn = net.connect({ host: '127.0.0.1', port: 80 }, function(err) {
 *     if (err) { engine.log(err); }
 * });
 * conn.on('data', function(x) {
 *     engine.log('got data');
 *     engine.log(x.toString());
 * })
 * if (conn) conn.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
 * @description
 * The net module is protected, it needs the following entry per script in your config.ini:
 * ```
 * [Scripts.Privileges]
 * scriptname = ["net"]
 * ```
 */
class Net {
    /**
     * @param {ConnectParams} params - Connection parameters
     * @param {Net#connectCallback} callback - Callback gets called on success/error.
     * @returns {?NetClient} Client connection, or null if failed to setup a connection
     * (e.g. wrong parameters; null does not mean that the connection failed, instead that it is handled in the callback)
     */
    connect(params, callback) { }
}
/**
 * @callback connectCallback
 * @memberof Net
 * @instance
 * @see Net#connect
 * @version 0.9.16
 * @description If an error occured, exactly one parameter containing the error will be handed to the callback.
 * @param {string} [error]
 */
/**
 * @event data
 * @memberof NetClient
 * @param {Bytes}
 * @description Gets fired whenever data is received
 */
/**
 * @event close
 * @memberof NetClient
 * @description Gets fired whenever the connection is closed
 */
/**
 * @event error
 * @memberof NetClient
 * @param {string} error
 * @description Gets fired whenever an error occurred
 */

/**
 * @class
 * @mixin
 * @version 0.9.16
 * @property {string} driver - Database driver to use, currently sqlite3 (currently in-memory only), mysql or postgres
 * @property {string} [host] - Database server to connect to, required for mysql / postgres
 * @property {string} [username]
 * @property {string} [password]
 * @property {number} [port]
 */
class DBParams { }

// TODO: improve parameter documentation
/**
 * @class
 * @mixin
 * @version 0.9.16.4
 */
class DBConn {
    /**
     * @description
     * Use this, if you expect a result set;
     * Note: strings will be returned as byte arrays to be binary safe; to convert to actual strings, please use helpers.toString(column)
     * @param {string} queryString
     * @param {any} parameter1 - Zero or more parameters; e.g. for mysql, ? in the queryString will be replaced with these parameters
     * @param {any} parameter2
     * @param {DBConn#queryCallback} callback - Callback is called after the query has finished.
     */
    query(queryString, parameter1, parameter2, callback) { }
    /**
     * @description Use this insted of query if you don't expect a result
     * @param {string} queryString
     * @param {any} [parameter1]
     * @param {any} [parameter2]
     * @param {function} [callback]
     */
    exec(queryString, parameter1, parameter2, callback) { }
}
/**
 * @callback queryCallback
 * @memberof DBConn
 * @instance
 * @see DBConn#query
 * @see DBConn#exec
 * @version 0.9.16.4
 * @description Gets called with two parameters, err and result - both are mutually exclusive.
 * Result contains an array of rows, each containing an object with the column names as key.
 * @param {string} [error]
 * @param {object[]} [result]
 */

/**
 * @class
 * @mixin
 * @version 0.9.16.4
 * @description
 * The database module is protected, it needs the following entry per script in your config.ini:
 * ```
 * [Scripts.Privileges]
 * scriptname = ["db"]
 * ```
 * 
 * Use additional parameters to exec / query whenever you use untrusted/unknown data, as those will automatically be escaped and avoid SQL injection.
 * @example
 * var db = require('db');
 * var engine = require('engine');
 * var helpers = require('helpers');
 * var dbc = db.connect({ driver: 'mysql', host: '127.0.0.1', username: 'demo', password: 'blah', database: 'foo' }, function(err) {
 *     if (err) {
 *          engine.log(err);
 *     }
 * });
 * if (dbc) dbc.exec("INSERT INTO blah (foo, foo2) VALUES (?, ?)", 'bar', 'bar2');
 * if (dbc) dbc.query("SELECT * FROM blah", function(err, res) {
 *     if (!err) {
 *          res.forEach(function(row) {
 *              engine.log(helpers.toString(row.foo));
 *          });
 *     }
 * });
 */
class DB {
    /**
     * @param {DBParams} params - Connection parameters
     * @param {function} callback - Callback gets called on success / error;
     * If an error occured, exactly one parameter containing the error will be handed to the callback
     * @returns {?DBConn} Database connection or null if failed
     */
    connect(params, callback) { }
}

/**
 * @class
 * @mixin
 * @version 0.9.20
 * @fires Event~ws.connect
 * @fires Event~ws.close
 * @fires Event~ws.error
 * @fires Event~ws.data
 * @description
 * Websocket Server:
 * The ws module is protected, it needs the following entry per script in your config.ini:
 * ```
 * [Scripts.Privileges]
 * scriptname = ["ws"]
 * ```
 * @example
 * SinusBot script:
 * var ws = require('ws');
 * var engine = require('engine');
 * var event = require('event');
 * 
 * event.on('ws.connect', function(id) {
 *     engine.log('new websocket connection; id ' + id);
 *     ws.broadcast(1, { blubb: 'blubb' });
 * });
 * event.on('ws.disconnect', function(id) {
 *     engine.log('websocket connection disconnected; id ' + id);
 * });
 * event.on('ws.data', function(id, type, data) {
 *     engine.log('ws.data: id ' + id + '; data: ' + data.toString());
 *     ws.write(id, type, data.toString());
 * });
 * @example
 * Client Side (served html files via the enableWeb script option):
 * var proto = (window.location.protocol == 'https:') ? 'wss' : 'ws';
 * var conn = new WebSocket(proto + "://" + document.location.host + "/api/v1/b/" + botId + "/i/" + instanceId + "/ws");
 * conn.onclose = function (evt) {
 * console.log('close', evt);
 *     alert('Closed.');
 * };
 * conn.send(JSON.stringify({ type: 'ping' }));
 * conn.onmessage = function (evt) {
 *     var data = JSON.parse(evt.data);
 * };
 */
class WS {
    /**
     * @description Writes some data to the connection with given connectionId
     * @param {string} connectionId
     * @param {number} messageType
     * @param {(string|Bytes)} message - Actual message; can be given as string or byteshelper
     */
    write(connectionId, messageType, message) { }
    /**
     * @description Broadcasts some data to all connected clients
     * @param {number} messageType
     * @param {(string|Bytes)} message - Actual message; can be given as string or byteshelper
     */
    broadcast(messageType, message) { }
    /**
     * @description Closes the connection
     * @param {string} connectionId
     */
    close(connectionId) { }
}