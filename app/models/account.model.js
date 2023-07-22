module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
        },
      },
      {
        timestamps: true,
        versionKey: false
    });
  
    const Account = mongoose.model("account", schema);
    return Account;
};