import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {

    render() {
      const { children, triggerLogin, ...props } = this.props
      return (
          <div onClick={triggerLogin} {...props}>
            {children}
          </div>
      );
    }
}

export default SocialLogin(SocialButton);