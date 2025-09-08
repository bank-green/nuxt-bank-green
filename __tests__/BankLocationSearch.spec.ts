/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/vue';
import { mockNuxtImport, renderSuspended } from '@nuxt/test-utils/runtime';
import {
  MOCK_BANKS,
  mockBanksFetchData,
} from './utils/BankLocationSearch.spec.utils';
import BankLocationSearch from '@/components/forms/BankLocationSearch.vue';

const mockCountry = ref('CN');
const mockFetchGql = vi.fn();

describe('BankLocationSearch.vue', () => {
  beforeAll(() => {
    mockNuxtImport('useGql', () => () => mockFetchGql);
    vi.mock('@/composables/useCountry', () => ({
      useCountry: () => ({
        country: mockCountry,
      }),
    }));
  });
  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('works as expected with valid props and user input', async () => {
    const bank = ref(null);
    mockCountry.value = 'CN';
    mockFetchGql.mockResolvedValue(mockBanksFetchData);

    await renderSuspended(BankLocationSearch, {
      props: { modelValue: bank },
    });

    // There's an initial banks fetch on load, (if the country is available)
    expect(mockFetchGql).toHaveBeenCalledOnce();
    expect(mockFetchGql).toHaveBeenCalledWith('BrandsByCountryQuery', {
      country: 'CN',
      state: undefined,
    });

    // check render
    const countrySearch = screen.getByTestId('location-search-input');
    expect(countrySearch).toBeTruthy();

    const BankSearch = screen.getByTestId('bank-search-input');
    expect(BankSearch).toBeTruthy();

    // state input doesn't render if country is does not support state search
    expect(screen.queryByTestId('state-search-input')).toBeNull();

    // Search and select USA
    const countryTextBox = screen.getByPlaceholderText('Search country...');
    await fireEvent.click(countryTextBox);
    await fireEvent.update(countryTextBox, 'usa');
    const usaOption = await screen.findByText(/united states/i);
    await fireEvent.click(usaOption);

    // check country value updates correctly
    expect(mockCountry.value).toEqual('US');

    // now state search component should appear b/c USA is a country that supports state search
    const stateSearch = screen.queryByTestId('state-search-input');
    expect(stateSearch).toBeTruthy();

    // Search and select Alabama
    const stateTextBox = screen.getByPlaceholderText('Search region/state');
    await fireEvent.click(stateTextBox);
    await fireEvent.update(stateTextBox, 'ala');
    const alabamaOption = await screen.findByText(/alabama/i);
    await fireEvent.click(alabamaOption);

    // When state and country are selected we expect the filtered fetch
    expect(mockFetchGql).toHaveBeenCalledTimes(2);
    expect(mockFetchGql).toHaveBeenLastCalledWith('BrandsByCountryQuery', {
      country: 'US',
      state: 'US-AL',
    });

    // Search Banks
    const banksTextBox = await waitFor(() =>
      screen.getByPlaceholderText('Search bank...')
    );
    await fireEvent.click(banksTextBox);

    // All banks should be shown
    for (const bankOption of MOCK_BANKS) {
      expect(screen.getByText(bankOption.name)).toBeTruthy();
    }

    // select a bank
    const selectedBank = MOCK_BANKS[0];
    await fireEvent.click(screen.getByText(selectedBank.name));

    // our v-model bank data should be updated with selected bank
    expect(bank.value).toEqual(selectedBank);
  });

  it('does not initally fetch if no country data', async () => {
    mockCountry.value = '';
    mockFetchGql.mockResolvedValue(mockBanksFetchData);

    await renderSuspended(BankLocationSearch, {
      props: { modelValue: ref(null) },
    });

    expect(mockFetchGql).not.toHaveBeenCalled();
  });

  it('does not render location when "hidelocation" flag is set', async () => {
    mockFetchGql.mockResolvedValue(mockBanksFetchData);
    mockCountry.value = 'US';

    await renderSuspended(BankLocationSearch, {
      props: { modelValue: ref(null), hideLocation: true },
    });

    expect(screen.queryByTestId('state-search-input')).toBeNull();
    expect(screen.queryByTestId('location-search-input')).toBeNull();
    expect(screen.queryByTestId('bank-search-input')).toBeTruthy();
  });
});
