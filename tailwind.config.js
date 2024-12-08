/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            //TODO: NEW COLORS
			'background': {
                "1": "#37294C",
                "2": "#403055",
                "3": "#483561",
                "4": "#543C74",
                "header-buttons": "#5D427F"
            },
            "accent": "#8760D3",
            "accent-soft": "#8B6F9E",
            "primary": "#8062B3",
			'black': '#000',
			'white': "#FFF",
			'red': '#FF5555',
			'light-gray': 'rgba(255, 255, 255, 0.7)',
			'gray': 'rgba(255, 255, 255, 0.4)',
			'userfeedback': {
				'info': '#0044FF',
				'success': '#00FF00',
				'warning': '#FFDD00',
				'error': '#DD0000'
			}
        },
        extend: {
            width: {
                'content-width': '1080px',
                'layout-width': 'calc(100vw - 32px)'
            },
            transitionDuration: {
                '50': '50ms'
            }
        },
    },
    plugins: [],
}
