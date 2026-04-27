import chalk from 'chalk';

class Parser {
    content: string = "";

    constructor(initialContent: string) {
        this.content = initialContent;
    }
}

type ImportantRule = {
    rule: string;
    level: "important" | "critical";
};

export class MarkgenParser extends Parser {

    private importantRules: ImportantRule[] = [];

    constructor(code: string) {
        super(code);
    }

    parse() {
        const normalized = this.normalizeMultiline(this.content);
        const lines = normalized.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith("@role")) {
                const value = this.extractValue("@role", trimmedLine);
                this.sendPost(`ROLE: { ${value} }`);

            } else if (trimmedLine.startsWith("@use")) {
                const value = this.extractValue("@use", trimmedLine);
                this.sendPost(`USE: { ${value} }`);

            } else if (trimmedLine.startsWith("@task")) {
                const value = this.extractValue("@task", trimmedLine);
                this.sendPost(`TASK: { ${value} }`);

            } else if (trimmedLine.startsWith("@step")) {
                const value = this.extractValue("@step", trimmedLine);
                this.sendPost(`STEP: { ${value} }`);

            } 
            
            else if (trimmedLine.startsWith("@important!")) {
                const value = this.extractValue("@important!", trimmedLine);
                this.registerImportant(value, "critical");

            } else if (trimmedLine.startsWith("@important")) {
                const value = this.extractValue("@important", trimmedLine);
                this.registerImportant(value, "important");
            }
        });

        this.flushImportantRules();
    }

    private registerImportant(value: string, level: "important" | "critical") {
        const parsed = this.parseImportantValue(value);

        this.importantRules.push({
            rule: parsed,
            level
        });
    }

    private parseImportantValue(value: string): string {
        if (value.includes(":")) {
            const ruleMatch = value.match(/rule\s*:\s*"([^"]+)"/);
            if (ruleMatch) return ruleMatch[1];
        }

        return value.replace(/^"|"$/g, '').trim();
    }

    private flushImportantRules() {
        if (this.importantRules.length === 0) return;

        console.log(chalk.yellow("\n📌 Constraints:\n"));

        this.importantRules.forEach(rule => {
            if (rule.level === "important") {
                console.log(
                    chalk.blue("[important] ") + rule.rule
                );
            } else {
                console.log(
                    chalk.red("[critical] ") + rule.rule
                );
            }
        });

        console.log();
    }
    private normalizeMultiline(source: string): string {
        const result: string[] = [];
        let buffer: string | null = null;
        let depth = 0;

        for (const line of source.split('\n')) {
            const trimmed = line.trim();

            if (buffer !== null) {
                buffer += ' ' + trimmed;
                depth += this.countChar(trimmed, '(') - this.countChar(trimmed, ')');

                if (depth <= 0) {
                    result.push(buffer.trim());
                    buffer = null;
                    depth = 0;
                }

            } else if (/^@\w+!?[\s]*\(/.test(trimmed)) {
                const opens  = this.countChar(trimmed, '(');
                const closes = this.countChar(trimmed, ')');

                if (opens > closes) {
                    buffer = trimmed;
                    depth  = opens - closes;
                } else {
                    result.push(trimmed);
                }

            } else {
                result.push(line);
            }
        }

        if (buffer !== null) {
            result.push(buffer);
        }

        return result.join('\n');
    }

    private extractValue(directive: string, line: string): string {
        const rest = line.slice(directive.length).trim();

        if (rest.startsWith('(') && rest.endsWith(')')) {
            return rest.slice(1, -1).trim();
        }

        return rest.replace(/^"|"$/g, '').trim();
    }

    private countChar(str: string, ch: string): number {
        let count = 0;
        for (const c of str) if (c === ch) count++;
        return count;
    }

    private sendPost(payload: string) {
        console.log(chalk.green("🚀 Gönderiliyor: ") + chalk.cyan(payload));
    }
}