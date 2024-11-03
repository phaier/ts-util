import { withRetry } from './retry';

describe('withRetry', () => {
  test('always success', async () => {
    const action = jest.fn().mockResolvedValue('success');
    const result = await withRetry(3, action);
    expect(result).toBe('success');
    expect(action).toHaveBeenCalledTimes(1);
  });

  test('always fail', async () => {
    const action = jest.fn().mockRejectedValue('fail');
    await expect(withRetry(3, action)).rejects.toEqual('fail');
    expect(action).toHaveBeenCalledTimes(3);
  });

  test('fail once', async () => {
    const action = jest.fn().mockRejectedValueOnce('fail').mockResolvedValue('success');
    const result = await withRetry(3, action);
    expect(result).toBe('success');
    expect(action).toHaveBeenCalledTimes(2);
  });
});
