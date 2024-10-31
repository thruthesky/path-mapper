// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import * as vscode from 'vscode';

interface CustomTerminalLink extends vscode.TerminalLink {
	data: string;
}

// 사용자가 Command 를 실행해서 Activate 할 때, 한번만 실행된다.
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "path-mapper" is now active!');

	// Command (여기서는 path-mapper.pathMapper) 는 package.json 파일에 정의를 해야한다. 그리고 그 commad 를 registerCommand 로 구현해야한다.
	// 그리고 사용자가 Command Palette 에서 실행할 때 마다, 여기서 등록된 함수가 실행된다.
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('path-mapper.pathMapper', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Path Mapper is installed!');
	});

	vscode.window.registerTerminalLinkProvider({
		provideTerminalLinks: (context: vscode.TerminalLinkContext, token: vscode.CancellationToken) => {
			console.log("context.line; ", context.line);

			
				return [{
					startIndex: 0,
					length: context.line.length,
					tooltip: 'Click to open file',
					data: context.line,
				}];
				
		},
		handleTerminalLink: (link: CustomTerminalLink) => {

			const mapper: Array<{match: string, replace: string}> = vscode.workspace.getConfiguration().get('path-mapper') ?? [];

			// console.log('mapper[0]: ', mapper[0]);
			// console.log('mapper[1]: ', mapper[1]);
			const path = link.data;
			// console.log('path: ', path);
			const found: number = mapper.findIndex((e) => {
				// console.log('match: ', e.match);
				return path.indexOf(e.match) > -1;
			});
			// console.log('found: ', found);
			if ( found === -1 ) {
				vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(path));
				return;
			}
			const map = mapper[found];
			// console.log('map: ', map);
			const replaced = path.replace(map.match, map.replace);
			// console.log('replaced: ', replaced);
			vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(replaced));

		}
	});


	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
