enum ProjectStatus { Active, Finished };
//class Project
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus) { };
}

//project State Managment

type Listener<T> = (items: T[]) => void;

class State<T>{
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: any[] = [];
    private static instance: ProjectState;
    private constructor() {
        super();

    }
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }


}

const projectState = ProjectState.getInstance();

// validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && (typeof (validatableInput.value) === "string")) {
        isValid =
            isValid && validatableInput.value.length > validatableInput.minLength
    }
    if (validatableInput.maxLength != null && (typeof (validatableInput.value) === "string")) {
        isValid =
            isValid && validatableInput.value.length < validatableInput.maxLength
    }
    if (validatableInput.min != null && (typeof (validatableInput.value) === "number")) {
        isValid =
            isValid && validatableInput.value > validatableInput.min
    }
    if (validatableInput.max != null && (typeof (validatableInput.value) === "number")) {
        isValid =
            isValid && validatableInput.value < validatableInput.max
    }
    return isValid;




}
// autobind decorator


function autobind(_: any, __: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return newDescriptor;
}
//Component based class

abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;
    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        const importedNode = document.importNode(this.templateElement.content, true);

        this.element = importedNode.firstElementChild as U;
        if (newElementId)
            this.element.id = newElementId;

        this.attach(insertAtStart);

    }
    private attach(insertAtBegining: boolean) {

        this.hostElement.insertAdjacentElement(
            insertAtBegining ? "afterbegin" : "beforeend", this.element);
    }
    abstract configure(): void;
    abstract renderContent(): void;
}
//ProjectListClass

class ProjectListClass extends Component<HTMLDivElement, HTMLElement>{


    assignProjects: Project[];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        this.assignProjects = [];

        this.configure();

        this.renderContent();
    }

    configure() {

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((proj) => {
                if (this.type === "active")
                    return proj.status === ProjectStatus.Active;
                else return proj.status === ProjectStatus.Finished;
            });
            this.assignProjects = relevantProjects;
            this.renderProjects();
        });

    }

    renderContent() {
        const listId = `${this.type}-projects-lists`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
        document.getElementById(`${this.type}-projects-lists`)!.innerHTML = "";
        for (const proj of this.assignProjects) {

            const liElem = document.createElement("li");
            liElem.textContent = `Project title: ${proj.title}`;
            //  Description: ${proj.description};
            //   Number of People: ${proj.people}`;
            document.getElementById(`${this.type}-projects-lists`)!.insertAdjacentElement("beforeend", liElem);



        }

    }


}

// ProjectInputClass 

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");

        this.titleInputElement = this.element.querySelector(
            "#title"
        )! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        )! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            "#people"
        )! as HTMLInputElement;


        this.configure();


    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);

    };

    renderContent() { }

    private gatherInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        //if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
        //    alert("invalid input, please, try again");
        //    return;
        //}
        //else
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid input, plese, try again");
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];

    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";

    }


    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);

            this.clearInputs();

        }

    }

}

const prjInput = new ProjectInput();
const activeProjectList = new ProjectListClass('active');
const finishedProjectList = new ProjectListClass('finished');

