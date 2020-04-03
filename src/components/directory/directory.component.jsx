import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectDirectoryItem } from "../../redux/directory/directory.selectors";

const Directory = ({sections})=> (
    <div className="directory-menu">
        {
            sections.map(
                ({id,...otherSectionsProps}) => (
                    <MenuItem key={id} {...otherSectionsProps} />
                )
            )

        }
    </div>
);

const mapStateToProps = createStructuredSelector ({
    sections: selectDirectoryItem
});
export default connect(mapStateToProps)(Directory);
