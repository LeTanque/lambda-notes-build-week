import React, { Component, Fragment } from 'react';
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux';

import { getNotes } from '../stateTree/actions';

import Note from './Note';


const masonryOptions = {
    transitionDuration: '0.5s',
    itemSelector: '.note-card',
    gutter: 10,
    percentagePosition: true,
};


class Notes extends Component {

    componentDidMount() {
        this.props.getNotes();
    }

    render() {
        
        const childElements = this.props.notes.map(note => (
            <Fragment key={note._id}>
                <Note note={note}  />
            </Fragment>
        ))
    
        return (
            <Fragment>
                <section className='note-container'>
                    
    
                    <h3 className=''>Your Notes:</h3>
                    <Masonry
                        className={'note-gallery'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {childElements}
                    </Masonry>
    
    
                </section>            
            </Fragment>
        )   
    }
}

const mapStateToProps = state => ({
    notes:state.notes,
    fetchingNote:state.fetchingNote,
    targetNote:'',
    deletedNote:state.deletedNote,
    newNote:state.newNote,
})

export default connect(
    mapStateToProps, 
    { getNotes }
)(Notes);
