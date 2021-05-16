import { Fragment } from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';

import classes from "./Modal.module.css";

function Backdrop(props) {
    return (
        <div className={classes.backdrop} onClick={props.onClick} />
    )
}

function ModelOverlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

// We will use portal to render this cart element 
const portalElement = document.getElementById("overlays");

function Model(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
            {reactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,
                portalElement)}
        </Fragment>
    );
};

export default Model;