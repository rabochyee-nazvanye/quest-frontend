import React from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Button } from 'antd';
import {connect} from "react-redux";
import mapStateToProps from "react-redux/es/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/es/connect/mapDispatchToProps";

function Header(props) {
    let history = useHistory();

    let primaryButton = () => {
        if(props.loggedIn){
            return (
                <Button key="1" onClick={() => history.push("/my-quests")} type="primary">
                    Мой квестспейс
                </Button>
            )
        }
        else{
            return (
                <Button key="1" onClick={() => history.push("/auth")} type="primary">
                    Войти или зарегистрироваться
                </Button>
            )
        }
    }

    return (
        <PageHeader
            ghost={false}
            title="Квестспейс"
            extra={[
                <Button key="3" onClick={() => history.push("/")}>Все квесты</Button>,
                <Button key="2" onClick={() => history.push("/about")}>О нас</Button>,
                <Button key="1" onClick={() => history.push("/my-quests")} type="primary">
                    Мой квестспейс
                </Button>,
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    const
})

const mapDispatchToProps = {
    // ... normally is an object full of action creators
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
