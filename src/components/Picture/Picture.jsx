import React from "react";

function Picture(props) {
    return (
        <img
            alt={props.quest.name + ' картинка'}
            src={props.quest.imageUrl}
        />
    );
}

export default Picture