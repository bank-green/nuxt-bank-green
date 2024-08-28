module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      minWidth: {
        '320px': '320px',
      },
      maxHeight: {
        '3/2': '150%',
      },
      screens: {
        lg: '1028px', // The lg breakpoint at 1280px will be overridden.
        custom: '1124px', // Define your custom breakpoint
      },
      colors: {
        'primary-dark': '#293145',
        'primary-light': '#434F6D',
        'gray-light': '#F4F8FD',
        'latte': '#FFF8E7',
        'sushi': {
          DEFAULT: '#7BB123',
          50: '#F2F7EB',
          100: '#E6F0D8',
          200: '#CEE1B4',
          300: '#B7D290',
          400: '#9FC46B',
          500: '#7BB123',
          600: '#6C9039',
          700: '#506B2B',
          800: '#35471C',
          900: '#1A220E',
        },
        'sunglow': {
          DEFAULT: '#FCC135',
          100: '#FFFFFE',
          200: '#FEEFCC',
          300: '#FDE09A',
          400: '#FDD067',
          500: '#FCC135',
          600: '#FAB104',
          700: '#C88E03',
          800: '#966A02',
          900: '#644601',
        },
        'ocean': {
          100: '#DBEAFE',
          400: '#2563EB',
          800: '#293145',
        },
        'leaf': {
          300: '#7BB123',
          400: '#3A6028',
          500: '#0D5D43',
          700: '#123F30',
        },
      },
      boxShadow: {
        green: '0px 15px 30px rgba(122, 139, 85, 0.2)',
        soft: '0px 15px 25px rgba(216, 224, 205, 0.2)',
        input: '0px 15px 25px rgba(213, 222, 231, 0.2)',
        circle: '0px 25px 50px rgba(186, 199, 210, 0.2)',
      },
      margin: {
        '-1/4': '-25%',
        '-5/6': '-83.33%',
      },
      typography: {
        DEFAULT: {
          css: {
            img: {
              '+ em': {
                display: 'block',
                marginTop: '-1.5rem',
                fontSize: '.875rem',
                textAlign: 'center',
              },
            },
          },
        },
        xl: {
          css: {
            lineHeight: '1.75rem',
          },
        },
      },
      scale: {
        flip: '-1',
      },
    },
  },
  variants: {
    height: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'focus-within'],
    display: ['responsive', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
