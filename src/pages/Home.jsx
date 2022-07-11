import React from 'react'
import Hero from '../components/Hero'
import Menu from '../components/Menu';
import Footer from '../components/Footer';

const Home = () => {

    return (
        <div className='bg-lime-500'>
            <Menu></Menu>
            <Hero></Hero>
            
        </div>
    )
}

export default Home