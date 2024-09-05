import { getCurrentTimeISOString, formatDateByTimeStamp, formatDateTimeByString ,formatDateByArray} from '../../lib/date'
import { isValidDate } from '../../lib/validate'

describe('getCurrentTimeISOString', () => {
  test('should return a string in ISO format', () => {
    const result = getCurrentTimeISOString()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  })

  test('should return a string in UTC timezone', () => {
    const result = getCurrentTimeISOString()
    expect(result.endsWith('Z')).toBe(true)
  })
})

describe('formatDateByTimeStamp', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      /** */
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should return date.toString() when timeStamp is less than 0', () => {
    const timeStamp = -1
    expect(formatDateByTimeStamp(timeStamp)).toEqual('Invalid Date')
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledWith('invalid timeStamp')
  })

  test('should return formatted date when timeStamp is valid and formatter is not provided', () => {
    const timeStamp = 1704038400000
    expect(formatDateByTimeStamp(timeStamp)).toEqual('2024-01-01 00:00:00')
  })

  test('should return formatted date when timeStamp is valid and formatter is provided', () => {
    const timeStamp = 1704038400000
    const formatter = 'YYYY/MM/DD hh:mm:ss'
    expect(formatDateByTimeStamp(timeStamp, formatter)).toEqual(
      '2024/01/01 00:00:00'
    )
  })
})


describe('formatDateTimeByString', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {/** */});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return date string when input is valid date', () => {
    const dateString = '2023-07-01';
    const result = formatDateTimeByString(dateString);

    expect(result).toEqual('2023-07-01 08:00:00');
  });

  test('should return default formatted date string when input is valid date and no formatter provided', () => {
    const dateString = '2023-07-01 16:00:00';
    const result = formatDateTimeByString(dateString);

    expect(result).toEqual('2023-07-01 16:00:00');
  });

  test('should return custom formatted date string when input is valid date and formatter provided', () => {
    const dateString = '2023-07-01';
    const formatter = 'YYYY/MM/DD';
    const result = formatDateTimeByString(dateString, formatter);

    expect(result).toEqual('2023/07/01');
  });

  test('should return date string when input is invalid date', () => {
    const dateString = 'invalid date';
    const result = formatDateTimeByString(dateString);

    expect(result).toEqual('Invalid Date');
  });

  test('should call console.warn when input is invalid date', () => {
    const dateString = 'invalid date';
    formatDateTimeByString(dateString);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith('invalid date string');
  });
});


describe('formatDateByArray', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {/** */})
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  test('should return Invalid Date when array is not an array or length is less than 2', () => {
    // @ts-expect-error: error
    const result = formatDateByArray(123)
    expect(result).toEqual('Invalid Date')
  })

  test('should return Invalid Date when generated date is invalid', () => {
    const result = formatDateByArray([])
    expect(result).toEqual('Invalid Date')
  })

  test('should return formatted date when array is valid', () => {
    const result = formatDateByArray([2023, 5, 10, 10, 10, 10])
    expect(isValidDate(new Date(result))).toEqual(true)
  })

  it('should handle invalid date generated from array', () => {
    const invalidDateArray = [2024, NaN, 1];
    const result = formatDateByArray(invalidDateArray);
    expect(result).toEqual('Invalid Date');
    const consoleWarnSpy = jest.spyOn(console, 'warn');
    expect(consoleWarnSpy).toHaveBeenCalledWith(`Invalid date generated from array: 2024,NaN,1`);
    consoleWarnSpy.mockRestore();
  });
})