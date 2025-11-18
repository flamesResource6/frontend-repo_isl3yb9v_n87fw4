import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import AuthPanel from './components/AuthPanel'
import Dashboard from './components/Dashboard'

function App() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('voxell_token')
    setAuthed(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center">
          <div className="font-extrabold tracking-tight text-xl">Voxell DLC</div>
          <nav className="ml-auto flex items-center gap-2">
            <a href="#features" className="text-white/70 hover:text-white text-sm">Возможности</a>
            <a href="#auth" className="text-white/70 hover:text-white text-sm">Войти</a>
          </nav>
        </div>
      </header>

      <Hero />

      <main className="relative z-10 mx-auto max-w-6xl px-6 -mt-16">
        <section id="auth" className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Ваш хаб модов Minecraft</h2>
            <p className="text-white/70">Футуристичный, минималистичный интерфейс без клише. Управляйте аккаунтом, профилем игрока и доступами к ролям.</p>
            <ul className="text-white/80 text-sm list-disc ml-5 space-y-1">
              <li>Вход и регистрация по e-mail</li>
              <li>Надёжная защита паролей</li>
              <li>Личный кабинет с аватаркой, ником и ролями</li>
            </ul>
          </div>

          {authed ? (
            <Dashboard onLogout={() => setAuthed(false)} />
          ) : (
            <AuthPanel onAuthed={() => setAuthed(true)} />
          )}
        </section>

        <section id="features" className="mt-20 grid md:grid-cols-3 gap-6">
          {["Чистые анимации", "Современный UX", "Скорость"].map((t,i)=> (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-white/70 text-sm">Отзывчивые микровзаимодействия и плавные переходы. Без шаблонного вида.</p>
            </div>
          ))}
        </section>

        <footer className="py-16 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} Voxell DLC. Все права защищены.
        </footer>
      </main>
    </div>
  )
}

export default App