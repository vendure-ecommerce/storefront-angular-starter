const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.sky,
                secondary: colors.emerald,
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
