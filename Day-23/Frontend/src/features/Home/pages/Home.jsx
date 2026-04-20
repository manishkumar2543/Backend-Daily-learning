import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/use.Song'
import { useAuth } from '../../auth/hooks/useAuth'
import { useNavigate } from 'react-router'
import './Home.scss'

const Home = () => {
  const {handlerGetSong}=useSong()
  const {handlerLogout, user}=useAuth()
  const navigate=useNavigate()

  async function handleLogoutClick() {
    await handlerLogout();
    navigate('/login');
  }

  return (
    <main className='home-page'>
      <header className='home-page__header'>
        <div>
          <p className='home-page__eyebrow'>Welcome</p>
          <h1 className='home-page__title'>{user?.username || 'User'}</h1>
        </div>

        <button className='button home-page__logout' type='button' onClick={handleLogoutClick}>
          Logout
        </button>
      </header>

      <FaceExpression
        onClick={(expression)=>{
          handlerGetSong({mood:expression});
        }}
      />
      <Player/>
    </main>
  )
}

export default Home
