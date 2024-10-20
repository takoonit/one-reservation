const {generateCustomUuid} = require('custom-uuid');
/**
 * Generates a unique booking ID.
 * @returns {string} - A unique booking ID.
 */
const generateBookingId = () => {
    return `BOOKING-${Date.now()}-${generateCustomUuid('SIPMWTCLTD195876', 10)}`;
};

module.exports = {generateBookingId};
