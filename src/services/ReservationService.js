class ReservationService {
    static tableCount = 0;
    static maxReserveSeat = 0;
    static isInitialized = false;

    static initializeTables(table_count, max_reserve_seat) {
        if (this.isInitialized) {
            throw {status: 409, message: 'Tables already initialized'};
        }

        this.tableCount = table_count;
        this.maxReserveSeat = max_reserve_seat;
        this.isInitialized = true;

        return {table_count: this.tableCount, max_reserve_seat: this.maxReserveSeat};
    }
}

module.exports = {ReservationService};