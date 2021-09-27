import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import logo from '../src/images/jason.svg';
import './App.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'Isaiah 29:11', 
    subtitle: '\" I know the plans I have for you, says the LORD, plans to prosper you and not to harm you, plans for HOPE and a future.\"'
  },
  {
    title: 'The Gospel of Matthew', 
    subtitle: 'The Gospel according to Matthew, also called the Gospel of Matthew, or simply Matthew, is the first book of the New Testament and one of the three synoptic Gospels. It tells how Israels Messiah, Jesus, comes to his people and forms a community of disciples, of how he taught the people through such events as the Sermon on the Mount and its Beatitudes, and how Israel becomes divided and how Jesus condemns this hostile Israel'
  }, {
    title: 'The Gospel of Mark', 
    subtitle: ' Mark is the second of the four canonical gospels and of the three synoptic Gospels. It tells of the ministry of Jesus from his baptism by John the Baptist, his Transfiguration on a mountain, his describing of the Greatest Commandments, to his death, burial, and the discovery of his empty tomb.',
  },
  {
    title: 'The Gospel of Luke', 
    subtitle: 'also called the Gospel of Luke, or simply Luke, tells of the origins, birth, ministry, death, resurrection, and ascension of Jesus Christ. Together with the Acts of the Apostles, it makes up a two-volume work which scholars call Luke–Acts; together they account for 27.5% of the New Testament.'
  },
  {
    title: 'The Gospel of John', 
    subtitle: 'is the fourth of the four canonical gospels. It contains a highly schematic account of the ministry of Jesus, with seven "signs" culminating in the raising of Lazarus (foreshadowing the resurrection of Jesus) '
  }
];

const App = () => {

  const [background, setBackground] = useState('black');
  const headerRef = useRef(null);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  const toggleBackground = () => {
    const color = background !== '#262626' ? '#262626' : '#305fa5';
    setBackground(color);
  }

  useEffect(() => {

    gsap.to(headerRef.current, { backgroundColor: background, duration: 1,  ease: 'none' });

  }, [background]);

  useEffect(() => {
    
    gsap.from(headerRef.current, {
      autoAlpha: 0, 
      ease: 'back',
      duration: 2,
      delay: 1
    });

    revealRefs.current.forEach((el, index) => {
        
      gsap.fromTo(el, {
        autoAlpha: 0
      }, {
        duration: 3, 
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          id: `section-${index+1}`,
          trigger: el,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

    });

  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
        revealRefs.current.push(el);
    }
  };

  return (
    <div className="App">
      <header ref={headerRef} className="App-header">
      
      <h1>The Good News of Jesus Christ</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p>The gospel truth of salvation and the forgiveness of our sins</p>
      <h4 className="author">Documented by Jason Nutt</h4>
      <p>A lost soul redeemed </p>
      
        
        <button onClick={() => toggleBackground()}>Let's Light it up</button>
        <p>
         I had given up hope for a future and He told me I didn't have to...
        </p>  
      </header>
      
      <main className="App-main">
        {
          sections.map(({title, subtitle}) => (
            <div className="App-section" key={title} ref={addToRefs}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;

