import './App.css'

function App() {
  return (
    <div className="page">
      <main className="container">
        <header>
          <h1>LANDING</h1>
          <nav className="row">
            <button type="button" className="btn">
              TRACKR
            </button>
            <div className="row">
              <button type="button" className="btn">
                Sign In
              </button>
              <button type="button" className="btn primary">
                Sign Up
              </button>
            </div>
          </nav>
        </header>

        <section className="hero">
          <h2>Manage Your Music Projects</h2>
          <p>
            Organize albums, EPs, and singles.
            <br />
            Track every song from idea to release.
          </p>
          <div className="row">
            <button type="button" className="btn primary">
              Sign Up Free
            </button>
            <button type="button" className="btn">
              Sign In
            </button>
          </div>
        </section>

        <section className="cards">
          <article className="card">
            <p>♪</p>
            <h3>Track Songs</h3>
            <p>Add tracks to any project</p>
          </article>

          <article className="card">
            <p>📄</p>
            <h3>Manage Projects</h3>
            <p>Albums, EPs, Singles</p>
          </article>

          <article className="card">
            <p>📅</p>
            <h3>Target Release</h3>
            <p>Plan your schedule</p>
          </article>
        </section>

        <footer>footer — © 2025 Trackr</footer>
      </main>
    </div>
  )
}

export default App
