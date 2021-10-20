import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLeaveRoom } from "../../store/actions";
// Components
import NavBar from "./NavBar";
import Rooms from "./Rooms";
import Loader from "../../components/Loader";

const HomePage = ({ leaveRoom, setLeaveRoom, identity, rooms }) => {
    let history = useHistory();

    useEffect(() => {
        if (leaveRoom) {
            setLeaveRoom(false);
            history.go(0);
        }
        // eslint-disable-next-line
    }, []);

    if (!identity) {
        return <Loader />;
    } else if (rooms === null) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col bg-gray-900">
            <NavBar />
            <Rooms />
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
