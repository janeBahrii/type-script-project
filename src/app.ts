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

