# Cronparser

A small script to parse a given cron time & return the times in which the job will run and the command given

## Expected Input

 - Standard 5 part cron time
 - Bash command

### Example usage
- `node index.js "*/15 0 1,15 * 1-5 /usr/bin/find"`
- `cronparse "*/15 0 1,15 * 1-5 /usr/bin/find"`

```
minute        
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       
/usr/bin/find
```

## Requirements
- Running on linux/bash shell
- NodeJS
- npm

## Set up instructions
- `npm install`
- `npm run setup`
