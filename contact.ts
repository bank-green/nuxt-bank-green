import { defineStore } from 'pinia';

export type Tone = 'friendly' | 'casual' | 'formal' | 'angry';

export interface ContactState {
  bankName: string;
  website: string;
  tone: Tone;
  consent: boolean;
  subject: string;
  message: string;
}

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({
    bankName: '',
    website: '',
    tone: 'friendly',
    consent: false,
    subject: '',
    message: '',
  }),
  getters: {
    isReady: state => Boolean(state.bankName && state.consent),
    subjectText: state =>
      state.subject ?? `Request: Greener Bank at ${state.bankName}`,
  },
  actions: {
    setFromForm(payload: {
      bankName: string;
      website: string;
      tone: Tone;
      consent: boolean;
    }) {
      this.bankName = payload.bankName;
      this.website = payload.website;
      this.tone = payload.tone;
      this.consent = payload.consent;
    },
    setMessage(subject: string, message: string) {
      this.subject = subject;
      this.message = message;
    },
    reset() {
      this.$reset();
    },
  },
});
