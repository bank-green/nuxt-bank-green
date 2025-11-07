import { defineStore } from 'pinia';

type Draft = {
  subject: string;
  text: string;
  campaignId?: number;
  brandTag?: string;
};

export const useEmbraceStore = defineStore('embrace', {
  state: () => ({ draft: { subject: '', text: '' } as Draft }),
  actions: {
    setDraft(p: Partial<Draft>) {
      this.draft = { ...this.draft, ...p };
    },
    clearDraft() {
      this.draft = { subject: '', text: '' };
    },
  },
});
