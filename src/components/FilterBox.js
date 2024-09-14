import React from 'react';
import './filterbox.css';
import Slider from 'react-slider';
import { useState } from 'react';

const min = 0;
const max = 250;

function Filter1() {
  const [values, setvalue] = useState([min, max]);
  const [ischecked, setischecked] = useState(false);

  const onclickTick = (buttonIndex) => {
    setischecked(buttonIndex);
  };

  const [click, setclick] = useState(true);
  const clickshow = () => setclick(!click);

  const [clr, setclr] = useState(true);
  const clickshow2 = () => setclr(!clr);

  const [size, setsize] = useState(true);
  const clickshow3 = () => setsize(!size);

  const [dress, setdress] = useState(true);
  const clickshow4 = () => setdress(!dress);

  const colorStyles = {
    red: { backgroundColor: 'red', border: '2px solid red' },
    green: { backgroundColor: 'green', border: '2px solid green' },
    yellow: { backgroundColor: 'yellow', border: '2px solid yellow' },
    orange: { backgroundColor: 'orange', border: '2px solid orange' },
    skyblue: { backgroundColor: 'skyblue', border: '2px solid skyblue' },
    blue: { backgroundColor: 'blue', border: '2px solid blue' },
    violet: { backgroundColor: 'violet', border: '2px solid violet' },
    pink: { backgroundColor: 'pink', border: '2px solid pink' },
    white: { backgroundColor: 'white', border: '2px solid #B2BEB5' },
    black: { backgroundColor: 'black', border: '2px solid black' },
  };

  return (
    <div className='Box'>
      <div className='HeaderRow'>
        <h4 className='H1'>Filters</h4>
        <button type='button' style={{ border: 'none', background: 'none' }}>
          <img className='icon1' src='/Filter/setfilter1.png' alt='Adjust Icon'/>
        </button>
      </div>
      <hr className='line1' />
      <div>
        <h4 className='H4'>Gender</h4>
        {size && (
          <div className='Buttonss'>
            <div className='t1'>
              <button className='btn3'>Men</button>
              <button className='btn3'>Women</button>
              <button className='btn3'>Kid</button>
            </div>
          </div>
        )}
      </div>
      <hr className='line1' />

      <div>
        <button type='button' className='btn1'>
          T-shirts
        </button>
        <button type='button' className='btn1'>
          Shorts
        </button>
        <button type='button' className='btn1'>
          Shirts
        </button>
        <button type='button' className='btn1'>
          Hoodie
        </button>
        <button type='button' className='btn1'>
          Jeans
        </button>
      </div>
      <hr className='line1' />
      <div>
        <h4 className='H2'>Price</h4>
        {click && (
          <div className='slidebox'>
            <Slider className='dualslider' value={values} min={min} max={max} />
            <small>${values[0]} - ${values[1]}</small>
          </div>
        )}
      </div>
      <hr className='line1' />

      <div className='colorpart'>
        <h4 className='H3'>Colours</h4>
        {clr && (
          <div className='clrBox'>
            {Object.entries(colorStyles).map(([color, style], index) => (
              <button
                key={index}
                className='btn'
                style={style}
                onClick={() => onclickTick(index + 1)}
              >
                {ischecked === index + 1 && (
                  <p style={{ color: 'white', textAlign: 'center', margin: '-2px 2px 0 6px', position: 'absolute', top: '9px' }}>
                    ✓
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <hr className='line1' />

      <div>
        <h4 className='H4'>Dress Style</h4>
        {dress && (
          <div className='lastbtn'>
            <button type='button' className='btn1'>
              Casual
            </button>
            <button type='button' className='btn1'>
              Formal
            </button>
            <button type='button' className='btn1'>
              Party
            </button>
            <button type='button' className='btn1'>
              Gym
            </button>
          </div>
        )}
        <button type='button' className='Apply'>Apply Filter</button>
      </div>
    </div>
  );
}

export default Filter1;
