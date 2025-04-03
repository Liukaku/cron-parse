import { exec } from 'child_process';
export function expandCron(cronString: string): Record<string, string[] | string> {
    // Split the cron string into its components
    const parts = cronString.split(' ');
    if (parts.length < 6) {
        throw new Error('Invalid cron string: Not enough fields.');
    }

    // deligate the parts into their respective fields
    const [minute, hour, dayOfMonth, month, dayOfWeek, ...commandParts] = parts;
    const command = commandParts.join(' ');

    return {
        minute: expandField(minute, 0, 59),
        hour: expandField(hour, 0, 23),
        'day of month': expandField(dayOfMonth, 1, 31),
        month: expandField(month, 1, 12),
        'day of week': expandField(dayOfWeek, 0, 6),
        command: command,
    };
}

export function expandField(field: string, minVal: number, maxVal: number): string[] {
    let values: number[] = [];
    if (field === '*') {
        values = Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
    } else if (field.includes(',')) {
        for (const part of field.split(',')) {
            values = values.concat(expandField(part, minVal, maxVal).map(Number));
        }
    } else if (field.includes('-') && field.includes('/')) {
        const [range, step] = field.split('/');
        const [start, end] = range.split('-').map(Number);
        values = generateSteppedRange(start, end, Number(step), minVal, maxVal);
    } else if (field.includes('-')) {
        const [start, end] = field.split('-').map(Number);
        values = generateSteppedRange(start, end, 1, minVal, maxVal);
    } else if (field.includes('/')) {
        const [base, step] = field.split('/').map(Number);
        values = generateSteppedRange(minVal, maxVal, Number(step), minVal, maxVal);
        if (base !== undefined && `${base}` !== "NaN") {
            values = values.filter(x => x >= base);
        }
    } else {
        values = [Number(field)];
    }

    return Array.from(new Set(values)).sort((a, b) => a - b).map(String);
}


export function printCronTable(expanded: Record<string, string[] | string>): void {
    for (const [field, values] of Object.entries(expanded)) {
        if (field !== 'command') {
            const valuesString = Array.isArray(values) ? values.join(' ') : values;
            console.log(`${field.padEnd(14)}${valuesString}`);
        } else {
            // runCommand(`echo "${field}: ${valuesString}"`);
            console.log(values);
        }
    }
}


function generateSteppedRange(start: number, end: number, step: number, minVal: number, maxVal: number): number[] {
    return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => i * step + start)
        .filter(x => x >= minVal && x <= maxVal);
}

function runCommand(command: string): void {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(`Command output: ${stdout}`);
    });
}