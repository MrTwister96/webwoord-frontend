import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLeaveRoom } from "../../store/actions";
// Components
import Steams from "./Steams";
import NavBar from "./NavBar";

const HomePage = ({ leaveRoom, setLeaveRoom }) => {
    let history = useHistory();

    useEffect(() => {
        if (leaveRoom) {
            setLeaveRoom(false);
            history.go(0);
        }
    }, []);
    return (
        <div className="flex flex-col bg-gray-900">
            <NavBar />
            <Steams />
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setLeaveRoom: (leaveRoom) => dispatch(setLeaveRoom(leaveRoom)),
    };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(HomePage);
