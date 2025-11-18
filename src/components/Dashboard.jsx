import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL

function Dashboard({ onLogout }) {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('voxell_token')
    if (!token) return
    fetch(`${API_BASE}/me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).detail || 'Ошибка профиля')
        return r.json()
      })
      .then(setProfile)
      .catch((e) => setError(e.message))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('voxell_token')
    onLogout()
  }

  if (error) return <p className="text-red-300">{error}</p>
  if (!profile) return <p className="text-white/80">Загрузка профиля...</p>

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl text-white">
      <div className="flex items-center gap-4">
        <img src={profile.avatar_url || 'https://api.dicebear.com/7.x/bottts/svg'} alt="avatar" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
        <div>
          <h3 className="text-xl font-semibold">{profile.nickname}</h3>
          <p className="text-white/70 text-sm">{profile.email}</p>
          <div className="mt-1 flex gap-2">
            {profile.roles.map((r) => (
              <span key={r} className="px-2 py-0.5 text-xs rounded bg-emerald-500/20 border border-emerald-400/30">{r}</span>
            ))}
          </div>
        </div>
        <div className="ml-auto">
          <button onClick={handleLogout} className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 text-sm">Выйти</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="text-white/60 text-sm">Уровень аккаунта</p>
          <p className="mt-1 text-2xl font-bold">Base</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="text-white/60 text-sm">Моды</p>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="text-white/60 text-sm">Серверы</p>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard