export const MOCK_BANKS = [
  {
    name: 'ZXZ Bank D',
    tag: 'zxz_bank_d',
    website: 'https://www.aaa.test/',
    aliases: null,
  },
  {
    name: 'Xion',
    tag: 'Xion',
    website: 'https://cat.test/en/',
    aliases: null,
  },
  {
    name: 'Xrgenta',
    tag: 'xgenta',
    website: 'https://www.x.com/',
    aliases: null,
  },
  {
    name: 'BNP Paribas',
    tag: 'bnp_paribas',
    website: 'http://www.car.com/en',
    aliases: 'National Bank of CAR FOO, house',
  },
  {
    name: 'bank25',
    tag: 'b25',
    website: 'http://b25.test',
    aliases: 'b25',
  },
];

export const mockBanksFetchData = {
  brands: {
    edges: MOCK_BANKS.map(b => ({ node: b })),
  },
};
