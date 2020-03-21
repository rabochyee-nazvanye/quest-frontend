import React from "react";

function Picture(props) {
    return (
        <img
            alt={props.quest.name + ' картинка'}
            src={'https://s0.rbk.ru/v6_top_pics/media/img/6/56/755719973686566.png'}
        />
    );
}

export default Picture