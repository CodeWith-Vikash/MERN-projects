const gameSchema = new mongoose.Schema({
    mode: { 
        type: String, 
        enum: ['computer', 'friend'], 
        required: true 
    },
    player1: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    player2: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: function() {
            return this.mode === 'friend'; 
        }
    },
    moves:{
            player1Move: {
                type: String,
                enum: ['rock', 'paper', 'scissors'],
                required: function() {
                    return this.mode === 'friend'; 
                }
            },
            player2Move: {
                type: String,
                enum: ['rock', 'paper', 'scissors'],
                required: function() {
                    return this.mode === 'friend'; 
                }
            }
        },
    scores: {
        player1Score: { type: Number, default: 0 },  // Player or User's score
        player2Score: { type: Number, default: 0 },  // Friend's score or Computer's score
    },
    result: {
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: { 
            type: String, 
            enum: ['ongoing', 'player1_wins', 'player2_wins'],
            default: 'ongoing' 
        }
    },
    createdAt: { type: Date, default: Date.now }
});
