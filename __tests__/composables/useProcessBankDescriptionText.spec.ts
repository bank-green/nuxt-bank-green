/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/first */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('~/composables/useGlossary', () => ({
  useGlossary: vi.fn(),
}));

import useProcessBankDescriptionText from '~/composables/useProcessBankDescriptionText';
import { useGlossary } from '~/composables/useGlossary';

describe('useProcessBankDescriptionText', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    (useGlossary as any).mockResolvedValue({
      terms: [
        { term: 'FI', tooltip: 'A financial institution' },
        { term: 'Loan', tooltip: 'Money borrowed' },
      ],
    });
  });

  it('works as expected', async () => {
    const { process } = await useProcessBankDescriptionText();

    const result = process(
      '<p>Bank is one of the world\'s biggest FI*. In the 9 years since the Paris Agreement, this bank has funneled $235 Billion USD into coal, oil, and gas, rapidly accelerating the climate crisis. * <a href="https://www.google.com" target="_self" rel="noopener noreferrer">Details here</a></p>'
    );

    expect(result).toBe(
      `<p>Bank is one of the world's biggest <a href="/glossary#fi" class="tooltip" data-tooltip="A financial institution" target="_blank" rel="noopener noreferrer">FI</a>*. In the 9 years since the Paris Agreement, this bank has funneled $235 Billion USD into coal, oil, and gas, rapidly accelerating the climate crisis. * <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Details here</a></p>`
    );
  });
});
