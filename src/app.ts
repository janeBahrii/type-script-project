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

// ProjectInputClass 

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title")!;
        this.descriptionInputElement = this.element.querySelector("#description")!;
        this.peopleInputElement = this.element.querySelector("#people")!;

        this.configure();
        this.attach();

    }

    private gatherInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
            alert("invalid input, please, try again");
            return;
        }
        else
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
            console.log(title, description, people);
            this.clearInputs();

        }

    }
    private configure() {
        this.element.addEventListener("submit", this.submitHandler);

    }
    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const prjInput = new ProjectInput();
/* enum validType {
    vNumber,
    vText
};

function validate(value: any, type: validType): boolean {
    let regex: RegExp;
    switch (type) {
        case validType.vNumber:
            regex = new RegExp("^\d+$");
            if (regex.test(value))
                return true;
            return false;
        case validType.vText:
            return true;

    }
    return true;
}
/* const validateHandler=(event: Event)=>{
    //const isValid = validate(event.target.value,)


} */
/*
interface IProject {
    title: string,
    description: string,
    people: number
}

interface IProjects {
    readonly projects: IProject[];
    add(proj: IProject): void;
    renderProj(htmlHook: HTMLElement): void;
}

class CProjects implements IProjects {
    private _projectsList: IProject[] = [];
    get projects(): IProject[] {
        return this._projectsList.slice();
    }

    add(proj: IProject) {
        this._projectsList.push(proj);
        const spTemp = document.getElementById("single-project")! as HTMLTemplateElement;
        const liSPTemp = spTemp.content.querySelector("li");
        liSPTemp!.innerHTML = `<h2> ${proj.title}</h2>
        <p> ${proj.description} </p>
       <p> people: ${proj.people} </p>`;
    }

    renderProj(hook: HTMLElement) {
        const liTemp = document.getElementById("single-project")! as HTMLTemplateElement;
        const projListTemplate = document.getElementById("project-list") as HTMLTemplateElement;
        const projList = projListTemplate.content.cloneNode(true) as HTMLElement;
        let projUL: HTMLUListElement;
        if (!document.querySelector("ul"))
            hook.appendChild(projList);
        else document.querySelector("ul")!.appendChild(projList);

        projUL = document.querySelector("ul")!;
        projUL.appendChild()






        console.log(this.projects);
    }
}

const submitHandler = (event: Event) => {
    event.preventDefault();
    const title = document.getElementById("title") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLTextAreaElement;
    const people = document.getElementById("people") as HTMLInputElement;
    savedProjects.add({
        title: title.value,
        description: description.value,
        people: +people.value
    });
    console.log(savedProjects.projects);
    savedProjects.renderProj(document.getElementById("app")!);

}
const savedProjects = new CProjects();

const rootElement = document.getElementById("app")! as HTMLElement;
const idFormTemplate = document.querySelector("#project-input")! as HTMLTemplateElement;
const form = idFormTemplate.content.cloneNode(true)! as HTMLElement;
rootElement.append(form);
document.querySelector("form")?.addEventListener("submit", submitHandler)
console.log(document.querySelector("button"));
 */
/* const inputFormControls= form.querySelectorAll("input");

for(let inputElement of inputFormControls)
inputElement.addEventListener("change", validateHandler); */

