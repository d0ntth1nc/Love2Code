import React, {PropTypes, Component} from "react";
import StateManager from "core/StateManager";

export default class Layout extends Component {
    constructor( props ) {
        super( props );
    }

    static propTypes = {
        stateManager: PropTypes.instanceOf( StateManager ).isRequired,
        onNavigate: PropTypes.func.isRequired
    };
}
