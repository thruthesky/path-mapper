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

	const workspaceFolder: string = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "";

	vscode.window.registerTerminalLinkProvider({
		provideTerminalLinks: (context: vscode.TerminalLinkContext, token: vscode.CancellationToken): any => {

			// [line] is the text of a line that is displayed in the terminal when the user hovers over the link
			const line: string = context.line;

			// [startIndex] is the index of the start of the link within [line]
			// [length] is the length of the each link within [line]. It is splitted into multiple links by blank space.
			// [tooltip] is the text displayed in the hover tooltip
			// [data] is the data that will be passed to [handleTerminalLink] when the link is clicked
			// return an array of links
			const links = line.split(' ').map((word, index) => {
				return {
					startIndex: context.line.indexOf(word),
					length: word.length,
					tooltip: 'Click to open file: ' + word,
					data: word,
				};
			});

			// remove the element of the data which is a path if it is not an absolute path from the links map object
			const absoluteLinks = links.map((e) => {
				// use regex to extract the path if e.data is in the form of an absolute path maybe surrounded by 'simple quotes', "double quotes", [brackets], (parentheses), {braces}
				const match = e.data.match(/[\'\"\[\(\{]*(?<path>\/[^\'\"\]\)\}]+)[\'\"\]\)\}]*/);
				if (match && match.groups && match.groups.path) {
					return {
						...e,
						data: match.groups.path
					};
				}
				return null;
			}).filter(e => e !== null);

			return absoluteLinks;
		},

		handleTerminalLink: async (link: CustomTerminalLink) => {
			// [link] is the link that was clicked
			// [link.data] is the data that was passed to the link when it was created
			console.log('--> link:', link);
			console.log('--> vscode.workspace:', vscode.workspace);
			console.log('--> getAbsolutePath(link.data)');

			let mapper: Array<{ match: string, replace: string }> = vscode.workspace.getConfiguration().get('path-mapper') ?? [];
			// Resolve workspaceFolder variable
			mapper = mapper.map((e) => {
				return {
					match: e.match.replace(/\${workspaceFolder}/g, workspaceFolder),
					replace: e.replace.replace(/\${workspaceFolder}/g, workspaceFolder)
				};
			});

			// console.log('mapper[0]: ', mapper[0]);
			// console.log('mapper[1]: ', mapper[1]);
			let path = link.data;
			// console.log('path: ', path);

			const found: number = mapper.findIndex((e) => {
				// console.log('match: ', e.match);
				// return -1 if the path is not absoulte path
				if (path.indexOf('/') !== 0) {
					return -1;
				}
				return path.indexOf(e.match) > -1;
			});

			// console.log('found: ', found);
			let replaced: string = '';
			if (found === -1) {
				replaced = path;
			} else {
				const map = mapper[found];
				// console.log('map: ', map);

				replaced = path.replace(map.match, map.replace);
			}
			console.log('replaced: ', '[' + replaced + ']');
			vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(replaced));

		}
	});


	context.subscriptions.push(disposable);
}

// Generate an absolute path from a relative path
function getAbsolutePath(fileUri: string) {
	// Get the current workspace folder
	const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

	// If there is no workspace folder, return the original path
	if (!workspaceFolder) {
		return fileUri;
	}

	// Get the absolute path of the file
	const absolutePath = vscode.Uri.joinPath(workspaceFolder.uri, fileUri).fsPath;

	return absolutePath;
}

// This method is called when your extension is deactivated
export function deactivate() { }
