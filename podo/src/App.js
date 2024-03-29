import logo from './logo.svg';
import './App.css';
import './font.scss';
import './main.scss';
import Logo from './image/Podologo.png';
import Playlist from './image/playlist.png';
import Home from './image/Home.png';
import LoginImg from './image/로그인이미지.png'
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {Nav,Container,NavDropdown,Navbar, Form, FormControl,Button} from 'react-bootstrap';
import {useState} from 'react';
import Login from './components/Login';
import Main from './components/Main';
import SetPlayList from './components/SetPlayList';
import SearchResult from './components/SearchResult';
import Play from './components/Play';

function App() {
  let [ifSetPlaylist,ifSetPlayList변경]=useState(0);
  let history = useHistory();
  let [search,setSearch]=useState('');
  let [buttonColor,setButton] = useState(0);
  let [keyWordHighLight,setKeyWord] = useState(0);
  let [category,setCategory]=useState([]);
  let [video,setVideo]=useState([
    {video: '1',title:'my video',view: 123345, youtuber: '배연준',created:'3 months ago'},
    {video: '2',title:'my video2',view: 1233453, youtuber: '배연준',created:'4 months ago'},
  ]);
  let [targetId,setTargetId]=useState('');
  let [중간, 중간변경]=useState([]);
  let 간이버튼 = () =>{
    let copy = [...중간];
    copy.push({text: 'type category'});
    중간변경([...copy]);
  }
  let 간이가정식으로=()=>{

  }


  return (
    <div className="App">
      <Navbar expand="">
  <div className="container-fluid ms-2 me-2 d-flex justify-content-between">
    <div className="d-flex">
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-4" />
      <div className="d-flex" style={{cursor:'pointer'}} onClick={()=>{history.push("/main");setButton(0);}}>
      <img src={Logo}className="me-2 mt-1"  alt=""  style={{height:32}}/>
      <div className="noto" style={{fontSize: 25, marginTop:6, color: '#030303'}}>PODO</div>

      </div>
    </div>
    {/* <Form className="d-flex" style={{width: 800}}>
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
        onChange={(e)=>setSearch(e.target.value)}
      />
      <Button variant="outline-success" onClick={()=>{history.push("/video?search="+search);setButton(2)}}>Search</Button>
    </Form> */}
          <div className="circle-1"></div>
    <Navbar.Collapse id="basic-navbar-nav" style={{zIndex:3}}>
      <Nav className="me-auto mt-2">
        <Nav className="nav-left-link row" >
          <Link to="/main" onClick={()=>{setButton(0)}} className="nav-left-link row" style={{backgroundColor:buttonColor===0?'#EEEEEE':'#FFFFFF'}}>
          <div className="col-3" style={{height: '100%' , display:'flex',alignItems:'center'}}><img className="nav-left-logo" src={Home} alt="" /></div>
          <div className="col-9" style={{height: '100%', display:'flex',alignItems:'center'}}><span style={{fontWeight:700, fontSize:16}}>Home</span></div>
          </Link>
          
          </Nav>
          <Nav className="nav-left-link row mt-2">
            <Link to="/playlist" onClick={()=>{setButton(1)}} className="nav-left-link row" style={{backgroundColor:buttonColor===1?'#EEEEEE':'#FFFFFF'}}>
              <div className="col-3" style={{height: '100%' , display:'flex',alignItems:'center'}}><img className="nav-left-logo" src={Playlist} alt="" /></div>
              <div className="col-9" style={{height: '100%', display:'flex',alignItems:'center'}}><span style={{fontWeight:700, fontSize:16}}>Playlist</span></div>
            </Link>
          
          </Nav>
        
      </Nav>
    </Navbar.Collapse>
  </div>
</Navbar>
    <div className="container-fluid main-content">
      
          <Switch>
            <Route exact path="/">
            <div className="container"style={{minHeight: '100vh'}}>

              <Login></Login>
            </div>
            </Route>
            <Route exact path ="/main">
              {
                ifSetPlaylist===0
                ? <SetPlayList category={category} setCategory={setCategory} ifSetPlayList변경={ifSetPlayList변경}/>
                :<>
                    <div className="keyword-list d-flex">
                      <button className="keyword-plus" onClick={간이버튼}><i class="fas fa-plus"></i></button>
                      {
                        category.map((a,i)=>{
                          return (
                            <button className="btn-keyword" style={{backgroundColor:keyWordHighLight===i+1?'#EEEEEE':'#FFFFFF'
                            }} onClick={()=>{
                              console.log(category);
                              console.log(keyWordHighLight);
                              setKeyWord(i+1);
                              setButton(2);
                              history.push("/video?search="+a.text,{category:{category},keyWordHighLight:{keyWordHighLight}
                            });}}>{a.text}</button>
                          )
                        })
                      }
                      {
                        중간.map((a,i)=>{
                          return(
                            <div className="btn-keyword">
                              <input type="text" onChange={(e)=>{
                                let cop = [...중간];
                                cop[i] = {id:i,text:e.target.value};
                                중간변경(cop)}} onKeyPress={(e)=>{
                                if(e.key === 'Enter'){
                                  console.log('enter is pressed')
                                  let finalcopy = [...category];
                                  중간.map((a,i)=>{
                                    finalcopy.push(a);
                                  })
                                  finalcopy.map((a,i)=>{
                                    finalcopy[i].id = i;
                                    console.log(finalcopy[i]);
                                  })
                                  setCategory(finalcopy);
                                  console.log(category);
                                  중간변경([]);

                                }}} />
                            </div>
                          )
                        })
                      }
                       <button className="keyword-plus" onClick={()=>{let copy=[...category];copy.pop();setCategory([...copy])}}><i class="fas fa-minus"></i></button>
                    </div>
                    <Main video={video} setVideo={setVideo} category={category} setCategory={setCategory}></Main>
                  </>
                
              }
            </Route>
            <Route exact path ="/playlist">
            <div className="container"style={{minHeight: '100vh'}}>
              <Play></Play>
            </div>
            </Route>
            <Route exact path="/video">
            <div className="container"style={{minHeight: '100vh'}}>

              <SearchResult search={search} targetId={targetId} setTargetId={setTargetId}></SearchResult>
            </div>
            </Route>
            <Route exact path = "/mypage">

            </Route>
            <Route exact path = "/video//:id">
              
            <div className="container"style={{minHeight: '100vh'}}>

              <Play targetId={targetId}></Play>
            </div>
            </Route>
          </Switch>
      
    </div>
    
    </div>
  );
}

export default App;
