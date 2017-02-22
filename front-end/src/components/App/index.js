import React from 'react';
import Banner from '../Banner';
import Navigation from '../Navigation';
require('./styles.scss');

module.exports = class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bannerText: '',
      title: 'App'
    }

    fetch('config').then((response) => {
        return response.ok ? response.json() : {};
      }).then((config) => {
        if(config) {
          let bannerText = config.banner || '';
          let title = config.title ||'App';
          this.setState({bannerText, title});
        }
      });
  }

  componentWillUpdate(props, state) {
    document.title = state.title;
  }

  render() {
    return <div className='app'>
      <Banner text={this.state.bannerText} />
      <Navigation />
      {this.props.children}
    </div>;
  }
}
