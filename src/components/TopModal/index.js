import React from 'react';
import ModalImage from './ModalImage'
require('./style.scss');

export default class TopModal extends React.Component{
  constructor(props){
    super(props);

    this.state={open: props.open};

    this.closeModal = (e) =>{

      //if this handler is attached to the clicked element, not it's child
      if(e.target == e.currentTarget){
        this.setState({open: false});
      }
    };
  }

  render(){
    return <div className={'top-modal ' + (this.state.open ? 'modal-open' : 'modal-closed')}
      onClick={this.closeModal}>
        <div className='modal-frame'>
          <div className='modal-header'>
            <span className='modal-close' onClick={this.closeModal} />
          </div>
          <div className='modal-content'>
            <ModalImage image={this.props.image} leftFunc={this.props.leftFunc}
            rightFunc={this.props.rightFunc} />
          </div>
        </div>
      </div>;
  }

  componentWillReceiveProps(newProps){
    this.setState({open: newProps.open});
  }
}
