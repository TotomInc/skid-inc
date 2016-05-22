_console.args = {
    '-h': {
        name: '-h',
        desc: 'print help of the selected command.',
        all: true
    },

    '-p': {
        name: '-p',
        desc: 'used with hack command, choose a place to hack.',
        who: ['hack'],
        all: false
    },

    '-pl': {
        name: '-pl',
        desc: 'used with hack command, print a list of all the places available to hack.',
        who: ['hack'],
        all: false
    }
};
