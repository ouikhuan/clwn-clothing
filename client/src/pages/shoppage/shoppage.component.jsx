import React,{useEffect,lazy,Suspense} from 'react';
import './shoppage.styles.scss';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import Spinner from '../../components/spinner/spinner.component';
const CollectionOverviewContainer = lazy(()=>import('../../components/collection-overview/collection-overview.container'));
const CollectionPageContainer = lazy(()=>import('../collection/collection.container'));

const ShopPage = ({match,fetchCollectionsStart})=> {
    useEffect(()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart]);

    return (<div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </Suspense>
        </div>
    );

}



const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});



export default connect(null,mapDispatchToProps)(ShopPage);