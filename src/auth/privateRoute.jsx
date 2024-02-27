import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userRole, allowedRoles, ...rest }) => (
  <Route {...rest} render={(props) => (
    userRole && allowedRoles.includes(userRole) ? (
      <Component {...props} />
    ) : (
      <Redirect to='/unauthorized' />
    )
  )} />
);

export default PrivateRoute;
