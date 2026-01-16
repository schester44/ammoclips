# Ammo 📋

<p align="center">
  <img src="https://github.com/schester44/ammoclips/blob/master/assets/icon.png?raw=true" alt="Ammo Logo" width="128" height="128">
</p>

<p align="center">
  A beautifully simple, self-hosted clipboard manager built with Electron and React.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue" alt="Platform">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

---

![Ammo - beautifully simple clipboard manager](https://github.com/schester44/ammoclips/blob/master/screenshot.png?raw=true)

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔒 **Private & Offline** | Your clipboard history never leaves your machine. No cloud, no tracking. |
| 🔍 **Fuzzy Search** | Instantly find any clip with intelligent fuzzy matching |
| 🎨 **Syntax Highlighting** | Automatic code detection with beautiful syntax highlighting |
| 👁️ **Live Previews** | Real-time preview pane for text, code, HTML, and images |
| 📷 **Image Support** | Automatically captures and stores copied images |
| ♾️ **Unlimited History** | No artificial limits on your clipboard storage |
| ⚡ **Lightning Fast** | Built for speed with minimal resource usage |
| ⌨️ **Keyboard Shortcuts** | Quick access with `⌘+1` through `⌘+9` shortcuts |

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 10.x
- [Yarn](https://yarnpkg.com/) >= 1.21.3

### Quick Start

```bash
# Clone the repository
git clone https://github.com/schester44/ammoclips.git

# Navigate to the project directory
cd ammoclips

# Install dependencies
yarn install

# Start the application
yarn start
```

### Building for Production

```bash
# Create distributable packages
yarn package
```

This creates platform-specific packages in the `release` folder:
- **macOS**: `.dmg` file
- **Windows**: `.exe` installer (NSIS)
- **Linux**: `.AppImage`

## 🎯 Usage

### Basic Operations

| Action | How To |
|--------|--------|
| **Copy** | Copy anything as usual (`⌘+C` / `Ctrl+C`) - Ammo captures it automatically |
| **Search** | Start typing to fuzzy search through your clips |
| **Select** | Use `↑` / `↓` arrow keys to navigate through clips |
| **Paste** | Press `Enter` or click on a clip to paste it |
| **Delete** | Press `Backspace` to remove the selected clip |
| **Quick Paste** | Use `⌘+1` through `⌘+9` to paste the first 9 clips |

### Supported Content Types

- 📝 **Plain Text** - Regular text content
- 🌐 **HTML** - Rich text and formatted content
- 💻 **Code** - Syntax-highlighted code (auto-detected from VS Code)
- 🖼️ **Images** - PNG images with visual preview

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center"><a href="https://www.electronjs.org/"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/electron/electron.png" width="40" height="40" alt="Electron"/><br/>Electron</a></td>
    <td align="center"><a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width="40" height="40" alt="React"/><br/>React</a></td>
    <td align="center"><a href="https://www.typescriptlang.org/"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="40" height="40" alt="TypeScript"/><br/>TypeScript</a></td>
    <td align="center"><a href="https://tailwindcss.com/"><img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="40" height="40" alt="Tailwind"/><br/>Tailwind CSS</a></td>
    <td align="center"><a href="https://webpack.js.org/"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/webpack/webpack.png" width="40" height="40" alt="Webpack"/><br/>Webpack</a></td>
  </tr>
</table>

**Additional Libraries:**
- [LowDB](https://github.com/typicode/lowdb) - Lightweight JSON database
- [Fuzzysort](https://github.com/farzher/fuzzysort) - Fast fuzzy search
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Code highlighting

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start the development server with hot reload |
| `yarn build` | Build the application for production |
| `yarn package` | Package the app for distribution |
| `yarn lint` | Run ESLint to check code quality |
| `yarn test` | Run the test suite |
| `yarn build:styles` | Rebuild Tailwind CSS styles |

## 🗺️ Roadmap

### In Progress
- [ ] Fix arrow key navigation bugs
- [ ] Clean up project structure

### Planned Features
- [ ] User settings/preferences panel
- [ ] Cloud sync (optional shared clipboard across devices)
- [ ] Keyboard shortcuts customization
- [ ] Dark/light theme toggle
- [ ] Pinned/favorite clips
- [ ] Clip categories and tags
- [ ] Export/import clipboard history

### Technical Improvements
- [ ] Fix TypeScript types
- [ ] Purge unused TailwindCSS styles
- [ ] Add comprehensive test coverage
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features when possible
- Update documentation as needed

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/schester44/ammoclips/issues/new) with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your OS and app version

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

<p>
  <a href="https://github.com/schester44">
    <img src="https://img.shields.io/badge/Steven%20Chester-schester44-blue?style=flat&logo=github" alt="Steven Chester">
  </a>
</p>

## 🙏 Acknowledgments

- Built with [electron-react-boilerplate](https://electron-react-boilerplate.js.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- Syntax highlighting by [highlight.js](https://highlightjs.org/)

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/schester44">Steven Chester</a></sub>
</p>

<p align="center">
  <a href="https://github.com/schester44/ammoclips/stargazers">
    <img src="https://img.shields.io/github/stars/schester44/ammoclips?style=social" alt="GitHub Stars">
  </a>
</p>
