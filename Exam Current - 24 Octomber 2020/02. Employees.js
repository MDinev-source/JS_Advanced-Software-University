function solveClasses() {
    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            let objTask = {
                id: id,
                taskName: taskName,
                priority: priority
            };

            if (priority === 'high') {
                this.tasks.unshift(objTask);
            }
            else {
                this.tasks.push(objTask);
            }

            return `Task id ${id}, with ${priority} priority, has been added.`
        }

        doTask() {

            let currentTask = this.tasks.find(x => x.priority === "high");

            if (!currentTask === 'undefined') {

                this.tasks.shift();

                return currentTask.taskName;
            }
            else {
                return `${this.firstName}, you have finished all your tasks. You can rest now.`
            }
        }

        getSalary() {


            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`
        }

        reviewTasks() {
            let result = [
                "Tasks, that need to be completed:"
            ]

            for (let line of this.tasks) {
                result.push(`${line.id}: ${line.taskName} - ${line.priority}`)
            }

            return result.join('\n');
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.bonus = bonus;
            this.baseSalary = this.baseSalary + this.bonus;
            this.experience = experience;
            this.tasks = [];
        }

        addTask(id, taskName, priority) {
           return super.addTask(id, taskName, priority)
        }

        doTask() {
            return super.doTask();
        }

        getSalary() {
            return super.getSalary();
        }

        reviewTasks() {
            return super.reviewTasks();
        }
        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.bonus = bonus;
            this.baseSalary = this.baseSalary + this.bonus;
            this.experience = experience+5;
            this.tasks = [];
        }

        addTask(id, taskName, priority) {
            return super.addTask(id, taskName, priority)
        }

        doTask() {
            return super.doTask();
        }

        getSalary() {
            return super.getSalary();
        }

        reviewTasks() {
            return super.reviewTasks();
        }
        learn(years) {
            this.experience += years;
            return this.experience;
        }

        changeTaskPriority(taskId) {

         
            let task = this.tasks.find(x => x.id === taskId);

            let index = this.tasks.indexOf(task);

            this.tasks.splice(index, 1);

            if (task.priority === "low") {
                task.priority = "high"
                this.tasks.unshift(task);
            }
            else {
                task.priority = "low";
                this.tasks.push(task);
            }
            return task;
        }
    }
    return {
        Developer,
        Junior,
        Senior
    }
}

let classes = solveClasses();
const developer = new classes.Developer("George", "Joestar");
console.log(developer.addTask(1, "Inspect bug", "low"));
console.log(developer.addTask(2, "Update repository", "high"));
console.log(developer.reviewTasks());
console.log(developer.getSalary());

const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
console.log(junior.getSalary());

const senior = new classes.Senior("Joseph", "Joestar", 800, 2);
console.log(senior.addTask(1, "Create functionality", "low"));
console.log(senior.addTask(2, "Update functionality", "high"));
console.log(senior.getSalary());
console.log(senior.changeTaskPriority(1)["priority"]);
console.log(senior.learn(10));