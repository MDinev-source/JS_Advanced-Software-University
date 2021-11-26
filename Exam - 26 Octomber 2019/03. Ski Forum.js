class Forum {
    constructor() {
        this._users = [];
        this._questions = [];
        this._id = 1;
    }

    register(username, password, repeatPassword, email) {
        if (username == "" || password == "" || repeatPassword == "" || email == "") {
            throw new Error("Input can not be empty");
        }
        if (password !== repeatPassword) {
            throw new Error("Passwords do not match");
        }
        if (this._users.find(x => x.username === username)) {
            throw new Error("This user already exists!");
        }

        const user = {
            username: username,
            password: password,
            repeatPassword: repeatPassword,
            email: email,
            isLogin: false
        };
        this._users.push(user)

        return (`${username} with ${email} was registered successfully!`);
    }

    login(username, password) {

        let currentUsser = this._users.find(x => x.username === username);
        if (currentUsser === undefined) {
            throw new Error("There is no such user");
        }

        if (currentUsser.password === password) {

            currentUsser[isLogin] = true;

            return "Hello! You have logged in successfully";
        }

    }

    logout(username, password) {
        let currentUsser = this._users.find(x => x.username === username);
        if (currentUsser === undefined) {
            throw new Error("There is no such user");
        }

        if (currentUsser.password === password) {

            currentUsser[isLogin] = false;

            return "You have logged out successfully";
        }

    }

    postQuestion(username,question){
        
    }
}