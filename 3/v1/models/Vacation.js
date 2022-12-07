import mongoose from 'mongoose';
const { Schema } = mongoose;

const VacationSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
});

export default mongoose.model('Vacation', VacationSchema);