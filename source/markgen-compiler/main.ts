import { MarkgenParser } from './perser.js'

export class MarkgenCompiler{

    constructor(){
        const testCode =  `
        @role ( you are a agent )
        @role ( you are a agent )
        @use React.js, next.js
        @task ( create a new project with next.js and react.js )
        @step ( create a new next.js project using create-next-app )
        @important ( make sure to use the latest version of next.js )
        @important! ( this is critical, do not forget to install react.js as well )
        `
        let perser = new MarkgenParser(testCode).parse()
    }
}