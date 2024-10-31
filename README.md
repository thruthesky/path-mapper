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