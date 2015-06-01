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
        inConfig: false,
        isDragStart: false
      }, {
        title: 'Card B',
        inConfig: false,
        isDragStart: false
      }],
      dragSrcEl: null
    };
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  handleShowBack(id, event){
    console.log(arguments);
    event.preventDefault();
    var cards = this.state.cards;
    cards[id].inConfig = true;
    this.setState({cards: cards});
  };

  handleShowFront(id, event){
    event.preventDefault();
    var cards = this.state.cards;
    cards[id].inConfig = false;
    this.setState({cards: cards});
  };

  handleDragStart(id, event) {
    event.preventDefault();
    console.log('dragstart');

    var cards = this.state.cards;
    cards[id].isDragStart = true;
    this.setState({
      cards: cards,
      dragSrcEl: this
    });

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
  };

  handleDragEnter(id, event) {
    console.log('dragenter');

    var cards = this.state.cards;
    cards[id].isDragEnter = true;
    this.setState({
      cards: cards
    });
  };

  handleDragOver(id, event) {
    console.log('dragover');
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
  };

  // elm.bind('dragenter', function() {
  //   console.log('dragenter');
  //   elm.addClass('over');
  // });

  // elm.bind('dragover', function(e) {
  //   console.log('dragover');
  //   if (e.preventDefault) {
  //     e.preventDefault(); // Necessary. Allows us to drop.
  //   }

  //   var orig = e.originalEvent;

  //   orig.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

  //   return false;
  // });

  // elm.bind('dragleave', function() {
  //   console.log('dragleave');
  //   elm.removeClass('over');
  // });

  // elm.bind('dragend', function() {
  //   console.log('dragend');
  //   $('.card-container').removeClass('over');
  //   this.style.opacity = '1';
  // });

  // // $(elm.parent()[0]).bind('drop', function(e){
  // elm.bind('drop', function(e) {
  //   console.log('drop');

  //   // this/e.target is current target element.

  //   if (e.stopPropagation) {
  //     e.stopPropagation(); // Stops some browsers from redirecting.
  //   }

  //   var orig = e.originalEvent;

  //   // Don't do anything if dropping the same column we're dragging.
  //   if (dragSrcEl != this) {
  //     // Set the source column's HTML to the HTML of the column we dropped on.
  //     dragSrcEl.innerHTML = this.innerHTML;
  //     this.innerHTML = orig.dataTransfer.getData('text/html');
  //   }

  //   elm.removeClass('over');

  //   // $compile(elm)(scope);

  //   return false;

  // });

  render() {
    let title = 'Cards';
    this.context.onSetTitle(title);


    let cardNodes = this.state.cards.map(function (card, i) {
          let config = this.state.cards[i];

          let classes = classNames({
            'card-container': true,
            'activate': config.inConfig,
            'over': config.isDragEnter
          });

          let styles = {
            'opacity': config.isDragStart ? '0.4' : '1'
          }

          let draggable = (config.inConfig) ? false : true;


          return (
            <div key={i} className={classes} style={styles} 
              draggable={draggable} 
              onDragStart={this.handleDragStart.bind(this, i)} 
              onDragEnter={this.handleDragEnter.bind(this, i)}
              onDragOver={this.handleDragOver.bind(this, i)}>

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
