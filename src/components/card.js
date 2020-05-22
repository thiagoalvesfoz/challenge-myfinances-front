import React from 'react';


class Card extends React.Component {
  render() {
    return (
      <div className="card mb-3">
        <h3 className="card-header" id="dark-header">{this.props.title}</h3>
          <div className="card-body" id="dark-1">
            {this.props.children}
          </div>
      </div>
    )
  }

}

export default Card;