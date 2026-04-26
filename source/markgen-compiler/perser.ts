import chalk from 'chalk';

class Parser {
    content: string = ""; 

    constructor(initialContent: string) {
        this.content = initialContent;
    }

}

export class MarkgenParser extends Parser {
    
    constructor(code: string) {
        super(code);
    }

    parse() {
        const lines = this.content.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith("@role")) {
                const roleValue = trimmedLine.replace("@role", "").trim();
                const formatted = `ROLE: { ${roleValue} }`;
                this.sendPost(formatted)

            }
            else if(trimmedLine.startsWith("@use")){
                const roleValue = trimmedLine.replace("@role", "").trim();      
                const formatted = `USE: { ${roleValue} }`;
                this.sendPost(formatted)
            }
        });
    }

    private sendPost(payload: string) {
        console.log(chalk.green("🚀 Gönderiliyor: ") + chalk.cyan(payload));
    }
}

