import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL

function AuthPanel({ onAuthed }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = mode === 'login' ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`
      const body = mode === 'login' ? { email, password } : { email, password, nickname, avatar_url: avatar }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Ошибка запроса')
      }
      const data = await res.json()
      localStorage.setItem('voxell_token', data.access_token)
      onAuthed()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMode('login')} className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${mode==='login'?'bg-emerald-500 text-white':'bg-white/10 text-white/80 hover:bg-white/20'}`}>Вход</button>
        <button onClick={() => setMode('register')} className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${mode==='register'?'bg-emerald-500 text-white':'bg-white/10 text-white/80 hover:bg-white/20'}`}>Регистрация</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-white/70 mb-1">E-mail</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="you@example.com" className="w-full rounded-lg bg-white/10 text-white placeholder-white/50 px-3 py-2 outline-none focus:ring-2 ring-emerald-400" />
        </div>
        <div>
          <label className="block text-xs text-white/70 mb-1">Пароль</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="••••••••" className="w-full rounded-lg bg-white/10 text-white placeholder-white/50 px-3 py-2 outline-none focus:ring-2 ring-emerald-400" />
        </div>
        {mode==='register' && (
          <>
            <div>
              <label className="block text-xs text-white/70 mb-1">Никнейм</label>
              <input value={nickname} onChange={(e)=>setNickname(e.target.value)} required minLength={3} maxLength={32} placeholder="Игровое имя" className="w-full rounded-lg bg-white/10 text-white placeholder-white/50 px-3 py-2 outline-none focus:ring-2 ring-emerald-400" />
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">URL аватара</label>
              <input value={avatar} onChange={(e)=>setAvatar(e.target.value)} placeholder="https://..." className="w-full rounded-lg bg-white/10 text-white placeholder-white/50 px-3 py-2 outline-none focus:ring-2 ring-emerald-400" />
            </div>
          </>
        )}

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button disabled={loading} type="submit" className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-semibold py-2 transition">
          {loading ? 'Обработка...' : (mode==='login' ? 'Войти' : 'Создать аккаунт')}
        </button>
      </form>
    </div>
  )
}

export default AuthPanel