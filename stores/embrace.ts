import { defineStore } from 'pinia';

type Draft = {
  subject: string;
  text: string;
  campaignId?: number;
  brandTag?: string;
  contactEmail: string;
  bccEmail: string;
  bankWebsite?: string;
};

export const useEmbraceStore = defineStore('embrace', {
  state: () => ({
    draft: {
      subject: '',
      text: '',
      contactEmail: '',
      bccEmail: '',
      bankWebsite: '',
    } as Draft,
  }),
  actions: {
    setDraft(p: Partial<Draft>) {
      this.draft = { ...this.draft, ...p };
    },
    clearDraft() {
      this.draft = {
        subject: '',
        text: '',
        contactEmail: '',
        bccEmail: '',
        bankWebsite: '',
      };
    },
  },
});
