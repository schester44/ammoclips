# Ammo 📋

A beautifully simple, self-hosted clipboard manager built with Electron and React.

![Ammo - beautifully simple clipboard manager](https://github.com/schester44/ammoclips/blob/master/screenshot.png?raw=true)

## ✨ Features

- **🔒 Private & 100% Offline** - Your clipboard history never leaves your machine
- **🔍 Fuzzy Search** - Quickly find any clip with intelligent search
- **🎨 Syntax Highlighting** - Automatic code detection and highlighting
- **👁️ Previews** - Visual previews for different content types
- **♾️ Infinite Clipboard** - Store unlimited clipboard history
- **⚡ Fast & Lightweight** - Built with performance in mind

## 🚀 Getting Started

### Prerequisites

- Node.js >= 10.x
- Yarn >= 1.21.3

### Installation

1. Clone the repository:
```bash
git clone https://github.com/schester44/ammoclips.git
cd ammoclips
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

### Building

To build the application for production:

```bash
yarn package
```

This will create distributable packages in the `release` folder.

## 🛠️ Tech Stack

- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop framework
- **[React](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[LowDB](https://github.com/typicode/lowdb)** - Local JSON database
- **[Webpack](https://webpack.js.org/)** - Module bundler

## 📝 Available Scripts

- `yarn start` - Start the development server
- `yarn build` - Build the application
- `yarn package` - Package the app for distribution
- `yarn lint` - Run ESLint
- `yarn test` - Run tests

## 🗺️ Roadmap

- [ ] Clean up project structure and improve file organization
- [ ] Fix TypeScript types
- [ ] Add user settings/preferences
- [ ] Fix arrow key navigation bugs
- [ ] Cloud sync (optional shared clipboard across devices)
- [ ] Purge unused TailwindCSS styles
- [ ] Add keyboard shortcuts customization
- [ ] Support for image and file clipboard items
- [ ] Dark/light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Steven Chester**
- GitHub: [@schester44](https://github.com/schester44)

## 🙏 Acknowledgments

Built with [electron-react-boilerplate](https://electron-react-boilerplate.js.org/)

---

⭐ If you find this project useful, please consider giving it a star!
