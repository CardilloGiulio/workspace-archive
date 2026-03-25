import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [personId, setPersonId] = useState(0)

  const fetchAndAddRow = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`http://127.0.0.1:8000/?id=${personId}`)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setRows(prev => [...prev, data])
    } catch (e) {
      setError(`Errore chiamando la API: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="logos">
        <img src={viteLogo} className="logo" />
        <img src={reactLogo} className="logo react" />
      </div>

      <h1>Welcome to Giulio's React App</h1>

      <div className="card">
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="number"
            min="0"
            max="4"
            value={personId}
            onChange={(e) => setPersonId(Number(e.target.value))}
            style={{
              width: 90,
              padding: '10px 12px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
              color: 'white',
              outline: 'none',
              textAlign: 'center',
            }}
          />

          <button className="cool-btn" onClick={fetchAndAddRow} disabled={loading}>
            {loading ? 'Loading...' : '➕ Add User'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="table-wrapper">
          <table className="cool-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cognome</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.Nome}</td>
                  <td>{r.Cognome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="read-the-docs">Hello, I am Giulio 😎</p>
    </>
  )
}

export default App