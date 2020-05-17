import { sort } from "semver";
import * as fs from "fs";
import * as camelcase from "camelcase";

interface ICommand {
    name: string;
    summary: string;
    complexity: string;
    arguments: {
        name: string;
        type: string;
        command?: string;
        optional?: boolean;
        multiple?: boolean;
        enum?: string[];
    }[];
    see: string;
    since: string;
    group: string;
    returnValue: {
        type: string;
        description: string;
    }
}

const commands: { [key: string]: ICommand } = require("./redis-doc/commands.json");

const versions = {};

commands["CLIENT REPLY"].since = "3.2.0";

for (const command of Object.keys(commands)) {
    versions[commands[command].since] = versions[commands[command].since] || {};
    versions[commands[command].since][command] = commands[command];
}

for (const command of Object.keys(commands)) {

    commands[command].name = command.toLowerCase();

    const docname = command.toLowerCase().replace(/ /g, "-");

    const content = (fs.readFileSync(`./redis-doc/commands/${docname}.md`, 'utf8'));

    const dataTypeRegex = /(?:@)(.*)(?:-reply): (.*)\n/g
    const matches = dataTypeRegex.exec(content) || [];

    commands[command].see = `https://redis.io/commands/${docname}`;

    commands[command].returnValue = {
        type: matches[1],
        description: matches[2]
    }
}

const convertToTStype = (docType: string, enumValues?: string[]) => {

    let type = docType;

    if (type === "enum") {
        type = `"${enumValues.map(value => value.replace(/"/g, "")).join('" | "')}"`;
    }

    if (type === "key") {
        type = "KeyType";
    }

    if (type === "simple-string") {
        type = "string";
    }

    if (type === "bulk-string") {
        type = "string";
    }

    if (type === "double") {
        type = "number";
    }

    if (type === "posix time") {
        type = "number";
    }

    if (type === "pattern") {
        type = "string";
    }

    if (type === "integer") {
        type = "number";
    }

    if (type === "array") {
        type = 'any[]';
    }

    if (!type) {
        type = 'any'
    }

    return type;
}

const toDefinition = (command: ICommand) => {
    if (command.name.includes(" ")) {
        return "";
    }
    const args = [];

    if (command.arguments) {
        for (const arg of command.arguments) {
            let type = convertToTStype(arg.type, arg.enum);

            if (arg.name) {
                const argDefinition = `${camelcase(arg.name)}${arg.optional ? "?" : ""}: ${type}`;
                args.push(argDefinition);
            }
        }
    }

    const result = `
        /** 
         * ${command.summary}
         *
         * @see ${command.see}
         * @since  ${command.since}
         */
        ${command.name}(${args.join(', ')}${args.length ? ",": ""} callback: Callback<${convertToTStype(command.returnValue.type) || "void"}>): void;
        ${command.name}(${args.join(', ')}): Promise<${convertToTStype(command.returnValue.type) || "void"}>;
    `;
    
    return result;
}

let definition = `interface Commands {`;
for (const command of Object.keys(commands)) {
    definition += toDefinition(commands[command]);
}

definition += `}`


const header = (fs.readFileSync(`./header.d.ts`, 'utf8'));
const middle = (fs.readFileSync(`./middle.d.ts`, 'utf8'));
const footer = (fs.readFileSync(`./footer.d.ts`, 'utf8'));

fs.writeFileSync(`./generated.d.ts`, `${header}${definition}${middle}${footer}`);

