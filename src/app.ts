// Code goes here!

enum validType {
    vNumber,
    vText
};

const rootElement = document.getElementById("app")! as HTMLElement;

const idFormTemplate = document.querySelector("#project-input")! as HTMLTemplateElement;
const form = idFormTemplate.content.cloneNode(true)! as HTMLElement;
//console.log(document.getElementById("project-input"));
rootElement.append(form);

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
        this.projects.push(proj);
    }

    renderProjToTemplate(hook: HTMLElement) {
        const title = document.getElementById("title") as HTMLInputElement;
        const description = document.getElementById("description") as HTMLTextAreaElement;
        const people = document.getElementById("people") as HTMLInputElement;
        const liTemp = document.getElementById("single-project")! as HTMLTemplateElement;
        const liProj = liTemp.content.querySelector("li") as HTMLLIElement;
        liProj.textContent = `<h2> ${title}</h2>
        <p> ${description} </p>
        <p> people: ${people} </p>`;


    }
}
const submitHandler = () => {
    form.querySelector

}
form.querySelector("button")?.addEventListener("submit", submitHandler)
/* const inputFormControls= form.querySelectorAll("input");

for(let inputElement of inputFormControls)
inputElement.addEventListener("change", validateHandler); */

