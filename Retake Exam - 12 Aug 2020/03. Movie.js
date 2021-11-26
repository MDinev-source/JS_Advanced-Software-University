class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = ticketPrice;
        this.screenings = [];
        this._screen = {};
        this._ticketsCount = 0;
        this._totalProfit = 0;
    }

    newScreening(date, hall, description) {
        this._screen = {
            date: date,
            hall: hall,
            description: description
        };

        let object = this.screenings.find(
            o => o.date === date && o.hall === hall
        );

        if (object !== undefined) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
        }

        else {
            this.screenings.push(this._screen);
            return `New screening of ${this.movieName} is added.`;
        }
    }

    endScreening(date, hall, soldTickets) {
        let object = this.screenings.find(o => o.date === date && o.hall === hall);

        if (object === undefined) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
        }
        else {
            let currentProfit = soldTickets * this.ticketPrice;
            this._totalProfit += currentProfit;
            this._ticketsCount += soldTickets;

            let result;
            for (let i = 0; i < this.screenings.length; i++) {
                if (this.screenings[i].hall === hall && this.screenings[i].date === date) {
                    result = i;

                }
            }
            this.screenings.splice(result, 1);
            return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
        }
    }

    toString() {
        let result = [
            `${this.movieName} full information:`,
            `Total profit: ${this._totalProfit.toFixed(0)}$`,
            `Sold Tickets: ${this._ticketsCount}`
        ];

        if (this.screenings.length > 0) {

            result.push(`Remaining film screenings:`);
            let sorted = this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));
            for (const scr of sorted) {
                result.push(`${scr.hall} - ${scr.date} - ${scr.description}`)
            }
        }
        else {
            result.push("No more screenings!");
        }
        return result.join('\n');
    }
}
let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());

