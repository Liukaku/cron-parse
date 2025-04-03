import { describe, test } from "@jest/globals";
import { expandCron, expandField } from './utils/utils';

describe('expandCron', () => {
  test('should expand a single value', () => {
    const cronString = "*/15 0 1,15 * 1-5 /usr/bin/find";
    const result = expandCron(cronString);
   expect(result).toEqual({
      minute: ['0', '15', '30', '45'],
      hour: ['0'],
      'day of month': ['1', '15'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      'day of week': ['1', '2', '3', '4', '5'],
      command: '/usr/bin/find',
    });
  })

  test('should expand a range', () => {
    const cronString = "*/15 0 1-5 * * /usr/bin/find";
    const result = expandCron(cronString);
    expect(result).toEqual({
      minute: ['0', '15', '30', '45'],
      hour: ['0'],
      'day of month': ['1', '2', '3', '4', '5'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      'day of week': ['0', '1', '2', '3', '4', '5', '6'],
      command: '/usr/bin/find',
    });
  })

  test('should expand a list', () => {
    const cronString = "*/15 0 1,2,3 * * /usr/bin/find";
    const result = expandCron(cronString);
    expect(result).toEqual({
      minute: ['0', '15', '30', '45'],
      hour: ['0'],
      'day of month': ['1', '2', '3'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      'day of week': ['0', '1', '2', '3', '4', '5', '6'],
      command: '/usr/bin/find',
    });
  })

  test('should expand a step', () => {
    const cronString = "*/15 0 1-5/2 * * /usr/bin/find";
    const result = expandCron(cronString);
    expect(result).toEqual({
      minute: ['0', '15', '30', '45'],
      hour: ['0'],
      'day of month': ['1', '3', '5'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      'day of week': ['0', '1', '2', '3', '4', '5', '6'],
      command: '/usr/bin/find',
    });
  })

  test('should expand a complex cron string', () => {
    const cronString = "*/15 0 1,2,3 * 1-5 /usr/bin/find";
    const result = expandCron(cronString);
    expect(result).toEqual({
      minute: ['0', '15', '30', '45'],
      hour: ['0'],
      'day of month': ['1', '2', '3'],
      month: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      'day of week': ['1', '2', '3', '4', '5'],
      command: '/usr/bin/find',
    });
  })

  test('should throw an error for invalid cron string', () => {
    const cronString = "invalid cron string";
    expect(() => expandCron(cronString)).toThrow('Invalid cron string');
  })

  test('should throw an error for invalid cron string', () => {
    const cronString = "invalid cron string";
    expect(() => expandCron(cronString)).toThrow('Invalid cron string');
  })
})