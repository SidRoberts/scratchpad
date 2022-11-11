# Scratchpad

Digital whiteboard to write notes.

[![Build Status](https://img.shields.io/github/workflow/status/SidRoberts/scratchpad/tests/development.svg?style=for-the-badge)](https://github.com/SidRoberts/scratchpad/actions)

[![GitHub issues](https://img.shields.io/github/issues-raw/SidRoberts/scratchpad.svg?style=for-the-badge)](https://github.com/SidRoberts/scratchpad/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/SidRoberts/scratchpad.svg?style=for-the-badge)](https://github.com/SidRoberts/scratchpad/pulls)

![](screenshot.png)

## Usage

Access via [https://sidroberts.co.uk/scratchpad](https://sidroberts.co.uk/scratchpad).

Alternatively, use the Docker image [`sidroberts/scratchpad`](https://hub.docker.com/repository/docker/sidroberts/scratchpad):

```bash
docker run -p 80:80 sidroberts/scratchpad
```

### Keyboard Shortcuts

| Windows Shortcut | MacOS Shortcut     | Action                   |
|------------------|--------------------|--------------------------|
| Ctrl Alt 1       | Command Option 1   | Left text alignment      |
| Ctrl Alt 2       | Command Option 2   | Centre text alignment    |
| Ctrl Alt 3       | Command Option 3   | Right text alignment     |
| Ctrl Alt 4       | Command Option 4   | Justified text alignment |
| Ctrl Alt \|      | Command Option \|  | Iterate column count     |
| Ctrl Alt +       | Command Option +   | Increase font size       |
| Ctrl Alt -       | Command Option -   | Decrease font size       |
| Ctrl Alt Esc     | Command Option Esc | Reset                    |
| Ctrl Alt /       | Command Option /   | Toggle icons             |

## License

Licensed under the MIT License.
© [Sid Roberts](https://github.com/SidRoberts)
