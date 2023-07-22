module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },
        documentname: {
            type: String,
            required: true
        },
        pagenum: {
            type: Number,
        },
        pdfstatus: {
            type: String,
            default: 'new',
            required: true
        },
        imagestatus: {
            type: String,
            default: 'new',
            required: true
        },
        ocrstatus: {
            type: String,
            default: 'new',
            required: true
        },
      },
      {
        timestamps: true,
        versionKey: false
    });
  
    const Document = mongoose.model("document", schema);
    return Document;
};