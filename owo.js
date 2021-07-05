const randomItem = function (arr) {
	if (!Array.isArray(arr)) { throw new TypeError('Expected an array'); }
	return arr[Math.floor(Math.random() * arr.length)];
};



const replaceString = (input, needle, replacement, options = {}) => {
	if (typeof input !== 'string') { throw new TypeError(`Expected input to be a string, got ${typeof input}`); }
	if (!(typeof needle === 'string' && needle.length > 0) ||
		!(typeof replacement === 'string' || typeof replacement === 'function')) {
		return input;
	}
	let ret = '';
	let matchCount = 0;
	let prevIndex = options.fromIndex > 0 ? options.fromIndex : 0;
	if (prevIndex > input.length) { return input; }
	while (true) { // eslint-disable-line no-constant-condition
		const index = input.indexOf(needle, prevIndex);
		if (index === -1) { break; }
		matchCount++;
		const replaceStr = typeof replacement === 'string' ? replacement : replacement(needle, matchCount, input, index);
		// Get the initial part of the string on the first iteration
		const beginSlice = matchCount === 1 ? 0 : prevIndex;
		ret += input.slice(beginSlice, index) + replaceStr;
		prevIndex = index + needle.length;
	}
	if (matchCount === 0) { return input; }
	return ret + input.slice(prevIndex);
};



const prefixes = [
  '<3 ',
  '0w0 ',
  'H-hewwo?? ',
  'HIIII! ',
  'Haiiii! ',
  'Huohhhh. ',
  'OWO ',
  'OwO ',
  'UwU '
]

const suffixes = [
  ' ( ˘ ³˘)♥',
  ' ( ͡° ᴥ ͡°)',
  ' (´・ω・｀)',
  ' (ʘᗩʘ\')',
  ' (இωஇ )',
  ' (๑•́ ₃ •̀๑)',
  ' (• o •)',
  ' (⁎˃ᆺ˂)',
  ' (╯﹏╰）',
  ' (●´ω｀●)',
  ' (◠‿◠✿)',
  ' (✿ ♡‿♡)',
  ' (❁´◡`❁)',
  ' (　\'◟ \')',
  ' (人◕ω◕)',
  ' (；ω；)',
  ' (｀へ´)',
  ' ._.',
  ' :3',
  ' :D',
  ' :P',
  ' ;-;',
  ' ;3',
  ' ;_;',
  ' <{^v^}>',
  ' >_<',
  ' >_>',
  ' UwU',
  ' XDDD',
  ' \\°○°/',
  ' ^-^',
  ' ^_^',
  ' x3',
  ' x3',
  ' xD',
  ' ÙωÙ',
  ' ʕʘ‿ʘʔ',
  ' ミ(．．)ミ',
  ' ㅇㅅㅇ',
  ', fwendo',
  '（＾ｖ＾）'
]

const substitutions = {
  'r': 'w',
  'l': 'w',
  'R': 'W',
  'L': 'W',
  'no': 'nu',
  'has': 'haz',
  'have': 'haz',
  ' says': ' sez',
  'you': 'uu',
  'the ': 'da ',
  'The ': 'Da ',
  'THE ': 'THE '
}

const addAffixes = (str) => randomItem(prefixes) + str + randomItem(suffixes)
const substitute = (str) => {
  const replacements = Object.keys(substitutions)
  replacements.forEach((x) => {  str = replaceString(str, x, substitutions[x])  })
  return str
}
const owo = (str) => addAffixes(substitute(str))
const owoShort = (str) => substitute(str)

for(let i = 0; i < document.body.querySelectorAll('*').length; i++) {
    let e = document.body.querySelectorAll('*')[i];
    if (e.innerText != undefined && e.childElementCount == 0 && isNaN(e.innerText)) {
        if (e.innerText.length > 20) {
            let newowo = owo(e.innerText.toString());
            e.innerText = newowo;
        } else if (e.innerText.length <= 20) {
            let newowo = owoShort(e.innerText.toString());
            e.innerText = newowo;
        }
    }
}
