import { format, differenceInDays, parse } from "date-fns";
export class Task {
  name: string;
  completed: boolean;
  description: string;
  date: string;
  id: string;
  idProject:string | string[] | undefined;
  constructor(
    name: string,
    completed: boolean,
    description: string,
    date: string,
    id: string,
    idProject: string | string[] | undefined
  ) {
    this.name = name;
    this.completed = completed;
    this.description = description;
    this.date = date;
    this.id = id;
    this.idProject = idProject;
  }
}

export class AllTasks {
  tasks: Task[];
  public taskCounter: number = 0;
  public dayTasks: Task[] = [];
  public weekTasks: Task[] = [];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  addTask(taskAppend: Task) {
    this.tasks.push(taskAppend);
    this.taskCounter++;
    this.dayTasks = this.filterDay()
    this.weekTasks   = this.filterWeek();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.dayTasks = this.filterDay()
    this.weekTasks   = this.filterWeek();
  }

  
  getCounter() {
    return this.taskCounter;
  }
  
  filterDay = () => {
    return this.tasks.filter((task) => {
      let fechaString = format(new Date(), "yyyy-MM-dd");
      const date1 = parse(fechaString, "yyyy-MM-dd", new Date());
      const date2 = parse(task.date, "yyyy-MM-dd", new Date());
      if (differenceInDays(date2, date1) === 0) {
        return true;
      }
    });
  };
  filterWeek = () => {
    return this.tasks.filter((task) => {
      let fechaString = format(new Date(), "yyyy-MM-dd");
      const date1 = parse(fechaString, "yyyy-MM-dd", new Date());
      const date2 = parse(task.date, "yyyy-MM-dd", new Date());
      if (differenceInDays(date2, date1) <= 7) {
        return true;
      }
    });
  };
  
  removeProjectsById = (idProject:string) =>{
    this.tasks = this.tasks.filter((task)=> task.idProject !== idProject);
    this.dayTasks = this.filterDay()
    this.weekTasks   = this.filterWeek();
  }
  
  getTasks() {
    return this.tasks;
  }
  getDays() {
    return this.dayTasks;
  }
  
  getWeeks() {
    return this.weekTasks;
  }

  updateTask(id: string, description: string, date: string, name: string) {
    let updateId = this.tasks.findIndex((task) => task.id === id);
    this.tasks[updateId].name = name;
    this.tasks[updateId].description = description;
    this.tasks[updateId].date = date;
    this.filterDay();
    this.filterWeek();
  }
  
  updateCompleted(isCompleted:boolean,id:string) {
    let updateId = this.tasks.findIndex((task) => task.id === id);
    this.tasks[updateId].completed = isCompleted;
    this.filterDay();
    this.filterWeek();
  }
}
