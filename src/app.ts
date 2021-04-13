// Code goes here!

enum validType {
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
    }

    renderProj(hook: HTMLElement) {
        const liTemp = document.getElementById("single-project")! as HTMLTemplateElement;



        const projListTemplate = document.getElementById("project-list") as HTMLTemplateElement;
        const projList = projListTemplate.content.cloneNode(true) as HTMLElement;
        let projUL: HTMLUListElement;
        if (document.querySelector("ul"))
            projUL = document.querySelector("ul")!
        else projUL = projList.querySelector("ul")!;


        for (let proj of this._projectsList) {
        const newLiElem = document.importNode(liTemp.content, true);
        const liProj = newLiElem.querySelector("li") as HTMLLIElement;

           /*  let eTitle = document.createElement("h2") as HTMLElement;
            eTitle.textContent = proj.title;
            liProj.appendChild(eTitle);
            let eDescr = document.createElement("p") as HTMLElement;
            eDescr.textContent = proj.description;
            liProj.appendChild(eDescr);
            let ePeople = document.createElement("p") as HTMLElement;
            ePeople.textContent = "people:" + proj.people.toString();
            liProj.appendChild(ePeople);
            console.log(liTemp); */
            //   newLiElem.textContent = `<h2> ${proj.title}</h2>
            //  <p> ${proj.description} </p>
            // <p> people: ${proj.people} </p>`;

        }
        projUL.appendChild(newLiElem);

        if (!document.querySelector("ul"))
          hook.appendChild(projList);



        console.log(projUL);




    }
}

const savedProjects = new CProjects();

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

const rootElement = document.getElementById("app")! as HTMLElement;
const idFormTemplate = document.querySelector("#project-input")! as HTMLTemplateElement;
const form = idFormTemplate.content.cloneNode(true)! as HTMLElement;
rootElement.append(form);
document.querySelector("form")?.addEventListener("submit", submitHandler)
console.log(document.querySelector("button"));
/* const inputFormControls= form.querySelectorAll("input");

for(let inputElement of inputFormControls)
inputElement.addEventListener("change", validateHandler); */

