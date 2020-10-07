let keysTextArea = document.querySelector ('.keys-input');
let keysInputed;
let whereToOutput = document.querySelector ('.to-output');

allKeys = {
	' ': 'K_SPACE',
	'!': 'K_EXCLAIM',
	'"': 'K_QUOTEDBL',
	'#': 'K_HASH',
	'$': 'K_DOLLAR',
	'&': 'K_AMPERSAND',
	'(': 'K_LEFTPAREN',
	')': 'K_RIGHTPAREN',
	'*': 'K_ASTERISK',
	'+': 'K_PLUS',
	',': 'K_COMMA',
	'-': 'K_MINUS',
	'.': 'K_PERIOD',
	'/':  'K_SLASH',
	'0': 'K_0',
	'1': 'K_1',
	'2': 'K_2',
	'3': 'K_3',
	'4': 'K_4',
	'5': 'K_5',
	'6': 'K_6',
	'7': 'K_7',
	'8': 'K_8',
	'9': 'K_9',
	':': 'K_COLON',
	';': 'K_SEMICOLON',
	'<': 'K_LESS',
	'=': 'K_EQUALS',
	'>': 'K_GREATER',
	'?': 'K_QUESTION',
	'@': 'K_AT',
	'[': 'K_LEFTBRACKET',
	']': 'K_BACKSLASH',
	'^': 'K_RIGHTBRACKET',
	'_': 'K_CARET',
	'`': 'K_UNDERSCORE',
	'a': 'K_a',
	'b': 'K_b',
	'c': 'K_c',
	'd': 'K_d',
	'e': 'K_e',
	'f': 'K_f',
	'g': 'K_g',
	'h': 'K_h',
	'i': 'K_i',
	'j': 'K_j',
	'k': 'K_k',
	'l': 'K_l',
	'm': 'K_m',
	'n': 'K_n',
	'o': 'K_o',
	'p': 'K_p',
	'q': 'K_q',
	'r': 'K_r',
	's': 'K_s',
	't': 'K_t',
	'u': 'K_u',
	'v': 'K_v',
	'w': 'K_w',
	'r': 'K_r',
	'x': 'K_x',
	'y': 'K_y',
	'z': 'K_z',
}

keysTextArea.addEventListener ('input', () => {
	let result = [];
	keysInputed = keysTextArea.value;

	for (let char of keysInputed) {
		char = char.toLowerCase ()

		if (Object.keys (allKeys).includes (char)) {
			result.push (allKeys [char])
		}
	}

	result = new Set (result);
	result = Array.from (result)

	let toOutput = '';
	toOutput = `keys = key.get_pressed ()\nanyKeyPressed = False\n\nallKeys = [${result.join (', ')}]\nfor item in allKeys:\n\tif (keys [item] == 1):\n\t\tanyKeyPressed = True\n\t\tbreak\n\nif (anyKeyPressed):\n\tpass\n\t# Do some stuff, when key(s) are / is pressed...`

	whereToOutput.textContent = toOutput;
})