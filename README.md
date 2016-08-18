# [SkidInc](https://totominc.github.io/skid-inc/ "SkidInc")

SkidInc is an incremental-game with a hacking theme.

### Want to help?

You don't need to program if you want to help me, you can create issues for any bugs you encounter or give ideas. The community is growing on the subreddit [/r/skidinc](https://www.reddit.com/r/skidinc "SkidInc subreddit"), check it out!

For any coders that want to help me:

0. Install NodeJS if not done.
1. Clone the repo.
2. Install all dev dependencies with `npm i`. We recommend you to test your changes on a local server, using `http-server .`.
3. Run `grunt` (concat, transpile es6 -> es5, uglify). Please, take your time to test the new changes you have done, otherwise I will NOT accept the pull request.
4. Create a new branch and make your changes on it, and do a pull request.

### "Mod" support:

If you are familiar with Javascript, you can create "mods". When saying "mods", I mean scripts that add new content such as new commands and, maybe, new game mechanics. Each command/action have its own `.js` file: all things related to jobs are in `jobs.js`, same for `hack.js`, `scripts.js`, ...

So you can easily create scripts to add new content to the game, look at the commands docs if you are interested.

### Commands docs:

Take a look at the `console-commands.js`.

Commands are stored on `g.console.commands` array, each command is an object without name. This command object can contain:

- `name:string`: command name which is displayed on the `help` command.
- `desc:string`: global description of the command display on the `help` command.
- `pattern:regexString`: regex pattern of the command, regex pattern must start with `^` and finish with `$`. Example: `^test$`.
- `commands:array`: commands of this object are stored on this array, commands must be objects.

When creating specific commands on the commands array, here are the parameters you can use:

- `pattern:regexString`: regex string of the command. As said before, it must start with `^` and finish with `$`. Use `[\\s]` to add space, use `[\\w]` if your command have options (`[\\w]` is the place for the option string). Example: `^test[\\s]-param[\\s][\\w]$`.
- `execute:string(function)`: string called on a `eval`, must be a reference to a function.
- `cleanCmd:string`: command without regex pattern, if got an option (`[\\w]`) replace it with `(option)`. Example: `test -param (option)`
- `desc:string`: a global description of what does the command.
- `customDesc:array`: needed if command got option. Each string in the array will match the proper `options` array index. Example:

```javascript
customDesc: [
	'this is the desc for the first option.',
	'this is the desc for the second option.',
	'this is the desc for the third option.'
]
```

- `callback:function`: function called when the command have been executed. Example:

```javascript
callback: function() {
	console.log('Callback have been called.');
}
```

- `options:array`: strings that must match user input (options replace `[\\w]` on the regex pattern). Example:

```javascript
options: [
	'first-param',
	'second-param',
	'third-param'
]
```

- `optionsIndex:number`: index of `[\\w]` in pattern regex or of `(option)` in `cleanCmd`.

**Example command**:

```javascript
{
	name: 'test',
	desc: 'this is a test command.',
	pattern: '^test$',
	commands: [
		// simple command without options
		{
			pattern: '^test[\\s]-p$',
			cleanCmd: 'test -p',
			desc: 'test -p command.',
			execute: 'foo.p()'
		},
		// commands with 3 different options
		{
			pattern: '^test[\\s]-g[\\s][\\w]$',
			cleanCmd: 'test -g (option)',
			desc: 'test -g command.',
			execute: 'foo.g',
			customDesc: [
				'command 1 of test -g.',
				'command 2 of test -g.',
				'command 3 of test -g'
			],
			options: [
				'test-1',
				'test-2',
				'test-3'
			],
			optionsIndex: 2
		},
	]
}
```

### Workflow:

For any pull request, create your own branch.

New features incoming are on a developement branch. When we reach a milestone on this branch, I merge it to `stable` branch.

The live website branch is `gh-pages`.

### Links:

[Play it here!](https://totominc.github.io/skid-inc/ "SkidInc game")

[SkidInc subreddit!](https://www.reddit.com/r/skidinc "SkidInc subreddit")