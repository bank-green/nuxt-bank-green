// __tests__/App.exit-intent-modal.spec.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, nextTick } from 'vue';
import App from '../App.vue';

// minimal Nuxt auto-imports mock
vi.mock('#imports', () => ({
  useRoute: () => ({ path: '/' }), // not /impact
  useCookie: () => ref(false), // hasUserSeenExitIntent
  useHead: () => {}, // no-op
}));

// tiny stub: shows a div only when v-model is true
const SwitchSurveyExitStub = {
  name: 'SwitchSurveyExit',
  props: { modelValue: { type: Boolean, default: false } },
  template: `<div v-if="modelValue" data-test="modal"></div>`,
};

function mountApp() {
  return mount(App, {
    global: {
      stubs: {
        // 'SwitchSurveyExit.client': SwitchSurveyExitStub,
        'switch-survey-exit.client': SwitchSurveyExitStub,
        NuxtLink: { template: '<a><slot /></a>' },
        NuxtLoadingIndicator: { template: '<div />' },
        NuxtPage: { template: '<div />' },
        NavBar: { template: '<nav />' },
        NavFooter: { template: '<footer />' },
        NotificationPanel: { template: '<aside />' },
      },
      mocks: { $route: { path: '/' } }, // template-side $route
    },
    attachTo: document.body,
  });
}

describe('Exit-intent modal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens after 30 seconds on mouseleave', async () => {
    const wrapper = mountApp();

    // sanity: the container with @mouseleave exists
    expect(wrapper.find('.app').exists()).toBe(true);

    // initial state: modal hidden (assert via stub prop)
    const modal = wrapper.findComponent(SwitchSurveyExitStub);
    expect(modal.exists()).toBe(true);
    expect(modal.props('modelValue')).toBe(false);
    expect(wrapper.find('[data-test="modal"]').exists()).toBe(false);

    // fire the event where the listener is declared
    await wrapper.get('.app').trigger('mouseleave');

    // advance the full delay
    await vi.advanceTimersByTimeAsync(30000);
    await nextTick();

    // assert via stub prop and via DOM
    expect(
      wrapper.findComponent(SwitchSurveyExitStub).props('modelValue')
    ).toBe(true);
    expect(wrapper.find('[data-test="modal"]').exists()).toBe(true);
  });
});
