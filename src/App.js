import React, { Component } from 'react'
import Navbar from './components/Navbarr';
import News  from './components/news';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import LoadingBar from 'react-top-loading-bar';




export class App extends Component {
  
   pageSize = 15;
   apiKey = '68645ff158fc43f9939e40dfb4bb23c7'
   state = {
    progress : 0
  }

  setprogress = (progress)=>{
    this.setState({progress : progress })
  }
  render() {
    return (
      <> 
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Navbar />
        <ScrollToTop smooth color="#6f00ff" />
        <Routes>
          <Route exact path='/'  element={<News setprogress = {this.setprogress} apiKey = {this.apiKey}  key="general"pageSize={this.pageSize} country="in" category="general" />}></Route>
          <Route exact path='/business'  element={<News setprogress = {this.setprogress} apiKey = {this.apiKey} key="business"pageSize={this.pageSize} country="in" category="business" />}></Route>
          <Route exact path='/entertainment'  element={<News setprogress = {this.setprogress} apiKey = {this.apiKey} key="entertainment"pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
          <Route exact path='/'  element={<News setprogress = {this.setprogress} apiKey = {this.apiKey} key="general"pageSize={this.pageSize} country="in" category="general" />}></Route>
          <Route exact path='/health'  element={<News setprogress = {this.setprogress} apiKey = {this.apiKey} key="health"pageSize={this.pageSize} country="in" category="health" />}></Route>
          <Route exact path='/science' element={<News setprogress = {this.setprogress} apiKey = {this.apiKey}  key="science"pageSize={this.pageSize} country="in" category="science" />}></Route>
          <Route exact path='/sports' element={<News setprogress = {this.setprogress} apiKey = {this.apiKey}  key="sports"pageSize={this.pageSize} country="in" category="sports" />}></Route>
          <Route exact path='/technology' element={<News setprogress = {this.setprogress} apiKey = {this.apiKey}  key="technology"pageSize={this.pageSize} country="in" category="technology" />}></Route>
          
        </Routes>
        </Router>
      </>
    )
  }
}

export default App
