import React, { Component } from 'react'

class HomeComponent extends Component {

  state = {
      msg: ''
  }
  constructor(props) {
    super(props);
    this.eventSource = null;
  }

  componentDidMount() {
    const url = new URL('http://localhost:3333/hub');
    url.searchParams.append('topic', 'http://local.dev/notifications');
    
    this.eventSource = new EventSource(url, {withCredentials: true});
    
    // The callback will be called every time an update is published
    this.eventSource.onmessage = (e) => {
        this.setState({
            msg: JSON.parse(e.data).message
        });

        setTimeout(() => {
            this.setState({
                msg: ''
            });
        }, 2000);
    }
  }
  
  componentWillUnmount() {
    this.eventSource.close();
  }
  render() {
    return (
      <div>
        <p>Homepage</p>
        <span>{this.state.msg}</span>
      </div>
    )
  }
}

export default HomeComponent;