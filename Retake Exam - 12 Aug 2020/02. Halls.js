function solveClasses() {

    class Hall {
        constructor(capacity, name) {
            this.capacity = capacity;
            this.name = name;
            this.events = [];
        }

        hallEvent(title) {
            if (this.events.includes(title)) {
                throw new Error("This event is already added!");
            }

            this.events.push(title);
            return "Event is added";
        }

        close() {
          
            return `${this.name} hall is closed.`;
        }

        toString() {
            const result = [
                `${this.name} hall - ${this.capacity}`,
            ]

            if (this.events.length > 0) {
                result.push(`Events: ${this.events.join(", ")}`);
            }
            return result.join('\n');
        }
    }

    class MovieTheater extends Hall {
        constructor(capacity, name, screenSize) {
            super(capacity, name);
            this.events = [];
            this.screenSize = screenSize;
        }

        close() {
            this.events = [];
            return super.close() + " All screenings are over.";
        }

        toString() {
            const result = [
                super.toString(),
                `${this.name} is a movie theater with ${this.screenSize} screensize and ${this.capacity} seats capacity.`
            ];

            return result.join('\n');
        }
    }

    class ConcertHall extends Hall {
        constructor(capacity, name) {
            super(capacity, name);
            this.events = [];
            this._performers = [];
            this._event;
        }

        hallEvent(title, performers) {
            let result = super.hallEvent(title);

            this._event = {
                title,
                performers
            }

            this._performers.push(this._event);
            return result;
        }

        close() {
            this._performers=[];
            let result = super.close();

            return result + " All performances are over."
        }

        toString() {
            const result = [
                super.toString()
            ];

            if (this.events.length > 0) {
                result.push(`Performers: ${this._event.performers.join(", ")}.`);
            }
            return result.join('\n');
        }

    }


    return {
        Hall,
        MovieTheater,
        ConcertHall
    }
}
let classes = solveClasses();
let hall = new classes.Hall(20, 'Main');
console.log(hall.hallEvent('Breakfast Ideas'));
console.log(hall.hallEvent('Annual Charity Ball'));
console.log(hall.toString());
console.log(hall.close());

let movieHall = new classes.MovieTheater(10, 'Europe', '10m');
console.log(movieHall.hallEvent('Top Gun: Maverick'));
console.log(movieHall.toString());

let concert = new classes.ConcertHall(5000, 'Diamond');
console.log(concert.hallEvent('The Chromatica Ball', ['LADY GAGA']));
console.log(concert.toString());
console.log(concert.close());
console.log(concert.toString());
