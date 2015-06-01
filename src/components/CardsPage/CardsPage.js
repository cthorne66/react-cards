/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import styles from './CardsPage.less'; // eslint-disable-line no-unused-vars
import withStyles from '../../decorators/withStyles'; // eslint-disable-line no-unused-vars
import classNames from 'classnames';

@withStyles(styles)
class CardsPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      cards: [{
        title: 'Card A',
        inConfig: false
      }, {
        title: 'Card B',
        inConfig: false
      }]
    };
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  handleShowBack(id){
    event.preventDefault();
    var cards = this.state.cards;
    cards[id].inConfig = true;
    this.setState({cards: cards});
  };

  handleShowFront(id){
    event.preventDefault();
    var cards = this.state.cards;
    cards[id].inConfig = false;
    this.setState({cards: cards});
  };

  render() {
    let title = 'Cards';
    this.context.onSetTitle(title);


    let cardNodes = this.state.cards.map(function (card, i) {
          let inConfig = this.state.cards[i].inConfig;

          let classes = classNames({
            'card-container': true,
            'activate': inConfig
          });

          let draggable = (inConfig) ? false : true;


          return (
            <div className={classes} draggable={draggable} key={i}>
              <div className="card-front">
                <div>{card.title} <a href="" className="config-activate" onClick={this.handleShowBack.bind(this, i)}>Flip</a></div>
                <div>body</div>
                <div>footer</div>
              </div>

              <div className="card-back">
                <div>{card.title} <a href="" className="config-return" onClick={this.handleShowFront.bind(this, i)}>Return</a></div>
                <div>bad</div>
              </div>

            </div>
          );
        }.bind(this));

    return (
      <div className="CardsPage">
        <div className="CardsPage-container">

         <div className="card-deck">
           {cardNodes}
           <div className="clearfix"></div>
         </div>

        </div>
      </div>
    );
  }

}

export default CardsPage;
