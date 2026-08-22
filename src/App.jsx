import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { TerminalNav } from './components/TerminalNav'
import Footer from './components/Footer'
import { Landing, CurrentState, LiveHivemind, ConnectionDetail, Discover, History, Report, Profile, Settings, AdminRoute, About } from './screens'
import { useStore } from './store'
import './App.css'

function App() {
  const { connectToHivemind, disconnectFromHivemind } = useStore()

  useEffect(() => {
    connectToHivemind()
    return () => disconnectFromHivemind()
  }, [connectToHivemind, disconnectFromHivemind])
  return (
    <Router>
      <div className="vignette"></div>
      <div className="grain"></div>
      
      <div style={{ position: 'relative', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        <TerminalNav />
        
        <main style={{ flex: 1, paddingTop: '3rem', paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/current-state" element={<CurrentState />} />
            <Route path="/live" element={<LiveHivemind />} />
            <Route path="/connection" element={<ConnectionDetail />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/history" element={<History />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
