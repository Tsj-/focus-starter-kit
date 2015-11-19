//librairies
import React, {PropTypes} from 'react';
import FocusComponents from 'focus-components';

// web components
import Panel from 'focus-components/components/panel';
import {storeBehaviour} from 'focus-components/common/mixin';
import PersonCard from '../../person/person-card';
import PersonCardList from '../../person/person-card-list';

//stores & actions
import movieStore from '../../../stores/movie';
import {writersActions} from '../../../action/movie';

export default React.createClass({
    displayName: 'MovieWriters',
    propTypes: {
        id: PropTypes.number
    },
    mixins: [storeBehaviour],

    /** @inheritDoc */
    getInitialState() {
        return {
            actors: movieStore.getWriters() || []
        }
    },

    /** @inheritDoc */
    componentWillMount(){
        const {id} = this.props;
        writersActions.load(id);
    },

    stores: [{store: movieStore, properties: ['writers']}],

    /** @inheritDoc */
    render() {
        const {writers} = this.state;
        return (
            <Panel title='movie.detail.writers'>
                <PersonCardList personList={writers} />
            </Panel>
        );
    }
});