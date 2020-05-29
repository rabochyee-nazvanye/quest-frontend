import React from 'react'

function IsRegistered(props) {
    let isRegistered = false;
    props.teams.forEach((x) => x.members.forEach((y) => {
        if (y === this.props.user.id) isRegistered = true
    }));
    return {isRegistered}
}
export default IsRegistered
