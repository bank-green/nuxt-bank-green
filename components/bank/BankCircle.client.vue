<template>
  <div class="w-full flex px-12 md:px-0">
    <div class="shadow-circle bg-white rounded-full relative squarebox">
      <svg
        class="absolute"
        style="width: 80%; height: 60.54%; top: 10%; left: 10%"
        viewBox="0 0 101 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50.5 12.1424C71.6015 12.1424 88.7075 29.2485 88.7075 50.35C88.7075 57.5328 86.7311 64.2361 83.2957 69.9655L93.4094 76.0297C97.9126 68.5194 100.5 59.7278 100.5 50.35C100.5 22.7357 78.1142 0.349976 50.5 0.349976C22.8858 0.349976 0.499999 22.7357 0.499999 50.35C0.499999 59.7278 3.08738 68.5194 7.59058 76.0297L17.7043 69.9655C14.2689 64.2361 12.2924 57.5328 12.2924 50.35C12.2924 29.2485 29.3985 12.1424 50.5 12.1424Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="9.10269"
            y1="68.1435"
            x2="91.2208"
            y2="69.9302"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0" stop-color="#F96363" />
            <stop offset="0.2" stop-color="#FFB067" />
            <stop offset="0.4" stop-color="#E8C753" />
            <stop offset="0.6" stop-color="#AEDA66" />
            <stop offset="0.8" stop-color="#64E287" />
            <stop offset="1.0" stop-color="#29DEBD" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        class="absolute"
        style="top: 14%; left: 14%; width: 72.8%; height: 55.2%"
        viewBox="0 0 91 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M83.3523 67.9976C87.3216 61.3777 89.6035 53.6303 89.6035 45.35C89.6035 20.9921 69.8576 1.2462 45.4998 1.2462C21.1419 1.2462 1.396 20.9921 1.396 45.35C1.396 53.6303 3.67792 61.3777 7.64722 67.9976"
          stroke="white"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0.4 3"
        />
      </svg>

      <svg
        class="absolute opacity-25"
        style="top: 20%; left: 20%; width: 60%; height: 45.408%"
        viewBox="0 0 101 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M50.5 12.1424C71.6015 12.1424 88.7075 29.2485 88.7075 50.35C88.7075 57.5328 86.7311 64.2361 83.2957 69.9655L93.4094 76.0297C97.9126 68.5194 100.5 59.7278 100.5 50.35C100.5 22.7357 78.1142 0.349976 50.5 0.349976C22.8858 0.349976 0.499999 22.7357 0.499999 50.35C0.499999 59.7278 3.08738 68.5194 7.59058 76.0297L17.7043 69.9655C14.2689 64.2361 12.2924 57.5328 12.2924 50.35C12.2924 29.2485 29.3985 12.1424 50.5 12.1424Z"
          fill="url(#paint0_linear)"
        />
      </svg>

      <svg
        class="absolute"
        style="top: 40%; left: 40%; width: 20%; height: 20%"
        viewBox="0 0 53 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999996 26.75C0.999996 40.8333 12.4167 52.25 26.5 52.25C40.5833 52.25 52 40.8333 52 26.75C52 12.6667 40.5833 1.25 26.5 1.25C12.4167 1.25 0.999996 12.6667 0.999996 26.75Z"
          stroke="#87B448"
          stroke-width="1.5"
        />
      </svg>

      <svg
        class="absolute"
        :style="{
          top: '20.2%',
          left: '46%',
          width: '8.4%',
          height: '36%',
          transformOrigin: '50% 83%',
          transform: `rotate(${initialRotation || rotation}deg)`,
          transition: 'transform 1.5s 0.3s',
        }"
        viewBox="0 0 21 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6271 3.42899C13.5065 2.05146 12.353 0.994614 10.9702 0.994614V0.994614C9.60004 0.994615 8.45279 2.03274 8.3163 3.39605L1.75908 68.8903C1.23773 74.0976 5.32678 78.6165 10.5601 78.6165V78.6165C15.7497 78.6165 19.8243 74.1694 19.3714 68.9995L13.6271 3.42899Z"
          fill="#293145"
        />
        <circle cx="10.4996" cy="67.6369" r="3.4" fill="white" />
      </svg>
      <div
        class="absolute inset-x-0 mx-auto text-center font-extrabold text-gray-900 text-3xl"
        :style="{
          bottom: `7%`,
        }"
      >
        <LottieFile
          class="mx-auto w-16 h-16 md:w-28 md:h-28"
          :path="emojiForRating"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: String,
});

const initialRotation = ref(-120);

const rotation = computed(() => {
  switch (props.rating) {
    case "great":
      return 90;
    case "good":
      return 75;
    case "ok":
      return 45;
    case "bad":
      return -45;
    case "worst":
      return -90;
    case "unknown":
      return 0;
    default:
      return 0;
  }
});

const emojiForRating = computed(() => {
  let emoji = "Shrug";
  switch (props.rating) {
    case "great":
      emoji = "Heart_Eyes";
      break;
    case "good":
      emoji = "Happy";
      break;
    case "ok":
      emoji = "Happy";
      break;
    case "bad":
      emoji = "Sad_Tear";
      break;
    case "worst":
      emoji = "Cussing";
      break;
    case "unknown":
      emoji = "Meh";
      break;
  }
  return `/anim/emoji/${emoji}_Flat.json`;
});

onMounted(() => {
  initialRotation.value = null;
});
</script>
<style scoped>
.squarebox {
  flex: 1 0 auto;
}
.squarebox::before {
  display: block;
  content: "";
  margin-top: 100%;
}
</style>
