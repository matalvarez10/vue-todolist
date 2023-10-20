import { Task,AllTasks } from "./task";

export class Project{
    id:string;
    nombre:string;
    constructor(id:string,nombre:string){
        this.id=id;
        this.nombre=nombre;
    }
}

export class AllProjects{
    projects : Project[];
    public projectCounter : number = 0;
    constructor(projects:Project[]){
        this.projects = projects;
    }

    addProject(project:Project){
        this.projects.push(project);
        this.projectCounter++;
    }
    removeProject(idProject:string){
        this.projects = this.projects.filter(project => project.id !== idProject);
    }
    getProject(){
        return this.projects;
    }
    getProjectCounter(){
        return this.projectCounter;
    }
}