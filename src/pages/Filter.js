import React from 'react';
import './Filter.css';
import Slider from 'react-slider';
import { useState } from 'react';

const min = 0;
const max = 250;

function Filter1() {
  // DUALSLIDER
  const [values, setvalue] = useState([min,max])
  // console.log(values);

  // Color part
  const [ischecked, setischecked] = useState(false);
  // onclick event when user click on colorboxes
  // if ticked , onclick it will set add & removes tick 
  const onclickTick = (buttonIndex) => {
    // setischecked(!ischecked)
    setischecked(buttonIndex)
    //alert("clickedd")
  }

  // Uparrow closing and opening the boxes
  // slider open/close
  const [click,setclick] = useState(true)
  const clickshow = () =>{
    setclick(!click);
    // moving hr line to up after clicking
    //document.getElementsByClassName('line1').style.marginTop='20px';
  }

  // COLOUR, open/close
  const [clr,setclr] = useState(true)
  const clickshow2 = () =>{
    setclr(!clr); 
  }

  // SIZE, open/close
  const [size,setsize] = useState(true)
  const clickshow3 = () =>{
    setsize(!size); 
  }

  // for dress style part , open/close
  const [dress,setdress] = useState(true)
  const clickshow4 = () =>{
    setdress(!dress);
  }


  // color part : ADDING COLOURS FOR INDIVIDUAL CIRCULAR BOXES
  const redstyle = {
    backgroundColor: 'red',
    border:'2px solid red'
  }
  const greenstyle = {
    backgroundColor: 'green',
    border:'2px solid green'
  }
  const yellowstyle = {
    backgroundColor: 'yellow',
    border:'2px solid yellow'
  }
  const orangestyle = {
    backgroundColor: 'orange',
    border:'2px solid orange'
  }
  const skystyle = {
    backgroundColor: 'skyblue',
    border:'2px solid skyblue'
  }
  const bluestyle = {
    backgroundColor: 'blue',
    border:'2px solid blue',
  }
  const violetstyle = {
    backgroundColor: 'violet',
    border:'2px solid violet'
  }
  const pinkstyle = {
    backgroundColor: 'pink',
    border:'2px solid pink'
  }
  const whitestyle = {
    backgroundColor: 'white',
    border:'2px solid #B2BEB5'
  }
  const blackstyle = {
    backgroundColor: 'black',
    border:'2px solid black'
  }

  // CONST COLORLINE


  return (
    <div className='Box'>
      <div>
        <h4 className='H1'>Filters</h4>
        <div className='icon1'>
          <button type='button' style={{border: 'none', width: '24px', height: '22px', cursor: 'pointer'}}><img className='Img1' src='/Filter/setfilter1.png' alt='Adjust Icon'/></button>
        </div>  
        <hr className='line1'></hr>
      </div>

      {/* ALL THE STUFF WHERE USERS CAN RETRIVE THE DATA LIKE TSHIRTS,SHORTS,SHIRTS...ETC */}
      <div>
        <button type='button'  className='btn1'>T-shirts  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px'}}></img>  </button> 
        <button type='button'  className='btn1'>Shorts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',}}></img>  </button>
        <button type='button'  className='btn1'>Shirts &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',}}></img> </button>
        <button type='button'  className='btn1'>Hoodie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',}}></img>  </button>
        <button type='button'  className='btn1'>Jeans &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',}}></img> </button> 
      </div>
      {/* HR FOR HORIZONTAL LINE, PLEASE CHECK I USED THE SAME CLASS NAME , REUSED THE SAME AGAIN */}
      <hr className='line1'></hr>

      {/* Price part */}
      <div>
        <h4 className='H2'>Price</h4>
        {/* opening/closing button */}
        <button className='ar1' type='button' onClick={clickshow}><img src='/Filter/upArrow.png' style={{width:'16px',height:'16px'}} ></img></button>  

        {/* DUAL SLIDER - (npm install react-slider)   */}
        {click && (
          <div className='slidebox'>
            <Slider className='dualslider' value={values} min={min} max={max} />
            <small>${values[1]} ${values[0]}</small>
          </div>
        )}
        {/* <Slider className='dualslider' value={values} min={min} max={max} /> */}
        
      </div>
      <hr className='line1'></hr>

      {/* colours part */}
      <div className='colorpart'>
        <h4 className='H3'>Colours</h4> 
        {/* opening/closing button */}
        <button className='ar23' type='button' style={{float:'left', marginLeft:'145px',marginTop:'-44px'}} onClick={clickshow2}><img src='/Filter/upArrow.png' style={{width:'16px',height:'16px'}}></img></button> 
        {clr && (
          <div className='clrBox' > 
              <button className='btn' style={greenstyle} onClick={() =>onclickTick(1)} > {ischecked === 1 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button> 
              <button className='btn' style={redstyle} onClick={() =>onclickTick(2)} > {ischecked === 2 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={yellowstyle} onClick={() =>onclickTick(3)} > {ischecked === 3 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button> 
              <button className='btn' style={orangestyle} onClick={() =>onclickTick(4)} > {ischecked === 4 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={skystyle} onClick={() =>onclickTick(5)} > {ischecked === 5 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>    <br></br>
              <button className='btn' style={bluestyle} onClick={() =>onclickTick(6)}  > {ischecked ===6 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={violetstyle} onClick={() =>onclickTick(7)} > {ischecked === 7 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={pinkstyle} onClick={() =>onclickTick(8)}  > {ischecked === 8 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={whitestyle} onClick={() =>onclickTick(9)}  > {ischecked === 9 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button>
              <button className='btn' style={blackstyle} onClick={() => onclickTick(10)} > {ischecked === 10 && (<p style={{color:'white',textAlign:'center',margin:'-2px 2px 0 6px', position:'absolute',top:'9px'}}>✓</p>)} </button> 
          </div>
        )} 
      </div> 
      <hr className='line1' style={{marginTop:'90px'}}></hr> 
      {/* <hr className='line2'></hr> */}

      {/* Size */}
      <div>
        <h4 className='H4'>Size</h4>
        {/* opening/closing button */}
        <button className='ar24' type='button' style={{float:'left', marginLeft:'145px',marginTop:'-40px'}} onClick={clickshow3}><img src='/Filter/upArrow.png' style={{width:'16px',height:'16px'}}></img></button> 

        {size && ( 
          <div className='Buttonss'>
            <div className='t1'> 
              <div>
                <button className='btn3' type='button' style={{width:'85px',marginLeft:'25px'}}>XX-Small</button> &nbsp;
                <button className='btn3' type='button' style={{marginLeft:'-5px'}}>X-Small</button>
              </div>

              <div className='t2'>
                <button type='button' className='btn3'>Small</button>
                <button type='button' className='btn3' style={{marginLeft:'5px'}}>Medium</button>
              </div>

              <div className='t3'>
                <button type='button' className='btn3'>Large</button>
                <button type='button' className='btn3' style={{marginLeft:'5px'}}>X-Large</button>
              </div>
            </div>

            <div className='t4'>
              <button type='button' className='btn3' style={{width:'75px'}}>XX-Large</button>
              <button type='button' className='btn3' style={{width:'75px',marginLeft:'5px'}}>3X-Large</button>
            </div>

            <div className='t5' style={{marginLeft:'-90px'}}>  
              <button type='button' className='btn3' style={{width:'75px'}} >4X-Large</button>   
            </div>
          </div>
        )}
      </div>
      <hr style={{marginTop:'13px'}}></hr>

      {/* Dress Style */}
      <div>
        <h4 style={{marginLeft:'-85px',fontFamily:'Arial, Helvetica, sans-serif'}}>Dress Style</h4>  
        <button className='ar25' type='button' style={{float:'left', marginLeft:'145px',marginTop:'-40px'}} onClick={clickshow4}><img src='/Filter/upArrow.png' style={{width:'16px',height:'16px'}}></img></button> 
        {dress && (
          <div className='lastbtn'>
            <button type='button'  className='btn1' style={{marginTop:'-20px'}}>Casual &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',padding:'-25px'}}></img>  </button> <br/>
            <button type='button'  className='btn1'>Formal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',padding:'-25px'}}></img> </button>
            <button type='button'  className='btn1'>Party &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',padding:'-25px'}}></img> </button>
            <button type='button'  className='btn1'>Gym &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <img src='/Filter/rightArrow.png' style={{width:'16px',height:'16px',padding:'-25px'}}></img> </button> 
          </div>
        )}

        <button type='button' className='Apply'>Apply Filter</button>
      </div>



    </div>
    
  )
}

export default Filter1
//{ischecked && (<p style={{color:'white',textAlign:'center',marginTop:'-4px'}}>✓</p>)}
//{status ? document.getElementsByClassName('clrBox') : ''}
