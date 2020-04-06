import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import CollectionsOverView from "./collection-overview.component";
import {compose} from 'redux';


const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
});

const CollectionOverviewContainer =  compose(
    connect(mapStateToProps),
    WithSpinner
  )(CollectionsOverView);


export default CollectionOverviewContainer;