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