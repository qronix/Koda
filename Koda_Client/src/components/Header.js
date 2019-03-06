import React, {useState, Component} from 'react';
import {Segment, Menu} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {navigate} from '../actions'

class Header extends Component {
    state = { activeItem: 'home'}

    handleItemClick = (e,{name}) => {
        this.setState({ activeItem: name })
        this.props.navigate(name)
    }

    render() {
        const { activeItem } = this.state
        return(
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Menu.Item name="home" active={ activeItem === 'home' } onClick={ this.handleItemClick }/>
                    <Menu.Item name="auth" active={ activeItem === 'auth' } onClick= { this.handleItemClick }/>
                </Menu>
            </Segment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {location: state.navigation.location}
}
export default connect(mapStateToProps, { navigate })(Header)