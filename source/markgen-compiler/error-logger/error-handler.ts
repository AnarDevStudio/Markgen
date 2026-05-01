import chalk from "chalk";

function toError(value: unknown): Error {
    if (value instanceof Error) return value;
    return new Error(String(value));
}

export function handleError(error: unknown): never {
    const normalized = toError(error);
    console.error(chalk.red.bold("Markgen error:"), normalized.message);

    if (normalized.stack) {
        console.error(chalk.gray(normalized.stack));
    }

    process.exit(1);
}

export async function withErrorHandling(task: () => Promise<void> | void) {
    try {
        await task();
    } catch (error) {
        handleError(error);
    }
}
