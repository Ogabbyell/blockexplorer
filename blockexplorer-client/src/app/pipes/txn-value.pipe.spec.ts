import { TxnValuePipe } from './txn-value.pipe';

describe('TxnValuePipe', () => {
  it('create an instance', () => {
    const pipe = new TxnValuePipe();
    expect(pipe).toBeTruthy();
  });
});
