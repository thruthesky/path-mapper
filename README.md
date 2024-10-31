# Path Mapper

Use this extension to map(replace) the path that is clicked on the terminal.

- When the path of the file is `/tmp/xyz/file.txt`, and you want to open the file `file.txt` in `/abc/def` folder,
  - then, put the `/tmp/xzy` in `path-mapper.match` option, and `/abc/def` in `path-match.replace` option.

## How to use

```json
{
    "path-mapper.match": "... path to match on terminal ...",
    "path-mapper.replace": "... mapping path for the match ...",
}
```


## How to use

```json
{
    "path-mapper": [
        {
            "match": "abc",
            "replace": "def"
        },
        {
            "match": "hij",
            "replace": "klm"
        }
    ]
}
```
