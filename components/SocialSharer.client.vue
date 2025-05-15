<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string
    hashtags?: string[]
    text?: string
    large?: boolean
  }>(),
  {
    hashtags: () => [],
    text: () => '',
    large: false,
  },
)

const links = computed(() => ({
  facebook: `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    props.url || window.location.href,
  )}`,
  twitter: `http://twitter.com/share?url=${encodeURIComponent(
    props.url || window.location.href,
  )}&hashtags=${props.hashtags.toString()}&text=${props.text || ''}`,
}))
</script>

<template>
  <div class="flex flex-row mt-4 space-x-5 z-10">
    <a
      :href="links.twitter"
      class="w-9 h-9 opacity-75 hover:opacity-100"
      :class="large ? 'w-12 h-12' : ''"
      rel="noopener"
      target="_blank"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect
          width="32"
          height="32"
          fill="url(#pattern0_13172_9043)"
        />
        <defs>
          <pattern
            id="pattern0_13172_9043"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlink:href="#image0_13172_9043"
              transform="scale(0.00195312)"
            />
          </pattern>
          <image
            id="image0_13172_9043"
            width="512"
            height="512"
            preserveAspectRatio="none"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAAXNSR0IB2cksfwAAAD9QTFRFAAAAe7Ej////3N3biaFgi5N+iZV0g6ZKvb+7fqwyfa4sf6o5jZOCkpaMi6Bp+/v7kpyE9vb1hqRV09XQgahC1J/VUgAAABV0Uk5TAP//////////////////////////ULD6LwAAEghJREFUeJztnemaHMURRVsgWR8CDPj9X9EbBsMH2LJ7NDPqnqkll1juvRn3J1JnReY5ZHS1anlzWSVvuv72R6cq4NK3LISZnaC6CbICWE9MVQRFARznpKeBlgAxs5GyQEaA6ImoWCAhQNYkFCSgFyB7AuwSZK/fVFCKZ5YAZQ37g1U5rQNYy9gazKopJcBcysMgl8znAPJqbgW/XjIH8Bf0JizFMjnAsqZMlV5D4wDJspKUeRcOByhWlqLIjTAogL+2+BUeBd4B9OVFr+884ApALzB0cR1BdgB4jYFL6w6uArCrDFvYYFAVwFxnzKpmA+kA4lIj1mQTQAXwFhuvIsvAKYC23Gj12AdMAawFx6rGK1AKIC05Ui2+AVIAZ9FxKokIjAIoy45SR1xAFMBYeIwqogOhAMTSQxSREAQDANYeoIS05CuQvvrpBSQnW4Hk9V8d/zW5CuQSKP7XpBqQiaDwPyVRgTwIhf82aQqkYSj+98kyIIlD4X+dHAVySBT/raQYkIGi8O8lQYEEGMV/P/EGhNMo/MeJViCaR/E/S7ABsUAKf0tCFQhFUvzbEmlAIJPC3544BeKoFP+ehBkQhqX49yXKgCAuhb8/MQrEkCn+IwkxIARN8R9LhAEBbAr/ePwV8KdT/GfiboA7nuI/F28DvPkU/9k4G+ALqPBbxFUBV0TF3yaeBngyKv5WcTTAEVLxt4ufAX6Uir9l3AzwwlT4reOkgBOo4m8fHwN8SBV/j7gY4IKq+PvEwwAPVsXfKw4GOMAq/n6xN8CeVvH3jLkB5riKv2+sDbDmVfy9Y2yAMbDi7x9bA2yJFf+ImBpgiqz4x8TSAEtmxT8qhgYYQiv+cbEzwI5a8Y+MmQFm2Ip/bKwMsOJW/KNjZIARuOIfHxsDbMgV/4yYGGCCrvjnxMIAC3bFPysGBhjAK/55mTdgnl7xz8y0AdP4in9uZg2Y5Vf8szNpwCTA4p+fOQNKAPpkClD8ETJlwBTC4o+RGQNmGBZ/lEwYMAGx+ONk3IBxisUfKcMGlAAaiReg+GNl1IBRjsUfLYMGDIIs/ngZM2CMZPFHzJABJYBO4gQo/pgZMWCEZfFHzYABAzCLP276DSgBpBIhQPFHTrcB3TiLP3Z6DejliXkFUfQ718ezvwBWc+gcR0MAGgP8+TsLgHoVOYkAAfx7h+oDgnsfEYUBIfw7B1MRgMGAIP6OAiDfSowvwBe7JVrX3jNeDw7sh0nAG7A7b/vKO0bUEQDdgKgG0DliBw3050lhCxDJv2fMdhj4TxRENiCWf8eoSgIAGxDN30EAiocKoxoQzr994FYUHI+VBxUggX/z0EkCrGVA4Alg99iNIMx5rdQEUjaA1sHbQDjgWmcLSOLfOHyaAMsYkMbfUAAXVos0gTz+bUfIE2CNLSCTv5kAXv+vbo47f/6KZEBylQ0HaYDrdhno9sBSBqScAHYdJlMAfQPSS7QQwPM68KkmkP6/12nS+TccKFcA7a8BCPXNC+B7I4hyE8Co7uxYyQIINwEM/tMCeN8JJrsFwJR2crgTwP53AqoagLM5HR8wXQAvA5IFADJzRoCQW4EVzwSgyjo8JKoA3AZgFTUuQAh/wSaAxf/4qAgCbB/ni//MfPqaLAPQ+A8LEMVfrAmg1XN8YAgBvAz48o+RYmYDtyONChDHX+prAOAGcHRobQES1hyplpZj79cbyV/HAJxKGo+OIoBIE0DlPyBAMH+NLQCkjJ4CYARQMACiiM4K9moO5y/QBN7tnnXm89+tAV6Ad79NffwSuPq7Fbz9PaqEg/QJkMCfvgmkF3AcAgG4mwA4/70yoARgNgCef5cASfyJmwA+/51KsASg3QIY+HcIkMaf1YD3u6cqQPy3i1lEAGcQ+aegTWkVIJE/5xZA0QCu2SgHTgBCA2j4Mwvw/tepj18cYfDwbxQglz/d1wAi/lslAQrA1QSo+DcJkM5/rwJIA7j4b1SFKABTEyA5AXwOhwA8TYBtA2gQAIE/TROg4/+6MEwBSJoAIf9TATD4czQBRv6vakMVgMAATv6LCPDV7g+HZnBI+Z8IAMMffwtgOwF8zn19uAKAG8C6AdALAGIAL/9DAZD4Q28BxPxflIgsAK4B1PzpBcg3gJv/gQBg/FF/ECTnf18mtgCYTYD2BPAp9ALkGkC/AewKgMd/dgv48Mven4yz4ud/Vym6AHBNQIG/gABpBkjw3xEAkv/sFmBsgAb/22rxBUBqAir8uQR4u/3U6AwD6E8An0IlAM7XAJkNYFMAWP4wTUCH/03FFAJgGKDEX0OAWAOk+G8IgMx/dgv4095z+jrQafH/XDWJAOlNQI2/iABxBsicAD6FTYBkA3Y//uHnxgLQ8lIAdP65TUCuAVyeK2cXIMQARf58AuQZIMmfUICsJqDJ/4UADPyTtgBR/k/lMwmQYsA3u1/zyfkzCjDZBL79aecPjgaQ+wHgOYwCfP3vzf/suAXINoB7AUj4xzcBYf6PUyATwOsKwZ0BpPlzChB6LqjNX0oAFwPE+ZMK4GXA68//+V97Y2jwvxGAiX9cE9A9AXzKdSIyApgboN4ALrQCxBiwAH9aASabwHc/7vzB7m3zQ4chiJgAllvAEvyfBWDj72/AGvwfZsMpgPMPgqvwlxPAagvQPwF8DK8ArgYsswEwC+D4g+A6/KkF2LlSZ34LWIj/owCU/P2awG70+F/nxCtAtAGK/LkFmDwX/P6fXQeT5C8pgM8WoMmfXIBIA0oAyDj9IDgxJFk0BbDfAlT5PwhAzD/KAFn+/AKEGKDL/+F3rxLgJMr8+QXwN0Cav4AA7gaUAOBxFkCbv4IAvgaI85cQwNMAdf4aArz/bfM/G/wgKM9fQ4DIG0bV8vGNAP/AG0b1oiGA82XiypEWoJrAeUQEqCYwGhUByoDBlACHH9c3QEYALwO+3buZXCQ6AlQTGEoJcPZ5cQOEBKivASNREqCawEBKgPPPSxsgJUA1gf5oCVBNoDtiAuw93rUM2IuYANUEeqMmQDWBzsgJUAb0pQRo/LyqAXoC1BbQFUEByoCelADNn9c0QFEAry3gzX9HigGPpADVBNqzlABlwOtoClA/CDZHVIBqAq1ZTIAy4GVUBahzwcbIClBNoC3LCVAG3EdXgDKgKcICVBNoibIAZUBDVhSgDLiJtAC1BZxHW4Ay4DRrClAGPEdcAK8fBL/+aaQYxKgLUE3gJOoCTP/DrroB4gIYPAVW3ABtAY4mV1vAQ9YVoAx4iLQAJ3MrAy7aApxNrQS4XOhfG3eQ84mVASLvC9hMy7zKAF0BmqbVCvCrX+c+jxtZARpntfwWsLoAyxugKkD7pCYNKAEg0zGnxbcATQG6prS2AZICdM5oaQP+L4CcAb3zWVmAjxc9Afqns7ABggJ88/Pen3ysKwRfRVCAw0uAJs/lPvwy93m86AlwfAlQbQEvIifA2SVgZcB91AQ4vwTQyYASACINl4DWFnCXT1+MVQxougS4DLjJx4uSAHtvC3kBp5rA52gJ0HoPSN0r9BwpAZrvAakm8BwlATruAaom8BQhAbruAZsk+MM/5j6Pk0cBBAzouwewmsCnPP84Si9A7z2gTgZ8+Ufj50EiI0D/PcD1NeAafQF2gVQTuEZFgJGHAJQBl9t/IKU2YIR/NYHLY638Aozxry1ARYBB/mWAiADD/KsJSAgwwX9agG93nhVIY8CNALQG9J8ANnx4kSZwd5EcqQAzG8DBx9doAgICTPKfJ0htAL8A0/zXbgL310kTGjDPf+km8FgjrwAW/Fc2gF0AG/4LNwFZATqX3smAt7/3lRGfFwKwGWC0ARyMJN4EXt0qxSWAHf9pAb770aiQ2HALYMh/1a8B1AKY8l+0Cby+W5bHAGP+898nCQ3YuFuWRgBr/ks2AUkBxtd7vSawdb88iQEO/NdrAp8LoxPAvgEcjaraBHgF8OG/XBOgFcCL/2oGbApAYIAf/7WawE1RVAI48l9rC5ATwGSVFzJgRwB0A3z5L3QueFsRkQDO/BfaAjgFcP0CcHwINQN2BUA2IID/Kk3grhwWASL4r3IuyChADP9FmsCBALAGuH8BtDoOgQH3tXAIEMV/iSZAKEBUAzg6ls4WcCgApAGR/PWbwItCCAQI5b9/uB/+NjcAigF0AgTzl28CJwLAGRDO//Ju74GvEga8rAJdgHj+4l8DTgUAMyDuBLDhoAICvKoBXICMDeDgsPwGkAmQxF+4CTQIAGRAFn/dLeB1AcgC5PGXNaBJABQDMvmLNoGNo+MKkMrf4F91EA3QECBoCRWbQKMAEAYkbwCSTWDr0KgCpPNXNKBZgHwDAPjrNYHNA2MKAMFfbgvoECDZAAz+agZsHxVRABT+Yk1AQIDwhZPaAroEyDQAZwOQMmDnkHgCIPHfr+b7v08NgC9AmgFY/HW+BuwdEE0ANP4yTaBbgBwD4Pi7GRA8n93DYQkAyF+kCQwIkGEAzgngTRSawP6xoASA3AAkDBgSINwAUP4CTeDgSEACwPLn3wIGBYg1AJc/vQFHh4ERAJn/fnV/+evUAOgCBBqAzZ97Czg8CIgA4Py5DZgQIMwAyB8A7sL7g+DxITAEgN8AmLeAKQFiDCDgz2vAyfingAMMoODP2gTOhgcQgIQ/6Q+C0wK4G0DDn7IJnI6dLgAPf8omYCCAswH4J4A3mW0C4Qacj5wtANMGQNgETATwNICLP50BDcM2wXUzgI3/vAGhArSMmioAH3+3pXCZsJkATtMm5E9lQNOQiQJQ8nczAFsAl1lTnQB+Ds0W0DZg63Tsp026AdAYMPetdPjvNYeWP0sTMBbAetbE/Dm2gMkfJqb+5tRg+PwpDJj8cXrub86MxcCfoQk4CGA4a3b++Aa0D9QzE7NZk54A3gS8CXQMkyEA/waAvgU4CWA0awX+2Ab0DNI3D4tZa/BHbgJdQ4QLIMIfeQtwFGB+1jL8cQ3oG6B3FpOzFuKP2gQ6P44iAB9/1C3AWYCw20UrY+nVp59nGYCc7u1jAGcZgJv+9lECSCVEgDIANgPfH4dglgGYGTl/GGNZBiBm6PyxBNBJoABlAGDGfkAaJVkGoGXwB8RhkGUAVkZ/QB7nWAYgZfgfEEoAjSQIUAYAZfxfEGcolgEomfgX5CmIZQBGZq4gmGNYBiBk6goSt0u8KlGZu4KoBKBPqgBlQHomLyF0vM67EpHZq2nn+ZUBmZm+mtr1Xp+Kd+avpve926/iG4O7KUzglQE5sbibxvuO74pfTO6mMkJXBsTH5m46/6d+VHxidDel/3N/Ki6xups24tFfFfuY3U1tiK0MiIvd3fQxj3+s2MbwaQpBD4CtWMbyaRq2zMqAiJg+TSXsIeAVq9g+TceaWBngHeOnKQW+CKJiEeunadnzKgM8Y/40NQdcZYBf7J+m50GrDPCKw9MUXWCVAT7xeJqmD6sywCMuT1N1QlUG2MfnabpepMoA6zg9TdkPVClgGbeHaTtiKgPs4vcwdU9KZYBVHB+m7wqpDLCJ58sUfBmVARZxfZmGN6JSYDbO71JxB1QGzMX7XTr+fMqAmbi/SykATxkwHv93aYXQKQXGEvEqtRg2ZcBIQl6lF4SmDOhPzKsUw8iUAn2JepNmHJcyoCdhb1INxFIGtCfuTbqhVEqBtkS+SDmWSRnQktAXaUcjKQXOEvwe9XAgZcBxgvln8CgF9hONP4dGGbCXeP5JMEqBrSTgT0NRBrxOCv88EqXAfXLwZ3IoA26TxT8VQynwlDT82RBKgWsS8acjKAOS+ecTSC8gObn4IdYfoIS0ZOMHWX2IIhKSjx9l7TGqiA4Cf5ilR6kjLhD4kRYep5KIgODHWnakWnwDgx9t0bGq8QoQfrwlR6vHPlD4ERccryLLgOHHXG7EmmwChx92sUHLmgsgfuCVhi1sMJD0L9DrDFxad1Dxg68ydHEdwcWPv8bo9Z0Hmf6FYYHxKzwKOH6S5aUociPw9C80a0tS5l0Y8DOtLE+l13DQv5AtK0uxNPQvPGv6FPx6mehfGBb0VZBLJqN/wV7N/WBWzUf/grqULcGqnBL+NVjL2BmU4mnpX3DWcDjZE2CGf032+pkkaxLs8K+REOCa6IkowL9GRoCHxMxGhf1DtAT4FMc5SbF/iKIAD7GemB76T5EV4CmzE1QF/xR5AZ7TN1N17s/5H74yAXqSW7+IAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>

    </a>
    <a
      :href="links.facebook"
      class="w-8 h-8 opacity-75 hover:opacity-100"
      :class="large ? 'w-11 h-11' : ''"
      rel="noopener"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
    </a>
  </div>
</template>
