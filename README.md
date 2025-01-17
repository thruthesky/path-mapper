# Path Mapper

This VSCode extension maps (replaces) paths clicked in the terminal.

## Settings

Add the following to your settings:

```json
"path-mapper": [
  {
    "match": "lib/",
    "replace": "rary/"
  },
  {
    "match": "test/",
    "replace": "temp/"
  },
  {
    "match": "func1/",
    "replace": "func2/"
  }
]
```

### Example

Clicking a path with `lib` will replace `lib` with `rary`. For example, `/Users/abc/lib/abc.txt` becomes `/Users/abc/rary/abc.txt`.


## How it works

- It only works if the path in terminal is an absolute path.

Example: the paths below are not the absolute paths. If you try to open the file by `CMD+click`, the VSCode will take action for whatever it should.

```txt
package.json      src               tsconfig.dev.json tsconfig.json
```

- It opens each paths if there are multiple paths in the cursor line.

Exmaple: The two paths below are absolute paths and the path mapper will open it with the replacement.

```txt
/Users/thruthesky/tmp/func1/firebase-debug.log /Users/thruthesky/tmp/func1/firebase.json
```

## For developers

### How to run the project

1. Open `Run and Debug` from the left most panel.
2. Click `Run Extension`.
   1. It will open another VSCode window. It is called `Extension Development Host`. Let's call it `EDH`.
3. To test the extension,
   1. Open the settings.json file by `CMD+SHIFT+P` and type `Preferences: Open Settings (JSON)`.
   2. Input the following settings.
      ```json
      "path-mapper": [
        {
          "match": "lib/",
          "replace": "rary/"
        },
        {
          "match": "test/",
          "replace": "~/tmp/"
        },
        {
          "match": "func1/",
          "replace": "func2/"
        }
      ]
      ```
    3. Open the terminal and type the following.
        ```sh
        touch ~/tmp/hello.txt
        echo "Path test: /test/hello.txt ..."
        ```
    4. Click the path `/test/hello.txt` in the terminal.
    5. The file `~/tmp/hello.txt` will be opened.