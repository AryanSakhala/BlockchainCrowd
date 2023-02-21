import React from 'react'
import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
      <div> <div style={{ background: 'linear-gradient(130deg, #966f33,navy)', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', zIndex: '-1', boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)' }}></div>
          <h1 style={{ color: 'white', fontSize: '4rem', marginBottom: '2rem', textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)' }}>Join the Crowd and Make a Difference</h1>
          <p style={{ color: 'white', fontSize: '1.5rem', maxWidth: '800px', textAlign: 'center', textShadow: '2px 2px 0 rgba(0, 0, 0, 0.3)' }}>With our crowdfunding platform, you can support causes you care about and help make the world a better place. Browse campaigns, donate to those in need, and share your favorite projects with your friends and family.</p>

          <Link to="/main" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '1rem 2rem', fontSize: '1.5rem', borderRadius: '50px', backgroundColor: 'white', color: '#333', marginTop: '2rem', cursor: 'pointer' }}>Get Started</button>
          </Link>
          </div>
          
    </div>
  )
}

export default Home