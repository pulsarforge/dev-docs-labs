---
sidebar_position: 1
---

# Self hosted

The hype with AI keeps going, then let's take a look at open source options that You can set up at your infrastructure, this time for code completions.


My requirements by order when I started to research at github:
1. Open source.
2. Direct set up, self hosted first.
3. Possible to customize.


I found different repositories but these two catch my attention:


## Code clippy vscode 
[Code clippy vscode](https://github.com/CodedotAl/code-clippy-vscode)


I followed the initial set up:
```cli
npm install
npm run esbuild
vsce package
```
Package a vscode extension locally and install.


## Faux Pilot
[FauxPilot](https://github.com/fauxpilot/fauxpilot)


I set up the server, and choose between the options available:
```cli
./setup.sh
./launch.sh
```
I return to vscode, and edit the setting of code clippy vscode extension to activate the faux pilot option.

## Conclusion
It works. 
Advantages: save money, customization, self hosted.

Is it now your turn?

Join us.
