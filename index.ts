#!/usr/bin/env node

import * as process from 'process';
import { expandCron, printCronTable } from './utils/utils';



export function main(): void {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        throw new Error('Usage: cron-parser "<cron_string>"');
        return;
    }

    try {
        const cronString = args[0];
        const expanded = expandCron(cronString);
        printCronTable(expanded);
    } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
        return;
    }
}

main();