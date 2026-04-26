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
        });
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

            } else if (/^@\w+\s*\(/.test(trimmed)) {
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
            const inner = rest.slice(1, -1).trim();
            return inner;
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