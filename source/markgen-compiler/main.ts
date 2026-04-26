import { MarkgenParser } from './perser.js'

export class MarkgenCompiler{

    constructor(){
        const testCode =  `
        @role you are a agent
        @role you are a agent
        @use React.js, next.js
        `
        let perser = new MarkgenParser(testCode).parse()
    }
}