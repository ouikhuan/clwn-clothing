import React from 'react';
import './shoppage.styles.scss';
import CollectionsOverView from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import {Route} from 'react-router-dom';
import { fireStore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);



class ShopPage extends React.Component {

    state = {
        isLoading:true
    }

    unsubscribeFromSnapshot = null;
    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = fireStore.collection('collections');
        collectionRef.onSnapshot(async snapShot => {
            updateCollections(convertCollectionsSnapshotToMap(snapShot));
            this.setState({
                isLoading:false
            });
        });
    }

    render(){
        const {match} = this.props;
        const {isLoading} = this.state;
        return (<div className="shop-page">
                <Route exact path={`${match.path}`} render={(props)=>(<CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />)} />
                <Route path={`${match.path}/:collectionId`} render={(props)=>(<CollectionPageWithSpinner isLoading={isLoading} {...props} />)} />
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null,mapDispatchToProps)(ShopPage);