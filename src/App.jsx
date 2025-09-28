import DancingCat from './components/DancingCat'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🐱 Dancing Cat Page 🐱</h1>
        <p>고양이와 함께 춤춰보세요!</p>
      </header>

      <main className="app-main">
        <DancingCat />
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ for cat lovers</p>
      </footer>
    </div>
  )
}

export default App
